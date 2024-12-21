import React from 'react';
import { Check, X, AlertTriangle } from 'lucide-react';
import zxcvbn from 'zxcvbn';

interface Props {
  password: string;
}

export const PasswordStrengthMeter: React.FC<Props> = ({ password }) => {
  const result = zxcvbn(password);
  const strengthScore = result.score;

  const getColor = () => {
    switch (strengthScore) {
      case 0: return 'bg-red-500';
      case 1: return 'bg-orange-500';
      case 2: return 'bg-yellow-500';
      case 3: return 'bg-blue-500';
      case 4: return 'bg-green-500';
      default: return 'bg-gray-200';
    }
  };

  const getIcon = () => {
    if (strengthScore <= 1) return <X className="text-red-500" />;
    if (strengthScore <= 2) return <AlertTriangle className="text-yellow-500" />;
    return <Check className="text-green-500" />;
  };

  return (
    <div className="w-full space-y-2">
      <div className="flex items-center space-x-2">
        <div className="flex-1 h-2 bg-gray-200 rounded-full">
          <div
            className={`h-full rounded-full transition-all duration-300 ${getColor()}`}
            style={{ width: `${(strengthScore + 1) * 20}%` }}
          />
        </div>
        <div className="w-6 h-6">{getIcon()}</div>
      </div>
      {result.feedback.warning && (
        <p className="text-sm text-red-500">{result.feedback.warning}</p>
      )}
    </div>
  );
};