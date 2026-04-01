import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-marble-900 text-white pt-12 pb-8 border-t border-gold">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h3 className="text-2xl font-serif text-gold mb-4">Hercules Nails</h3>
            <p className="text-gray-400">Premium Nail Salon Dashboard & Services</p>
          </div>
          <div className="w-full md:w-1/3 mb-8 md:mb-0">
            <h4 className="text-lg font-bold mb-4 text-gold-light">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/services" className="text-gray-400 hover:text-white">Services</Link></li>
              <li><Link to="/portfolio" className="text-gray-400 hover:text-white">Portfolio</Link></li>
              <li><Link to="/team" className="text-gray-400 hover:text-white">Our Team</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-white">Contact Us</Link></li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-lg font-bold mb-4 text-gold-light">Policies</h4>
            <ul className="space-y-2">
              <li><Link to="/faq" className="text-gray-400 hover:text-white">FAQ</Link></li>
              <li><Link to="/policies" className="text-gray-400 hover:text-white">Cancellation Policy</Link></li>
              <li><Link to="/policies" className="text-gray-400 hover:text-white">Hygiene Standards</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Hercules Nails. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
