import { authenticator } from 'otplib';

export const generateTOTPSecret = (): string => {
  return authenticator.generateSecret();
};

export const validateTOTP = (token: string, secret: string): boolean => {
  try {
    return authenticator.verify({ token, secret });
  } catch {
    return false;
  }
};