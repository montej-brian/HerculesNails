import React, { useState } from 'react';
import { Gift, CheckCircle, Search } from 'lucide-react';

export default function GiftCards() {
  const [amount, setAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [message, setMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const [step, setStep] = useState(1); // 1: Select, 2: Pay, 3: Confirm
  const [generatedCode, setGeneratedCode] = useState('');
  
  const [checkCode, setCheckCode] = useState('');
  const [balance, setBalance] = useState(null);

  const amounts = [25, 50, 100, 200];

  const handleAmountClick = (val) => {
    setAmount(val);
    setCustomAmount('');
  };

  const handleCustomChange = (e) => {
    setCustomAmount(e.target.value);
    setAmount(Number(e.target.value) || 0);
  };

  const handleMockPayment = (e) => {
    e.preventDefault();
    setTimeout(() => {
      setGeneratedCode(`HCGC-${Math.random().toString(36).substr(2, 8).toUpperCase()}`);
      setStep(3);
    }, 1500);
  };

  const checkBalance = async (e) => {
    e.preventDefault();
    if (checkCode) {
      try {
        const response = await fetch(`http://localhost:5000/api/gift-cards/balance/${checkCode}`);
        const data = await response.json();
        setBalance(data.balance);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-serif text-marble-900 mb-4 inline-block border-b-2 border-gold pb-2">Give the Gift of Luxury</h1>
        <p className="text-gray-600">Digital gift cards for Hercules Nails. Delivered instantly via email.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Purchase Section */}
        <div className="w-full lg:w-2/3">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-marble-50">
            {step === 1 && (
              <div>
                <h2 className="text-2xl font-serif text-marble-900 mb-6 flex items-center gap-2">
                  <Gift className="text-gold" /> Step 1: Customize Your Gift Card
                </h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-bold text-gray-700 mb-3">Select Amount ($)</label>
                  <div className="flex flex-wrap gap-4 mb-4">
                    {amounts.map(val => (
                      <button
                        key={val}
                        onClick={() => handleAmountClick(val)}
                        className={`px-6 py-3 rounded-lg font-bold border-2 transition-colors ${amount === val && !customAmount ? 'border-gold bg-gold text-white shadow-md' : 'border-marble-100 text-marble-800 hover:border-gold hover:text-gold bg-marble-50'}`}
                      >
                        ${val}
                      </button>
                    ))}
                  </div>
                  <div className="relative max-w-xs border-t border-marble-100 pt-4 mt-2">
                    <span className="absolute mt-3 ml-4 text-gray-500 font-bold">$</span>
                    <input 
                      type="number" 
                      placeholder="Custom Amount" 
                      value={customAmount}
                      onChange={handleCustomChange}
                      className="w-full border border-marble-100 rounded-lg py-3 pl-8 pr-4 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-marble-50"
                    />
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">To (Recipient Email)</label>
                    <input type="email" value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="recipient@example.com" className="w-full border border-marble-100 bg-marble-50 rounded-lg p-3 focus:outline-none focus:border-gold" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-1">Personal Message</label>
                    <textarea rows="3" value={message} onChange={e => setMessage(e.target.value)} placeholder="Add a sweet message..." className="w-full border border-marble-100 bg-marble-50 rounded-lg p-3 focus:outline-none focus:border-gold"></textarea>
                  </div>
                </div>
                
                <button 
                  onClick={() => amount > 0 ? setStep(2) : null}
                  disabled={amount <= 0 || !recipient}
                  className={`w-full py-4 rounded-xl font-bold transition-colors shadow-lg text-lg ${amount > 0 && recipient ? 'bg-gold hover:bg-gold-dark text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                >
                  Continue to Checkout (${amount})
                </button>
              </div>
            )}

            {step === 2 && (
              <div>
                <h2 className="text-2xl font-serif text-marble-900 mb-6">Step 2: Mock Payment</h2>
                <div className="bg-marble-50 p-6 rounded-lg mb-8 border border-gold-light border-dashed">
                  <h3 className="font-bold mb-2">Order Summary</h3>
                  <div className="flex justify-between border-b border-marble-100 pb-2 mb-2"><span>Gift Card Value</span><span className="font-bold text-gold">${amount}</span></div>
                  <div className="flex justify-between"><span>Recipient</span><span>{recipient}</span></div>
                </div>
                
                <form onSubmit={handleMockPayment} className="space-y-4">
                  <p className="text-sm text-gray-500 italic mb-4">This is a mocked checkout flow. Enter any dummy data.</p>
                  <input required type="text" placeholder="Cardholder Name" className="w-full border border-marble-100 rounded-lg p-3 focus:outline-none focus:border-gold" />
                  <input required type="text" placeholder="Card Number" className="w-full border border-marble-100 rounded-lg p-3 focus:outline-none focus:border-gold" />
                  <div className="flex gap-4">
                    <input required type="text" placeholder="MM/YY" className="w-1/2 border border-marble-100 rounded-lg p-3 focus:outline-none focus:border-gold" />
                    <input required type="text" placeholder="CVC" className="w-1/2 border border-marble-100 rounded-lg p-3 focus:outline-none focus:border-gold" />
                  </div>
                  
                  <div className="flex justify-between pt-6">
                    <button type="button" onClick={() => setStep(1)} className="text-marble-800 border border-marble-100 px-6 py-3 rounded-lg hover:bg-marble-50 font-bold transition-colors">Back</button>
                    <button type="submit" className="bg-marble-900 hover:bg-gold text-white px-8 py-3 rounded-lg font-bold transition-colors">Process Mock Payment</button>
                  </div>
                </form>
              </div>
            )}

            {step === 3 && (
              <div className="text-center py-8">
                <CheckCircle className="h-24 w-24 text-green-500 mx-auto mb-6" />
                <h2 className="text-3xl font-serif text-marble-900 mb-4">Gift Card Created!</h2>
                <p className="text-gray-600 mb-8 max-w-md mx-auto">
                  Your ${amount} digital gift card has been sent to {recipient}. Keep this code safe.
                </p>
                
                <div className="relative max-w-sm mx-auto p-8 bg-gradient-to-tr from-marble-900 to-marble-800 rounded-xl rounded-t-3xl shadow-2xl border-t-4 border-gold text-white overflow-hidden mb-8 transform hover:scale-105 transition-transform">
                  <div className="absolute top-0 right-0 p-4 opacity-20"><Gift size={48} /></div>
                  <h3 className="text-gold-light tracking-widest uppercase text-xs font-bold mb-4 border-b border-gray-600 pb-2 inline-block">Hercules Nails</h3>
                  <p className="text-gold text-3xl font-serif mb-6">${amount}</p>
                  <p className="font-mono text-xl tracking-wider text-center bg-black bg-opacity-30 p-3 rounded-lg border border-gray-700">{generatedCode}</p>
                  <p className="text-xs text-gray-400 mt-6 text-center italic">Present this code at checkout.</p>
                </div>
                
                <button onClick={() => {setStep(1); setAmount(50); setRecipient(''); setCustomAmount('');}} className="bg-marble-50 border border-marble-100 hover:border-gold text-marble-900 hover:text-gold px-8 py-3 rounded-lg font-bold transition-colors">
                  Buy Another Gift Card
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Check Balance Section */}
        <div className="w-full lg:w-1/3">
          <div className="bg-marble-50 p-8 rounded-2xl shadow-inner border border-marble-100 h-full">
            <h3 className="text-2xl font-serif text-marble-900 mb-6 flex items-center gap-2 border-b-2 border-gold pb-2 inline-flex">
              <Search className="text-gold w-5 h-5" /> Check Balance
            </h3>
            <p className="text-gray-600 mb-6 text-sm">Enter your digital or physical gift card code below to see your remaining balance.</p>
            
            <form onSubmit={checkBalance} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Gift Card Code</label>
                <input 
                  type="text" 
                  value={checkCode}
                  onChange={e => setCheckCode(e.target.value)}
                  placeholder="e.g. HERC-XXXX" 
                  className="w-full border border-marble-100 rounded-lg p-3 font-mono uppercase focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold bg-white" 
                  required
                />
              </div>
              <button type="submit" className="w-full bg-marble-900 hover:bg-gold text-white py-3 rounded-lg font-bold transition-colors shadow flex justify-center items-center gap-2">
                Check Balance
              </button>
            </form>

            {balance !== null && (
              <div className="mt-8 p-6 bg-white rounded-xl shadow border-l-4 border-gold flex justify-between items-center transform animate-fade-in-up">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-bold tracking-wider mb-1">Available Balance</p>
                  <p className="text-sm font-mono text-gray-400">{checkCode.toUpperCase()}</p>
                </div>
                <p className="text-3xl font-serif text-gold font-bold">${balance}</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
