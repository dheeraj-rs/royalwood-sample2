'use client';

import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface ProductFiltersProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
}

const categories = [
  'Living Room',
  'Bedroom',
  'Dining Room',
  'Office',
  'Outdoor',
];

export default function ProductFilters({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  sortBy,
  setSortBy,
}: ProductFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 5000]);
    setSortBy('featured');
  };

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center space-x-2 glass px-4 py-2 rounded-lg text-white hover:text-yellow-400 transition-colors"
        >
          <Filter size={18} />
          <span>Filters</span>
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block space-y-6">
        <FilterContent
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          clearFilters={clearFilters}
        />
      </div>

      {/* Mobile Filter Modal */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 glass z-50 lg:hidden overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Filters</h2>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              
              <FilterContent
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                clearFilters={clearFilters}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}

function FilterContent({
  selectedCategory,
  setSelectedCategory,
  priceRange,
  setPriceRange,
  clearFilters,
}: {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  clearFilters: () => void;
}) {
  return (
    <>
      {/* Clear Filters */}
      <button
        onClick={clearFilters}
        className="text-yellow-400 hover:text-yellow-300 font-medium text-sm"
      >
        Clear All Filters
      </button>

      {/* Category Filter */}
      <div className="glass rounded-lg p-4">
        <h3 className="text-white font-semibold mb-4">Category</h3>
        <div className="space-y-3">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="radio"
              name="category"
              checked={selectedCategory === ''}
              onChange={() => setSelectedCategory('')}
              className="w-4 h-4 text-yellow-400 bg-transparent border-gray-300 focus:ring-yellow-400"
            />
            <span className="text-gray-300">All Categories</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
                className="w-4 h-4 text-yellow-400 bg-transparent border-gray-300 focus:ring-yellow-400"
              />
              <span className="text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="glass rounded-lg p-4">
        <h3 className="text-white font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <input
              type="number"
              value={priceRange[0]}
              onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
              className="w-20 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm"
              placeholder="Min"
            />
            <span className="text-gray-400">to</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 5000])}
              className="w-20 px-2 py-1 bg-white/5 border border-white/10 rounded text-white text-sm"
              placeholder="Max"
            />
          </div>
          
          <div className="text-sm text-gray-400">
            ${priceRange[0].toLocaleString()} - ${priceRange[1].toLocaleString()}
          </div>
        </div>
      </div>
    </>
  );
}