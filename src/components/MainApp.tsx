import React, { useState, useEffect } from 'react';
import WelcomeScreen from './WelcomeScreen';
import MemoryTimeline from './MemoryTimeline';
import ReasonsWhy from './ReasonsWhy';
import ConfessionPage from './ConfessionPage';
import CelebrationPage from './CelebrationPage';
import FloatingHearts from './FloatingHearts';
import FloatingClouds from './FloatingClouds';
import MusicControls from './MusicControls';
import { Heart } from 'lucide-react';

const MainApp: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);

  const pages = [
    'welcome',
    'memories', 
    'reasons',
    'confession'
  ];

  const nextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleConfession = () => {
    setShowCelebration(true);
  };

  useEffect(() => {
    // Update page title
    document.title = 'Gửi Em - Một hành trình yêu thương 💕';
  }, []);

  if (showCelebration) {
    return <CelebrationPage />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 overflow-hidden relative">
      {/* Background Effects */}
      <FloatingHearts />
      <FloatingClouds />
      
      {/* Music Controls */}
      <MusicControls musicEnabled={musicEnabled} setMusicEnabled={setMusicEnabled} />

      {/* Navigation Dots */}
      <div className="fixed top-8 right-8 z-50 flex space-x-3">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-3 h-3 rounded-full transition-all duration-500 ${
              index === currentPage 
                ? 'bg-pink-400 scale-125 shadow-lg' 
                : 'bg-pink-200 hover:bg-pink-300'
            }`}
          />
        ))}
      </div>

      {/* Page Content */}
      <div className="relative z-10 transition-all duration-1000 ease-in-out">
        {currentPage === 0 && <WelcomeScreen onNext={nextPage} />}
        {currentPage === 1 && <MemoryTimeline onNext={nextPage} />}
        {currentPage === 2 && <ReasonsWhy onNext={nextPage} />}
        {currentPage === 3 && <ConfessionPage onConfess={handleConfession} />}
      </div>

      {/* Progress Bar */}
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/30 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <div className="flex items-center space-x-2">
            <Heart className="w-4 h-4 text-pink-500" />
            <span className="text-pink-600 font-medium text-sm">
              {Math.round(((currentPage + 1) / pages.length) * 100)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainApp; 