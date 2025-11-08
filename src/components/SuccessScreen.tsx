import { useEffect, useState } from 'react';
import { Heart, Sparkles } from 'lucide-react';

interface SuccessScreenProps {
  userName: string;
}

function SuccessScreen({ userName }: SuccessScreenProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hearts, setHearts] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);

    const heartInterval = setInterval(() => {
      const newHeart = {
        id: Date.now(),
        left: Math.random() * 100,
        delay: Math.random() * 2,
      };
      setHearts((prev) => [...prev, newHeart]);

      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
      }, 5000);
    }, 300);

    return () => clearInterval(heartInterval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-pink-100 to-rose-200 flex items-center justify-center p-4 overflow-hidden relative">
      {hearts.map((heart) => (
        <Heart
          key={heart.id}
          className="absolute bottom-0 text-rose-400 animate-float-up pointer-events-none"
          style={{
            left: `${heart.left}%`,
            animationDelay: `${heart.delay}s`,
            width: `${20 + Math.random() * 20}px`,
            height: `${20 + Math.random() * 20}px`,
          }}
          fill="currentColor"
        />
      ))}

      <div className={`max-w-2xl w-full text-center transform transition-all duration-1000 ${isVisible ? 'scale-100 opacity-100' : 'scale-50 opacity-0'}`}>
        <div className="relative">
          <div className="absolute -top-10 -left-10 animate-spin-slow">
            <Sparkles className="w-16 h-16 text-yellow-400" />
          </div>
          <div className="absolute -top-10 -right-10 animate-spin-slow" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-16 h-16 text-yellow-400" />
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-12 transform hover:scale-105 transition-transform duration-500">
            <div className="flex justify-center mb-6">
              <Heart className="w-24 h-24 text-rose-500 animate-heartbeat" fill="currentColor" />
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-fade-in">
              {userName} ❤️
            </h1>

            <p className="text-2xl md:text-3xl text-gray-700 font-semibold leading-relaxed">
              You just made my day — and maybe my life
            </p>

            <div className="mt-12 flex justify-center gap-3 flex-wrap">
              {[...Array(12)].map((_, i) => (
                <Heart
                  key={i}
                  className="w-6 h-6 text-rose-500 animate-pulse"
                  fill="currentColor"
                  style={{ animationDelay: `${i * 0.15}s` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 text-gray-600 text-lg font-medium animate-fade-in" style={{ animationDelay: '1s' }}>
          Thank you for making me the happiest person today!
        </div>
      </div>
    </div>
  );
}

export default SuccessScreen;
