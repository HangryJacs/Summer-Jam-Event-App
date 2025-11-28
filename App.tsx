
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// Context
import { UserProvider, useUser } from './context/UserContext';

// Components
import Navigation from './components/Navigation';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import ResponsiveContainer from './components/ResponsiveContainer';

// Pages
import Splash from './pages/Splash';
import Auth from './pages/Auth';
import Home from './pages/Home';
import AccessPassWelcome from './pages/AccessPassWelcome';
import Activations from './pages/Activations';
import Scanner from './pages/Scanner';
import Profile from './pages/Profile';
import Schedule from './pages/Schedule';
import Prizes from './pages/Prizes';
import About from './pages/About';
import DevTools from './pages/DevTools';

// Forms
import BrandForm from './pages/BrandForm';
import FootLockerForm from './pages/FootLockerForm';
import NikeForm from './pages/NikeForm';
import MaybellineForm from './pages/MaybellineForm';
import GYGForm from './pages/GYGForm';
import EntrySurvey from './pages/EntrySurvey';
import ExitSurvey from './pages/ExitSurvey';

// Constants
import { ROUTES } from './constants';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Layout Component
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const { user } = useUser();

  // Define which paths should hide the header and bottom navigation
  const fullScreenPaths = [
    ROUTES.SPLASH,
    ROUTES.AUTH,
    ROUTES.WELCOME,
    ROUTES.SCANNER,
    '/dev'
  ];
  
  // Forms are also full screen usually
  const isForm = location.pathname.startsWith('/form');
  const isFullScreenPage = fullScreenPaths.includes(location.pathname) || isForm;

  return (
    <ResponsiveContainer 
      hasNav={!isFullScreenPage} 
      hasHeader={!isFullScreenPage}
      className={isFullScreenPage ? '!h-[100dvh] !overflow-hidden' : ''}
    >
      <div className={`flex flex-col text-white relative bg-[#0A0A0A] ${isFullScreenPage ? 'h-full' : 'min-h-[100dvh]'}`}>
        {!isFullScreenPage && <Header user={user} />}
        
        <main className="flex-grow w-full">
          {children}
        </main>

        {!isFullScreenPage && <Navigation />}
      </div>
    </ResponsiveContainer>
  );
};

// Wrapper for Profile to inject context props cleanly
const ProfileWrapper: React.FC = () => {
  const { user, activations, logout } = useUser();
  if (!user) return null;
  return <Profile user={user} activations={activations} onLogout={logout} />;
};

// Wrapper for Activations to inject context props
const ActivationsWrapper: React.FC = () => {
  const { activations } = useUser();
  return <Activations activations={activations} />;
};

const AppContent: React.FC = () => {
  const { login, user } = useUser();

  // Wrap the onLogin handler to match the Auth page prop signature
  const handleLogin = (userData: any) => {
    login(userData);
  };

  return (
    <>
      <ScrollToTop />
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: '#1A1A1A',
            color: '#fff',
            border: '1px solid #FF7812',
          },
          success: {
            iconTheme: {
              primary: '#00A89E',
              secondary: '#fff',
            },
          },
        }}
      />
      
      <MainLayout>
        <Routes>
          {/* Public Routes */}
          <Route path={ROUTES.SPLASH} element={<Splash />} />
          <Route 
            path={ROUTES.AUTH} 
            element={user ? <Navigate to={ROUTES.HOME} /> : <Auth onLogin={handleLogin} />} 
          />
          <Route path="/register" element={<Navigate to={ROUTES.AUTH} />} />
          <Route path="/dev" element={<DevTools />} />

          {/* Protected Routes */}
          <Route path={ROUTES.WELCOME} element={
            <ProtectedRoute>
              <AccessPassWelcome />
            </ProtectedRoute>
          } />

          <Route path={ROUTES.HOME} element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />

          <Route path={ROUTES.SCHEDULE} element={
            <ProtectedRoute>
              <Schedule />
            </ProtectedRoute>
          } />

          <Route path={ROUTES.ACTIVATIONS} element={
            <ProtectedRoute>
              <ActivationsWrapper />
            </ProtectedRoute>
          } />
          {/* Map /partners to Activations page */}
          <Route path="/partners" element={<Navigate to={ROUTES.ACTIVATIONS} />} />

          <Route path={ROUTES.SCANNER} element={
            <ProtectedRoute>
              <Scanner />
            </ProtectedRoute>
          } />

          <Route path={ROUTES.PROFILE} element={
            <ProtectedRoute>
               <ProfileWrapper />
            </ProtectedRoute>
          } />

          <Route path={ROUTES.PRIZES} element={
            <ProtectedRoute>
              <Prizes />
            </ProtectedRoute>
          } />
          {/* Map /leaderboard to Prizes page */}
          <Route path="/leaderboard" element={<Navigate to={ROUTES.PRIZES} />} />

          <Route path={ROUTES.ABOUT} element={
            <ProtectedRoute>
              <About />
            </ProtectedRoute>
          } />

          {/* Forms - Protected */}
          <Route path={ROUTES.FORM_NIKE} element={<ProtectedRoute><NikeForm /></ProtectedRoute>} />
          <Route path={ROUTES.FORM_FOOTLOCKER} element={<ProtectedRoute><FootLockerForm /></ProtectedRoute>} />
          <Route path={ROUTES.FORM_MAYBELLINE} element={<ProtectedRoute><MaybellineForm /></ProtectedRoute>} />
          <Route path={ROUTES.FORM_GYG} element={<ProtectedRoute><GYGForm /></ProtectedRoute>} />
          <Route path={ROUTES.FORM_ENTRY} element={<ProtectedRoute><EntrySurvey /></ProtectedRoute>} />
          <Route path={ROUTES.FORM_EXIT} element={<ProtectedRoute><ExitSurvey /></ProtectedRoute>} />
          
          {/* Generic fallback form */}
          <Route path="/form/:brandId" element={<ProtectedRoute><BrandForm /></ProtectedRoute>} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to={ROUTES.SPLASH} />} />
        </Routes>
      </MainLayout>
    </>
  );
};

const App: React.FC = () => {
  return (
    <UserProvider>
      <HashRouter>
        <AppContent />
      </HashRouter>
    </UserProvider>
  );
};

export default App;
