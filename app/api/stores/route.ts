import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { Store } from '@/app/models/Store';
import { storeSchema } from '@/app/lib/validations';
import { ZodError } from 'zod';
import fs from 'fs';
import path from 'path';

function ensureUploadsDir() {
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
    }
    return uploadsDir;
}

export async function POST(request: NextRequest) {
    try {
        await connectDB();

        const body = await request.json();
        const validated = storeSchema.parse(body);

        let imagePath: string | undefined = undefined;
        if (validated.imageBase64) {
            // imageBase64 should be like data:image/png;base64,AAA...
            const matches = validated.imageBase64.match(/^data:(image\/[^;]+);base64,(.+)$/);
            if (matches) {
                const mime = matches[1];
                const ext = mime.split('/')[1] || 'png';
                const data = matches[2];
                const buffer = Buffer.from(data, 'base64');
                const uploadsDir = ensureUploadsDir();
                const fileName = `${Date.now()}-${Math.random().toString(36).slice(2,8)}.${ext}`;
                const filePath = path.join(uploadsDir, fileName);
                fs.writeFileSync(filePath, buffer);
                imagePath = `/uploads/${fileName}`;
            }
        }

        const store = new Store({
            name: validated.name,
            phone: validated.phone,
            openingTime: validated.openingTime,
            closingTime: validated.closingTime,
            imagePath,
            location: validated.location,
            foods: (validated.foods || []).map((f: any) => ({
                name: f.name,
                description: f.description || undefined,
                price: f.price || undefined,
            })),
        });

        await store.save();

        return NextResponse.json({ message: 'Store created', store }, { status: 201 });
    } catch (error) {
        console.error('Create store error:', error);

        if (error instanceof ZodError) {
            return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
        }

        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    try {
        await connectDB();
        const stores = await Store.find().sort({ createdAt: -1 });
        return NextResponse.json({ stores }, { status: 200 });
    } catch (error) {
        console.error('Fetch stores error:', error);
        return NextResponse.json({ error: 'Failed to fetch stores' }, { status: 500 });
    }
}
