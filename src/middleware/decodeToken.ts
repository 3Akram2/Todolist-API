import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthenticatedRequest extends Request {
    user?: any; 
}

export const decodeCustomToken = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    let token: string | undefined = req.headers.authorization?.split(' ')[1];
   
    if (!token) {
        return res.status(401).json({ message: "Unauthorized, No token provided" });
    }
    try {
        const decodedValue: any = jwt.verify(token, process.env.JWT_SECRET || '');
        if (decodedValue) {
            req.user = decodedValue;
            return next(); 
        }
        return res.status(401).json({ message: "Unauthorized, invalid token" });
    } catch (error) {
        console.error("Error decoding token:", error);
        return res.status(500).json({ message: "Internal error" });
    }
};
