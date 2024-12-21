import React, { useState } from 'react';
import { Shield, Key, Lock } from 'lucide-react';
import { Scene3D } from './components/Scene3D';
import { PasswordStrengthMeter } from './components/PasswordStrengthMeter';
import { encrypt, decrypt, generateKey } from './utils/encryption';

function App() {
  const [masterPassword, setMasterPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, verify master password against stored hash
    if (masterPassword.length >= 8) {
      setIsAuthenticated(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-900 text-white relative overflow-hidden">
      <Scene3D />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <Shield className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl font-bold mb-2">SecureVault</h1>
            <p className="text-indigo-200">Your Trusted Password Manager</p>
          </div>

          {!isAuthenticated ? (
            <form onSubmit={handleLogin} className="space-y-6 bg-white/10 backdrop-blur-lg p-8 rounded-lg">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Master Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    value={masterPassword}
                    onChange={(e) => setMasterPassword(e.target.value)}
                    className="w-full px-4 py-2 bg-white/5 border border-indigo-300/30 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Enter your master password"
                  />
                  <Key className="absolute right-3 top-2.5 h-5 w-5 text-indigo-300" />
                </div>
                <div className="mt-3">
                  <PasswordStrengthMeter password={masterPassword} />
                </div>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
              >
                <Lock className="w-5 h-5" />
                <span>Unlock Vault</span>
              </button>
            </form>
          ) : (
            <div className="bg-white/10 backdrop-blur-lg p-8 rounded-lg">
              {/* Password vault content would go here */}
              <p className="text-center">Welcome to your secure vault!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;