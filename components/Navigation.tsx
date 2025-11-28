import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Calendar, QrCode, User, Handshake } from 'lucide-react';

const Navigation: React.FC = () => {
  const navItems = [
    { to: '/home', icon: Home, label: 'Home' },
    { to: '/schedule', icon: Calendar, label: 'Schedule' },
    { to: '/scanner', icon: QrCode, label: 'Scan', isPrimary: true },
    { to: '/activations', icon: Handshake, label: 'Drops' },
    { to: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-[#0A0A0A]/95 backdrop-blur-md border-t border-white/10 z-50 pb-safe">
      <div className="flex justify-around items-end h-20 pb-4 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            className={({ isActive }) => `
              flex flex-col items-center justify-center w-full space-y-1
              ${item.isPrimary ? 'mb-4' : ''}
              ${isActive ? 'text-[#FFA605]' : 'text-gray-500'}
            `}
          >
            {({ isActive }) => (
              <>
                {item.isPrimary ? (
                  <div className="bg-gradient-to-tr from-[#FF7812] to-[#FF4C29] p-4 rounded-full shadow-[0_0_15px_rgba(255,120,18,0.5)] -mt-8 border-4 border-[#0A0A0A] transform transition-transform active:scale-95">
                    <item.icon size={28} color="white" strokeWidth={2.5} />
                  </div>
                ) : (
                  <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
                )}
                <span className={`text-[10px] uppercase font-bold tracking-wider ${item.isPrimary ? 'mt-1' : ''}`}>
                  {item.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;