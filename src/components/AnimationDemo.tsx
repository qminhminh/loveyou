import React from 'react';
import { Heart, Star, Sparkles, Zap, Music, Camera, Gift, Crown } from 'lucide-react';

const AnimationDemo: React.FC = () => {
  const animationGroups = [
    {
      title: "✨ Sparkle & Glow Effects",
      items: [
        { name: "Sparkle", class: "animate-sparkle", icon: <Sparkles className="w-8 h-8" /> },
        { name: "Glow", class: "animate-glow", icon: <Zap className="w-8 h-8" /> },
        { name: "Rainbow Glow", class: "animate-rainbow-glow", icon: <Star className="w-8 h-8" /> }
      ]
    },
    {
      title: "🎭 Morphing & Transform",
      items: [
        { name: "Morph", class: "animate-morph", icon: <Heart className="w-8 h-8" /> },
        { name: "Bounce Rotate", class: "animate-bounce-rotate", icon: <Star className="w-8 h-8" /> },
        { name: "Wave", class: "animate-wave", icon: <Sparkles className="w-8 h-8" /> }
      ]
    },
    {
      title: "🌊 Liquid & Fluid",
      items: [
        { name: "Liquid", class: "animate-liquid", icon: <Heart className="w-8 h-8" /> },
        { name: "Ripple", class: "animate-ripple", icon: <Star className="w-8 h-8" /> },
        { name: "Bubble", class: "animate-bubble", icon: <Sparkles className="w-8 h-8" /> }
      ]
    },
    {
      title: "🎪 Circus & Fun",
      items: [
        { name: "Juggle", class: "animate-juggle", icon: <Heart className="w-8 h-8" /> },
        { name: "Cartwheel", class: "animate-cartwheel", icon: <Star className="w-8 h-8" /> },
        { name: "Swing", class: "animate-swing", icon: <Sparkles className="w-8 h-8" /> }
      ]
    },
    {
      title: "🌈 Color & Gradient",
      items: [
        { name: "Color Shift", class: "animate-color-shift", icon: <Music className="w-8 h-8" /> },
        { name: "Rainbow Border", class: "animate-rainbow-border border-4", icon: <Camera className="w-8 h-8" /> },
        { name: "Pulse Color", class: "animate-pulse-color", icon: <Gift className="w-8 h-8" /> }
      ]
    },
    {
      title: "🎯 Special Effects",
      items: [
        { name: "Magnetic", class: "animate-magnetic", icon: <Heart className="w-8 h-8" /> },
        { name: "Earthquake", class: "animate-earthquake", icon: <Star className="w-8 h-8" /> },
        { name: "Breathing", class: "animate-breathing", icon: <Sparkles className="w-8 h-8" /> }
      ]
    },
    {
      title: "🎨 Text Effects",
      items: [
        { name: "Text Shimmer", class: "animate-text-shimmer text-2xl font-bold", icon: <Crown className="w-8 h-8" /> },
        { name: "Text Bounce", class: "animate-text-bounce text-2xl font-bold", icon: <Heart className="w-8 h-8" /> },
        { name: "Text Rainbow", class: "animate-text-rainbow text-2xl font-bold", icon: <Star className="w-8 h-8" /> }
      ]
    },
    {
      title: "🎪 Advanced Combined",
      items: [
        { name: "Super Hero", class: "animate-super-hero", icon: <Crown className="w-8 h-8" /> },
        { name: "Magic Sparkle", class: "animate-magic-sparkle", icon: <Sparkles className="w-8 h-8" /> },
        { name: "Love Pulse", class: "animate-love-pulse", icon: <Heart className="w-8 h-8" /> }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-50 to-pink-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
            🌟 Animation Showcase
          </h1>
          <p className="text-pink-600 text-xl">
            Tất cả các hiệu ứng animation mới đẹp mắt!
          </p>
        </div>

        {/* Animation Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {animationGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {group.title}
              </h2>
              
              <div className="space-y-6">
                {group.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-400 to-purple-500 text-white mb-3 ${item.class}`}>
                      {item.icon}
                    </div>
                    <p className="text-sm font-medium text-gray-700">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Usage Instructions */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            📖 Cách Sử Dụng
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">🎯 Cách Thêm Animation:</h3>
              <div className="space-y-3 text-gray-600">
                <p><code className="bg-gray-100 px-2 py-1 rounded">className="animate-sparkle"</code></p>
                <p><code className="bg-gray-100 px-2 py-1 rounded">className="animate-glow"</code></p>
                <p><code className="bg-gray-100 px-2 py-1 rounded">className="animate-morph"</code></p>
                <p><code className="bg-gray-100 px-2 py-1 rounded">className="animate-text-shimmer"</code></p>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-4">💡 Ví Dụ Sử Dụng:</h3>
              <div className="space-y-3 text-gray-600">
                <p>• <span className="animate-text-shimmer font-bold">Chữ lấp lánh</span></p>
                <p>• <span className="animate-text-rainbow font-bold">Chữ cầu vồng</span></p>
                <p>• <span className="animate-text-bounce font-bold">Chữ nảy</span></p>
                <p>• <span className="animate-love-pulse">❤️ Tim đập</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Demo */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-4 p-6 bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl">
            <div className="animate-sparkle">
              <Sparkles className="w-12 h-12 text-pink-500" />
            </div>
            <div className="animate-glow">
              <Heart className="w-12 h-12 text-purple-500" />
            </div>
            <div className="animate-morph">
              <Star className="w-12 h-12 text-yellow-500" />
            </div>
            <div className="animate-bounce-rotate">
              <Crown className="w-12 h-12 text-orange-500" />
            </div>
            <div className="animate-love-pulse">
              <Heart className="w-12 h-12 text-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimationDemo; 