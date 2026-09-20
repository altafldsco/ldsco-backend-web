import { Router } from 'express';
import { SiteSetting, Office, Portal, SocialLink } from '../../db/models';

const router = Router();

router.get('/', async (req, res, next) => {
  try {
    const settings = await SiteSetting.findOne({ order: [['id', 'ASC']] });
    const [offices, portals, socialLinks] = await Promise.all([
      Office.findAll({ order: [['sortOrder', 'ASC']] }),
      Portal.findAll({ order: [['sortOrder', 'ASC']] }),
      SocialLink.findAll({ order: [['sortOrder', 'ASC']] }),
    ]);
    res.json({ data: { ...(settings?.get({ plain: true }) ?? {}), offices, portals, socialLinks } });
  } catch (err) {
    next(err);
  }
});

export default router;
