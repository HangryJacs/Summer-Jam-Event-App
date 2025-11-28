
import React, { useState } from 'react';
import { MapPin, Clock, Calendar as CalendarIcon, Plus, ChevronDown, ChevronUp, Star, Zap } from 'lucide-react';
import toast from 'react-hot-toast';

// Type Definitions
type EventType = 'game' | 'registration' | 'special' | 'music' | 'activation';

interface ScheduleItem {
  id: string;
  city: string;
  date: string; // Grouping key
  time: string;
  title: string;
  location: string;
  type: EventType;
  guest?: string;
  isLive?: boolean;
}

// Dummy Data
const SCHEDULE_DATA: ScheduleItem[] = [
  // BRISBANE (Jan 18)
  { id: 'bne-1', city: 'Brisbane', date: 'Saturday, Jan 18', time: '09:00', title: 'Player Registration', location: 'UQ Centre Entrance', type: 'registration' },
  { id: 'bne-2', city: 'Brisbane', date: 'Saturday, Jan 18', time: '10:30', title: 'U18 Round Robin', location: 'Courts 1-3', type: 'game' },
  { id: 'bne-3', city: 'Brisbane', date: 'Saturday, Jan 18', time: '13:00', title: 'Open Mens Heats', location: 'Main Court', type: 'game' },
  { id: 'bne-4', city: 'Brisbane', date: 'Saturday, Jan 18', time: '16:00', title: 'Brisbane Finals', location: 'Showcourt', type: 'game' },

  // PERTH (Jan 24)
  { id: 'per-1', city: 'Perth', date: 'Friday, Jan 24', time: '14:00', title: 'Check-in Opens', location: 'Sterling Leisure Centre', type: 'registration' },
  { id: 'per-2', city: 'Perth', date: 'Friday, Jan 24', time: '15:00', title: 'DJ Set: DJ K-Note', location: 'Courtside', type: 'music' },
  { id: 'per-3', city: 'Perth', date: 'Friday, Jan 24', time: '15:30', title: 'Qualifying Rounds', location: 'Courts 1-4', type: 'game' },

  // MELBOURNE (Jan 26 - Qualifier)
  { id: 'mel-q-1', city: 'Melbourne', date: 'Sunday, Jan 26', time: '10:00', title: 'Registration', location: 'Princes Gardens', type: 'registration' },
  { id: 'mel-q-2', city: 'Melbourne', date: 'Sunday, Jan 26', time: '12:00', title: 'Heat 1 Tip-off', location: 'Outdoor Courts', type: 'game' },
  
  // SYDNEY (Jan 31)
  { id: 'syd-1', city: 'Sydney', date: 'Friday, Jan 31', time: '09:00', title: 'Gates Open', location: 'Sydenham Green', type: 'registration' },
  { id: 'syd-2', city: 'Sydney', date: 'Friday, Jan 31', time: '13:00', title: 'Sydney Qualifiers', location: 'Main Court', type: 'game' },

  // CHAMPIONSHIP DAY 1 (Feb 20)
  { id: 'ch-1', city: 'Melbourne', date: 'Friday, Feb 20', time: '16:00', title: 'Festival Gates Open', location: 'Peanut Farm Reserve', type: 'registration' },
  { id: 'ch-2', city: 'Melbourne', date: 'Friday, Feb 20', time: '17:00', title: 'Opening Ceremony', location: 'Main Stage', type: 'special', isLive: true, guest: 'Special Guest Performance' },
  { id: 'ch-3', city: 'Melbourne', date: 'Friday, Feb 20', time: '18:00', title: 'Round of 32', location: 'All Courts', type: 'game' },

  // CHAMPIONSHIP DAY 2 (Feb 21)
  { id: 'ch-4', city: 'Melbourne', date: 'Saturday, Feb 21', time: '11:00', title: 'Quarter Finals', location: 'Showcourt', type: 'game' },
  { id: 'ch-5', city: 'Melbourne', date: 'Saturday, Feb 21', time: '14:00', title: 'Foot Locker 3-Point Contest', location: 'Main Court', type: 'activation' },
  { id: 'ch-6', city: 'Melbourne', date: 'Saturday, Feb 21', time: '19:00', title: 'Celebrity All-Star Game', location: 'Showcourt', type: 'special', guest: 'Featuring TBA NBA Stars' },

  // CHAMPIONSHIP DAY 3 (Feb 22)
  { id: 'ch-7', city: 'Melbourne', date: 'Sunday, Feb 22', time: '12:00', title: 'Semi Finals', location: 'Showcourt', type: 'game' },
  { id: 'ch-8', city: 'Melbourne', date: 'Sunday, Feb 22', time: '15:00', title: 'Summer Jam Dunk Contest', location: 'Main Court', type: 'special' },
  { id: 'ch-9', city: 'Melbourne', date: 'Sunday, Feb 22', time: '17:00', title: 'Grand Final', location: 'Showcourt', type: 'game', isLive: true },
];

