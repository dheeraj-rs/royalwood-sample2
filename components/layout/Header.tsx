'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Search, ShoppingBag, User, Menu, X } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Cart from '@/components/cart/Cart';
import AuthModal from '@/components/auth/AuthModal';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { state, dispatch } = useCart();
  const { user } = useAuth();

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <header className="fixed top-0 w-full z-50 glass">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">R</span>
              </div>
              <span className="text-xl font-playfair font-bold text-gradient">
                Royalwood
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-white hover:text-yellow-400 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-white hover:text-yellow-400 transition-colors">
                Products
              </Link>
              <Link href="/categories" className="text-white hover:text-yellow-400 transition-colors">
                Categories
              </Link>
              <Link href="/about" className="text-white hover:text-yellow-400 transition-colors">
                About
              </Link>
              <Link href="/contact" className="text-white hover:text-yellow-400 transition-colors">
                Contact
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <button className="p-2 text-white hover:text-yellow-400 transition-colors">
                <Search size={20} />
              </button>

              {/* Cart */}
              <button
                onClick={() => dispatch({ type: 'TOGGLE_CART' })}
                className="relative p-2 text-white hover:text-yellow-400 transition-colors"
              >
                <ShoppingBag size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-400 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* User */}
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="p-2 text-white hover:text-yellow-400 transition-colors"
              >
                <User size={20} />
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-white hover:text-yellow-400 transition-colors"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10">
              <nav className="flex flex-col space-y-4">
                <Link 
                  href="/" 
                  className="text-white hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link 
                  href="/products" 
                  className="text-white hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Products
                </Link>
                <Link 
                  href="/categories" 
                  className="text-white hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Categories
                </Link>
                <Link 
                  href="/about" 
                  className="text-white hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="text-white hover:text-yellow-400 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Cart Sidebar */}
      <Cart />

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}