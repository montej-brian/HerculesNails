import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';

import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Portfolio from './pages/Portfolio';
import Team from './pages/Team';
import Contact from './pages/Contact';
import FAQ from './pages/FAQ';
import GiftCards from './pages/GiftCards';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow bg-marble-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/booking/*" element={<Booking />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/policies" element={<FAQ />} />
            <Route path="/gift-cards" element={<GiftCards />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
