import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

// Cấu hình Firebase - thông tin thực tế
const firebaseConfig = {
  apiKey: "AIzaSyBhldkoIctivmZSo5t9L-N6EhekiHz_DSQ",
  authDomain: "tiktokclone-64c8a.firebaseapp.com",
  databaseURL: "https://tiktokclone-64c8a-default-rtdb.firebaseio.com",
  projectId: "tiktokclone-64c8a",
  storageBucket: "tiktokclone-64c8a.appspot.com",
  messagingSenderId: "1005418252625",
  appId: "1:1005418252625:web:ac9f4309618fd6de772b70"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);

// Khởi tạo Storage và Firestore
export const storage = getStorage(app);
export const db = getFirestore(app);

export default app; 