import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center bg-marble-900 border-b-4 border-gold overflow-hidden">
        <div className="absolute inset-0 bg-marble-dark opacity-30"></div>
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 uppercase tracking-widest leading-tight">
            Divine <span className="text-gold italic normal-case">Beauty</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
            Experience the pinnacle of luxury nail care. We craft art that lasts, fit for the gods.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/booking" className="bg-gold hover:bg-gold-dark text-marble-900 font-extrabold py-4 px-10 rounded-full transition-colors text-lg shadow-xl uppercase tracking-wider flex items-center justify-center">
              Book Appointment <ArrowRight className="ml-2 w-5 h-5" />
            </Link>
            <Link to="/services" className="bg-transparent hover:bg-white hover:text-marble-900 text-white border border-white font-bold py-4 px-10 rounded-full transition-colors text-lg uppercase tracking-wider">
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-marble-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold tracking-[0.3em] text-gold uppercase mb-2 flex items-center justify-center"><Sparkles className="w-4 h-4 mr-2" /> Our Offerings</h2>
            <h3 className="text-4xl font-serif text-marble-900">Signature Treatments</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-marble-100 text-center group hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-marble-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold transition-colors">
                <span className="text-2xl group-hover:scale-125 transition-transform font-serif">A</span>
              </div>
              <h4 className="text-xl font-bold font-serif text-marble-900 mb-3">Custom Acrylics</h4>
              <p className="text-gray-600 mb-6">Sculpted to perfection with premium powders for maximum durability and elegance.</p>
              <Link to="/services" className="text-gold font-bold uppercase text-sm tracking-wider hover:text-marble-900 transition-colors">View Pricing</Link>
            </div>
            <div className="bg-marble-900 rounded-2xl p-8 shadow-2xl border border-gold text-center group transform scale-105 active">
              <div className="w-16 h-16 bg-marble-800 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold transition-colors">
                <span className="text-2xl text-gold group-hover:text-marble-900 group-hover:scale-125 transition-all font-serif">S</span>
              </div>
              <h4 className="text-xl font-bold font-serif text-gold-light mb-3">Hercules Spa Pedicure</h4>
              <p className="text-gray-400 mb-6">Our most requested service. Full relaxation, scrub, mask, and hot stone massage.</p>
              <Link to="/booking" className="text-gold font-bold uppercase text-sm tracking-wider hover:text-white transition-colors">Book Now</Link>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-marble-100 text-center group hover:-translate-y-2 transition-transform">
              <div className="w-16 h-16 bg-marble-100 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-gold transition-colors">
                <span className="text-2xl group-hover:scale-125 transition-transform font-serif">G</span>
              </div>
              <h4 className="text-xl font-bold font-serif text-marble-900 mb-3">Gel & Nail Art</h4>
              <p className="text-gray-600 mb-6">Intricate hand-painted designs and long-lasting gel finishes that refuse to chip.</p>
              <Link to="/portfolio" className="text-gold font-bold uppercase text-sm tracking-wider hover:text-marble-900 transition-colors">View Gallery</Link>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof / Mini-Testimonials */}
      <section className="py-24 bg-white border-y border-marble-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl lg:text-5xl font-serif text-marble-900 mb-6">Rated 5 Stars by the Gods Themselves.</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">Don't just take our word for it. Hundreds of clients trust Hercules Nails for their most important events, weddings, and everyday luxury.</p>
              
              <div className="bg-marble-50 p-6 rounded-xl border-l-4 border-gold italic">
                <div className="flex text-gold mb-3">
                  <Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" /><Star className="w-5 h-5 fill-current" />
                </div>
                <p className="text-gray-700 mb-4">"The Hercules Spa Pedicure changed my life. Athena and her team are absolute artists. I will never go anywhere else!"</p>
                <span className="font-bold text-sm uppercase tracking-wider text-marble-900">- Sarah Jenkins</span>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gold rounded-full blur-3xl opacity-20 transform -translate-x-10 translate-y-10"></div>
              <img src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?w=800&q=80" alt="Beautiful Nails" className="rounded-2xl shadow-2xl relative z-10 border-4 border-white" />
              <div className="absolute -bottom-8 -left-8 bg-white p-6 rounded-xl shadow-xl border border-marble-100 z-20 flex items-center gap-4">
                <div className="bg-marble-900 text-gold p-3 rounded-full">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-bold text-marble-900">San Francisco</p>
                  <p className="text-sm text-gray-500">Find our flagship salon</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Layer */}
      <section className="py-20 bg-marble-900 text-center relative overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
        <div className="max-w-3xl mx-auto px-4 relative z-10">
          <h2 className="text-4xl font-serif text-white mb-6">Ready for your transformation?</h2>
          <p className="text-xl text-gray-400 mb-10">Browse our services or book your favorite technician directly.</p>
          <Link to="/booking" className="bg-gold text-marble-900 font-extrabold py-5 px-12 rounded-full transition-colors text-xl shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] uppercase tracking-wider inline-block">
            Secure Your Spot
          </Link>
        </div>
      </section>

    </div>
  );
}
