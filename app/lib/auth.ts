import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password: string): Promise<string> => {
    const saltRounds = 12;
    return await bcrypt.hash(password, saltRounds);
};


export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
    return await bcrypt.compare(password, hashedPassword);
};


export const generateToken = (userId: string): string => {
    if (!process.env.JWT_SECRET) {
        throw new Error('JWT_SECRET environment variable is not defined');
    }
    
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );
};


export const verifyToken = (token: string): { userId: string } | null => {
    try {
        if (!process.env.JWT_SECRET) {
            throw new Error('JWT_SECRET environment variable is not defined');
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET) as { userId: string };
        return decoded;
    } catch (error) {
        console.error('Token verification error:', error);
        return null;
    }
};


export const extractTokenFromHeader = (authHeader: string | null): string | null => {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return null;
    }
    return authHeader.substring(7);
};