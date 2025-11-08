import { useState } from 'react';
import { Heart } from 'lucide-react';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

function NameInput({ onSubmit }: NameInputProps) {
  const [name, setName] = useState('');
  const [isAnimating, setIsAnimating] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIsAnimating(true);
      setTimeout(() => {
        onSubmit(name.trim());
      }, 500);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-red-100 flex items-center justify-center p-4 transition-all duration-500 ${isAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
      <div className="max-w-md w-full">
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <Heart className="w-16 h-16 text-rose-500 animate-pulse" fill="currentColor" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Hai Manisss!
          </h1>
          <p className="text-gray-600 text-lg">
            Ada yang mau tanya nih...
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
          <label htmlFor="name" className="block text-gray-700 text-sm font-semibold mb-3">
            Siapa nama kamu?
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tulis nama kamu di sini..."
            className="w-full px-4 py-3 border-2 border-rose-200 rounded-xl focus:outline-none focus:border-rose-400 focus:ring-2 focus:ring-rose-200 transition-all duration-300 text-gray-800"
            autoFocus
          />
          <button
            type="submit"
            disabled={!name.trim()}
            className="w-full mt-6 bg-gradient-to-r from-rose-400 to-pink-500 text-white font-semibold py-3 rounded-xl hover:from-rose-500 hover:to-pink-600 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed transform hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Lanjut
          </button>
        </form>
      </div>
    </div>
  );
}

export default NameInput;
