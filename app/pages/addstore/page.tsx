"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
// Don't import leaflet at module scope (avoids server-side window errors). We'll dynamically import it in useEffect.

export default function AddStorePage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [openingTime, setOpeningTime] = useState("09:00");
  const [closingTime, setClosingTime] = useState("21:00");
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [lat, setLat] = useState<number | null>(null);
  const [lng, setLng] = useState<number | null>(null);
  const [foods, setFoods] = useState<Array<{ name: string; description?: string; price?: string }>>([]);
  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodDesc, setNewFoodDesc] = useState('');
  const [newFoodPrice, setNewFoodPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMapRef = useRef<any>(null);
  const markerRef = useRef<any>(null);

  const handleFile = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const useMyLocation = () => {
    if (!navigator.geolocation) {
      setMessage('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      (err) => setMessage('Could not get location: ' + err.message)
    );
  };

  // Initialize Leaflet map once
  useEffect(() => {
    if (!mapRef.current) return;
    if (leafletMapRef.current) return; // already created

    // Dynamically import Leaflet on the client only
    let cancelled = false;
    (async () => {
      const L = (await import('leaflet')).default;
      if (cancelled) return;

      // create map
  const map = L.map(mapRef.current!, { attributionControl: false }).setView([20.5937, 78.9629], 5);
      leafletMapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map);

      const onMapClick = (e: any) => {
        setLat(e.latlng.lat);
        setLng(e.latlng.lng);

        if (markerRef.current) {
          markerRef.current.setLatLng(e.latlng);
        } else {
          markerRef.current = L.circleMarker(e.latlng, { radius: 10, color: 'red' }).addTo(map);
        }
      };

      map.on('click', onMapClick);

      return () => {
        map.off('click', onMapClick);
        map.remove();
        leafletMapRef.current = null;
        markerRef.current = null;
      };
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  // When lat/lng change (programmatically), update or create marker and center map
  useEffect(() => {
    const map = leafletMapRef.current;
    if (!map) return;
    if (lat != null && lng != null) {
      const ll = [lat, lng] as any;
      if (markerRef.current) {
        markerRef.current.setLatLng(ll);
      } else {
        // create marker if it doesn't exist
        markerRef.current = (map as any).circleMarker(ll, { radius: 10, color: 'red' }).addTo(map);
      }
      map.panTo(ll);
    }
  }, [lat, lng]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    if (!lat || !lng) {
      setMessage('Please provide a location (use my location or enter coordinates)');
      return;
    }
    setLoading(true);
    try {
      const payload = {
        name,
        phone,
        openingTime,
        closingTime,
        imageBase64,
        location: { lat, lng },
        foods,
      };

      const res = await axios.post('/api/stores', payload);
      if (res.status === 201) {
        setMessage('Store created successfully');
        router.push('/pages/home');
      } else {
        setMessage('Unexpected response from server');
      }
    } catch (err: any) {
      setMessage(err.response?.data?.error || 'Failed to create store');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow">
        <h1 className="text-2xl font-bold mb-4">Add Food Store</h1>
        {message && (
          <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded">{message}</div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Store name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Phone number</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} required className="w-full px-3 py-2 border rounded" />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Opening time</label>
              <input type="time" value={openingTime} onChange={(e) => setOpeningTime(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Closing time</label>
              <input type="time" value={closingTime} onChange={(e) => setClosingTime(e.target.value)} required className="w-full px-3 py-2 border rounded" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Image</label>
            <input type="file" accept="image/*" onChange={(e) => handleFile(e.target.files?.[0])} className="w-full" />
            {imageBase64 && (
              <img src={imageBase64} alt="preview" className="mt-2 w-48 h-32 object-cover rounded" />
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Foods (add items offered)</label>
            <div className="grid grid-cols-3 gap-2 mb-2">
              <input value={newFoodName} onChange={(e) => setNewFoodName(e.target.value)} placeholder="Food name" className="col-span-1 px-3 py-2 border rounded" />
              <input value={newFoodDesc} onChange={(e) => setNewFoodDesc(e.target.value)} placeholder="Description (optional)" className="col-span-1 px-3 py-2 border rounded" />
              <input value={newFoodPrice} onChange={(e) => setNewFoodPrice(e.target.value)} placeholder="Price (e.g. ₹120)" className="col-span-1 px-3 py-2 border rounded" />
            </div>
            <div className="flex gap-2 mb-4">
              <button type="button" onClick={() => {
                const name = newFoodName.trim();
                if (!name) return;
                const item = { name, description: newFoodDesc.trim() || undefined, price: newFoodPrice.trim() || undefined };
                setFoods(prev => [...prev, item]);
                setNewFoodName(''); setNewFoodDesc(''); setNewFoodPrice('');
              }} className="px-4 py-2 bg-orange-500 text-white rounded">Add Food</button>
              <div className="text-sm text-gray-500 self-center">Add food items with optional description and price</div>
            </div>

            <div className="space-y-2">
              {foods.map((f, idx) => (
                <div key={idx} className="flex items-start justify-between bg-gray-50 p-2 rounded">
                  <div>
                    <div className="font-medium text-gray-800">{f.name} {f.price ? (<span className="text-sm text-gray-600">· {f.price}</span>) : null}</div>
                    {f.description ? <div className="text-sm text-gray-600">{f.description}</div> : null}
                  </div>
                  <button type="button" onClick={() => setFoods(prev => prev.filter((_, i) => i !== idx))} className="text-red-500">Remove</button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Location (click on the map to pick)</label>
            <div className="w-full h-64 mb-2" ref={mapRef} />

            <div className="flex gap-2 mb-2">
              <input type="number" step="any" value={lat ?? ''} onChange={(e) => setLat(e.target.value ? parseFloat(e.target.value) : null)} placeholder="lat" className="w-1/2 px-3 py-2 border rounded" />
              <input type="number" step="any" value={lng ?? ''} onChange={(e) => setLng(e.target.value ? parseFloat(e.target.value) : null)} placeholder="lng" className="w-1/2 px-3 py-2 border rounded" />
            </div>
            <div className="mt-2">
              <button type="button" onClick={useMyLocation} className="px-3 py-2 bg-blue-600 text-white rounded">Use my location</button>
            </div>
          </div>

          <div className="flex justify-end">
            <button type="submit" disabled={loading} className="px-6 py-2 bg-green-600 text-white rounded">
              {loading ? 'Saving...' : 'Add Store'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
