import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { Store } from '@/app/models/Store';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const { id } = await params as any;
        const store = await Store.findById(id);
        if (!store) {
            return NextResponse.json({ error: 'Store not found' }, { status: 404 });
        }
        return NextResponse.json({ store }, { status: 200 });
    } catch (error) {
        console.error('Fetch store error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
