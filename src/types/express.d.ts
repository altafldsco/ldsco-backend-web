export interface AuthUser {
  id: number;
  email: string;
  name: string;
  roleId: number;
  roleSlug: string;
  isSuperAdmin: boolean;
  permissions: string[]; // "resource:action"
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

export {};
