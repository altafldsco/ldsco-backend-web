import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import multer from 'multer';
import { HttpError } from './errorHandler';

// Uploads live outside the app/project directory so they survive redeploys.
// Prod: the container's /app/uploads is bind-mounted from the host's
// /var/www/uploads, which nginx serves directly at /uploads/<filename>.
// Local dev: set UPLOAD_DIR in .env (e.g. ./uploads) to keep files nearby.
export const UPLOAD_ROOT = path.resolve(process.env.UPLOAD_DIR || '/app/uploads');
fs.mkdirSync(UPLOAD_ROOT, { recursive: true });

// Maps a stored "/uploads/<filename>" url back to its file on disk. Only the
// basename is used, so a crafted url can never point outside UPLOAD_ROOT, and
// records keep resolving correctly if UPLOAD_DIR changes between deploys.
export function uploadPathFromUrl(url: string | null | undefined): string | null {
  if (!url) return null;
  const pathname = url.startsWith('http://') || url.startsWith('https://') ? new URL(url).pathname : url;
  if (!pathname.startsWith('/uploads/')) return null;
  const fileName = path.basename(pathname);
  return fileName ? path.join(UPLOAD_ROOT, fileName) : null;
}

export function fileTypeFromMime(mimeType: string): 'image' | 'video' | 'pdf' | 'doc' | 'other' {
  if (mimeType.startsWith('image/')) return 'image';
  if (mimeType.startsWith('video/')) return 'video';
  if (mimeType === 'application/pdf') return 'pdf';
  if (mimeType.includes('word') || mimeType.includes('excel') || mimeType.includes('sheet')) return 'doc';
  return 'other';
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, UPLOAD_ROOT),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    const unique = crypto.randomBytes(16).toString('hex');
    cb(null, `${Date.now()}-${unique}${ext}`);
  },
});

const ALLOWED_MIME = new Set([
  'image/png',
  'image/jpeg',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
]);

export const upload = multer({
  storage,
  limits: { fileSize: 200 * 1024 * 1024 }, // 200MB ceiling (video); route-level checks can be stricter
  fileFilter: (_req, file, cb) => {
    if (!ALLOWED_MIME.has(file.mimetype)) {
      return cb(new HttpError(400, `Unsupported file type: ${file.mimetype}`));
    }
    cb(null, true);
  },
});
