import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import AiChat from './pages/AiChat';
import CharacterChat from './pages/CharacterChat';
import Settings from './pages/Settings';
import GroupChat from './pages/GroupChat';
import Profile from './pages/Profile';
import { PaymentGateway } from './components/PaymentGateway'; 
import { SettingsProvider } from './contexts/SettingsContext';
import { AuthProvider } from './contexts/AuthContext';
import { CompanionProvider } from './contexts/CompanionContext';
import Login from './pages/Login';
import Signup from './pages/Signup';
import SetupProfile from './pages/SetupProfile';
import AISettings from './pages/AISettings';
import Showdown from './pages/Showdown';
import MyChats from './pages/MyChats';
import Companion from './pages/Companion';
import { ChatProvider } from './contexts/ChatContext';
import NexusVibe from './pages/NexusVibe';

function App() {
  const PaymentGatewayWrapper = () => {
    const navigate = useNavigate();
    return (
      <PaymentGateway 
        amount={549} 
        planName="6 Months" 
        onBack={() => navigate('/profile')} 
        onSuccess={() => navigate('/')} 
      />
    );
  };

  return (
    <SettingsProvider>
      <AuthProvider>
        <ChatProvider>
          <CompanionProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/setup-profile" element={<SetupProfile />} />
              <Route path="/" element={<Home />} />
              <Route path="/ai" element={<AiChat />} />
              <Route path="/create-buddy" element={<AISettings />} />
              <Route path="/companion" element={<Companion />} />
              <Route path="/showdown" element={<Showdown />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/chat/:characterId" element={<CharacterChat />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/upgrade/payment" element={<PaymentGatewayWrapper />} />
              <Route path="/group-chats" element={<GroupChat />} />
              <Route path="/group-chat/:groupId" element={<GroupChat />} />
              <Route path="/nexus-vibe" element={<NexusVibe />} />
              <Route path="/nexus-vibe/:groupId" element={<NexusVibe />} />
              <Route path="/my-chats" element={<MyChats />} />
            </Routes>
          </CompanionProvider>
        </ChatProvider>
      </AuthProvider>
    </SettingsProvider>
  );
}

export default App;