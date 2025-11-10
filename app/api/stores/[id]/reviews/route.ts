import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/app/lib/db';
import { Store } from '@/app/models/Store';
import { reviewSchema } from '@/app/lib/validations';
import { ZodError } from 'zod';

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        // `params` can be an async object in newer Next.js versions — await it before using
        const { id } = await params as any;

        const body = await request.json();
    console.log('Add review - raw body:', body);
    const validated = reviewSchema.parse(body);
    console.log('Add review - validated:', validated);

        const store = await Store.findById(id);
        if (!store) {
            return NextResponse.json({ error: 'Store not found' }, { status: 404 });
        }

        const review = {
            name: validated.name || 'Anonymous',
            rating: validated.rating,
            comment: validated.comment || '',
            createdAt: new Date(),
        };

    store.reviews = store.reviews || [];
    console.log(`Store ${store._id} reviews before push:`, store.reviews.length);
    store.reviews.push(review as any);
    console.log(`Store ${store._id} reviews after push (in-memory):`, store.reviews.length);
    const saved = await store.save();
    console.log(`Store ${store._id} saved. reviews now:`, (saved.reviews || []).length);

    // fetch fresh copy to ensure populated data is returned
    const updatedStore = await Store.findById(id);
    console.log('Returning updated store with reviews:', (updatedStore?.reviews || []).length);
    return NextResponse.json({ message: 'Review added', review, store: updatedStore }, { status: 201 });
    } catch (error) {
        console.error('Add review error:', error);
        if (error instanceof ZodError) {
            return NextResponse.json({ error: 'Validation failed', details: error.issues }, { status: 400 });
        }
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await connectDB();
        const store = await Store.findById(params.id).select('reviews');
        if (!store) {
            return NextResponse.json({ error: 'Store not found' }, { status: 404 });
        }
        return NextResponse.json({ reviews: store.reviews || [] }, { status: 200 });
    } catch (error) {
        console.error('Fetch reviews error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
