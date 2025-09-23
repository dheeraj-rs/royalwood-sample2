'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

const products = [
  {
    id: '1',
    name: 'Royal Velvet Sofa',
    price: 2899,
    originalPrice: 3499,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    category: 'Living Room',
    rating: 4.9,
    isNew: true,
  },
  {
    id: '2',
    name: 'Monarch Dining Table',
    price: 1899,
    originalPrice: 2299,
    image: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg',
    category: 'Dining Room',
    rating: 4.8,
    isNew: false,
  },
  {
    id: '3',
    name: 'Elite Office Chair',
    price: 899,
    originalPrice: 1199,
    image: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg',
    category: 'Office',
    rating: 4.9,
    isNew: true,
  },
  {
    id: '4',
    name: 'Luxury King Bed',
    price: 3299,
    originalPrice: 3899,
    image: 'https://images.pexels.com/photos/1743227/pexels-photo-1743227.jpeg',
    category: 'Bedroom',
    rating: 4.7,
    isNew: false,
  },
];

export default function FeaturedProducts() {
  const [favorites, setFavorites] = useState<string[]>([]);
  const { dispatch } = useCart();

  const toggleFavorite = (productId: string) => {
    setFavorites(prev =>
      prev.includes(productId)
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const addToCart = (product: any) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
    });
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            Featured <span className="text-gradient">Products</span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Handpicked selection of our most popular and trending furniture pieces 
            that define luxury and elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <div
              key={product.id}
              className="group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="relative glass rounded-2xl overflow-hidden hover-glow transition-all duration-500">
                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="px-3 py-1 bg-yellow-400 text-black text-xs font-semibold rounded-full">
                        NEW
                      </span>
                    )}
                    {product.originalPrice > product.price && (
                      <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                        SALE
                      </span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => toggleFavorite(product.id)}
                      className={`p-2 rounded-full glass transition-colors duration-300 ${
                        favorites.includes(product.id)
                          ? 'text-red-400'
                          : 'text-white hover:text-red-400'
                      }`}
                    >
                      <Heart size={18} className={favorites.includes(product.id) ? 'fill-current' : ''} />
                    </button>
                    <button className="p-2 rounded-full glass text-white hover:text-yellow-400 transition-colors duration-300">
                      <Eye size={18} />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm text-yellow-400">{product.category}</span>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm text-gray-300">{product.rating}</span>
                      <div className="w-1 h-1 bg-yellow-400 rounded-full"></div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-yellow-400 transition-colors duration-300">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-xl font-bold text-white">
                        ${product.price.toLocaleString()}
                      </span>
                      {product.originalPrice > product.price && (
                        <span className="text-sm text-gray-400 line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="p-2 gold-gradient rounded-full text-black hover:scale-110 transition-transform duration-300"
                    >
                      <ShoppingCart size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="px-8 py-4 glass rounded-full text-white font-semibold hover-glow transition-all duration-300">
            View All Products
          </button>
        </div>
      </div>
    </section>
  );
}