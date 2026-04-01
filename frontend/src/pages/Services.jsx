import React, { useState, useEffect } from 'react';
import { useStore } from '../store';

const MOCK_SERVICES = [
  { id: 1, category: 'Manicure', name: 'Classic Marble Manicure', description: 'Basic filing, shaping, cuticle care, and your choice of marble-finish polish.', price: 25, duration: 30 },
  { id: 2, category: 'Manicure', name: 'Golden Glow Gel', description: 'Long-lasting gel polish with 24k gold leaf accents.', price: 45, duration: 45 },
  { id: 3, category: 'Pedicure', name: 'Hercules Spa Pedicure', description: 'Ultimate relaxation with foot scrub, massage, and premium polish.', price: 50, duration: 60 },
  { id: 4, category: 'Nail Art', name: 'Custom Design', description: 'Bring your design or choose from our gallery. Per nail pricing.', price: 10, duration: 15 },
  { id: 5, category: 'Hercules Specials', name: 'The Olympia Combo', description: 'Full set acrylics with matching toes and a complimentary drink.', price: 100, duration: 120 }
];

export default function Services() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState('All');
  
  const addToCart = useStore((state) => state.addToCart);

  useEffect(() => {
    // Fetch real data from backend
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:5000/api/services');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setServices(data);
      } catch (err) {
        setError('Failed to load services. Please check if the backend is running.');
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const categories = ['All', 'Manicure', 'Pedicure', 'Nail Art', 'Hercules Specials'];
  const filteredServices = filter === 'All' ? services : services.filter(s => s.category === filter);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif text-center mb-8 text-marble-900 border-b-2 border-gold pb-4 inline-block justify-center items-center w-full">Our Services</h1>
      
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-semibold transition-all shadow-sm ${filter === cat ? 'bg-gold text-white scale-105' : 'bg-white text-marble-800 hover:bg-marble-100 hover:text-gold border border-marble-100'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredServices.map(service => (
          <div key={service.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-marble-50 bg-marble-light bg-cover">
            <div className="p-6 bg-white bg-opacity-90 h-full flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-marble-900 font-serif">{service.name}</h3>
                  <span className="text-gold font-bold text-lg">${service.price}</span>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-sm text-gray-500 mb-6 flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {service.duration} mins
                </div>
              </div>
              <button 
                onClick={() => addToCart(service)}
                className="w-full bg-marble-900 hover:bg-gold text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
