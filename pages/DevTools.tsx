
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, UserPlus, Zap, Database, ArrowLeft, RefreshCw } from 'lucide-react';
import Button from '../components/Button';
import { useUser } from '../context/UserContext';
import { resetAllData, injectDemoData } from '../demoData';
import toast from 'react-hot-toast';

const DevTools: React.FC = () => {
  const navigate = useNavigate();
  const { user, activations, addEntries, markActivationCompleted } = useUser();

  const handleReset = () => {
    if (window.confirm("Are you sure? This will wipe all local data.")) {
      resetAllData();
      toast.success("App data wiped");
      navigate('/splash');
    }
  };

  const handleInjectDemo = () => {
    injectDemoData();
    toast.success("Demo user & data injected");
    setTimeout(() => window.location.reload(), 500);
  };

  const handleUnlockAll = () => {
    activations.forEach(a => markActivationCompleted(a.id));
    toast.success("All activations unlocked");
  };

  return (
    <div className="min-h-screen bg-[#111] p-6 text-white font-mono">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate('/home')} className="p-2 bg-white/10 rounded-full hover:bg-white/20">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-[#FF7812] uppercase border-b-2 border-[#FF7812] pb-1">Dev Tools</h1>
      </div>

      <div className="grid gap-8 max-w-2xl mx-auto">
        
        {/* Actions */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest">Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button variant="outline" onClick={handleInjectDemo} className="flex items-center justify-center gap-2">
              <UserPlus size={18} /> Inject Demo User
            </Button>
            
            <Button variant="outline" onClick={() => addEntries(50)} className="flex items-center justify-center gap-2">
              <Zap size={18} /> Add 50 Entries
            </Button>
            
            <Button variant="outline" onClick={handleUnlockAll} className="flex items-center justify-center gap-2">
              <RefreshCw size={18} /> Complete All Activations
            </Button>

            <Button onClick={handleReset} className="flex items-center justify-center gap-2 bg-red-900/50 border-red-500 text-red-500 hover:bg-red-900">
              <Trash2 size={18} /> Reset Everything
            </Button>
          </div>
        </section>

        {/* State Inspector */}
        <section className="space-y-4">
          <h2 className="text-sm font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
            <Database size={16} /> Current State
          </h2>
          
          <div className="bg-black border border-white/10 rounded-xl p-4 overflow-x-auto">
            <pre className="text-xs text-green-400">
              {JSON.stringify({
                user: user,
                activations: activations.map(a => `${a.name}: ${a.completed ? '✅' : '❌'}`),
                localStorageKeys: Object.keys(localStorage)
              }, null, 2)}
            </pre>
          </div>
        </section>

      </div>
    </div>
  );
};

export default DevTools;
