

'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
    
      <nav className="fixed top-0 left-0 right-0 bg-orange-500 shadow-sm z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center">
                <div className="w-8 h-8 bg-white rounded-full mr-2"></div>
                <span className="text-xl font-bold text-white">CHATORI</span>
              </div>
            </div>

            


            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white hover:text-orange-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

    
      <div 
        className="fixed inset-0 bg-cover bg-center bg-no-repeat bg-attachment-fixed"
        style={{
          backgroundImage: "url('/pav-bhaji.jpg')",
        }}
      >
        
        <div className="absolute inset-0 bg-black/50"></div>
       
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/30"></div>
      </div>

     
      <div className="relative z-10 pt-16">
      
        <section className="min-h-screen flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="max-w-4xl">
              
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-white text-sm font-medium mb-8 animate-fade-in-up">
                DINE BEYOND THE ORDINARY
              </div>

              {/* Main Heading with Animation */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-fade-in-up delay-200">
                Flavors that{' '}
                <span className="block text-yellow-400 animate-pulse">speak louder</span>
                <span className="block">than words!</span>
              </h1>

             
              <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-3xl animate-fade-in-up delay-400">
                Discover authentic Indian street food and local delicacies. 
                From spicy pav bhaji to crispy dosas - taste the real flavors of India! 🌶️
              </p>

         
              <div className="flex flex-col sm:flex-row gap-6 animate-fade-in-up delay-600">
                <Link
                  href="/auth/login"
                  className="inline-flex items-center justify-center px-10 py-4 bg-orange-500 text-white font-bold text-lg rounded-full hover:bg-orange-600 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-2xl"
                >
                  Explore
                </Link>
              
              </div>

        
              <div className="absolute top-20 right-10 w-12 h-12 bg-yellow-400/80 rounded-full animate-bounce delay-300 hidden lg:block"></div>
              <div className="absolute bottom-40 right-20 w-8 h-8 bg-red-400/80 rounded-full animate-bounce delay-700 hidden lg:block"></div>
              <div className="absolute top-1/2 right-5 w-6 h-6 bg-green-400/80 rounded-full animate-bounce delay-1000 hidden lg:block"></div>
            </div>
          </div>

        
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white animate-bounce">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </section>

        <section className="min-h-screen bg-white/95 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-orange-600">06</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Achieved National and International Awards
                </h3>
                <p className="text-gray-600">Recognition for excellence in culinary arts</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-orange-600">10</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  We have 10 international food partners
                </h3>
                <p className="text-gray-600">Global network of culinary excellence</p>
              </div>

          
              <div className="text-center">
                <div className="w-24 h-24 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl font-bold text-orange-600">20</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  We have 20 branches across the city
                </h3>
                <p className="text-gray-600">Serving delicious food everywhere</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
