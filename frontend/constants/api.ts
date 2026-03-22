import { Platform } from 'react-native';

// Use the local IP address for physical devices/Expo Go
// Use localhost for web
const DEV_IP = '172.20.10.2'; 

export const API_URL = Platform.select({
  web: 'http://localhost:5005/api',
  default: `http://${DEV_IP}:5005/api`,
});
