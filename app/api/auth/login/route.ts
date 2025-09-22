import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { User } from '@/app/models/User';
import { verifyPassword, generateToken } from '@/app/lib/auth';
import { loginSchema } from '@/app/lib/validations';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
    try {
       
        await connectDB();

      
        const body = await request.json();

        const validatedData = loginSchema.parse(body);

       
        const user = await User.findOne({ email: validatedData.email }).select('+password');
        if (!user) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

   
        const isPasswordValid = await verifyPassword(validatedData.password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: 'Invalid email or password' },
                { status: 401 }
            );
        }

       
        const token = generateToken(user._id.toString());

       
        return NextResponse.json(
            {
                message: 'Login successful',
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
                token,
            },
            { status: 200 }
        );

    } catch (error) {
        console.error('Login error:', error);

        
        if (error instanceof ZodError) {
            return NextResponse.json(
                { 
                    error: 'Validation failed', 
                    details: error.issues.map(issue => ({
                        field: issue.path.join('.'),
                        message: issue.message
                    }))
                },
                { status: 400 }
            );
        }

      
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}