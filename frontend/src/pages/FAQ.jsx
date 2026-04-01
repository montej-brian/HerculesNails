import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, Star, Send, ShieldCheck, HelpCircle } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const FAQS = [
  { q: "How do I book an appointment?", a: "You can book an appointment through our online booking system or by calling us directly." },
  { q: "Do you accept walk-ins?", a: "We highly recommend appointments, but we do accept walk-ins subject to availability." },
  { q: "What is your cancellation policy?", a: "We require 24 hours notice for cancellations. Please refer to our Policies section for more details." },
  { q: "Can I bring inspiration photos for nail art?", a: "Absolutely! Our technicians love recreating designs. You can also book directly from our Portfolio." },
  { q: "How long does a typical manicure take?", a: "A classic manicure takes about 30-45 minutes. Gel and acrylics take longer. Please check the duration listed on each service." }
];

const POLICIES = [
  { title: "Cancellation & Late Policy", text: "Appointments must be cancelled at least 24 hours in advance. Late arrivals exceeding 15 minutes may result in cancellation or a shortened service time." },
  { title: "Hygiene Standards", text: "Tools are sterilized using hospital-grade autoclaves. We use disposable liners for pedicures and single-use files/buffers per client to ensure your safety." },
  { title: "Deposit Refunds", text: "Deposits are strictly non-refundable. If you reschedule with 24-hour notice, your deposit can be transferred to the new appointment date." },
  { title: "Guarantee Policy", text: "We offer a 3-day guarantee on our gel and acrylic services. If you experience chipping within this window, we will repair it free of charge." }
];

