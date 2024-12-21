import React, { useState } from 'react';
import { Shield, Smartphone } from 'lucide-react';
import { generateTOTPSecret, validateTOTP } from '../../utils/mfa';

interface Props {
  onComplete: (secret: string) => void;
}

export const MFASetup: React.FC<Props> = ({ onComplete }) => {
  const [secret] = useState(() => generateTOTPSecret());
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleVerify = async () => {
    if (validateTOTP(code, secret)) {
      onComplete(secret);
    } else {
      setError('Invalid code. Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Shield className="w-5 h-5 text-indigo-400" />
        <h2 className="text-xl font-semibold">Set Up Two-Factor Authentication</h2>
      </div>
      
      <div className="bg-gray-800 p-4 rounded-lg">
        <p className="text-sm text-gray-300 mb-2">Scan this QR code with your authenticator app:</p>
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=otpauth://totp/SecureVault:${encodeURIComponent(secret)}`}
          alt="QR Code"
          className="mx-auto"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm">Enter the 6-digit code:</label>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="w-full px-4 py-2 bg-white/5 border border-indigo-300/30 rounded-lg"
          maxLength={6}
        />
        {error && <p className="text-red-400 text-sm">{error}</p>}
      </div>

      <button
        onClick={handleVerify}
        className="w-full bg-indigo-600 hover:bg-indigo-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
      >
        <Smartphone className="w-5 h-5" />
        <span>Verify and Enable 2FA</span>
      </button>
    </div>
  );
};