import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'YOUR_FIREBASE_API_KEY',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'YOUR_FIREBASE_AUTH_DOMAIN',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'YOUR_FIREBASE_PROJECT_ID',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'YOUR_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'YOUR_FIREBASE_MESSAGING_SENDER_ID',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'YOUR_FIREBASE_APP_ID',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'YOUR_FIREBASE_MEASUREMENT_ID',
};

const app = initializeApp(firebaseConfig);

export const messaging = getMessaging(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export const requestNotificationPermission = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      const token = await getToken(messaging, {
        vapidKey: 'YOUR_PUBLIC_VAPID_KEY_HERE' // Replace with your key pair from Firebase Console
      });
      console.log('Firebase Cloud Messaging Token:', token);
      return token;
    }
  } catch (error) {
    console.error('An error occurred while retrieving token. ', error);
  }
};

export const setupMessageListener = (callback) => {
  return onMessage(messaging, (payload) => {
    console.log('Message received. ', payload);
    callback(payload);
  });
};
