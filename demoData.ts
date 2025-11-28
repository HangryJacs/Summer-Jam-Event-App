
import { UserData, ActivationStatus } from './types';
import { STORAGE_KEYS } from './constants';

export const generateDemoUser = (): UserData => {
  return {
    firstName: "Jah",
    lastName: "Soloai",
    name: "Jah Soloai",
    email: "jah@summerjam.com.au",
    mobile: "0400 123 456",
    dob: "1998-11-23",
    gender: "Male",
    postcode: "3000",
    role: "Player",
    location: "Melbourne",
    ageBracket: "21-25",
    // @ts-ignore - entries is dynamically added
    entries: 150
  };
};

export const generateDemoLeaderboard = () => {
  const names = ["Kassie B.", "Sunday B.", "Tenaya S.", "Brodie S.", "Pat G.", "Emmanuel P.", "Abram H.", "Guy D.", "Piotr G."];
  return Array.from({ length: 50 }, (_, i) => ({
    id: `user-${i}`,
    name: names[i % names.length] + (Math.floor(i / names.length) > 0 ? ` ${i}` : ''),
    entries: Math.floor(Math.random() * 500) + 50,
    rank: i + 1,
    avatar: `https://i.pravatar.cc/150?u=${i}`
  })).sort((a, b) => b.entries - a.entries);
};

export const resetAllData = () => {
  localStorage.clear();
  window.dispatchEvent(new Event('storage'));
};

export const injectDemoData = () => {
  const user = generateDemoUser();
  localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  
  // Mark some activations as done
  const activations = [
    { id: 'nike', name: 'Nike Court', completed: true, type: 'Challenge' },
    { id: 'footlocker', name: 'Foot Locker', completed: true, type: 'Retail' },
    { id: 'maybelline', name: 'Maybelline', completed: false, type: 'Experience' },
    { id: 'gyg', name: 'Guzman y Gomez', completed: false, type: 'Food' },
    { id: 'jordan', name: 'Jordan Hangar', completed: false, type: 'VIP' },
    { id: 'entry', name: 'Entry Survey', completed: true, type: 'Feedback' },
    { id: 'exit', name: 'Exit Survey', completed: false, type: 'Feedback' },
  ];
  
  localStorage.setItem('summerjam_activations', JSON.stringify(activations));
  window.dispatchEvent(new Event('storage'));
};
