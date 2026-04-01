import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(''); // 'success' or 'error'

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      try {
        const response = await fetch('http://localhost:5000/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const data = await response.json();
        if (data.success) {
          setStatus('success');
          setFormData({ name: '', email: '', message: '' });
        }
      } catch (err) {
        setStatus('error');
      }
    } else {
      setStatus('error');
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-serif text-marble-900 mb-4 inline-block border-b-2 border-gold pb-2">Contact Us</h1>
        <p className="text-gray-600">Have a question or special request? We'd love to hear from you.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Contact Info & Map */}
        <div className="w-full lg:w-1/2 space-y-8">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-marble-50 h-full">
            <h3 className="text-2xl font-serif text-marble-900 mb-6 border-b border-marble-100 pb-2">Salon Information</h3>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-gold mt-1 w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-marble-900">Address</h4>
                  <p className="text-gray-600">123 Olympus Way, Suite 400<br/>San Francisco, CA 94107</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-gold mt-1 w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-marble-900">Phone</h4>
                  <a href="tel:+15551234567" className="text-gray-600 hover:text-gold transition-colors inline-block bg-marble-50 px-3 py-1 rounded border mt-1 font-medium">(555) 123-4567</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-gold mt-1 w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-marble-900">Email</h4>
                  <a href="mailto:hello@herculesnails.com" className="text-gray-600 hover:text-gold transition-colors">hello@herculesnails.com</a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Clock className="text-gold mt-1 w-6 h-6 flex-shrink-0" />
                <div>
                  <h4 className="font-bold text-marble-900">Hours</h4>
                  <p className="text-gray-600">Tue - Sat: 10:00 AM - 7:00 PM<br/>Sun - Mon: Closed</p>
                </div>
              </div>
            </div>

            {/* Google Maps mock placeholder (Using an iframe to actual Maps or a placeholder image) */}
            <div className="mt-8 rounded-xl overflow-hidden shadow border border-marble-100 h-64 bg-gray-200">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1576.2255757731998!2d-122.39956461427515!3d37.78160086307129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807c4bc45da1%3A0xeab5c53181829e2!2sSFMOMA!5e0!3m2!1sen!2sus!4v1714392231234!5m2!1sen!2sus" 
                width="100%" 
                height="100%" 
                style={{border:0}} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Google Maps Location">
              </iframe>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="w-full lg:w-1/2">
          <div className="bg-marble-900 text-white p-8 sm:p-12 rounded-2xl shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-gold opacity-10 rounded-full blur-2xl"></div>
            <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-48 h-48 bg-gold opacity-10 rounded-full blur-3xl"></div>

            <h3 className="text-3xl font-serif mb-8 text-gold-light relative z-10">Send us a Message</h3>
            
            {status === 'success' && (
              <div className="mb-6 p-4 bg-green-500 bg-opacity-20 border border-green-500 rounded text-green-300 font-bold relative z-10">
                Message sent successfully! We will get back to you shortly.
              </div>
            )}
            
            {status === 'error' && (
              <div className="mb-6 p-4 bg-red-500 bg-opacity-20 border border-red-500 rounded text-red-300 font-bold relative z-10">
                Please fill out all fields.
              </div>
            )}

            <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <input 
                  type="text" 
                  name="name" 
                  value={formData.name} 
                  onChange={handleChange} 
                  required
                  className="w-full bg-marble-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors" 
                  placeholder="Your Name" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input 
                  type="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required
                  className="w-full bg-marble-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors" 
                  placeholder="your@email.com" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Message</label>
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  required
                  rows="5" 
                  className="w-full bg-marble-800 border border-gray-600 rounded-lg p-3 text-white focus:outline-none focus:border-gold transition-colors" 
                  placeholder="How can we help you?"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-gold hover:bg-gold-light text-marble-900 font-extrabold py-4 px-6 rounded-lg transition-colors shadow-lg shadow-gold/20 flex justify-center items-center gap-2 text-lg"
              >
                Send Message <Mail size={20} />
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
