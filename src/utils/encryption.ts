import CryptoJS from 'crypto-js';
import { EncryptedData } from '../types';

const ITERATION_COUNT = 100000;
const KEY_SIZE = 256;

export const generateKey = (masterPassword: string, salt: string): string => {
  return CryptoJS.PBKDF2(masterPassword, salt, {
    keySize: KEY_SIZE / 32,
    iterations: ITERATION_COUNT
  }).toString();
};

export const encrypt = (data: string, key: string): EncryptedData => {
  const iv = CryptoJS.lib.WordArray.random(16);
  const encrypted = CryptoJS.AES.encrypt(data, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return {
    data: encrypted.toString(),
    iv: iv.toString()
  };
};

export const decrypt = (encryptedData: EncryptedData, key: string): string => {
  const decrypted = CryptoJS.AES.decrypt(encryptedData.data, key, {
    iv: CryptoJS.enc.Hex.parse(encryptedData.iv),
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
};