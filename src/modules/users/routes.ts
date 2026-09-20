import { Router } from 'express';
import bcrypt from 'bcrypt';
import { body, validationResult } from 'express-validator';
import { User, Role, Permission } from '../../db/models';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { HttpError } from '../../middleware/errorHandler';

const router = Router();
router.use(authenticate);

const include = [{ model: Role, as: 'role', include: [{ model: Permission, as: 'permissions' }] }];

function serialize(user: any) {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    isActive: user.isActive,
    roleId: user.roleId,
    role: user.role
      ? { id: user.role.id, name: user.role.name, slug: user.role.slug, isSuperAdmin: user.role.isSuperAdmin }
      : undefined,
    lastLoginAt: user.lastLoginAt,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}

router.get('/', authorize('users', 'read'), async (req, res, next) => {
  try {
    const users = await User.findAll({ include, order: [['id', 'ASC']] });
    res.json({ data: users.map(serialize) });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authorize('users', 'read'), async (req, res, next) => {
  try {
    const user = await User.findByPk(String(req.params.id), { include });
    if (!user) throw new HttpError(404, 'User not found');
    res.json({ data: serialize(user) });
  } catch (err) {
    next(err);
  }
});

router.post(
  '/',
  authorize('users', 'create'),
  body('name').isString().notEmpty(),
  body('email').isEmail(),
  body('password').isString().isLength({ min: 8 }),
  body('roleId').isInt(),
  async (req, res, next) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) throw new HttpError(400, 'Invalid user payload', errors.array());

      const { name, email, password, roleId, isActive } = req.body;
      const passwordHash = await bcrypt.hash(password, 12);
      const user: any = await User.create(
        { name, email, passwordHash, roleId, isActive: isActive ?? true },
        { userId: req.user!.id } as any
      );
      const withRole = await User.findByPk(user.id, { include });
      res.status(201).json({ data: serialize(withRole) });
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id', authorize('users', 'update'), async (req, res, next) => {
  try {
    const user = await User.findByPk(String(req.params.id));
    if (!user) throw new HttpError(404, 'User not found');

    const { name, email, roleId, isActive, password } = req.body;
    const updates: Record<string, any> = {};
    if (name !== undefined) updates.name = name;
    if (email !== undefined) updates.email = email;
    if (roleId !== undefined) updates.roleId = roleId;
    if (isActive !== undefined) updates.isActive = isActive;
    if (password) updates.passwordHash = await bcrypt.hash(password, 12);

    await user.update(updates, { userId: req.user!.id } as any);
    const withRole = await User.findByPk(user.id, { include });
    res.json({ data: serialize(withRole) });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authorize('users', 'delete'), async (req, res, next) => {
  try {
    const user = await User.findByPk(String(req.params.id));
    if (!user) throw new HttpError(404, 'User not found');
    if (user.id === req.user!.id) throw new HttpError(400, 'You cannot delete your own account');
    await user.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
