import { NextFunction, Request, Response } from 'express';
import { HttpError } from './errorHandler';

export type Action = 'create' | 'read' | 'update' | 'delete';

export function authorize(resource: string, action: Action) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return next(new HttpError(401, 'Authentication required'));
    }
    if (user.isSuperAdmin) {
      return next();
    }
    const key = `${resource}:${action}`;
    if (!user.permissions.includes(key)) {
      return next(new HttpError(403, `Missing permission: ${key}`));
    }
    next();
  };
}
