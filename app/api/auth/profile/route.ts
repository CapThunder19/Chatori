import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { User } from '@/app/models/User';
import { verifyToken, extractTokenFromHeader } from '@/app/lib/auth';

export async function GET(request: NextRequest) {
    try {
       
        await connectDB();

        const authHeader = request.headers.get('authorization');
        const token = extractTokenFromHeader(authHeader);

        if (!token) {
            return NextResponse.json(
                { error: 'Authorization token is required' },
                { status: 401 }
            );
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            return NextResponse.json(
                { error: 'Invalid or expired token' },
                { status: 401 }
            );
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
            return NextResponse.json(
                { error: 'User not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    createdAt: user.createdAt,
                    updatedAt: user.updatedAt,
                },
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Profile fetch error:', error);
        
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}