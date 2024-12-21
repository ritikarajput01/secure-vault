import React from 'react';
import { Globe, Copy, Eye, EyeOff } from 'lucide-react';
import { Credential } from '../../types';
import { useClipboard } from '../../hooks/useClipboard';

interface Props {
  credentials: Credential[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export const CredentialList: React.FC<Props> = ({ credentials, onEdit, onDelete }) => {
  const { copyToClipboard } = useClipboard();
  const [showPassword, setShowPassword] = React.useState<Record<string, boolean>>({});

  const togglePassword = (id: string) => {
    setShowPassword(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-4">
      {credentials.map((cred) => (
        <div key={cred.id} className="bg-white/5 p-4 rounded-lg space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="w-5 h-5 text-indigo-400" />
              <h3 className="font-medium">{cred.title}</h3>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => onEdit(cred.id)}
                className="p-1 hover:bg-white/10 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(cred.id)}
                className="p-1 hover:bg-white/10 rounded text-red-400"
              >
                Delete
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <label className="text-gray-400">Username</label>
              <div className="flex items-center space-x-2">
                <span>{cred.username}</span>
                <button
                  onClick={() => copyToClipboard(cred.username)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div>
              <label className="text-gray-400">Password</label>
              <div className="flex items-center space-x-2">
                <span>
                  {showPassword[cred.id] ? cred.password : '••••••••'}
                </span>
                <button
                  onClick={() => togglePassword(cred.id)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  {showPassword[cred.id] ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
                <button
                  onClick={() => copyToClipboard(cred.password)}
                  className="p-1 hover:bg-white/10 rounded"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {cred.url && (
            <div className="text-sm">
              <label className="text-gray-400">URL</label>
              <div className="flex items-center space-x-2">
                <a
                  href={cred.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-400 hover:underline"
                >
                  {cred.url}
                </a>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};