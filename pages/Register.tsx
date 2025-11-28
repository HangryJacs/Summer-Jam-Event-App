import React, { useState } from 'react';
import { UserData } from '../types';
import Button from '../components/Button';
import toast from 'react-hot-toast';

interface RegisterProps {
  onRegister: (data: UserData) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [formData, setFormData] = useState<UserData>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
    postcode: '',
    role: '',
    location: 'Melbourne',
    ageBracket: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Simulate API call
    toast.success("Welcome to the Jam Fam!");
    onRegister({
      ...formData,
      name: `${formData.firstName} ${formData.lastName}`
    });
  };

  return (
    <div className="min-h-screen pt-4 px-6 pb-24">
      <div className="max-w-md mx-auto">
        <div className="mb-8">
          <h2 className="text-4xl font-black italic uppercase mb-2 thermal-text">Get Access</h2>
          <p className="text-gray-400">Create your profile to unlock exclusive drops, track your activations, and win prizes.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#FFA605]">First Name</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border-b-2 border-[#333] focus:border-[#FF7812] text-white p-4 outline-none transition-colors rounded-t-md"
                placeholder="JAH"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#FFA605]">Last Name</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border-b-2 border-[#333] focus:border-[#FF7812] text-white p-4 outline-none transition-colors rounded-t-md"
                placeholder="SOLOAI"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-[#FFA605]">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#1A1A1A] border-b-2 border-[#333] focus:border-[#FF7812] text-white p-4 outline-none transition-colors rounded-t-md"
              placeholder="BALLER@EXAMPLE.COM"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#FFA605]">City</label>
              <select
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border-b-2 border-[#333] focus:border-[#FF7812] text-white p-4 outline-none transition-colors rounded-t-md appearance-none"
              >
                <option value="Brisbane">Brisbane</option>
                <option value="Perth">Perth</option>
                <option value="Melbourne">Melbourne</option>
                <option value="Sydney">Sydney</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#FFA605]">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-[#1A1A1A] border-b-2 border-[#333] focus:border-[#FF7812] text-white p-4 outline-none transition-colors rounded-t-md appearance-none"
              >
                <option value="" disabled>Select</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Non-binary">Non-binary</option>
                <option value="Prefer not to say">N/A</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-[#FFA605]">Age Bracket</label>
              <div className="grid grid-cols-3 gap-2">
                {['16-20', '21-25', '26-30', '31-35', '35+'].map((age) => (
                  <button
                    type="button"
                    key={age}
                    onClick={() => setFormData({...formData, ageBracket: age})}
                    className={`p-3 text-sm font-bold border ${
                      formData.ageBracket === age 
                        ? 'bg-[#FF7812] border-[#FF7812] text-white' 
                        : 'bg-transparent border-[#333] text-gray-500'
                    } rounded transition-all`}
                  >
                    {age}
                  </button>
                ))}
              </div>
          </div>

          <div className="pt-6">
            <Button type="submit" fullWidth>
              Enter The Court
            </Button>
            <p className="text-[10px] text-center text-gray-500 mt-4">
              By joining, you agree to share data with activation partners including Nike, Foot Locker, and Maybelline.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;