
import React from 'react';
import { UserData, ActivationStatus } from '../types';
import Button from '../components/Button';
import Card from '../components/Card';
import { Settings, Share2, Award, Info, LifeBuoy, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProfileProps {
  user: UserData;
  activations: ActivationStatus[];
  onLogout: () => void;
}

const Profile: React.FC<ProfileProps> = ({ user, activations, onLogout }) => {
  const completedActivations = activations.filter(a => a.completed).length;

  const handleLogout = () => {
    // Simply trigger logout. 
    // The UserContext will update, causing ProtectedRoute to see no user,
    // which will now redirect to the Splash Screen (/) automatically.
    onLogout();
  };

  return (
    <div className="min-h-screen px-4 py-6 pb-24 space-y-6">
        
      {/* Profile Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="w-20 h-20 bg-gradient-to-br from-[#FF7812] to-[#FF4C29] rounded-full flex items-center justify-center text-3xl font-black italic shadow-[0_0_20px_rgba(255,120,18,0.4)]">
           {user.name.charAt(0)}
        </div>
        <div>
           <h2 className="text-2xl font-black uppercase italic leading-none">{user.name}</h2>
           <p className="text-[#00A89E] font-bold uppercase text-xs tracking-wider mt-1">{user.location}</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="text-center py-6">
            <div className="text-3xl font-black text-white mb-1">{completedActivations}</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Badges</div>
        </Card>
        <Card className="text-center py-6">
            <div className="text-3xl font-black text-white mb-1">01</div>
            <div className="text-[10px] text-gray-500 uppercase font-bold tracking-widest">Heat Rank</div>
        </Card>
      </div>

      {/* Digital ID Card */}
      <div className="mt-8">
        <h3 className="text-sm font-bold uppercase text-gray-500 mb-3 ml-1">Member ID</h3>
        <div className="bg-white text-black rounded-lg overflow-hidden relative h-48 flex flex-col justify-between p-4 shadow-xl">
           <div className="flex justify-between items-start">
              <div>
                  <div className="text-[10px] font-bold uppercase text-gray-400">Summer Jam 2026</div>
                  <div className="text-xl font-black uppercase italic">{user.name}</div>
              </div>
              <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                  <Award color="#FFA605" size={24} />
              </div>
           </div>
           
           <div className="space-y-1">
              <div className="text-[10px] uppercase font-bold text-gray-400">Valid Through</div>
              <div className="font-mono font-bold">FEB 2026</div>
              <div className="w-full h-8 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png')] bg-contain bg-no-repeat bg-left opacity-80 mt-2"></div>
           </div>
           
           {/* Holo Effect */}
           <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent opacity-50 pointer-events-none" style={{ mixBlendMode: 'overlay' }}></div>
        </div>
      </div>

      {/* Settings / Links */}
      <div className="pt-6 space-y-4">
         <h3 className="text-sm font-bold uppercase text-gray-500 ml-1">Settings & Info</h3>
         
         <div className="bg-[#1A1A1A] rounded-xl overflow-hidden border border-white/5">
             <Link to="/about" className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors border-b border-white/5">
                 <Info size={18} className="text-gray-400" />
                 <span className="text-sm font-bold text-white">About Summer Jam</span>
             </Link>
             <Link to="/about" className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors border-b border-white/5">
                 <Shield size={18} className="text-gray-400" />
                 <span className="text-sm font-bold text-white">Privacy & Terms</span>
             </Link>
             <Link to="/about" className="flex items-center gap-3 p-4 hover:bg-white/5 transition-colors">
                 <LifeBuoy size={18} className="text-gray-400" />
                 <span className="text-sm font-bold text-white">Support</span>
             </Link>
         </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-4">
        <Button variant="secondary" fullWidth className="flex items-center justify-center gap-2">
           <Share2 size={16} /> Share Profile
        </Button>
        <Button variant="outline" fullWidth onClick={handleLogout} className="flex items-center justify-center gap-2">
           <Settings size={16} /> Sign Out
        </Button>
      </div>

    </div>
  );
};

export default Profile;
