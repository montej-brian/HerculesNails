import React, { useState, useEffect } from 'react';
import Masonry from 'react-masonry-css';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { X, ExternalLink, Ruler } from 'lucide-react';

const breakpointColumnsObj = {
  default: 3,
  1100: 3,
  700: 2,
  500: 1
};

export default function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [portfolio, setPortfolio] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const addToCart = useStore(state => state.addToCart);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/portfolio')
      .then(res => res.json())
      .then(data => {
        setPortfolio(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const categories = ['All', 'Acrylic', 'Gel', 'Nail Art', 'Hercules Specials'];
  const filteredImages = filter === 'All' ? portfolio : portfolio.filter(img => img.category === filter);

  const handleBookLook = (look) => {
    addToCart(look.relatedService);
    setSelectedImage(null);
    navigate('/booking');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-serif text-marble-900 mb-4 inline-block border-b-2 border-gold pb-2 uppercase tracking-widest">Inspiration Gallery</h1>
        <p className="text-gray-600 italic">Browse our divine creations and book your favorite look instantly.</p>
      </div>
      
      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-6 py-2 rounded-full font-bold transition-all shadow-sm border ${filter === cat ? 'bg-gold text-white border-gold scale-105 shadow-gold/20' : 'bg-white text-marble-800 border-marble-100 hover:border-gold hover:text-gold'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Masonry Grid */}
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex mb-12 w-auto -ml-4"
        columnClassName="pl-4 bg-clip-padding"
      >
        {filteredImages.map((item) => (
          <div key={item.id} className="mb-6 relative group cursor-pointer overflow-hidden rounded-2xl shadow-lg border border-marble-50 block bg-marble-light" onClick={() => setSelectedImage(item)}>
            <img src={item.img} alt={item.description} className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-110 block" />
            <div className="absolute inset-0 bg-marble-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="bg-white/90 p-3 rounded-full shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                <ExternalLink className="text-gold w-6 h-6" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-marble-900/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <p className="text-white font-bold text-sm truncate">{item.description}</p>
            </div>
          </div>
        ))}
      </Masonry>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-marble-900/90 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-5xl w-full flex flex-col lg:flex-row overflow-hidden relative border border-gold/20">
            <button onClick={() => setSelectedImage(null)} className="absolute top-6 right-6 text-marble-800 hover:text-gold z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-lg transition-all">
              <X className="h-6 w-6" />
            </button>
            
            <div className="w-full lg:w-3/5 bg-marble-100 relative max-h-[70vh] lg:max-h-none overflow-hidden">
               <div className="absolute inset-0 bg-marble-dark opacity-5"></div>
              <img src={selectedImage.img} alt={selectedImage.description} className="w-full h-full object-cover relative z-10" />
            </div>
            
            <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center bg-white">
              <div className="flex items-center gap-2 text-gold uppercase tracking-[0.2em] text-xs font-bold mb-4">
                <span className="w-8 h-[1px] bg-gold"></span>
                {selectedImage.category}
              </div>
              <h3 className="text-4xl font-serif text-marble-900 mb-6 leading-tight">{selectedImage.description}</h3>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedImage.tags.map(tag => (
                  <span key={tag} className="bg-marble-50 text-gold-dark text-xs font-bold px-4 py-1.5 rounded-full border border-gold/10">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="bg-marble-50 p-6 rounded-2xl border border-marble-100 mb-10">
                <div className="flex items-center gap-3 mb-2 text-marble-900">
                  <Ruler className="w-5 h-5 text-gold" />
                  <span className="text-sm font-bold">Recommended Service</span>
                </div>
                <p className="text-lg font-serif text-marble-800 ml-8">{selectedImage.relatedService.name}</p>
                <div className="flex justify-between items-center mt-3 ml-8">
                  <span className="text-gold font-bold">${selectedImage.relatedService.price}</span>
                  <span className="text-xs text-gray-400 font-medium uppercase tracking-widest">{selectedImage.relatedService.duration} mins</span>
                </div>
              </div>

              <div className="space-y-4">
                <button 
                  onClick={() => handleBookLook(selectedImage)}
                  className="w-full bg-marble-900 text-white py-5 rounded-2xl hover:bg-gold font-extrabold transition-all text-lg shadow-xl shadow-gold/10 flex justify-center items-center gap-3 uppercase tracking-wider"
                >
                  Book This Look ✨
                </button>
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-bold">
                  Instant connection to our booking engine
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
