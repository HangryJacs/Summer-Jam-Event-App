
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, AlertCircle, Check, Lock, ChevronRight } from 'lucide-react';
import Button from '../components/Button';
import toast from 'react-hot-toast';
import { UserData } from '../types';

interface AuthProps {
  onLogin: (data: UserData) => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const navigate = useNavigate();
  // REQUIREMENT: Swap log in to the default open option
  const [activeTab, setActiveTab] = useState<'signup' | 'login'>('login');
  const [showPassword, setShowPassword] = useState(false);
  
  // Sign Up Form State - Removed mobile and dob
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    postcode: '',
    role: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Login Form State
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRoleSelect = (role: string) => {
    setFormData(prev => ({ ...prev, role }));
    if (errors.role) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.role;
        return newErrors;
      });
    }
  };

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.firstName.trim()) newErrors.firstName = 'Required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Valid email required';
    }

    // Removed Mobile and DOB validation

    const postcodeRegex = /^\d{4}$/;
    if (!formData.postcode || !postcodeRegex.test(formData.postcode)) {
      newErrors.postcode = '4 digits required';
    }

    if (!formData.role) newErrors.role = 'Select a role';

    if (!formData.password || formData.password.length < 8) {
      newErrors.password = 'Min 8 chars';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords mismatch';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser: UserData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        mobile: '', // Field removed from UI
        dob: '',    // Field removed from UI
        gender: formData.gender || 'Not specified',
        postcode: formData.postcode,
        role: formData.role,
        location: formData.postcode === '3000' ? 'Melbourne' : 'Australia', 
      };

      onLogin(newUser);
      navigate('/access-pass-welcome');
    } else {
      toast.error("Please fix the errors");
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginData.email && loginData.password) {
        const mockUser: UserData = {
            firstName: 'Demo',
            lastName: 'User',
            name: 'Demo User',
            email: loginData.email,
            mobile: '',
            dob: '',
            gender: 'Male',
            postcode: '3000',
            role: 'Player'
        };
        onLogin(mockUser);
        navigate('/home');
        toast.success("Welcome back!");
    } else {
        toast.error("Invalid credentials");
    }
  };

  const InputField = ({ 
    label, 
    name, 
    type = "text", 
    value, 
    placeholder, 
    required = false,
    error 
  }: any) => (
    <div className="space-y-1.5">
      <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 flex justify-between ml-1">
        {label} {required && <span className="text-[#FF4C29]">*</span>}
      </label>
      <div className="relative group">
        <input
          type={type}
          name={name}
          value={value}
          onChange={handleInputChange}
          placeholder={placeholder}
          className={`
            w-full bg-[#121212] border-2 text-white p-3.5 text-sm outline-none transition-all rounded-xl placeholder-gray-600
            ${error 
              ? 'border-[#FF4C29]/50 bg-[#FF4C29]/5' 
              : 'border-white/5 focus:border-[#FF7812] focus:bg-[#1A1A1A] group-hover:border-white/10'
            }
          `}
        />
        {error && (
          <div className="absolute right-3 top-3.5 text-[#FF4C29]">
            <AlertCircle size={18} />
          </div>
        )}
      </div>
      {error && <p className="text-[#FF4C29] text-[10px] font-bold ml-1">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0A0A0A] relative overflow-x-hidden flex flex-col items-center justify-center py-12 px-4">
        {/* Background Gradients - Adjusted for subtler look */}
        <div className="fixed inset-0 pointer-events-none z-0">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[60vh] bg-gradient-to-b from-[#111] to-[#0A0A0A]"></div>
             <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-[#FF7812] rounded-full blur-[150px] opacity-[0.08]"></div>
             <div className="absolute bottom-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-[#365CAB] rounded-full blur-[150px] opacity-[0.08]"></div>
        </div>

        <div className="w-full max-w-md relative z-10 pt-12 pt-safe">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-4xl font-black italic uppercase text-white mb-2 tracking-tight">Access Pass</h2>
                <p className="text-gray-400 text-sm">Join the championship. Earn entries. Win.</p>
            </div>

            {/* Main Card */}
            <div className="bg-[#121212]/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                
                {/* Tabs */}
                <div className="flex border-b border-white/5">
                    <button
                        onClick={() => setActiveTab('login')}
                        className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${
                            activeTab === 'login' ? 'bg-[#1A1A1A] text-[#FFA605]' : 'bg-transparent text-gray-500 hover:text-white'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveTab('signup')}
                        className={`flex-1 py-4 text-xs font-bold uppercase tracking-wider transition-all ${
                            activeTab === 'signup' ? 'bg-[#1A1A1A] text-[#FFA605]' : 'bg-transparent text-gray-500 hover:text-white'
                        }`}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="p-6">
                    {/* Login Form */}
                    {activeTab === 'login' && (
                        <form onSubmit={handleLoginSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                             <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={loginData.email}
                                        onChange={handleLoginChange}
                                        className="w-full bg-[#0A0A0A] border-2 border-white/5 focus:border-[#FF7812] text-white p-3.5 rounded-xl outline-none transition-colors"
                                        placeholder="baller@example.com"
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Password</label>
                                    <div className="relative">
                                        <input
                                            type="password"
                                            name="password"
                                            value={loginData.password}
                                            onChange={handleLoginChange}
                                            className="w-full bg-[#0A0A0A] border-2 border-white/5 focus:border-[#FF7812] text-white p-3.5 rounded-xl outline-none transition-colors"
                                            placeholder="••••••••"
                                        />
                                    </div>
                                </div>
                             </div>

                             <div className="pt-2">
                                <Button 
                                    type="submit" 
                                    fullWidth 
                                    className="py-4 text-base shadow-[0_4px_20px_rgba(255,120,18,0.2)] flex items-center justify-center gap-2"
                                >
                                    Sign In <ChevronRight size={18} />
                                </Button>
                             </div>
                             
                             <div className="text-center pt-2">
                                <button type="button" className="text-xs text-gray-500 hover:text-[#FFA605] transition-colors font-medium">
                                    Forgot Password?
                                </button>
                             </div>
                        </form>
                    )}

                    {/* Sign Up Form */}
                    {activeTab === 'signup' && (
                        <form onSubmit={handleSignUpSubmit} className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="First Name" name="firstName" value={formData.firstName} required error={errors.firstName} placeholder="JAH" />
                                <InputField label="Last Name" name="lastName" value={formData.lastName} required error={errors.lastName} placeholder="SOLOAI" />
                            </div>

                            <InputField label="Email" name="email" type="email" value={formData.email} required error={errors.email} placeholder="you@example.com" />
                            
                            <div className="grid grid-cols-2 gap-4">
                                <InputField label="Postcode" name="postcode" value={formData.postcode} required error={errors.postcode} placeholder="3000" />
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Gender</label>
                                    <select
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleInputChange}
                                        className="w-full bg-[#121212] border-2 border-white/5 focus:border-[#FF7812] text-white p-3.5 text-sm rounded-xl outline-none transition-colors appearance-none"
                                    >
                                        <option value="">Select</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Non-binary">Non-binary</option>
                                        <option value="Prefer not to say">N/A</option>
                                    </select>
                                </div>
                            </div>

                            {/* Role Buttons */}
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1 flex justify-between">
                                    Select Your Role {errors.role && <span className="text-[#FF4C29]">{errors.role}</span>}
                                </label>
                                <div className="grid grid-cols-2 gap-2">
                                    {['Player', 'Spectator', 'Culture Catalyst', 'Media'].map((role) => (
                                        <button
                                            key={role}
                                            type="button"
                                            onClick={() => handleRoleSelect(role)}
                                            className={`
                                                p-3 rounded-lg border-2 text-xs font-bold uppercase tracking-wide transition-all duration-200
                                                ${formData.role === role 
                                                    ? 'border-[#FF7812] bg-[#FF7812]/20 text-white shadow-[0_0_10px_rgba(255,120,18,0.2)]' 
                                                    : 'border-white/5 bg-[#0A0A0A] text-gray-500 hover:border-white/20 hover:text-gray-300'
                                                }
                                            `}
                                        >
                                            {role}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Password Fields */}
                            <div className="space-y-4 pt-2">
                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Password <span className="text-[#FF4C29]">*</span></label>
                                    <div className="relative">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            className={`w-full bg-[#121212] border-2 text-white p-3.5 text-sm rounded-xl outline-none transition-colors pr-10 ${errors.password ? 'border-[#FF4C29]/50' : 'border-white/5 focus:border-[#FF7812]'}`}
                                            placeholder="Min 8 characters"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3.5 text-gray-500 hover:text-white"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    {errors.password && <p className="text-[#FF4C29] text-[10px] font-bold ml-1">{errors.password}</p>}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-[11px] font-bold uppercase tracking-wider text-gray-400 ml-1">Confirm Password <span className="text-[#FF4C29]">*</span></label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full bg-[#121212] border-2 text-white p-3.5 text-sm rounded-xl outline-none transition-colors ${errors.confirmPassword ? 'border-[#FF4C29]/50' : 'border-white/5 focus:border-[#FF7812]'}`}
                                        placeholder="Match password"
                                    />
                                    {errors.confirmPassword && <p className="text-[#FF4C29] text-[10px] font-bold ml-1">{errors.confirmPassword}</p>}
                                </div>
                            </div>

                            <div className="pt-4">
                                <Button type="submit" fullWidth className="py-4 text-base shadow-[0_4px_20px_rgba(255,120,18,0.2)]">
                                    Create My Pass
                                </Button>
                            </div>
                        </form>
                    )}
                </div>
            </div>

            <p className="text-[10px] text-center text-gray-600 mt-8 px-8">
                By entering the jam, you agree to our Terms of Service.
            </p>
        </div>
    </div>
  );
};

export default Auth;
