import { Router } from 'express';
import { Permission } from '../../db/models';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();
router.use(authenticate);

// Permissions are seeded (one row per resource+action) and read-only via the API.
router.get('/', authorize('permissions', 'read'), async (req, res, next) => {
  try {
    const permissions = await Permission.findAll({ order: [['resource', 'ASC'], ['action', 'ASC']] });
    res.json({ data: permissions });
  } catch (err) {
    next(err);
  }
});

export default router;
