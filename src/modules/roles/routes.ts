import { Router } from 'express';
import { body, validationResult } from 'express-validator';
import { Role, Permission, RolePermission, User } from '../../db/models';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { HttpError } from '../../middleware/errorHandler';

const router = Router();
router.use(authenticate);

const include = [{ model: Permission, as: 'permissions' }];

router.get('/', authorize('roles', 'read'), async (req, res, next) => {
  try {
    const roles = await Role.findAll({ include, order: [['id', 'ASC']] });
    res.json({ data: roles });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authorize('roles', 'read'), async (req, res, next) => {
  try {
    const role = await Role.findByPk(String(req.params.id), { include });
    if (!role) throw new HttpError(404, 'Role not found');
    res.json({ data: role });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  authorize('roles', 'create'),
  body('name').isString().notEmpty(),
  body('slug').isString().notEmpty(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new HttpError(400, 'Invalid role payload', errors.array());

      const { name, slug, description } = req.body;
      const role = await Role.create(
        { name, slug, description, isSuperAdmin: false },
        { userId: req.user!.id } as any
      );
      res.status(201).json({ data: role });
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id', authorize('roles', 'update'), async (req, res, next) => {
  try {
    const role = await Role.findByPk(String(req.params.id));
    if (!role) throw new HttpError(404, 'Role not found');
    if (role.isSuperAdmin) throw new HttpError(400, 'The Super Admin role cannot be modified');

    const { name, slug, description } = req.body;
    const updates: Record<string, any> = {};
    if (name !== undefined) updates.name = name;
    if (slug !== undefined) updates.slug = slug;
    if (description !== undefined) updates.description = description;

    await role.update(updates, { userId: req.user!.id } as any);
    res.json({ data: role });
  } catch (err) {
    next(err);
  }
});

router.put(
  '/:id/permissions',
  authorize('permissions', 'update'),
  body('permissionIds').isArray(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new HttpError(400, 'Invalid permissions payload', errors.array());

      const role = await Role.findByPk(String(req.params.id));
      if (!role) throw new HttpError(404, 'Role not found');
      if (role.isSuperAdmin) throw new HttpError(400, 'The Super Admin role implicitly has every permission');

      const { permissionIds } = req.body as { permissionIds: number[] };
      await RolePermission.destroy({ where: { roleId: role.id } });
      await RolePermission.bulkCreate(
        permissionIds.map((permissionId) => ({
          roleId: role.id,
          permissionId,
          createdBy: req.user!.id,
          updatedBy: req.user!.id,
        }))
      );

      const updated = await Role.findByPk(role.id, { include });
      res.json({ data: updated });
    } catch (err) {
      next(err);
    }
  }
);

router.delete('/:id', authorize('roles', 'delete'), async (req, res, next) => {
  try {
    const role = await Role.findByPk(String(req.params.id));
    if (!role) throw new HttpError(404, 'Role not found');
    if (role.isSuperAdmin) throw new HttpError(400, 'The Super Admin role cannot be deleted');

    const usersWithRole = await User.count({ where: { roleId: role.id } });
    if (usersWithRole > 0) {
      throw new HttpError(400, 'Cannot delete a role that is still assigned to users');
    }

    await role.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
