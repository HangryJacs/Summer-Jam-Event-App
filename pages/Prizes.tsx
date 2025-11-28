
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trophy, Gift, Ticket, ChevronLeft, Flame, Info } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { UserData } from '../types';

interface Prize {
  id: string;
  title: string;
  description: string;
  image: string;
  value: string;
  drawDate: string;
  partner?: string;
}

const PRIZES: Prize[] = [
  {
    id: '1',
    title: 'Signed Game Ball',
    description: 'Official Summer Jam game ball signed by special guest Cam Wilder.',
    image: 'https://images.unsplash.com/photo-1574623452334-1e0ac2b3ccb4?auto=format&fit=crop&q=80&w=600',
    value: '$Priceless',
    drawDate: 'Feb 22'
  },
  {
    id: '2',
    title: 'Nike Summer Jam Pack',
    description: 'Head-to-toe exclusive Summer Jam x Nike fit + unreleased kicks.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=600',
    value: '$1,200',
    partner: 'Nike',
    drawDate: 'Feb 22'
  },
  {
    id: '3',
    title: 'Foot Locker Voucher',
    description: '$500 to drop on whatever heat you want at any Foot Locker AU store.',
    image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=600',
    value: '$500',
    partner: 'Foot Locker',
    drawDate: 'Feb 21'
  },
  {
    id: '4',
    title: 'VIP Championship Pass',
    description: 'Courtside seats, lounge access, and free food/drinks for the finals.',
    image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=600',
    value: '$300',
    drawDate: 'Feb 20'
  },
  {
    id: '5',
    title: 'Maybelline Bundle',
    description: 'The ultimate "Beat the Heat" makeup kit + pro artistry session.',
    image: 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&q=80&w=600',
    value: '$250',
    partner: 'Maybelline',
    drawDate: 'Feb 21'
  },
  {
    id: '6',
    title: 'Year of Burritos',
    description: 'One free burrito every week for a whole year. Fuel for days.',
    image: 'https://images.unsplash.com/photo-1566740933430-b5e70b06d2d5?auto=format&fit=crop&q=80&w=600',
    value: '$800',
    partner: 'GYG',
    drawDate: 'Feb 22'
  },
];

const Prizes: React.FC = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState(0);

  useEffect(() => {
    const savedUser = localStorage.getItem('summerjam_user');
    if (savedUser) {
      const user: UserData = JSON.parse(savedUser);
      setEntries((user as any).entries || 0);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 p-4 sticky top-0 z-20 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate('/home')} className="p-1 -ml-2 text-gray-400 hover:text-white">
                <ChevronLeft />
            </button>
            <div>
                <h1 className="text-xl font-black italic uppercase text-white leading-none">Prizes & Rewards</h1>
                <p className="text-[10px] text-[#FFA605] font-bold uppercase tracking-wider">More entries = Better chances</p>
            </div>
         </div>
         <Trophy className="text-[#FFA605]" size={24} />
      </div>

      <div className="p-4 space-y-6">
        
        {/* 1. ENTRIES CARD */}
        <Card gradientBorder className="relative overflow-hidden">
           <div className="relative z-10 flex items-center justify-between mb-2">
              <div>
                  <h3 className="text-xs font-bold uppercase text-gray-400">Your Total Entries</h3>
                  <div className="text-5xl font-black italic text-white leading-none tracking-tight">{entries}</div>
              </div>
              <div className="text-right">
                  <div className="inline-flex items-center gap-1 bg-[#FF4C29]/20 border border-[#FF4C29]/50 px-3 py-1 rounded-full text-[#FF4C29] text-xs font-bold uppercase mb-1">
                      <Flame size={12} fill="currentColor" /> In The Running
                  </div>
              </div>
           </div>
           
           <p className="relative z-10 text-sm text-gray-300 mb-4">
              You have <span className="text-[#FFA605] font-bold">{entries} chances</span> to win big at the finals!
           </p>

           {/* Progress Visual */}
           <div className="relative z-10">
              <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                 {/* Visual filler that doesn't strictly represent a % because max entries is uncapped */}
                 <div 
                   className="h-full bg-gradient-to-r from-[#FF7812] via-[#FFA605] to-[#FF4C29] relative animate-pulse"
                   style={{ width: `${Math.min(entries * 2, 100)}%` }} // Arbitrary scale for visual effect
                 ></div>
              </div>
              <div className="flex justify-between mt-1">
                 <span className="text-[9px] uppercase font-bold text-gray-600">Starter</span>
                 <span className="text-[9px] uppercase font-bold text-gray-600">Baller Status</span>
              </div>
           </div>

           {/* Background Decoration */}
           <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-[#FF7812] rounded-full blur-[60px] opacity-10"></div>
        </Card>

        {/* 2. HOW TO WIN */}
        <div className="bg-[#1A1A1A] border border-white/5 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center shrink-0">
                <Ticket className="text-[#00A89E]" size={24} />
            </div>
            <div className="flex-1">
                <h3 className="text-sm font-bold uppercase text-white">How it works</h3>
                <p className="text-xs text-gray-400 mt-1">
                    Every activation you visit and form you complete earns you entries. 
                    <span className="text-[#00A89E]"> 1 Entry = 1 Chance.</span>
                </p>
            </div>
            <Button className="text-[10px] py-2 px-3 h-auto" onClick={() => navigate('/scanner')}>
                Scan Now
            </Button>
        </div>

        {/* 3. PRIZE POOL */}
        <div>
            <h2 className="text-lg font-black italic uppercase text-white mb-4 flex items-center gap-2">
                <Gift size={20} className="text-[#FF4C29]" /> 
                Prize Pool
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
                {PRIZES.map((prize) => (
                    <div key={prize.id} className="group relative bg-[#121212] border border-white/10 rounded-xl overflow-hidden hover:border-[#FF7812]/50 transition-colors">
                        {/* Image Area */}
                        <div className="h-32 w-full relative overflow-hidden">
                            <img 
                                src={prize.image} 
                                alt={prize.title} 
                                className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#121212] to-transparent"></div>
                            
                            {/* Tags */}
                            <div className="absolute bottom-2 left-2 flex gap-2">
                                {prize.partner && (
                                    <span className="bg-black/60 backdrop-blur-sm border border-white/10 px-2 py-1 rounded text-[10px] font-bold uppercase text-white">
                                        {prize.partner}
                                    </span>
                                )}
                                <span className="bg-[#FF7812] px-2 py-1 rounded text-[10px] font-bold uppercase text-black">
                                    Draw: {prize.drawDate}
                                </span>
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-4">
                            <div className="flex justify-between items-start mb-1">
                                <h3 className="text-base font-bold uppercase italic text-white">{prize.title}</h3>
                                {prize.value && <span className="text-xs font-bold text-[#00A89E]">{prize.value}</span>}
                            </div>
                            <p className="text-xs text-gray-400 leading-relaxed">{prize.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* 4. PAST WINNERS */}
        <div className="border border-dashed border-white/10 rounded-xl p-6 text-center">
            <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                <Info size={20} className="text-gray-500" />
            </div>
            <h3 className="text-sm font-bold uppercase text-gray-400">Winners Circle</h3>
            <p className="text-xs text-gray-600 mt-1">
                Major prize winners will be announced on the main stage after the Championship Final on Feb 22.
                Check your notifications!
            </p>
        </div>

      </div>
    </div>
  );
};

export default Prizes;
