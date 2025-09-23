'use client';

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate subscription
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-r from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass rounded-3xl p-8 md:p-12 animate-scale-in">
            <div className="w-16 h-16 gold-gradient rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="w-8 h-8 text-black" />
            </div>

            <h2 className="text-3xl md:text-4xl font-playfair font-bold mb-4">
              Stay Updated with <span className="text-gradient">Royalwood</span>
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              Get exclusive access to new collections, special offers, and design 
              inspiration delivered to your inbox.
            </p>

            {isSubscribed ? (
              <div className="animate-fade-up">
                <div className="p-4 glass-gold rounded-2xl mb-6">
                  <p className="text-yellow-400 font-semibold">
                    🎉 Thank you for subscribing! Welcome to the Royalwood family.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <div className="flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full px-6 py-4 glass rounded-full text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="px-8 py-4 gold-gradient rounded-full text-black font-semibold hover-glow transition-all duration-300 inline-flex items-center justify-center"
                >
                  Subscribe
                  <Send className="ml-2 w-5 h-5" />
                </button>
              </form>
            )}

            <p className="text-sm text-gray-400 mt-6">
              Join 50,000+ subscribers. No spam, unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}