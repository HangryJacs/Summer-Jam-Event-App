
import React from 'react';
import { Link } from 'react-router-dom';
import { UserData } from '../types';

interface HeaderProps {
  user: UserData | null;
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  return (
    <header className="fixed top-0 left-1/2 -translate-x-1/2 w-full max-w-md z-50 h-16 flex items-center justify-between px-4 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/5">
      <Link to="/home" className="flex items-center gap-2 group">
        {/* Logo Icon */}
        <div className="w-8 h-8 bg-gradient-to-br from-[#FF7812] to-[#FF4C29] rounded-lg flex items-center justify-center transform rotate-3 shadow-[0_4px_15px_rgba(255,120,18,0.3)] group-hover:rotate-6 transition-transform">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            {/* Crown */}
            <path d="M7 7L10 4L12 6L14 4L17 7" />
            {/* Net Body */}
            <path d="M7 7H17C17 7 18 14 12 20C6 14 7 7 7 7Z" />
            {/* Net Lines */}
            <path d="M10 7L14 16" />
            <path d="M14 7L10 16" />
            <path d="M7 11H17" />
          </svg>
        </div>
        
        {/* Logo Text */}
        <div className="flex flex-col">
          <span className="text-white font-black italic uppercase leading-none tracking-tighter text-lg">
            Summer Jam
          </span>
          <span className="text-[8px] text-[#FFA605] font-bold uppercase tracking-[0.25em] leading-none ml-[1px] mt-[2px]">
            Championship
          </span>
        </div>
      </Link>

      {/* Profile Avatar */}
      {user && (
        <div className="flex items-center gap-3">
           <div className="bg-[#FF4C29] text-white text-[8px] font-black uppercase px-2 py-1 rounded shadow-lg pointer-events-none">
              Demo Mode
           </div>
           <Link to="/profile">
              <div className="h-8 w-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-xs font-bold text-white backdrop-blur-md shadow-inner hover:bg-white/20 transition-all hover:scale-105 active:scale-95">
                  {user.name.charAt(0).toUpperCase()}
              </div>
           </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