const CITIES = ['All', 'Brisbane', 'Perth', 'Melbourne', 'Sydney'];

const Schedule: React.FC = () => {
  const [selectedCity, setSelectedCity] = useState('All');
  // Initialize with all dates expanded
  const [expandedDates, setExpandedDates] = useState<Record<string, boolean>>({
      'Saturday, Jan 18': true,
      'Friday, Jan 24': true,
      'Sunday, Jan 26': true,
      'Friday, Jan 31': true,
      'Friday, Feb 20': true,
      'Saturday, Feb 21': true,
      'Sunday, Feb 22': true,
  });

  const toggleDate = (date: string) => {
    setExpandedDates(prev => ({ ...prev, [date]: !prev[date] }));
  };

  const handleAddToCalendar = (title: string) => {
    toast.success(`${title} added to calendar`, {
      icon: '📅',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  // Filter Data
  const filteredEvents = SCHEDULE_DATA.filter(item => 
    selectedCity === 'All' || item.city === selectedCity
  );

  // Group by Date (Array to preserve order)
  const groupedEvents = filteredEvents.reduce((acc, item) => {
    const existingGroup = acc.find(g => g.date === item.date);
    if (existingGroup) {
      existingGroup.events.push(item);
    } else {
      acc.push({ date: item.date, events: [item] });
    }
    return acc;
  }, [] as { date: string, events: ScheduleItem[] }[]);

  // Get event type icon/color
  const getEventStyle = (type: EventType) => {
    switch (type) {
      case 'game': return { icon: <Zap size={14} />, color: 'text-[#FF4C29]', bg: 'bg-[#FF4C29]/10', border: 'border-[#FF4C29]' };
      case 'special': return { icon: <Star size={14} />, color: 'text-[#FFA605]', bg: 'bg-[#FFA605]/10', border: 'border-[#FFA605]' };
      case 'registration': return { icon: <Clock size={14} />, color: 'text-[#00A89E]', bg: 'bg-[#00A89E]/10', border: 'border-[#00A89E]' };
      default: return { icon: <MapPin size={14} />, color: 'text-gray-400', bg: 'bg-white/5', border: 'border-white/10' };
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* 1. Header & Filters */}
      <div className="sticky top-16 z-30 bg-[#0A0A0A]/95 backdrop-blur-md border-b border-white/5 pb-2">
        <div className="px-6 pt-6 pb-2">
          <h1 className="text-3xl font-black italic uppercase text-white mb-4">Event Schedule</h1>
          
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
            {CITIES.map(city => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`
                  px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all
                  ${selectedCity === city 
                    ? 'bg-gradient-to-r from-[#FF7812] to-[#FF4C29] text-white shadow-[0_0_15px_rgba(255,120,18,0.4)]' 
                    : 'bg-[#1A1A1A] text-gray-400 border border-white/10 hover:border-white/30'
                  }
                `}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 2. Schedule List */}
      <div className="px-4 py-6 space-y-8">
        {groupedEvents.map(({ date, events }) => (
          <div key={date} className="">
            {/* Date Header */}
            <div className="bg-[#0A0A0A] py-4 mb-2 border-b border-white/10">
                <button 
                    onClick={() => toggleDate(date)}
                    className="w-full flex items-center justify-between group"
                >
                    <div className="flex items-center gap-3">
                        <CalendarIcon size={20} className="text-[#FFA605]" />
                        <h2 className="text-xl font-black italic uppercase text-white group-hover:text-[#FFA605] transition-colors tracking-wide">{date}</h2>
                    </div>
                    <div className={`p-2 rounded-full bg-white/5 transition-transform ${expandedDates[date] ? 'rotate-180' : ''}`}>
                        <ChevronDown size={16} className="text-gray-400" />
                    </div>
                </button>
            </div>

            {/* Events Timeline */}
            <div className={`
                space-y-0 relative pl-4 border-l-2 border-white/10 ml-2 transition-all duration-300 overflow-hidden
                ${expandedDates[date] ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}
            `}>
              {events.map((event, index) => {
                const style = getEventStyle(event.type);
                return (
                  <div key={event.id} className="relative pl-8 py-4 first:pt-2 last:pb-2 group">
                    {/* Timeline Dot */}
                    <div className={`
                        absolute left-[-5px] top-6 w-3 h-3 rounded-full border-2 bg-[#0A0A0A] z-10 transition-colors
                        ${event.isLive 
                            ? 'border-[#FF7812] bg-[#FF7812] animate-pulse shadow-[0_0_10px_#FF7812]' 
                            : 'border-gray-600 group-hover:border-[#FFA605]'
                        }
                    `}></div>

                    {/* Time */}
                    <div className={`
                        absolute left-[-60px] top-5 text-[10px] font-bold font-mono
                        ${event.isLive ? 'text-[#FF7812]' : 'text-gray-500'}
                    `}>
                        {event.time}
                    </div>

                    {/* Card */}
                    <div className={`
                        relative bg-[#121212] border rounded-xl p-4 transition-all active:scale-[0.98]
                        ${event.isLive 
                            ? 'border-[#FF7812] shadow-[0_0_15px_rgba(255,120,18,0.15)]' 
                            : 'border-white/5 hover:border-white/20'
                        }
                    `}>
                        {event.isLive && (
                            <div className="absolute -top-2 -right-2 bg-[#FF7812] text-white text-[8px] font-black uppercase px-2 py-1 rounded shadow-lg animate-bounce">
                                Live Now
                            </div>
                        )}

                        <div className="flex justify-between items-start">
                            <div className="flex-1">
                                <h3 className="text-base font-bold text-white mb-1 leading-tight">{event.title}</h3>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                                    <MapPin size={12} />
                                    <span>{event.location}</span>
                                </div>
                                
                                {event.guest && (
                                    <div className="inline-flex items-center gap-1 bg-[#365CAB]/20 text-[#365CAB] px-2 py-1 rounded text-[10px] font-bold uppercase mb-1">
                                        <Star size={10} fill="currentColor" /> {event.guest}
                                    </div>
                                )}
                            </div>

                            <button 
                                onClick={() => handleAddToCalendar(event.title)}
                                className="p-2 bg-white/5 rounded-full hover:bg-white/10 active:bg-[#FFA605] active:text-black transition-colors"
                            >
                                <Plus size={18} />
                            </button>
                        </div>
                        
                        {/* Event Type Tag */}
                        <div className={`
                            inline-flex items-center gap-1 px-2 py-1 rounded text-[10px] font-bold uppercase mt-2
                            ${style.bg} ${style.color}
                        `}>
                            {style.icon}
                            {event.type}
                        </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
        
        {/* Empty State */}
        {groupedEvents.length === 0 && (
            <div className="text-center py-12">
                <p className="text-gray-500 font-bold uppercase">No events found for {selectedCity}</p>
                <button 
                    onClick={() => setSelectedCity('All')}
                    className="text-[#FFA605] text-sm underline mt-2"
                >
                    View all cities
                </button>
            </div>
        )}
      </div>
      
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default Schedule;
