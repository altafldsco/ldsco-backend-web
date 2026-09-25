import path from 'path';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import publicRoutes from './routes/public';
import adminRoutes from './routes/admin';
import { notFoundHandler, errorHandler } from './middleware/errorHandler';
import { UPLOAD_ROOT } from './middleware/upload';

export function createApp() {
  const app = express();

  // Behind exactly one proxy hop (nginx, or the frontend's /api/contact route,
  // which forwards nginx's X-Forwarded-For), so req.ip is the real client IP
  // for rate limiting and Turnstile.
  app.set('trust proxy', 1);

  app.use(helmet({ crossOriginResourcePolicy: false }));
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(',') ?? '*',
    })
  );
  app.use(morgan('dev'));
  app.use(express.json({ limit: '2mb' }));
  app.use(express.urlencoded({ extended: true }));

  // In prod nginx serves /uploads/ straight from the host's /var/www/uploads,
  // so this only handles local dev (or a request that bypasses nginx).
  app.use('/uploads', express.static(UPLOAD_ROOT, { maxAge: '7d', index: false, dotfiles: 'deny' }));

  app.get('/health', (_req, res) => res.json({ status: 'ok' }));

  app.use('/api/public', publicRoutes);
  app.use('/api/admin', adminRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
