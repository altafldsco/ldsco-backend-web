import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, Role, Permission } from '../db/models';
import { HttpError } from './errorHandler';

interface JwtPayload {
  userId: number;
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const header = req.headers.authorization;
    if (!header || !header.startsWith('Bearer ')) {
      throw new HttpError(401, 'Missing or invalid Authorization header');
    }
    const token = header.slice('Bearer '.length);
    const payload = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    const user = await User.findByPk(payload.userId, {
      include: [{ model: Role, as: 'role', include: [{ model: Permission, as: 'permissions' }] }],
    });

    if (!user || !user.isActive) {
      throw new HttpError(401, 'Account is inactive or no longer exists');
    }

    const role = user.role;
    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      roleId: role.id,
      roleSlug: role.slug,
      isSuperAdmin: role.isSuperAdmin,
      permissions: (role.permissions || []).map((p: any) => `${p.resource}:${p.action}`),
    };
    next();
  } catch (err) {
    if (err instanceof HttpError) return next(err);
    next(new HttpError(401, 'Invalid or expired token'));
  }
}
