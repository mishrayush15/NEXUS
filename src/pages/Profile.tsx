import { useState } from "react";
import {
  UserCircle,
  LogOut,
  PanelRightClose,
  PanelRightOpen,
  Bell,
  Shield,
  Settings,
} from "lucide-react";
import proData from "../data/profileData";
import ProfileMain from "../components/ProfileMain";
import PrivacyAndSecurity from "../components/PrivacyAndSecurity";
import NotificationsAndSound from "../components/NotificationsAndSound";

function Profile() {
  const [activeTab, setActiveTab] = useState<"videos" | "photos">("videos");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const [profileData, setProfileData] = useState(proData);
  const [selectedTab, setSelectedTab] = useState("profile");

  return (
    <div className="min-h-screen bg-zinc-900">
      {/* Sidebar */}
      <nav
        className={`fixed top-0 left-0 h-screen ${
          isSidebarOpen ? "w-64" : "w-16"
        } bg-zinc-800/50 backdrop-blur-sm border-r border-zinc-800 flex flex-col justify-between transition-all duration-300`}>
        {/* Top Section */}
        <div>
          <div className="p-4">
            {isSidebarOpen ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 relative overflow-hidden group">
                    <span className="text-2xl font-bold text-gold group-hover:scale-110 transition-transform">
                      N
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 animate-shimmer" />
                  </div>
                  <span className="text-xl font-bold text-gold">Nexus</span>
                </div>
                <button
                  onClick={() => setIsSidebarOpen(false)}
                  className="text-gold hover:text-gold/80 transition-colors">
                  <PanelRightOpen className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex justify-center">
                <button
                  onClick={() => setIsSidebarOpen(true)}
                  className="text-gold hover:text-gold/80 transition-colors">
                  <PanelRightClose className="w-5 h-5" />
                </button>
              </div>
            )}
          </div>

          {/* Tabs */}
          <div className="flex flex-col space-y-2 px-2 mt-6">
            {[
              {
                name: "Profile",
                icon: <UserCircle className="w-5 h-5" />,
                key: "profile",
              },
              {
                name: "Notification & Sounds",
                icon: <Bell className="w-5 h-5" />,
                key: "notifications",
              },
              {
                name: "Privacy & Security",
                icon: <Shield className="w-5 h-5" />,
                key: "privacy",
              },
              {
                name: "General Settings",
                icon: <Settings className="w-5 h-5" />,
                key: "settings",
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setSelectedTab(tab.key)}
                className={`flex items-center ${
                  isSidebarOpen ? "justify-start px-4" : "justify-center"
                } py-2 rounded-lg transition-all w-full gap-3 ${
                  selectedTab === tab.key
                    ? "bg-gold text-zinc-900 font-semibold"
                    : "hover:bg-zinc-700 text-white"
                }`}>
                {tab.icon}
                {isSidebarOpen && <span>{tab.name}</span>}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="p-4 flex justify-center">
          <button
            className={`flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 ${
              isSidebarOpen ? "px-4 w-full" : "px-2 w-10"
            } rounded-xl transition-all`}>
            <LogOut className="w-5 h-5" />
            {isSidebarOpen && "Logout"}
          </button>
        </div>
      </nav>

      <div>
        {selectedTab === "profile" && (
          <ProfileMain
            isSidebarOpen={isSidebarOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            profileData={profileData}
            setProfileData={setProfileData}
          />
        )}

        {selectedTab === "notifications" && (
          <NotificationsAndSound isSidebarOpen={isSidebarOpen} />
        )}

        {selectedTab === "privacy" && (
          <PrivacyAndSecurity isSidebarOpen={isSidebarOpen} />
        )}

        {selectedTab === "settings" && (
          <div
            className={`transition-all duration-300 ${
              isSidebarOpen ? "ml-64" : "ml-16"
            } text-white min-h-screen flex items-center justify-center`}>
            <p className="text-xl text-zinc-500">
              General Settings coming soon...
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
