'use client';

import { X, Plus, Minus, ShoppingBag } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';

export default function Cart() {
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_ITEM', payload: id });
    } else {
      dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    }
  };

  const total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (!state.isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />
      
      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-black/90 backdrop-filter backdrop-blur-xl z-50 transform transition-transform duration-300 border-l border-white/10">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <h2 className="text-xl font-semibold text-white">Shopping Cart</h2>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-6">
            {state.items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 glass rounded-lg p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="text-white font-medium mb-1">{item.name}</h3>
                      <p className="text-yellow-400 font-semibold">
                        ${item.price.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-white w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {state.items.length > 0 && (
            <div className="border-t border-white/10 p-6 space-y-4">
              <div className="flex items-center justify-between text-lg font-semibold">
                <span className="text-white">Total:</span>
                <span className="text-yellow-400">${total.toLocaleString()}</span>
              </div>
              <button className="w-full px-6 py-3 gold-gradient rounded-full text-black font-semibold hover-glow transition-all duration-300">
                Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}