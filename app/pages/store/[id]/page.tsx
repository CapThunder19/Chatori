'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/app/contexts/AuthContext';

export default function StoreDetailPage() {
  const params = useParams() as { id: string };
  const { id } = params;
  const [store, setStore] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const res = await axios.get(`/api/stores`);
        // find store in list -- better to fetch single store but existing GET /api/stores returns all
        // Try fetching single store via /api/stores/[id]
        try {
          const r2 = await axios.get(`/api/stores/${id}`);
          setStore(r2.data.store);
        } catch (err) {
          // fallback: find in list
          const s = res.data.stores.find((s: any) => s._id === id);
          setStore(s || null);
        }
      } catch (err) {
        console.error('Failed to fetch store', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStore();
  }, [id]);

  const submitReview = async () => {
    try {
      const payload = { name: user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : undefined, rating, comment };
      console.log('Submitting review payload:', payload);
      const res = await axios.post(`/api/stores/${id}/reviews`, payload);
      console.log('Add review response:', res.status, res.data);
      if (res.status === 201) {
        // server returned the updated store -> use it
        if (res.data?.store) {
          setStore(res.data.store);
        } else if (res.data?.review) {
          // optimistic append the returned review
          setStore((prev: any) => ({
            ...prev,
            reviews: [...(prev?.reviews || []), res.data.review],
          }));
        } else {
          // fallback: fetch reviews from the dedicated endpoint
          try {
            const r3 = await axios.get(`/api/stores/${id}/reviews`);
            setStore((prev: any) => ({ ...(prev || {}), reviews: r3.data.reviews || [] }));
          } catch (fetchErr) {
            console.error('Failed to fetch reviews after submit', fetchErr);
          }
        }
        setComment('');
        setRating(5);
      } else {
        console.warn('Unexpected response when adding review', res.status, res.data);
      }
    } catch (err) {
      // surface validation errors if any
      if (axios.isAxiosError(err) && err.response) {
        console.error('Failed to submit review', err.response.status, err.response.data);
        alert(err.response.data?.error || 'Failed to submit review');
      } else {
        console.error('Failed to submit review', err);
      }
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (!store) return <div className="p-8">Store not found.</div>;

  return (
    <div className="min-h-screen p-6">
      <button onClick={() => router.back()} className="mb-4 text-blue-600">← Back</button>
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-2">{store.name}</h1>
        <p className="text-sm text-gray-600 mb-2">{store.phone} · {store.openingTime} - {store.closingTime}</p>
        {store.imagePath ? (<img src={store.imagePath} className="w-full h-64 object-cover rounded mb-4" alt={store.name} />) : null}

        <h3 className="text-lg font-semibold mb-2">Foods</h3>
        <div className="space-y-3 mb-4">
          {store.foods && store.foods.length ? store.foods.map((f: any, i: number) => (
            <div key={i} className="p-3 border rounded">
              <div className="flex justify-between">
                <div className="font-medium">{f.name}</div>
                {f.price ? <div className="text-sm text-gray-600">{f.price}</div> : null}
              </div>
              {f.description ? <div className="text-sm text-gray-600 mt-1">{f.description}</div> : null}
            </div>
          )) : <p className="text-gray-600">No food listed.</p>}
        </div>

        <h3 className="text-lg font-semibold mb-2">Reviews</h3>
        <div className="space-y-3 mb-4">
          {store.reviews && store.reviews.length ? store.reviews.map((r: any, i: number) => (
            <div key={i} className="p-3 border rounded">
              <div className="flex justify-between items-center">
                <div className="font-medium">{r.name || 'Anonymous'}</div>
                <div className="text-sm text-yellow-600">{Array.from({length: r.rating}).map((_,i)=> '★').join('')}</div>
              </div>
              {r.comment ? <div className="text-sm text-gray-600 mt-1">{r.comment}</div> : null}
            </div>
          )) : <p className="text-gray-600">No reviews yet. Be the first!</p>}
        </div>

        <div className="border-t pt-4">
          <h4 className="font-semibold mb-2">Add a review</h4>
          <div className="mb-2">Rating:</div>
          <div className="flex gap-2 mb-3">
            { [1,2,3,4,5].map(n => (
              <button key={n} type="button" onClick={() => setRating(n)} className={`px-3 py-1 rounded ${rating>=n? 'bg-yellow-400':'bg-gray-200'}`}>{n}★</button>
            ))}
          </div>
          <textarea value={comment} onChange={(e)=>setComment(e.target.value)} rows={3} className="w-full p-2 border rounded mb-3" placeholder="Write your review (optional)" />
          <div className="flex justify-end">
            <button onClick={submitReview} className="px-4 py-2 bg-blue-600 text-white rounded">Submit Review</button>
          </div>
        </div>
      </div>
    </div>
  );
}
