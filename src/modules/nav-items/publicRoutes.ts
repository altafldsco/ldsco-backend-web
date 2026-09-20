import { Router } from 'express';
import { NavItem } from '../../db/models';

const router = Router();

function toTree(items: any[], parentId: number | null = null): any[] {
  return items
    .filter((item) => item.parentId === parentId)
    .sort((a, b) => a.sortOrder - b.sortOrder)
    .map((item) => ({
      id: item.id,
      label: item.label,
      href: item.href,
      children: toTree(items, item.id),
    }));
}

router.get('/', async (req, res, next) => {
  try {
    const items = await NavItem.findAll({ order: [['sortOrder', 'ASC']] });
    res.json({ data: items });
  } catch (err) {
    next(err);
  }
});

router.get('/tree', async (req, res, next) => {
  try {
    const items = await NavItem.findAll({ order: [['sortOrder', 'ASC']] });
    res.json({ data: toTree(items.map((i) => i.get({ plain: true }))) });
  } catch (err) {
    next(err);
  }
});

export default router;
