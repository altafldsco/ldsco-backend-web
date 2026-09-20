import { NextFunction, Request, Response } from 'express';
import { ValidationError as SequelizeValidationError, UniqueConstraintError } from 'sequelize';

export class HttpError extends Error {
  status: number;
  details?: unknown;

  constructor(status: number, message: string, details?: unknown) {
    super(message);
    this.status = status;
    this.details = details;
  }
}

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({ error: 'Not found' });
}

export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  if (err instanceof HttpError) {
    return res.status(err.status).json({ error: err.message, details: err.details });
  }
  if (err instanceof UniqueConstraintError) {
    return res.status(409).json({ error: 'Already exists', details: err.errors?.map((e) => e.message) });
  }
  if (err instanceof SequelizeValidationError) {
    return res.status(400).json({ error: 'Validation failed', details: err.errors?.map((e) => e.message) });
  }
  // eslint-disable-next-line no-console
  console.error(err);
  return res.status(500).json({ error: 'Internal server error' });
}
