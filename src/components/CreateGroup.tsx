import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateGroupProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateGroup: (group: { name: string; description: string; category: string }) => void;
}

export function CreateGroup({ isOpen, onClose, onCreateGroup }: CreateGroupProps) {
  const [form, setForm] = useState({ name: '', description: '', category: 'General' });
  const categories = ['Anime', 'Movies', 'Technology', 'Gaming', 'Music', 'General'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateGroup(form);
    setForm({ name: '', description: '', category: 'General' });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-zinc-900 rounded-xl w-full max-w-md p-6 animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Create New Group</h2>
          <button onClick={onClose} className="text-zinc-400 hover:text-zinc-300">
            <X className="w-5 h-5" />
          </button>
        </div>
        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Group Name</label>
            <input
              type="text"
              required
              value={form.name}
              onChange={e => setForm(prev => ({ ...prev, name: e.target.value }))}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-gold"
              placeholder="Enter group name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Description</label>
            <textarea
              required
              value={form.description}
              onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-gold resize-none"
              placeholder="Enter a brief description"
              rows={3}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Category</label>
            <select
              value={form.category}
              onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
              className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:border-gold"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <div className="flex justify-end space-x-2 pt-2 border-t border-zinc-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 