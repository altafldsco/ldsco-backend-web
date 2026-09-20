import { Router } from 'express';
import { SiteSetting } from '../../db/models';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';

const router = Router();
router.use(authenticate);

async function getOrCreateSingleton() {
  const existing = await SiteSetting.findOne({ order: [['id', 'ASC']] });
  if (existing) return existing;
  return SiteSetting.create({});
}

router.get('/', authorize('site_settings', 'read'), async (req, res, next) => {
  try {
    const settings = await getOrCreateSingleton();
    res.json({ data: settings });
  } catch (err) {
    next(err);
  }
});

router.put('/', authorize('site_settings', 'update'), async (req, res, next) => {
  try {
    const settings = await getOrCreateSingleton();
    await settings.update(req.body, { userId: req.user!.id } as any);
    res.json({ data: settings });
  } catch (err) {
    next(err);
  }
});

export default router;
