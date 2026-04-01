import React from 'react';
import { useStore } from '../store';
import { useNavigate } from 'react-router-dom';
import { Globe, MessageCircle, Star } from 'lucide-react';

const MOCK_TEAM = [
  { id: 1, name: 'Athena Rossi', title: 'Master Nail Artist', bio: 'With over 10 years of experience, Athena specializes in intricate nail art and custom acrylic sculpting.', specialties: ['Custom Acrylics', '3D Nail Art', 'Bridal Nails'], img: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80', rating: 4.9 },
  { id: 2, name: 'Chloe Kim', title: 'Gel Polish Specialist', bio: 'Chloe brings the latest Korean gel trends to Hercules Nails. Expect flawless, long-lasting finishes.', specialties: ['Korean Gel', 'Builder Gel', 'Minimalist Art'], img: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80', rating: 4.8 },
  { id: 3, name: 'Marcus Sterling', title: 'Pedicure Expert', bio: 'Marcus is our resident foot-care guru, delivering unparalleled relaxation with our Hercules Spa Pedicure.', specialties: ['Spa Pedicures', 'Reflexology', 'Callus Removal'], img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80', rating: 5.0 }
];

export default function Team() {
  const [team, setTeam] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const updateDetails = useStore(state => state.updateBookingDetails);
  const navigate = useNavigate();

  React.useEffect(() => {
    fetch('http://localhost:5000/api/team')
      .then(res => res.json())
      .then(data => {
        setTeam(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleBookTech = (techId) => {
    updateDetails({ technicianId: techId });
    navigate('/booking');
  };

  if (loading) return <div className="py-20 text-center text-gold font-bold">Loading Team...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-serif text-marble-900 mb-4 inline-block border-b-2 border-gold pb-2">Meet The Techs</h1>
        <p className="text-gray-600">Our talented team of nail care professionals is dedicated to bringing your vision to life.</p>
      </div>

      {/* Grid for desktop, snappy flex for mobile */}
      <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 overflow-x-auto snap-x snap-mandatory pb-8 scrollbar-hide">
        {team.map(tech => (
          <div key={tech.id} className="min-w-[85vw] md:min-w-0 snap-center bg-white rounded-2xl shadow-xl overflow-hidden border border-marble-50 flex flex-col transition-transform hover:-translate-y-2">
            <div className="relative h-64 bg-marble-100 overflow-hidden group">
              <img src={tech.img} alt={tech.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-marble-900 to-transparent p-4">
                <h3 className="text-2xl font-serif text-white">{tech.name}</h3>
                <p className="text-gold font-medium">{tech.title}</p>
              </div>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-4 text-gold">
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-marble-800 font-bold ml-2">{tech.rating}</span>
                </div>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{tech.bio}</p>
                
                <h4 className="font-bold text-marble-900 mb-2 uppercase tracking-wide text-xs">Specialties</h4>
                <div className="flex flex-wrap gap-2 mb-6">
                  {tech.specialties.map(spec => (
                    <span key={spec} className="bg-marble-50 text-marble-800 text-xs px-2 py-1 rounded border border-marble-100">{spec}</span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-marble-100 pt-4 mt-auto">
                <div className="flex space-x-3 text-gray-400">
                  <span className="hover:text-gold cursor-pointer"><Globe size={20} /></span>
                  <span className="hover:text-gold cursor-pointer"><MessageCircle size={20} /></span>
                </div>
                <button 
                  onClick={() => handleBookTech(tech.id)}
                  className="bg-marble-900 text-white px-5 py-2 rounded-lg hover:bg-gold font-bold transition-colors shadow-md text-sm"
                >
                  Book {tech.name.split(' ')[0]}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
