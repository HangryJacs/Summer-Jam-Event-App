
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronDown, ChevronUp, MapPin, QrCode, CheckCircle2, Trophy, Instagram, Facebook, Twitter, Mail, HelpCircle } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const About: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5 p-4 sticky top-0 z-20 flex items-center justify-between">
         <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="p-1 -ml-2 text-gray-400 hover:text-white">
                <ChevronLeft />
            </button>
            <h1 className="text-xl font-black italic uppercase text-white leading-none">About The Jam</h1>
         </div>
      </div>

      <div className="p-4 space-y-12">

        {/* 1. WHAT IS SUMMER JAM */}
        <section className="space-y-4">
           <h2 className="text-4xl font-black italic uppercase text-white leading-[0.9]">
              The <span className="text-[#FF7812]">Jam</span>
           </h2>
           <div className="prose prose-invert text-sm text-gray-400 leading-relaxed space-y-4">
              <p>
                 Summer Jam isn't just a tournament; it's a movement. Born on the blistering blacktops of Melbourne in 2012, we set out to create a stage for the 99%—the streetballers, the ankles-breakers, and the culture creators who live for the game but don't play in the leagues.
              </p>
              <p>
                 Rooted in the heritage of And1 mixtapes and raw street culture, Summer Jam creates a high-energy, high-stakes environment where respect is earned play by play.
              </p>
              <p className="text-white font-bold uppercase tracking-wide border-l-4 border-[#00A89E] pl-4">
                 "We bring the heat so you can keep your cool."
              </p>
           </div>
        </section>

        {/* 2. HOW TO WIN */}
        <section>
           <div className="flex items-center gap-2 mb-6">
              <Trophy className="text-[#FFA605]" size={24} />
              <h2 className="text-2xl font-black italic uppercase text-white">How To Win</h2>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
              {[
                 { icon: QrCode, title: '1. Scan Codes', text: 'Find QR codes at brand activation zones throughout the event.', color: 'text-[#FF7812]' },
                 { icon: CheckCircle2, title: '2. Check In', text: 'Complete quick surveys or challenges on your mobile.', color: 'text-[#00A89E]' },
                 { icon: Trophy, title: '3. Earn Entries', text: 'Every check-in boosts your entries into the prize draw.', color: 'text-[#FFA605]' },
                 { icon: GiftIcon, title: '4. Win Big', text: 'Major prizes drawn after the Championship Final.', color: 'text-[#FF4C29]' }
              ].map((step, idx) => (
                 <div key={idx} className="bg-[#1A1A1A] rounded-xl p-4 flex items-start gap-4 border border-white/5">
                    <div className={`p-3 rounded-full bg-white/5 ${step.color}`}>
                       <step.icon size={24} />
                    </div>
                    <div>
                       <h3 className="text-base font-bold uppercase text-white mb-1">{step.title}</h3>
                       <p className="text-xs text-gray-400">{step.text}</p>
                    </div>
                 </div>
              ))}
           </div>
        </section>

        {/* 3. PARTNERS */}
        <section>
           <h2 className="text-2xl font-black italic uppercase text-white mb-6 text-center">Our Partners</h2>
           <p className="text-center text-xs text-gray-500 mb-6 uppercase tracking-widest">Making the culture possible</p>
           
           <div className="grid grid-cols-2 gap-4">
              {['Nike', 'Foot Locker', 'Jordan', 'Maybelline', 'Guzman y Gomez', 'Red Bull'].map((brand, idx) => (
                 <div key={idx} className="h-16 bg-white rounded-lg flex items-center justify-center opacity-90 hover:opacity-100 transition-opacity">
                    <span className="text-black font-black uppercase italic tracking-tighter text-lg">{brand}</span>
                 </div>
              ))}
           </div>
        </section>

        {/* 4. EVENT INFO */}
        <section className="bg-[#121212] rounded-xl border border-white/10 overflow-hidden">
           <div className="bg-[#1A1A1A] p-4 border-b border-white/5">
              <h2 className="text-lg font-bold uppercase text-white flex items-center gap-2">
                 <MapPin size={18} className="text-[#FF4C29]" /> Tour Locations
              </h2>
           </div>
           <div className="divide-y divide-white/5">
              {[
                 { city: 'Brisbane', date: 'Jan 18', loc: 'UQ, St. Lucia' },
                 { city: 'Perth', date: 'Jan 24', loc: 'Sterling Leisure Centre' },
                 { city: 'Melbourne', date: 'Jan 26', loc: 'Princes Gardens' },
                 { city: 'Sydney', date: 'Jan 31', loc: 'Sydenham Green' },
                 { city: 'Championship', date: 'Feb 20-22', loc: 'Peanut Farm, St Kilda', highlight: true },
              ].map((item, idx) => (
                 <div key={idx} className={`p-4 flex justify-between items-center ${item.highlight ? 'bg-[#FF7812]/10' : ''}`}>
                    <div>
                       <div className={`font-bold uppercase ${item.highlight ? 'text-[#FF7812]' : 'text-white'}`}>{item.city}</div>
                       <div className="text-xs text-gray-500">{item.loc}</div>
                    </div>
                    <div className="text-xs font-mono font-bold text-gray-400">{item.date}</div>
                 </div>
              ))}
           </div>
        </section>

        {/* 5. FAQS */}
        <section>
           <h2 className="text-2xl font-black italic uppercase text-white mb-6">FAQ</h2>
           <div className="space-y-2">
              <FAQItem 
                 question="How do I win prizes?" 
                 answer="Simply scan QR codes located at our partner activations (Nike, Foot Locker, etc.). Each scan allows you to complete a form or challenge, earning you entries into the draw." 
              />
              <FAQItem 
                 question="When are winners announced?" 
                 answer="Major prizes are drawn and announced on the main stage after the Championship Grand Final on Sunday, Feb 22nd. We will also notify winners via the app." 
              />
              <FAQItem 
                 question="Is entry free?" 
                 answer="Yes! Summer Jam is a free community event for spectators. Player registration fees apply for the tournament." 
              />
              <FAQItem 
                 question="Can I share my Access Pass?" 
                 answer="Your Access Pass is unique to you and tied to your winning entries. We recommend every person registers their own pass to maximize their chances of winning." 
              />
              <FAQItem 
                 question="What if I don't have data?" 
                 answer="We have free Wi-Fi zones available near the main court and registration tent. Ask a staff member for the password!" 
              />
           </div>
        </section>

        {/* 6. FOOTER */}
        <footer className="pt-8 border-t border-white/10 text-center space-y-6">
           <div className="flex justify-center gap-6">
              <a href="#" className="text-gray-400 hover:text-[#FFA605]"><Instagram size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-[#FFA605]"><Facebook size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-[#FFA605]"><Twitter size={24} /></a>
              <a href="#" className="text-gray-400 hover:text-[#FFA605]"><Mail size={24} /></a>
           </div>
           
           <div className="flex justify-center gap-4 text-xs text-gray-500 font-bold uppercase tracking-wider">
              <a href="#" className="hover:text-white">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-white">Terms & Conditions</a>
              <span>•</span>
              <a href="#" className="hover:text-white">Support</a>
           </div>

           <div className="text-[10px] text-gray-600 font-mono">
              © 2026 Summer Jam Australia. All rights reserved.
           </div>
           <div className="text-[10px] text-gray-600 font-mono tracking-widest uppercase">
              Powered by ThinkSwift
           </div>
        </footer>

      </div>
    </div>
  );
};

// Helper Component for Icons
const GiftIcon = ({ size, className }: { size: number, className?: string }) => (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <polyline points="20 12 20 22 4 22 4 12" />
      <rect x="2" y="7" width="20" height="5" />
      <line x1="12" y1="22" x2="12" y2="7" />
      <path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z" />
      <path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z" />
    </svg>
);

// Helper Component for FAQ
const FAQItem = ({ question, answer }: { question: string, answer: string }) => {
   const [isOpen, setIsOpen] = useState(false);

   return (
      <div className="border border-white/10 rounded-xl bg-[#121212] overflow-hidden">
         <button 
            onClick={() => setIsOpen(!isOpen)}
            className="w-full p-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
         >
            <span className="font-bold text-sm text-white">{question}</span>
            {isOpen ? <ChevronUp size={16} className="text-[#FF7812]" /> : <ChevronDown size={16} className="text-gray-400" />}
         </button>
         
         <div className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
            <div className="p-4 pt-0 text-xs text-gray-400 leading-relaxed border-t border-white/5 mt-2">
               {answer}
            </div>
         </div>
      </div>
   );
};

export default About;
