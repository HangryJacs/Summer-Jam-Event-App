
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Play, QrCode, Calendar, Ticket, Handshake, Flame } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import { UserData } from '../types';

const Home: React.FC = () => {
  // Countdown Timer State
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [userEntries, setUserEntries] = useState(0);

  useEffect(() => {
    // Target: Jan 18, 2026 (Brisbane)
    const targetDate = new Date('2026-01-18T09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    // Get User Entries
    const savedUser = localStorage.getItem('summerjam_user');
    if (savedUser) {
      const user: UserData = JSON.parse(savedUser);
      setUserEntries((user as any).entries || 0);
    }

    // Listen for storage events (if user fills form in another tab or component updates it)
    const handleStorageChange = () => {
       const updatedUserStr = localStorage.getItem('summerjam_user');
       if (updatedUserStr) {
         const u: UserData = JSON.parse(updatedUserStr);
         setUserEntries((u as any).entries || 0);
       }
    };
    window.addEventListener('storage', handleStorageChange);

    return () => {
        clearInterval(interval);
        window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Quick Actions Data
  const quickActions = [
    { label: 'Scan Code', icon: QrCode, to: '/scanner', color: 'text-[#FFA605]' },
    { label: 'My Pass', icon: Ticket, to: '/access-pass-welcome', color: 'text-[#00A89E]' },
    { label: 'Schedule', icon: Calendar, to: '/schedule', color: 'text-[#FF4C29]' },
    { label: 'Partners', icon: Handshake, to: '/activations', color: 'text-[#365CAB]' },
  ];

  // Live Feed Images
  const feedImages = [
    'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=400&q=80', // Hoop
    'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=400&q=80', // Court
    'https://images.unsplash.com/photo-1515523110800-9415d13b84a8?auto=format&fit=crop&w=400&q=80', // Action
    'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&w=400&q=80', // Ball
    'https://images.unsplash.com/photo-1608245449230-4ac19066d2d0?auto=format&fit=crop&w=400&q=80', // Game
    'https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?auto=format&fit=crop&w=400&q=80', // Street
  ];

  return (
    <div className="flex flex-col gap-6 pb-24">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[45vh] min-h-[400px] flex flex-col justify-end p-6 overflow-hidden bg-gray-900 border-b border-white/10">
        {/* Background Video/Image Placeholder */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505666287802-931dc83948e9?q=80&w=1000&auto=format&fit=crop')] bg-cover bg-center opacity-60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>
        </div>

        <div className="relative z-10 w-full">
           <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-[#FF4C29] rounded-full animate-pulse"></div>
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#FFA605]">Next Stop: Brisbane</span>
           </div>
           
           <h1 className="text-5xl font-black italic uppercase leading-[0.9] text-white mb-6">
              The Heat<br/>
              <span className="thermal-text">Is On</span>
           </h1>

           {/* Countdown Timer */}
           <div className="grid grid-cols-4 gap-2 mb-6">
              {[
                { val: timeLeft.days, label: 'Days' },
                { val: timeLeft.hours, label: 'Hrs' },
                { val: timeLeft.minutes, label: 'Mins' },
                { val: timeLeft.seconds, label: 'Secs' }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/10 backdrop-blur-md rounded-lg p-2 text-center border border-white/5">
                   <div className="text-xl font-black text-white">{String(item.val).padStart(2, '0')}</div>
                   <div className="text-[8px] uppercase font-bold text-gray-400">{item.label}</div>
                </div>
              ))}
           </div>

           <Button fullWidth requiresFullVersion className="flex items-center justify-center gap-2 text-sm py-3">
              <Play size={16} fill="currentColor" /> Watch Live Stream
           </Button>
        </div>
      </section>

      {/* 2. YOUR STATUS CARD */}
      <section className="px-4">
        <Link to="/prizes">
          <Card gradientBorder className="relative overflow-hidden group transition-all active:scale-95">
            <div className="flex justify-between items-center mb-4 relative z-10 mt-6">
                <div>
                  <h3 className="text-sm font-bold uppercase text-gray-400">Total Entries</h3>
                  <div className="text-4xl font-black italic text-white leading-none">{userEntries}</div>
                </div>
                <div className="w-12 h-12 bg-[#FF7812]/20 rounded-full flex items-center justify-center border border-[#FF7812]/50">
                  <Flame size={24} className="text-[#FF7812] animate-pulse" />
                </div>
            </div>
            
            <p className="text-sm font-medium text-white mb-3 relative z-10">
                You've earned <span className="text-[#FFA605] font-bold">{userEntries} entries</span> to win!
            </p>

            {/* Heat Meter */}
            <div className="relative z-10">
                <div className="flex justify-between text-[8px] uppercase font-bold text-gray-500 mb-1">
                  <span>Cold</span>
                  <span>On Fire</span>
                </div>
                <div className="h-3 bg-gray-800 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-gradient-to-r from-[#365CAB] via-[#FF7812] to-[#FF4C29] relative transition-all duration-1000"
                    style={{ width: `${Math.min(Math.max(userEntries * 2, 5), 100)}%` }}
                  >
                      <div className="absolute top-0 right-0 bottom-0 w-[2px] bg-white shadow-[0_0_10px_white]"></div>
                  </div>
                </div>
            </div>
            
            {/* Background Deco */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-[#FF4C29] rounded-full blur-[60px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
            
            {/* Arrow indicating clickability */}
            <div className="absolute top-4 right-4 text-gray-500 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] uppercase font-bold">View Prizes &rarr;</span>
            </div>
          </Card>
        </Link>
      </section>

      {/* 3. ABOUT SUMMER JAM */}
      <section className="px-4">
         <Link to="/about">
            <Card className="bg-[#1A1A1A] border border-white/5 hover:border-white/20 p-6 flex items-center justify-between group transition-all active:scale-95">
               <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-[#FFA605]">
                     <Flame size={24} />
                  </div>
                  <div>
                     <h3 className="text-lg font-black italic uppercase text-white leading-none mb-1">About The Jam</h3>
                     <p className="text-xs text-gray-400 font-medium">Learn more about the event & rules</p>
                  </div>
               </div>
               <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#FF7812] transition-colors">
                  <Play size={14} className="text-gray-400 group-hover:text-white ml-0.5" fill="currentColor" />
               </div>
            </Card>
         </Link>
      </section>

      {/* 4. LIVE FEED */}
      <section className="px-4">
         <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-black italic uppercase text-white flex items-center gap-2">
               <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
               Live From The Jam
            </h2>
            <span className="text-[10px] font-bold uppercase text-[#00A89E] tracking-wider">@SUMMERJAMAU</span>
         </div>
         
         <div className="grid grid-cols-3 gap-1">
            {feedImages.map((src, idx) => (
               <div key={idx} className="aspect-square relative group overflow-hidden bg-gray-900 rounded-sm">
                  <img 
                    src={src} 
                    alt="Event Feed" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110 opacity-80 group-hover:opacity-100" 
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#FF7812]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                     <Flame size={20} className="text-white drop-shadow-md" fill="white" />
                  </div>
               </div>
            ))}
         </div>
         <Button variant="ghost" fullWidth requiresFullVersion className="mt-4 text-xs">View Full Gallery</Button>
      </section>

    </div>
  );
};

export default Home;
