'use client';

import { useState } from 'react';
import { X, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  
  const { login, register, isLoading, user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await register(formData.name, formData.email, formData.password);
      }
      onClose();
    } catch (error) {
      console.error('Auth error:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  if (!isOpen) return null;

  if (user) {
    return (
      <>
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          onClick={onClose}
        />
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-2xl p-8 w-full max-w-md animate-scale-in">
            <div className="text-center">
              <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-2xl font-semibold text-white mb-2">
                Welcome, {user.name}!
              </h2>
              <p className="text-gray-300 mb-6">You are successfully logged in.</p>
              <button
                onClick={onClose}
                className="px-6 py-3 gold-gradient rounded-full text-black font-semibold hover-glow transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="glass rounded-2xl p-8 w-full max-w-md animate-scale-in">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-white">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 glass rounded-full text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                  required={!isLogin}
                />
              </div>
            )}

            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 glass rounded-full text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full pl-12 pr-4 py-3 glass rounded-full text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 gold-gradient rounded-full text-black font-semibold hover-glow transition-all duration-300 disabled:opacity-50"
            >
              {isLoading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-400">
              {isLogin ? "Don't have an account?" : 'Already have an account?'}
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-yellow-400 hover:text-yellow-300 font-medium"
              >
                {isLogin ? 'Sign up' : 'Sign in'}
              </button>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}