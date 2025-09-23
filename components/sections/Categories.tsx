'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 'living-room',
    name: 'Living Room',
    description: 'Elegant sofas, chairs, and tables',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    count: '120+ items',
  },
  {
    id: 'bedroom',
    name: 'Bedroom',
    description: 'Luxurious beds and storage',
    image: 'https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg',
    count: '85+ items',
  },
  {
    id: 'dining',
    name: 'Dining Room',
    description: 'Sophisticated dining sets',
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
    count: '65+ items',
  },
  {
    id: 'office',
    name: 'Office',
    description: 'Premium office furniture',
    image: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg',
    count: '45+ items',
  },
];

export default function Categories() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            <span className="text-gradient">Explore</span> Categories
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Find the perfect furniture for every room in your home with our 
            carefully curated collections.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <Link
              key={category.id}
              href={`/categories/${category.id}`}
              className="group block animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredCategory(category.id)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="relative h-80 rounded-2xl overflow-hidden glass hover-glow transition-all duration-500">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                  <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-300 text-sm mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-yellow-400 text-sm font-medium">
                        {category.count}
                      </span>
                      <ArrowRight 
                        className={`w-5 h-5 text-white transition-transform duration-300 ${
                          hoveredCategory === category.id ? 'translate-x-1' : ''
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}