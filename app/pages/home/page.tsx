"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';
import axios from 'axios';

export default function HomePage() {
  const [stores, setStores] = useState<any[]>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);

  // Fetch stores when a user is present. Keep this hook unconditional to preserve hook order.
  useEffect(() => {
    if (loading || !user) return;
    const fetchStores = async () => {
      try {
        const res = await axios.get('/api/stores');
        setStores(res.data.stores || []);
      } catch (err) {
        console.error('Failed to fetch stores', err);
      }
    };

    fetchStores();
  }, [user, loading]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
          <div className="w-12 h-12 bg-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Foodstore Finder...</p>
        </div>
      </div>
    );
  }


  if (!user) {
    return null;
  }


  

  return (
    <div className="min-h-screen bg-gray-50">


      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">


            {/* Logo */}
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-orange-600 rounded-full mr-2 flex items-center justify-center">
                  <span className="text-white font-bold text-sm">🍛</span>
                </div>
                <span className="text-xl font-bold text-orange-600">Foodstore Finder</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Street Food</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Regional</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</a>
              <a href="/pages/addstore" className="text-gray-700 hover:text-orange-600 transition-colors font-semibold">Add Store</a>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <span className="text-gray-700 font-medium">
                    Welcome, {user.firstName}!
                  </span>
                  <button
                    onClick={() => {
                      logout();
                      router.push('/');
                    }}
                    className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="bg-orange-600 text-white px-6 py-2 rounded-full hover:bg-orange-700 transition-colors"
                >
                  Join Foodstore Finder
                </Link>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">


            {/* Left Content */}
            <div className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-orange-100 text-orange-600 text-sm font-medium mb-6">
                🌶️ AUTHENTIC INDIAN STREET FOOD
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Discover India's{' '}
                <span className="block text-orange-600">Street Food Magic</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-lg">
                From spicy pav bhaji to crispy dosas, explore authentic Indian flavors. 
                Find the best local food stalls and restaurants serving traditional delicacies near you!
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/auth/login"
                  className="bg-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:bg-orange-600 transition-colors inline-flex items-center justify-center"
                >
                  Explore Food Stalls
                </Link>
                <button className="border border-orange-300 text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors">
                  Find Near Me
                </button>
              </div>
            </div>

            {/* Right Content - Food Images Collage */}
            <div className="relative h-[600px] lg:h-screen">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-200 rounded-bl-[100px]">
                <div className="absolute inset-0 p-6 overflow-hidden">
                  <div className="grid grid-cols-4 auto-rows-fr gap-3 h-full max-h-[500px]">
                    {/* Bhel Puri - Large */}
                    <div className="col-span-2 row-span-2 bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group hover:-rotate-2 transform">
                      <div className="relative w-full h-full">
                        <Image 
                          src="/Bhelpuri.jpg" 
                          alt="Bhel Puri" 
                          fill
                          className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-300" 
                          priority 
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                          <p className="text-white font-medium">Bhel Puri</p>
                        </div>
                      </div>
                    </div>

                    {/* Gulab Jamun - Tall */}
                    <div className="col-span-1 row-span-3 bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group hover:rotate-1 transform">
                      <div className="relative w-full h-full">
                        <Image 
                          src="/GulabJamun.jpg" 
                          alt="Gulab Jamun" 
                          fill
                          className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-300" 
                          priority 
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                          <p className="text-white font-medium">Gulab Jamun</p>
                        </div>
                      </div>
                    </div>

                    {/* Masala Chai - Small */}
                    <div className="col-span-1 row-span-1 bg-white rounded-xl p-2 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group hover:-rotate-3 transform">
                      <div className="relative w-full h-full">
                        <Image 
                          src="/tea.jpg" 
                          alt="Masala Chai" 
                          fill
                          className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-300" 
                          priority 
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
                          <p className="text-white font-medium text-sm">Masala Chai</p>
                        </div>
                      </div>
                    </div>
                    {/* Corn - Small */}
                    <div className="col-span-1 row-span-2 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group transform hover:rotate-2">
                      <div className="relative w-full h-full">
                        <Image 
                          src="/corn.jpg" 
                          alt="Corn on the Cob" 
                          fill
                          className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-300" 
                          priority 
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/50 to-transparent">
                          <p className="text-white font-medium text-sm">Corn</p>
                        </div>
                      </div>
                    </div>
                    {/* Momos - Medium */}
                    <div className="col-span-2 row-span-2 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group transform hover:-rotate-1">
                      <div className="relative w-full h-full">
                        <Image 
                          src="/momos.jpg" 
                          alt="Momos" 
                          fill
                          className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-300" 
                          priority 
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                          <p className="text-white font-medium">Momos</p>
                        </div>
                      </div>
                    </div>
                    {/* Samosa - Medium */}
                    <div className="col-span-2 row-span-2 bg-white rounded-xl p-3 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group transform hover:rotate-1">
                      <div className="relative w-full h-full">
                        <Image 
                          src="/samosa.jpg" 
                          alt="Samosa" 
                          fill
                          className="rounded-lg object-cover group-hover:scale-105 transition-transform duration-300" 
                          priority 
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/50 to-transparent">
                          <p className="text-white font-medium">Samosa</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* "OMG" Text */}
                  <div className="absolute bottom-8 left-8">
                    <span className="text-4xl font-bold text-yellow-500 transform -rotate-12">OMG</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stores List */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Food Stores</h2>
          {stores.length === 0 ? (
            <p className="text-gray-600">No stores added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stores.map((s: any) => {
                const reviewCount = (s.reviews || []).length;
                const avgRating = reviewCount ? ((s.reviews || []).reduce((a: number, r: any) => a + (r.rating || 0), 0) / reviewCount) : 0;
                const foodsCount = (s.foods || []).length;
                return (
                  <Link key={s._id} href={`/pages/store/${s._id}`} className="block bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
                    <div className="w-full h-44 bg-gray-100 rounded overflow-hidden mb-3">
                      {s.imagePath ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.imagePath} alt={s.name} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">No image</div>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{s.name}</h3>
                        <p className="text-sm text-gray-600">{s.phone} · {s.openingTime} - {s.closingTime}</p>
                        <p className="text-sm text-gray-500 mt-2">Lat: {s.location?.lat?.toFixed(4)}, Lng: {s.location?.lng?.toFixed(4)}</p>
                      </div>

                      <div className="flex flex-col items-end">
                        <div className="text-sm text-yellow-500 font-semibold">{avgRating ? Array.from({length: Math.round(avgRating)}).map((_,i)=> '★').join('') : '—'}</div>
                        <div className="text-xs text-gray-500">{reviewCount} review{reviewCount!==1 ? 's' : ''}</div>
                        <div className="mt-2 text-xs text-gray-600">{foodsCount} food{foodsCount!==1 ? 's' : ''}</div>
                      </div>
                    </div>

                    {foodsCount > 0 && (
                      <div className="mt-3">
                        <h4 className="text-sm font-semibold text-gray-800 mb-2">Top foods</h4>
                        <div className="space-y-2">
                          {(s.foods || []).slice(0,3).map((food: any, i: number) => (
                            <div key={i} className="p-2 bg-gray-50 rounded border">
                              <div className="flex justify-between items-center">
                                <div className="font-medium text-gray-900">{food.name}</div>
                                {food.price ? <div className="text-sm text-gray-600">{food.price}</div> : null}
                              </div>
                              {food.description ? <div className="text-sm text-gray-600 mt-1 line-clamp-2">{food.description}</div> : null}
                            </div>
                          ))}
                          {foodsCount > 3 && (
                            <div className="text-xs text-blue-600 mt-2">View all foods →</div>
                          )}
                        </div>
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

  {/* Foodstore Finder Platform Info Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">About Foodstore Finder</h2>
              <p className="text-orange-200 mb-6 leading-relaxed">
                Foodstore Finder connects food lovers with authentic street food and local delicacies. 
                Discover hidden gems, traditional recipes, and the best food stalls in your city. 
                From regional snacks to beloved classics — taste rich culinary heritage near you!
              </p>
              <p className="text-sm text-orange-300 mb-8">
                Join thousands of food explorers: Foodstore Finder
              </p>
              <div className="space-y-2 text-sm">
                <p>🍛 Food Stalls Listed: 5000+</p>
                <p className="text-orange-200">📍 Cities Covered: 50+</p>
                <p className="text-orange-200">⭐ Happy Foodies: 100k+</p>
              </div>
              <Link
                href="/auth/signup"
                className="mt-6 inline-block bg-white text-orange-600 px-8 py-3 rounded-full font-semibold hover:bg-orange-50 transition-colors"
              >
                Start Exploring
              </Link>
            </div>

            {/* Right Content - Restaurant Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-yellow-400 rounded-xl h-32"></div>
                <div className="bg-orange-400 rounded-xl h-48"></div>
              </div>
              <div className="space-y-4 mt-8">
                <div className="bg-green-400 rounded-xl h-40"></div>
                <div className="bg-red-400 rounded-xl h-32"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Removed mock menu and categories — showing stores instead above */}
    </div>
  );
}