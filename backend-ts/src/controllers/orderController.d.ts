import express from 'express';
type AuthRequest = express.Request & {
    user?: {
        id: string;
        role: string;
    };
};
export declare const createOrder: (req: AuthRequest, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const getMyOrders: (req: AuthRequest, res: express.Response) => Promise<void>;
export declare const getCart: (req: AuthRequest, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export declare const saveCart: (req: AuthRequest, res: express.Response) => Promise<express.Response<any, Record<string, any>> | undefined>;
export {};
//# sourceMappingURL=orderController.d.ts.map