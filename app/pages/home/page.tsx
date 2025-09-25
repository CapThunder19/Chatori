'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../contexts/AuthContext';

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout, loading } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth/login');
    }
  }, [user, loading, router]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Chatori...</p>
        </div>
      </div>
    );
  }


  if (!user) {
    return null;
  }

  const menuCategories = ['All', 'Street Food', 'North Indian', 'South Indian', 'Biryani'];

  const menuItems = [
    {
      id: 1,
      name: 'Mumbai Pav Bhaji',
      description: 'Spicy mixed vegetable curry served with buttered and toasted bread rolls, topped with onions and coriander',
      price: '₹120',
      image: '/pav-bhaji.jpg', 
      category: 'Street Food'
    },
    {
      id: 2,
      name: 'Masala Dosa',
      description: 'Crispy rice crepe filled with spiced potato filling, served with coconut chutney and sambar',
      price: '₹80',
      image: '/coconut-splash.jpg',
      category: 'South Indian'
    },
    {
      id: 3,
      name: 'Chole Bhature',
      description: 'Spicy chickpea curry served with fluffy deep-fried bread, pickled onions and green chutney',
      price: '₹150',
      image: '/coconut-splash.jpg', 
      category: 'North Indian'
    },
    {
      id: 4,
      name: 'Vada Pav',
      description: 'Mumbai\'s iconic street burger - spiced potato fritter in a bun with chutneys and fried green chilies',
      price: '₹25',
      image: '/coconut-splash.jpg', 
      category: 'Street Food'
    },
    {
      id: 5,
      name: 'Butter Chicken',
      description: 'Tender chicken in rich, creamy tomato-based curry with aromatic spices, served with naan or rice',
      price: '₹280',
      image: '/sushi-floating.jpg', 
      category: 'North Indian'
    },
    {
      id: 6,
      name: 'Hyderabadi Biryani',
      description: 'Fragrant basmati rice layered with tender mutton, saffron, and aromatic spices, slow-cooked to perfection',
      price: '₹350',
      image: '/sushi-floating.jpg', 
      category: 'Biryani'
    }
  ];

  const featuredItems = [
    {
      name: 'Samosa Chat',
      image: '/coconut-splash.jpg', 
      category: 'Street Food'
    },
    {
      name: 'Kulfi Faluda',
      image: '/sushi-floating.jpg', 
      category: 'Desserts'
    }
  ];

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
                <span className="text-xl font-bold text-orange-600">CHATORI</span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Home</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Street Food</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Regional</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">About</a>
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors">Contact</a>
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
                  Join Chatori
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
                          src="/bhelpuri.jpg" 
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

      {/* Featured Items */}
      <section className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-end space-x-6">
            {featuredItems.map((item, index) => (
              <div key={index} className="flex items-center space-x-3 bg-gray-50 rounded-full px-6 py-3">
                <div className="w-12 h-12 bg-red-500 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">{item.name}</p>
                  <p className="text-sm text-gray-600">{item.category}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chatori Platform Info Section */}
      <section className="bg-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">About Chatori Platform</h2>
              <p className="text-orange-200 mb-6 leading-relaxed">
                Chatori connects food lovers with authentic Indian street food and local delicacies. 
                Discover hidden gems, traditional recipes, and the best food stalls in your city. 
                From Mumbai's vada pav to Delhi's chole bhature - taste India's rich culinary heritage!
              </p>
              <p className="text-sm text-orange-300 mb-8">
                Join thousands of food explorers: Chatori.com
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

      {/* Browse Our Menu Section */}
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">Popular Indian Dishes</h2>
            
            {/* Category Tabs */}
            <div className="flex justify-center space-x-2 mt-8">
              {menuCategories.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full transition-colors ${
                    activeCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuItems
              .filter(item => activeCategory === 'All' || item.category === activeCategory)
              .map((item) => (
                <div key={item.id} className="flex space-x-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex-shrink-0"></div>
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2">{item.name}</h3>
                    <p className="text-gray-600 text-sm mb-3 leading-relaxed">{item.description}</p>
                    <p className="font-bold text-lg text-gray-900">{item.price}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>

      {/* Check Out What's On Our Menu */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Explore Authentic<br />Indian Food Categories
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From spicy street food to royal biryanis, discover the diverse flavors of India. 
              Each region brings its unique taste and cooking traditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Street Food */}
            <div className="bg-yellow-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-32 h-32 bg-red-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-3xl">🌶️</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Street Food</h3>
              <p className="text-gray-600">Pav Bhaji, Vada Pav, Chat Items</p>
            </div>

            {/* Biryani & Rice */}
            <div className="bg-orange-100 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow">
              <div className="w-32 h-32 bg-orange-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                <span className="text-white font-bold text-3xl">�</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Biryani & Rice</h3>
              <p className="text-gray-600">Hyderabadi, Lucknowi, Kolkata Style</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}