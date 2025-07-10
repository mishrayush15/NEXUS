// src/components/EditProfileModal.tsx
import React, { useState } from "react";
import { X, Camera } from "lucide-react";

interface EditProfileModalProps {
  profileData: any;
  setProfileData: React.Dispatch<React.SetStateAction<any>>;
  onClose: () => void;
}

const EditProfileModal: React.FC<EditProfileModalProps> = ({
  profileData,
  setProfileData,
  onClose,
}) => {
  const [localData, setLocalData] = useState(profileData);

  const handleInputChange = (field: string, value: string) => {
    setLocalData((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleImageUpload = (
    field: "image" | "bannerImg",
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalData((prev: any) => ({
          ...prev,
          [field]: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    setProfileData(localData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 w-[90%] max-w-2xl relative text-white">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>

        {/* Banner */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Banner Image</label>
          <div className="relative h-32 rounded-lg overflow-hidden bg-zinc-800">
            <img
              src={
                localData.bannerImg ||
                "https://source.unsplash.com/1200x400/?nature"
              }
              className="w-full h-full object-cover"
              alt="Banner"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer">
              <Camera className="w-6 h-6 text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload("bannerImg", e)}
              />
            </label>
          </div>
        </div>

        {/* Profile Image */}
        <div className="mb-4">
          <label className="block mb-2 font-medium">Profile Image</label>
          <div className="relative w-24 h-24 rounded-full overflow-hidden bg-zinc-800">
            <img
              src={localData.image}
              className="w-full h-full object-cover"
              alt="Profile"
            />
            <label className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer">
              <Camera className="w-5 h-5 text-white" />
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload("image", e)}
              />
            </label>
          </div>
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Name</label>
          <input
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gold"
            value={localData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>

        {/* Bio */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">Bio</label>
          <textarea
            className="w-full px-4 py-2 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-gold"
            value={localData.bio}
            onChange={(e) => handleInputChange("bio", e.target.value)}
            rows={3}
          />
        </div>

        {/* Save Button */}
        <div className="text-right">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-gold text-zinc-900 font-semibold rounded-lg hover:bg-gold/90 transition">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
