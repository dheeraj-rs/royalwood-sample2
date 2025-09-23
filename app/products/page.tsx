'use client';

import { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/products/ProductCard';
import ProductFilters from '@/components/products/ProductFilters';
import { Search } from 'lucide-react';

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
  {
    id: '5',
    name: 'Executive Desk',
    price: 1599,
    originalPrice: 1899,
    image: 'https://images.pexels.com/photos/667838/pexels-photo-667838.jpeg',
    category: 'Office',
    rating: 4.6,
    isNew: false,
  },
  {
    id: '6',
    name: 'Luxury Armchair',
    price: 1299,
    originalPrice: 1599,
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    category: 'Living Room',
    rating: 4.8,
    isNew: true,
  },
];

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [sortBy, setSortBy] = useState('featured');

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'newest':
        return b.isNew ? 1 : -1;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-4">
            Our <span className="text-gradient">Collection</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            Discover our complete range of luxury furniture crafted with 
            precision and designed for modern living.
          </p>
          
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 glass rounded-full text-white placeholder-gray-400 border-0 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filters Sidebar */}
            <div className="lg:w-64 shrink-0">
              <ProductFilters
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                sortBy={sortBy}
                setSortBy={setSortBy}
              />
            </div>

            {/* Products Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-semibold text-white">
                  {filteredProducts.length} Products Found
                </h2>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="glass rounded-lg px-4 py-2 text-white border-0 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-400 text-lg">
                    No products found matching your criteria.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}