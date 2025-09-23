'use client';

import { useState, useEffect } from 'react';
import { ChevronRight, Star } from 'lucide-react';
import Link from 'next/link';

const heroImages = [
  'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
  'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
  'https://images.pexels.com/photos/1571463/pexels-photo-1571463.jpeg',
];

export default function Hero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            currentImage === index ? 'opacity-30' : 'opacity-0'
          }`}
        >
          <img
            src={image}
            alt="Luxury furniture"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-up">
          <div className="flex items-center justify-center space-x-1 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="ml-2 text-sm text-gray-300">Trusted by 10,000+ customers</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-playfair font-bold mb-6">
            <span className="text-gradient">Luxury</span> Furniture
            <br />
            <span className="text-white">Redefined</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover our exquisite collection of handcrafted furniture that combines 
            modern elegance with timeless sophistication. Each piece is carefully 
            curated to transform your space into a masterpiece.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="group px-8 py-4 gold-gradient rounded-full text-black font-semibold hover-glow inline-flex items-center transition-all duration-300"
            >
              Explore Collection
              <ChevronRight 
                className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" 
              />
            </Link>

            <button className="px-8 py-4 glass rounded-full text-white font-semibold hover-glow transition-all duration-300">
              Watch Video
            </button>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 glass-gold rounded-full floating opacity-20 hidden lg:block" />
        <div className="absolute bottom-32 right-16 w-16 h-16 glass rounded-full floating opacity-30 hidden lg:block" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-20 w-12 h-12 gold-gradient rounded-full floating opacity-40 hidden lg:block" style={{ animationDelay: '2s' }} />
      </div>

      {/* Image Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentImage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentImage === index 
                ? 'bg-yellow-400 scale-125' 
                : 'bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}