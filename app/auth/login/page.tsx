'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useAuth } from '@/app/contexts/AuthContext';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const result = await login(email, password);
      
      if (result.success) {
        router.push('/pages/home'); 
      } else {
        setError(result.error || 'Login failed');
      }
    } catch (error) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
 
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-orange-50 to-red-50">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-200/30 via-transparent to-red-200/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-red-200/20 via-transparent to-orange-200/20"></div>
      </div>

     
      <div className="relative z-10 flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-white/20">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back</h1>
            <p className="text-gray-600 mb-8">Sign in to your account</p>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
            
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  required
                />
              </div>


     
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-xl font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Signing In...
                  </div>
                ) : (
                  'Sign In'
                )}
              </button>

        
              <p className="text-center text-sm text-gray-600">
                Don't have an account?{' '}
                <a href="/auth/signup" className="text-orange-600 hover:text-orange-800 font-medium">
                  Sign Up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>

   
      <div className="relative z-10 flex-1 flex items-center justify-center p-8 overflow-hidden">
        <div className="relative">
      
          <div className="relative animate-float">
            <div className="relative w-96 h-96 rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-700">
              <Image
                src="/sushi-floating.jpg"
                alt="Floating Sushi Rolls"
                fill
                className="object-cover"
                priority
              />
           
              <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-red-900/10 via-transparent to-orange-900/10"></div>
            </div>
          </div>

          <div className="mt-6 text-center space-y-2">
            <h2 className="text-2xl font-bold text-gray-800">Delicious Authentication</h2>
            <p className="text-gray-600">Fresh and secure, just like our sushi!</p>
          </div>

          <div className="absolute -top-10 -left-10 w-6 h-6 bg-orange-300 rounded-full animate-pulse shadow-lg"></div>
          <div className="absolute -top-5 right-10 w-4 h-4 bg-red-400 rounded-full animate-pulse delay-1000 shadow-lg"></div>
          <div className="absolute bottom-0 -left-20 w-8 h-8 bg-yellow-400 rounded-full animate-pulse delay-500 shadow-lg"></div>
          <div className="absolute -bottom-10 right-0 w-5 h-5 bg-orange-400 rounded-full animate-pulse delay-700 shadow-lg"></div>
          

          <div className="absolute top-1/4 -right-8 w-3 h-3 bg-red-400 rounded-full animate-pulse delay-300 shadow-lg"></div>
          <div className="absolute bottom-1/4 -left-12 w-4 h-4 bg-orange-400 rounded-full animate-pulse delay-800 shadow-lg"></div>
          
      
          <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-orange-300/60 rounded-full animate-bounce delay-200"></div>
          <div className="absolute top-2/3 right-1/3 w-3 h-3 bg-red-300/60 rounded-full animate-bounce delay-400"></div>
          <div className="absolute bottom-1/3 left-1/2 w-2 h-2 bg-yellow-300/60 rounded-full animate-bounce delay-600"></div>
        </div>
      </div>
    </div>
  );
}