import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import Button from '../components/Button';
import toast from 'react-hot-toast';

const BrandForm: React.FC = () => {
  const { brandId } = useParams();
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  // Derive title from ID for demo
  const title = brandId ? brandId.replace('-', ' ').toUpperCase() : 'ACTIVATION';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API delay
    toast.loading('Submitting entry...', { duration: 1000 });
    setTimeout(() => {
        toast.dismiss();
        setSubmitted(true);
        toast.success("Entry Confirmed!");
    }, 1000);
  };

  if (submitted) {
     return (
        <div className="min-h-screen bg-[#0A0A0A] flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-[#00A89E]/20 rounded-full flex items-center justify-center mb-6 animate-bounce-slight">
                <CheckCircle2 size={40} className="text-[#00A89E]" />
            </div>
            <h2 className="text-3xl font-black italic uppercase text-white mb-2">Unlocked!</h2>
            <p className="text-gray-400 mb-8 max-w-xs mx-auto">You've successfully checked in at the {title} zone. Your entries have been added.</p>
            <Button fullWidth onClick={() => navigate('/home')}>Return to Hub</Button>
        </div>
     );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] pb-24">
      {/* Header */}
      <div className="bg-[#121212] border-b border-white/5 p-4 sticky top-0 z-10 flex items-center gap-4">
         <button onClick={() => navigate('/scanner')} className="p-2 -ml-2 text-gray-400 hover:text-white">
            <ChevronLeft />
         </button>
         <h1 className="text-lg font-black italic uppercase text-white tracking-wide">{title} Check-In</h1>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
           <div className="bg-[#1A1A1A] p-6 rounded-xl border border-white/5 text-center mb-8">
              <p className="text-[#FFA605] font-bold uppercase text-xs tracking-widest mb-2">Prize Multiplier</p>
              <h2 className="text-4xl font-black text-white italic">2X ENTRIES</h2>
           </div>

           <div className="space-y-4">
              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-gray-500">How did you hear about us?</label>
                 <select className="w-full bg-[#121212] border border-[#333] text-white p-4 rounded-lg outline-none focus:border-[#FF7812]">
                    <option>Social Media</option>
                    <option>Friend</option>
                    <option>Event Signage</option>
                 </select>
              </div>

              <div className="space-y-2">
                 <label className="text-xs font-bold uppercase text-gray-500">Rate the vibe (1-5)</label>
                 <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map(num => (
                        <button key={num} type="button" className="flex-1 bg-[#121212] border border-[#333] py-3 rounded-lg text-white font-bold hover:bg-[#FF7812] hover:border-[#FF7812] transition-colors focus:bg-[#FF7812]">
                            {num}
                        </button>
                    ))}
                 </div>
              </div>
              
              <div className="flex items-center gap-3 pt-2">
                  <input type="checkbox" id="marketing" className="w-5 h-5 accent-[#FF7812] bg-[#121212]" />
                  <label htmlFor="marketing" className="text-xs text-gray-400">Subscribe to {title} newsletter for exclusive drops</label>
              </div>
           </div>

           <Button fullWidth type="submit" className="mt-8">Confirm Check-In</Button>
        </form>
      </div>
    </div>
  );
};

export default BrandForm;