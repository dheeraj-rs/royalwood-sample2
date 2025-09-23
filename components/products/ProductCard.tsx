'use client';

import { useState } from 'react';
import { Heart, ShoppingCart, Eye } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const { dispatch } = useCart();

  const addToCart = () => {
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
    <div
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
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                SALE
              </span>
            )}
          </div>

          {/* Actions */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className={`p-2 rounded-full glass transition-colors duration-300 ${
                isFavorite
                  ? 'text-red-400'
                  : 'text-white hover:text-red-400'
              }`}
            >
              <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
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
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-400 line-through">
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            <button
              onClick={addToCart}
              className="p-2 gold-gradient rounded-full text-black hover:scale-110 transition-transform duration-300"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}