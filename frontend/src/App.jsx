import React from 'react';

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center text-gray-800">
      <header className="mb-8">
        <h1 className="text-5xl font-extrabold text-indigo-600 drop-shadow-sm">Hercules Nails</h1>
        <p className="text-xl mt-4 text-gray-600">Premium Nail Salon Dashboard</p>
      </header>
      <main className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100 text-center">
        <p className="mb-6 font-medium text-lg">Your Vite + React + Tailwind + Express Full-Stack is Ready.</p>
        <div className="flex justify-center gap-4">
          <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow transition-colors">
            Book Appointment
          </button>
          <button className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded-lg shadow transition-colors">
            Services
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