function Accordion({ title, content }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-marble-100 rounded-lg overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow mb-4">
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="w-full flex justify-between items-center p-5 text-left bg-marble-50 hover:bg-marble-100 transition-colors"
      >
        <span className="font-bold text-marble-900">{title}</span>
        {isOpen ? <ChevronUp className="text-gold" /> : <ChevronDown className="text-gray-400" />}
      </button>
      {isOpen && (
        <div className="p-5 text-gray-600 border-t border-marble-100 leading-relaxed bg-white">
          {content}
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [activeTab, setActiveTab] = useState('faq');
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', rating: 5, text: '' });
  const [loadingReviews, setLoadingReviews] = useState(false);
  const location = useLocation();

  const fetchReviews = async () => {
    setLoadingReviews(true);
    try {
      const response = await fetch('http://localhost:5000/api/reviews');
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingReviews(false);
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      });
      if (response.ok) {
        setNewReview({ name: '', rating: 5, text: '' });
        fetchReviews();
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (location.pathname === '/policies') setActiveTab('policies');
    else if (location.pathname === '/reviews') setActiveTab('reviews');
    else setActiveTab('faq');
    fetchReviews();
  }, [location]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-serif text-marble-900 mb-6 inline-block border-b-2 border-gold pb-2 uppercase tracking-widest">Salon Information</h1>
        
        {/* Tabs */}
        <div className="flex justify-center border-b border-marble-100 flex-wrap">
          <button 
            onClick={() => setActiveTab('faq')}
            className={`px-6 py-4 text-base font-bold transition-colors relative ${activeTab === 'faq' ? 'text-gold' : 'text-gray-500 hover:text-marble-900'}`}
          >
            F.A.Q
            {activeTab === 'faq' && <div className="absolute bottom-0 left-0 w-full h-1 bg-gold rounded-t-lg"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('policies')}
            className={`px-6 py-4 text-base font-bold transition-colors relative ${activeTab === 'policies' ? 'text-gold' : 'text-gray-500 hover:text-marble-900'}`}
          >
            Policies
            {activeTab === 'policies' && <div className="absolute bottom-0 left-0 w-full h-1 bg-gold rounded-t-lg"></div>}
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-6 py-4 text-base font-bold transition-colors relative ${activeTab === 'reviews' ? 'text-gold' : 'text-gray-500 hover:text-marble-900'}`}
          >
            Testimonials
            {activeTab === 'reviews' && <div className="absolute bottom-0 left-0 w-full h-1 bg-gold rounded-t-lg"></div>}
          </button>
        </div>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-xl border border-marble-50 min-h-[500px]">
        {activeTab === 'faq' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-serif text-marble-900 mb-8 flex items-center gap-3">
              <HelpCircle className="text-gold" /> Frequently Asked Questions
            </h2>
            <div className="space-y-2">
              {FAQS.map((item, idx) => (
                <Accordion key={idx} title={item.q} content={item.a} />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-serif text-marble-900 mb-8 flex items-center gap-3">
              <ShieldCheck className="text-gold" /> Salon Policies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {POLICIES.map((policy, idx) => (
                <div key={idx} className="bg-marble-50 p-6 rounded-xl border border-marble-100 flex flex-col h-full hover:border-gold transition-colors">
                  <h3 className="font-bold text-lg text-marble-900 mb-3 border-b border-marble-200 pb-2 flex items-center">
                    <span className="w-2 h-2 bg-gold rounded-full mr-2"></span>
                    {policy.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed flex-grow">{policy.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="animate-fade-in">
            <h2 className="text-2xl font-serif text-marble-900 mb-8 flex items-center gap-3">
              <Star className="text-gold" /> Success Stories & Reviews
            </h2>
            
            <div className="grid grid-cols-1 gap-6 mb-12">
              {loadingReviews ? (
                <p className="text-center py-10 text-gold-dark font-bold animate-pulse">Fetching magic...</p>
              ) : (
                reviews.map(review => (
                  <div key={review.id} className="bg-marble-50 p-6 rounded-xl border border-marble-100 relative group overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <Star size={64} className="fill-gold" />
                    </div>
                    <div className="flex items-center gap-1 text-gold mb-3">
                      {[...Array(review.rating)].map((_, i) => <Star key={i} size={16} className="fill-gold" />)}
                    </div>
                    <p className="text-gray-700 mb-4 italic leading-relaxed">"{review.text}"</p>
                    <div className="flex justify-between items-center text-xs text-gray-400 font-bold uppercase tracking-widest">
                      <span className="text-marble-900">— {review.name}</span>
                      <span>{review.date}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="bg-marble-900 text-white p-8 rounded-2xl shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gold"></div>
              <h3 className="text-xl font-serif text-gold-light mb-6">Leave Your Own Review</h3>
              <form onSubmit={submitReview} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input 
                    required
                    type="text" 
                    placeholder="Your Name" 
                    value={newReview.name}
                    onChange={e => setNewReview({...newReview, name: e.target.value})}
                    className="bg-marble-800 border-none rounded-lg p-3 text-white focus:ring-1 focus:ring-gold outline-none"
                  />
                  <select 
                    value={newReview.rating}
                    onChange={e => setNewReview({...newReview, rating: Number(e.target.value)})}
                    className="bg-marble-800 border-none rounded-lg p-3 text-white focus:ring-1 focus:ring-gold outline-none appearance-none"
                  >
                    <option value="5">5 Stars - Perfection</option>
                    <option value="4">4 Stars - Excellent</option>
                    <option value="3">3 Stars - Good</option>
                    <option value="2">2 Stars - Okay</option>
                    <option value="1">1 Star - Poor</option>
                  </select>
                </div>
                <textarea 
                  required
                  placeholder="Share your experience..." 
                  value={newReview.text}
                  onChange={e => setNewReview({...newReview, text: e.target.value})}
                  rows="4"
                  className="w-full bg-marble-800 border-none rounded-lg p-3 text-white focus:ring-1 focus:ring-gold outline-none"
                ></textarea>
                <button type="submit" className="bg-gold hover:bg-gold-dark text-marble-900 font-extrabold py-3 px-8 rounded-lg transition-colors flex items-center justify-center gap-2 w-full sm:w-auto ml-auto">
                  Submit Review <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
