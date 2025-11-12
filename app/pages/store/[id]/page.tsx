'use client';

import { useEffect, useState, useRef } from 'react';
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

  // initialize leaflet map for store location (client-side dynamic import)
  useEffect(() => {
    if (!store || !store.location) return;
    let map: any;
    let L: any;
    let mounted = true;

    const initMap = async () => {
      try {
        const mod = await import('leaflet');
        L = mod.default || mod;
        const container = document.getElementById('store-map');
        if (!container) return;
        // clear any previous map content to avoid duplicate map instances
        container.innerHTML = '';

        const lat = Number(store.location.lat);
        const lng = Number(store.location.lng);
        map = L.map(container).setView([lat, lng], 15);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);

        const marker = L.marker([lat, lng]).addTo(map);
        marker.bindPopup(`<strong>${store.name}</strong>`).openPopup();
      } catch (err) {
        console.error('Failed to load Leaflet map', err);
      }
    };

    initMap();

    return () => {
      mounted = false;
      try {
        if (map) map.remove();
      } catch (e) {
        /* ignore */
      }
    };
  }, [store]);

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

  if (loading) return (
    <div className="min-h-screen bg-orange-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-gray-600">Loading store...</p>
      </div>
    </div>
  );

  if (!store) return (
    <div className="min-h-screen bg-orange-50 p-6 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-2xl shadow-md p-6 text-center">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">Store not found</h2>
        <p className="text-gray-600 mb-4">We couldn't find the store you're looking for. It may have been removed.</p>
        <div className="flex justify-center">
          <button onClick={() => router.push('/pages/home')} className="px-4 py-2 bg-orange-600 text-white rounded-full">Go back</button>
        </div>
      </div>
    </div>
  );

return (
  <div className="min-h-screen bg-orange-50 p-6 flex justify-center">
    <div className="max-w-3xl w-full">

      {/* Back */}
      <button onClick={() => router.back()} className="text-gray-600 text-sm mb-3 flex items-center gap-1">
        ← Back
      </button>

      {/* Store Card */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        {store.imagePath && (
          <img
            src={store.imagePath}
            alt={store.name}
            className="w-full h-56 object-cover rounded-xl mb-4"
          />
        )}

        <h1 className="text-2xl font-bold text-gray-800 mb-1">{store.name}</h1>
        <p className="text-gray-600 mb-1">{store.phone}</p>
        <p className="text-gray-500 text-sm">Open: {store.openingTime} - {store.closingTime}</p>
      </div>

      {/* Map showing store location */}
      <div className="bg-white rounded-2xl shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold mb-3">Location</h3>
        {store.location && store.location.lat && store.location.lng ? (
          <div id="store-map" className="w-full h-64 rounded-md overflow-hidden" />
        ) : (
          <p className="text-gray-500">Location not provided.</p>
        )}
      </div>

      {/* Foods Section */}
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Menu</h2>
      <div className="space-y-4 mb-8">
        {store.foods && store.foods.length > 0 ? store.foods.map((food: any, index: number) => (
          <div key={index} className="bg-white p-4 shadow-sm rounded-xl flex items-center gap-4">
            {/* Food Image (optional) */}
            {food.imagePath && (
              <img
                src={food.imagePath}
                alt={food.name}
                className="w-20 h-20 object-cover rounded-lg"
              />
            )}

            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-800">{food.name}</h3>
              {food.description && (
                <p className="text-gray-500 text-sm leading-snug mt-1">{food.description}</p>
              )}
            </div>

            {food.price && (
              <div className="text-right font-bold text-green-600 whitespace-nowrap">
                ₹ {food.price}
              </div>
            )}
          </div>
        )) : (
          <p className="text-gray-500">No food listed.</p>
        )}
      </div>

      {/* Reviews */}
      <h2 className="text-xl font-semibold mb-3 text-gray-800">Reviews</h2>
      <div className="space-y-4 mb-8">
        {store.reviews && store.reviews.length > 0 ? store.reviews.map((review: any, i: number) => (
          <div key={i} className="bg-white p-4 rounded-xl shadow-sm">
            <div className="flex justify-between">
              <p className="font-medium text-gray-800">{review.name || 'Anonymous'}</p>
              <span className="text-yellow-500">{'★'.repeat(review.rating)}</span>
            </div>
            {review.comment && <p className="text-gray-600 text-sm mt-1">{review.comment}</p>}
          </div>
        )) : (
          <p className="text-gray-500 text-sm">No reviews yet. Be the first!</p>
        )}
      </div>

      {/* Add Review */}
      <div className="bg-white p-5 rounded-2xl shadow-sm">
        <h3 className="font-semibold text-gray-800 mb-3">Add a review</h3>

        <div className="flex gap-2 mb-3">
          {[1,2,3,4,5].map((n)=>(
            <button
              key={n}
              onClick={() => setRating(n)}
              className={`px-3 py-1 rounded-lg border ${rating >= n ? 'bg-yellow-400 border-yellow-500' : 'bg-gray-200 border-gray-300'}`}
            >
              {n}★
            </button>
          ))}
        </div>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          placeholder="Write your review..."
          className="w-full p-3 border rounded-xl mb-3 text-sm"
        />

        <button
          onClick={submitReview}
          className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white rounded-xl font-semibold"
        >
          Submit Review
        </button>
      </div>

    </div>
  </div>
);

}
