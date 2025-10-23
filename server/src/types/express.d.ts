import { Request } from 'express';
// it extends the global Express types and works across your entire project.
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
      };
      access?,
      ownerAccess
    }
  }
}