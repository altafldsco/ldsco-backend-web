import { Router } from 'express';
import { ContactSubmission } from '../../db/models';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { HttpError } from '../../middleware/errorHandler';

const router = Router();
router.use(authenticate);

router.get('/', authorize('contact_submissions', 'read'), async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(String(req.query.pageSize ?? '50'), 10) || 50));
    const where: Record<string, any> = {};
    if (req.query.status) where.status = req.query.status;

    const { rows, count } = await ContactSubmission.findAndCountAll({
      where,
      order: [['created_at', 'DESC']],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    res.json({ data: rows, meta: { page, pageSize, total: count } });
  } catch (err) {
    next(err);
  }
});

router.get('/:id', authorize('contact_submissions', 'read'), async (req, res, next) => {
  try {
    const submission = await ContactSubmission.findByPk(String(req.params.id));
    if (!submission) throw new HttpError(404, 'Submission not found');
    res.json({ data: submission });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authorize('contact_submissions', 'update'), async (req, res, next) => {
  try {
    const submission = await ContactSubmission.findByPk(String(req.params.id));
    if (!submission) throw new HttpError(404, 'Submission not found');
    const { status } = req.body;
    if (!['new', 'read', 'archived'].includes(status)) {
      throw new HttpError(400, 'status must be one of: new, read, archived');
    }
    await submission.update({ status }, { userId: req.user!.id } as any);
    res.json({ data: submission });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authorize('contact_submissions', 'delete'), async (req, res, next) => {
  try {
    const submission = await ContactSubmission.findByPk(String(req.params.id));
    if (!submission) throw new HttpError(404, 'Submission not found');
    await submission.destroy();
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
