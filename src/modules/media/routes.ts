import fs from 'fs';
import { Router } from 'express';
import { MediaFile } from '../../db/models';
import { authenticate } from '../../middleware/authenticate';
import { authorize } from '../../middleware/authorize';
import { HttpError } from '../../middleware/errorHandler';
import { upload, fileTypeFromMime, uploadPathFromUrl } from '../../middleware/upload';

const router = Router();
router.use(authenticate);

router.get('/', authorize('media', 'read'), async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(String(req.query.page ?? '1'), 10) || 1);
    const pageSize = Math.min(100, Math.max(1, parseInt(String(req.query.pageSize ?? '50'), 10) || 50));
    const where: Record<string, any> = {};
    if (req.query.fileType) where.fileType = req.query.fileType;

    const { rows, count } = await MediaFile.findAndCountAll({
      where,
      order: [['id', 'DESC']],
      limit: pageSize,
      offset: (page - 1) * pageSize,
    });
    res.json({ data: rows, meta: { page, pageSize, total: count } });
  } catch (err) {
    next(err);
  }
});

router.post('/', authorize('media', 'create'), upload.single('file'), async (req, res, next) => {
  try {
    if (!req.file) throw new HttpError(400, 'No file was uploaded (expected field name "file")');

    const url = `/uploads/${req.file.filename}`;
    const media = await MediaFile.create(
      {
        fileName: req.file.originalname,
        filePath: req.file.path,
        url,
        mimeType: req.file.mimetype,
        fileType: fileTypeFromMime(req.file.mimetype),
        sizeBytes: req.file.size,
        altText: req.body.altText || null,
        uploadedBy: req.user!.id,
      },
      { userId: req.user!.id } as any
    );
    res.status(201).json({ data: media });
  } catch (err) {
    next(err);
  }
});

router.put('/:id', authorize('media', 'update'), async (req, res, next) => {
  try {
    const media = await MediaFile.findByPk(String(req.params.id));
    if (!media) throw new HttpError(404, 'Media not found');
    const { altText } = req.body;
    await media.update({ altText }, { userId: req.user!.id } as any);
    res.json({ data: media });
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', authorize('media', 'delete'), async (req, res, next) => {
  try {
    const media = await MediaFile.findByPk(String(req.params.id));
    if (!media) throw new HttpError(404, 'Media not found');
    // Resolve from the stored relative url rather than filePath, which is the
    // absolute path at upload time and goes stale if UPLOAD_DIR is moved.
    const filePath = uploadPathFromUrl(media.getDataValue('url'));
    await media.destroy();
    if (filePath) {
      fs.unlink(filePath, () => {
        /* best-effort cleanup; missing file is not an error */
      });
    }
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

export default router;
