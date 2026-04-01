import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useStore } from '../store';

export default function Navigation() {
  const cart = useStore((state) => state.cart);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-extrabold text-gold-dark font-serif">Hercules Nails</span>
            </Link>
          </div>
          <div className="hidden md:flex sm:space-x-8 items-center">
            <Link to="/services" className="text-marble-800 hover:text-gold transition-colors px-3 py-2 text-sm font-medium">Services</Link>
            <Link to="/portfolio" className="text-marble-800 hover:text-gold transition-colors px-3 py-2 text-sm font-medium">Portfolio</Link>
            <Link to="/team" className="text-marble-800 hover:text-gold transition-colors px-3 py-2 text-sm font-medium">Our Team</Link>
            <Link to="/faq" className="text-marble-800 hover:text-gold transition-colors px-3 py-2 text-sm font-medium">FAQ</Link>
            <Link to="/contact" className="text-marble-800 hover:text-gold transition-colors px-3 py-2 text-sm font-medium">Contact</Link>
            <Link to="/gift-cards" className="text-marble-800 hover:text-gold transition-colors px-3 py-2 text-sm font-medium">Gift Cards</Link>
            <Link to="/booking" className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gold-dark hover:bg-gold px-4 py-2 ml-4">
              Book Now
            </Link>
            <div className="relative ml-4">
              <Link to="/booking" className="text-marble-800 hover:text-gold">
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <div className="relative mr-4">
              <Link to="/booking" className="text-marble-800 hover:text-gold">
                <ShoppingCart className="h-6 w-6" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                    {cart.length}
                  </span>
                )}
              </Link>
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="text-marble-800 hover:text-gold">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/services" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-marble-800 hover:bg-marble-50 hover:border-gold">Services</Link>
            <Link to="/portfolio" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-marble-800 hover:bg-marble-50 hover:border-gold">Portfolio</Link>
            <Link to="/team" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-marble-800 hover:bg-marble-50 hover:border-gold">Our Team</Link>
            <Link to="/faq" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-marble-800 hover:bg-marble-50 hover:border-gold">FAQ</Link>
            <Link to="/contact" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-marble-800 hover:bg-marble-50 hover:border-gold">Contact</Link>
            <Link to="/gift-cards" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-marble-800 hover:bg-marble-50 hover:border-gold">Gift Cards</Link>
            <Link to="/booking" onClick={() => setIsOpen(false)} className="block pl-3 pr-4 py-2 text-base font-medium text-gold ml-2 font-bold">Book Now</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
