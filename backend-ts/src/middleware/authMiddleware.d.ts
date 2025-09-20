import { Request, Response, NextFunction } from 'express';
type AuthRequest = Request & {
    user?: {
        id: string;
        role: string;
    };
};
export declare const protect: (req: AuthRequest, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const admin: (req: AuthRequest, res: Response, next: NextFunction) => void;
export {};
//# sourceMappingURL=authMiddleware.d.ts.map