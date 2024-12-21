import React from 'react';
import { Save, X } from 'lucide-react';
import { Credential } from '../../types';
import { PasswordStrengthMeter } from '../PasswordStrengthMeter';

interface Props {
  credential?: Credential;
  onSave: (credential: Omit<Credential, 'id' | 'createdAt' | 'updatedAt'>) => void;
  onCancel: () => void;
}

export const CredentialForm: React.FC<Props> = ({ credential, onSave, onCancel }) => {
  const [form, setForm] = React.useState({
    title: credential?.title || '',
    username: credential?.username || '',
    password: credential?.password || '',
    url: credential?.url || '',
    notes: credential?.notes || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          type="text"
          value={form.title}
          onChange={e => setForm(prev => ({ ...prev, title: e.target.value }))}
          className="w-full px-4 py-2 bg-white/5 border border-indigo-300/30 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Username</label>
        <input
          type="text"
          value={form.username}
          onChange={e => setForm(prev => ({ ...prev, username: e.target.value }))}
          className="w-full px-4 py-2 bg-white/5 border border-indigo-300/30 rounded-lg"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          type="password"
          value={form.password}
          onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
          className="w-full px-4 py-2 bg-white/5 border border-indigo-300/30 rounded-lg"
          required
        />
        <PasswordStrengthMeter password={form.password} />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">URL (optional)</label>
        <input
          type="url"
          value={form.url}
          onChange={e => setForm(prev => ({ ...prev, url: e.target.value }))}
          className="w-full px-4 py-2 bg-white/5 border border-indigo-300/30 rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Notes (optional)</label>
        <textarea
          value={form.notes}
          onChange={e => setForm(prev => ({ ...prev, notes: e.target.value }))}
          className="w-full px-4 py-2 bg-white/5 border border-indigo-300/30 rounded-lg"
          rows={3}
        />
      </div>

      <div className="flex space-x-2">
        <button
          type="submit"
          className="flex-1 bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Save className="w-5 h-5" />
          <span>Save Credential</span>
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-white/5 transition-colors flex items-center space-x-2"
        >
          <X className="w-5 h-5" />
          <span>Cancel</span>
        </button>
      </div>
    </form>
  );
};