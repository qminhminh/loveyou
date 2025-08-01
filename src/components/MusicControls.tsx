import React, { useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicControlsProps {
  musicEnabled: boolean;
  setMusicEnabled: (enabled: boolean) => void;
}

const MusicControls: React.FC<MusicControlsProps> = ({ musicEnabled, setMusicEnabled }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (musicEnabled) {
        audioRef.current.play().catch(console.log);
      } else {
        audioRef.current.pause();
      }
    }
  }, [musicEnabled]);

  const toggleMusic = () => {
    setMusicEnabled(!musicEnabled);
  };

  return (
    <div className="fixed top-8 left-8 z-50">
      <button
        onClick={toggleMusic}
        className="bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      >
        {musicEnabled ? (
          <Volume2 className="w-6 h-6 text-pink-500 group-hover:text-pink-600" />
        ) : (
          <VolumeX className="w-6 h-6 text-gray-400 group-hover:text-gray-500" />
        )}
      </button>

      {/* Audio Element - Using a royalty-free romantic melody URL */}
      <audio
        ref={audioRef}
        loop
        preload="metadata"
        className="hidden"
      >
        {/* Note: In a real implementation, you would add your audio file here */}
        {/* <source src="/romantic-melody.mp3" type="audio/mpeg" /> */}
        <source src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmAaBkqM0fDSfCsELm/A7+SOUDQLY3nz9L0A" type="audio/wav" />
      </audio>
    </div>
  );
};

export default MusicControls;