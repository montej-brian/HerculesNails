import React from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../store';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { CheckCircle } from 'lucide-react';

export default function Booking() {
  const location = useLocation();
  
  const steps = [
    { path: '/booking', label: 'Cart' },
    { path: '/booking/datetime', label: 'Date & Time' },
    { path: '/booking/details', label: 'Details' },
    { path: '/booking/payment', label: 'Payment' },
    { path: '/booking/confirmation', label: 'Confirmation' }
  ];

  const currentStep = steps.findIndex(s => s.path === location.pathname);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif text-center mb-8 text-marble-900 border-b-2 border-gold pb-4 inline-block justify-center items-center w-full">Online Booking</h1>
      
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-marble-100 z-0"></div>
          {steps.map((step, index) => {
            const isActive = index <= currentStep;
            return (
              <div key={step.path} className="relative z-10 flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition-colors duration-300 ${isActive ? 'bg-gold shadow-lg' : 'bg-marble-100 text-marble-800'}`}>
                  {index + 1}
                </div>
                <span className={`text-xs mt-2 font-medium ${isActive ? 'text-gold-dark' : 'text-gray-400'}`}>{step.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white p-8 rounded-xl shadow-lg border border-marble-50">
        <Routes>
          <Route path="/" element={<BookingCart />} />
          <Route path="datetime" element={<BookingDateTime />} />
          <Route path="details" element={<BookingDetails />} />
          <Route path="payment" element={<BookingPayment />} />
          <Route path="confirmation" element={<BookingConfirmation />} />
        </Routes>
      </div>
    </div>
  );
}

function BookingCart() {
  const cart = useStore(state => state.cart);
  const removeFromCart = useStore(state => state.removeFromCart);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price, 0);

  if (cart.length === 0) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-500 mb-6">Your booking cart is empty.</p>
        <button onClick={() => navigate('/services')} className="bg-marble-900 text-white px-6 py-2 rounded hover:bg-gold transition-colors">
          Browse Services
        </button>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl font-serif text-marble-900 mb-6">Selected Services</h2>
      <div className="space-y-4 mb-8">
        {cart.map((item, index) => (
          <div key={item.id + '-' + index} className="flex justify-between items-center p-4 border border-marble-100 rounded-lg">
            <div>
              <h3 className="font-bold">{item.name}</h3>
              <p className="text-sm text-gray-500">{item.duration} mins</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-gold">${item.price}</span>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700 text-sm">Remove</button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between items-center pt-6 border-t border-marble-100">
        <span className="text-xl font-bold">Total:</span>
        <span className="text-2xl font-bold text-gold">${total}</span>
      </div>
      <div className="mt-8 flex justify-end">
        <button onClick={() => navigate('/booking/datetime')} className="bg-gold text-white px-8 py-3 rounded hover:bg-gold-dark font-bold transition-colors">
          Next: Date & Time
        </button>
      </div>
    </div>
  );
}

function BookingDateTime() {
  const details = useStore(state => state.bookingDetails);
  const updateDetails = useStore(state => state.updateBookingDetails);
  const [availableTimes, setAvailableTimes] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate();
  
  React.useEffect(() => {
    if (details.date) {
      setLoading(true);
      fetch(`http://localhost:5000/api/available-slots?date=${details.date.toISOString()}`)
        .then(res => res.json())
        .then(data => {
          setAvailableTimes(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [details.date]);

  const handleNext = () => {
    if (details.date && details.time) {
      navigate('/booking/details');
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-serif text-marble-900 mb-6">Select Date & Time</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
          <div className="border border-marble-100 p-2 rounded-lg inline-block w-full">
            <DatePicker 
              selected={details.date} 
              onChange={date => updateDetails({ date, time: null })}
              minDate={new Date()}
              inline
              className="w-full"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Available Times</label>
          <div className="space-y-3">
            {!details.date ? (
              <p className="text-sm text-gray-500 italic">Please select a date first.</p>
            ) : (
              availableTimes.map(time => (
                <button
                  key={time}
                  onClick={() => updateDetails({ time })}
                  className={`w-full py-3 rounded-lg border text-left px-4 transition-all ${details.time === time ? 'border-gold bg-gold text-white font-bold' : 'border-marble-100 hover:border-gold hover:text-gold'}`}
                >
                  {time}
                </button>
              ))
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <button onClick={() => navigate('/booking')} className="text-gray-500 hover:text-marble-900 border border-gray-300 px-6 py-2 rounded">
          Back
        </button>
        <button 
          onClick={handleNext}
          disabled={!details.date || !details.time}
          className={`px-8 py-3 rounded font-bold transition-colors ${(!details.date || !details.time) ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-gold text-white hover:bg-gold-dark'}`}
        >
          Next: Your Details
        </button>
      </div>
    </div>
  );
}

function BookingDetails() {
  const details = useStore(state => state.bookingDetails);
  const updateDetails = useStore(state => state.updateBookingDetails);
  const navigate = useNavigate();

  const handleNext = (e) => {
    e.preventDefault();
    if (details.customer.name && details.customer.email && details.customer.phone) {
      navigate('/booking/payment');
    }
  };

  const handleChange = (e) => {
    updateDetails({
      customer: { ...details.customer, [e.target.name]: e.target.value }
    });
  };

  return (
    <div>
      <h2 className="text-2xl font-serif text-marble-900 mb-6">Your Details</h2>
      <form onSubmit={handleNext}>
        <div className="space-y-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
            <input required type="text" name="name" value={details.customer.name} onChange={handleChange} className="w-full border border-marble-100 rounded p-3 focus:ring-gold focus:border-gold outline-none" placeholder="Jane Doe" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
            <input required type="email" name="email" value={details.customer.email} onChange={handleChange} className="w-full border border-marble-100 rounded p-3 focus:ring-gold focus:border-gold outline-none" placeholder="jane@example.com" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
            <input required type="tel" name="phone" value={details.customer.phone} onChange={handleChange} className="w-full border border-marble-100 rounded p-3 focus:ring-gold focus:border-gold outline-none" placeholder="(555) 123-4567" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
            <textarea name="specialRequests" value={details.customer.specialRequests} onChange={handleChange} rows="3" className="w-full border border-marble-100 rounded p-3 focus:ring-gold focus:border-gold outline-none" placeholder="Any allergies, specific tech requests, etc."></textarea>
          </div>
        </div>
        <div className="flex justify-between">
          <button type="button" onClick={() => navigate('/booking/datetime')} className="text-gray-500 hover:text-marble-900 border border-gray-300 px-6 py-2 rounded">Back</button>
          <button type="submit" className="bg-gold text-white px-8 py-3 rounded hover:bg-gold-dark font-bold transition-colors">
            Next: Payment
          </button>
        </div>
      </form>
    </div>
  );
}

function BookingPayment() {
  const cart = useStore(state => state.cart);
  const details = useStore(state => state.bookingDetails);
  const [isProcessing, setIsProcessing] = React.useState(false);
  const navigate = useNavigate();
  
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const deposit = total * 0.2; // 20% deposit

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      const response = await fetch('http://localhost:5000/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          services: cart,
          ...details,
          deposit
        })
      });
      const data = await response.json();
      if (data.success) {
        navigate('/booking/confirmation');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-serif text-marble-900 mb-6">Deposit Payment</h2>
      <div className="bg-marble-50 p-6 rounded-lg mb-8 border border-marble-100">
        <div className="flex justify-between mb-2">
          <span>Total Services Cost:</span>
          <span className="font-bold">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg border-t border-gray-200 pt-4 mt-2">
          <span className="font-bold">Required Deposit (20%):</span>
          <span className="font-bold text-gold">${deposit.toFixed(2)}</span>
        </div>
      </div>
      
      <div className="border border-gray-200 p-6 rounded-lg mb-8">
        <h3 className="font-bold mb-4">Mock Payment Elements</h3>
        <p className="text-sm text-gray-500 mb-4">Payment gateway is in test mode. No real charges will be made.</p>
        <div className="space-y-4">
          <input type="text" placeholder="Card Number" className="w-full border border-gray-200 rounded p-3" disabled />
          <div className="flex gap-4">
            <input type="text" placeholder="MM/YY" className="w-1/2 border border-gray-200 rounded p-3" disabled />
            <input type="text" placeholder="CVC" className="w-1/2 border border-gray-200 rounded p-3" disabled />
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button onClick={() => navigate('/booking/details')} className="text-gray-500 hover:text-marble-900 border border-gray-300 px-6 py-2 rounded">Back</button>
        <button 
          onClick={handleCheckout} 
          disabled={isProcessing}
          className={`bg-marble-900 text-white px-8 py-3 rounded font-bold transition-colors flex items-center ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gold'}`}
        >
          {isProcessing ? 'Processing...' : `Pay $${deposit.toFixed(2)} & Book`}
        </button>
      </div>
    </div>
  );
}

function BookingConfirmation() {
  const clearCart = useStore(state => state.clearCart);
  const clearDetails = useStore(state => state.clearBookingDetails);
  
  React.useEffect(() => {
    // Clear state on unmount or after showing confirmation
    return () => {
      clearCart();
      clearDetails();
    };
  }, [clearCart, clearDetails]);

  return (
    <div className="text-center py-10">
      <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
      <h2 className="text-3xl font-serif text-marble-900 mb-4">Booking Confirmed!</h2>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Your booking has been successfully placed. We've sent a confirmation email with your appointment details.
      </p>
      <div className="bg-marble-50 max-w-sm mx-auto p-6 rounded border border-marble-100 mb-8">
        <h3 className="font-bold mb-2">Booking Reference #</h3>
        <p className="text-xl text-gold font-mono tracking-wider">HERC-{Math.floor(Math.random() * 10000)}</p>
      </div>
      <a href="/" className="bg-gold text-white px-8 py-3 rounded hover:bg-gold-dark font-bold inline-block">
        Return Home
      </a>
    </div>
  );
}
