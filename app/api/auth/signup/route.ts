import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { User } from '@/app/models/User';
import { hashPassword, generateToken } from '@/app/lib/auth';
import { signupSchema } from '@/app/lib/validations';
import { ZodError } from 'zod';

export async function POST(request: NextRequest) {
    try {
        
        await connectDB();
        const body = await request.json();

        const validatedData = signupSchema.parse(body);

        
        const existingUser = await User.findOne({ email: validatedData.email });
        if (existingUser) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        
        const hashedPassword = await hashPassword(validatedData.password);

       
        const user = new User({
            firstName: validatedData.firstName,
            lastName: validatedData.lastName,
            email: validatedData.email,
            password: hashedPassword,
        });

        await user.save();

        
        const token = generateToken(user._id.toString());

        
        return NextResponse.json(
            {
                message: 'User created successfully',
                user: {
                    id: user._id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                },
                token,
            },
            { status: 201 }
        );

    } catch (error) {
        console.error('Signup error:', error);

        
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

        
        if (error instanceof Error && error.message.includes('E11000')) {
            return NextResponse.json(
                { error: 'User with this email already exists' },
                { status: 400 }
            );
        }

        
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}