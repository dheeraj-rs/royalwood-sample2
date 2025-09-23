'use client';

import { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    title: 'Interior Designer',
    content: 'Royalwood exceeded my expectations. The quality and craftsmanship are outstanding, and the delivery was seamless. My clients are absolutely thrilled with their new furniture.',
    rating: 5,
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
  },
  {
    id: 2,
    name: 'Michael Chen',
    title: 'Business Owner',
    content: 'The attention to detail in every piece is remarkable. Royalwood transformed our office space into something truly elegant and professional. Highly recommended!',
    rating: 5,
    image: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    title: 'Homeowner',
    content: 'From browsing to delivery, everything was perfect. The furniture quality is exceptional and the customer service team was incredibly helpful throughout the process.',
    rating: 5,
    image: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg',
  },
];

export default function Testimonials() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-5xl font-playfair font-bold mb-4">
            What Our <span className="text-gradient">Customers</span> Say
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Discover why thousands of customers trust Royalwood for their 
            luxury furniture needs.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="glass rounded-3xl p-8 md:p-12 animate-scale-in">
            <div className="text-center">
              {/* Stars */}
              <div className="flex justify-center space-x-1 mb-6">
                {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Content */}
              <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
                "{testimonials[currentTestimonial].content}"
              </p>

              {/* Author */}
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[currentTestimonial].image}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="text-left">
                  <h4 className="text-white font-semibold">
                    {testimonials[currentTestimonial].name}
                  </h4>
                  <p className="text-yellow-400 text-sm">
                    {testimonials[currentTestimonial].title}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 glass rounded-full text-white hover:text-yellow-400 hover-glow transition-all duration-300"
          >
            <ChevronLeft size={20} />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 glass rounded-full text-white hover:text-yellow-400 hover-glow transition-all duration-300"
          >
            <ChevronRight size={20} />
          </button>

          {/* Indicators */}
          <div className="flex justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index 
                    ? 'bg-yellow-400 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}