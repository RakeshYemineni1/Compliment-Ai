import { useState } from "react";
import { playSound } from "./SoundManager";
import CustomStyleCreator from "./CustomStyleCreator";

const STYLES = [
  { id: "romantic", name: "Romantic", icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z", color: "from-pink-500 to-rose-500" },
  { id: "funny", name: "Funny", icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", color: "from-yellow-500 to-orange-500" },
  { id: "poetic", name: "Poetic", icon: "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253", color: "from-purple-500 to-indigo-500" },
  { id: "savage", name: "Savage", icon: "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z", color: "from-red-500 to-pink-500" },
  { id: "mysterious", name: "Mysterious", icon: "M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z", color: "from-indigo-500 to-purple-500" },
  { id: "confident", name: "Confident", icon: "M13 10V3L4 14h7v7l9-11h-7z", color: "from-orange-500 to-red-500" }
];

export default function StyleMixer({ styles, setStyles, customStyle, setCustomStyle }) {
  const [showCustom, setShowCustom] = useState(false);

  const toggleStyle = (id) => {
    playSound("click");
    setStyles(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const applyCustomStyle = (style) => {
    setCustomStyle(style);
    setStyles([]);
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
          </svg>
          <h2 className="text-xl font-semibold text-white">Style Mixer</h2>
        </div>
        <button
          onClick={() => setShowCustom(true)}
          className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm transition"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Custom
        </button>
      </div>
      <p className="text-gray-400 text-sm mb-6">Select one or multiple styles to blend</p>
      
      <div className="grid grid-cols-2 gap-3">
        {STYLES.map(style => {
          const isSelected = styles.includes(style.id);
          return (
            <button
              key={style.id}
              onClick={() => toggleStyle(style.id)}
              className={`relative p-4 rounded-xl transition-all duration-200 ${
                isSelected 
                  ? `bg-gradient-to-br ${style.color} shadow-lg scale-105` 
                  : 'bg-white/5 hover:bg-white/10 border border-white/10'
              }`}
            >
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={style.icon} />
                </svg>
                <span className="font-medium text-white">{style.name}</span>
              </div>
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {customStyle && (
        <div className="mt-4 p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-300 text-sm font-medium">Custom Style Active</p>
              <p className="text-white text-xs mt-1">{customStyle}</p>
            </div>
            <button onClick={() => setCustomStyle(null)} className="text-purple-300 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {styles.length > 0 && !customStyle && (
        <div className="mt-4 p-4 bg-purple-500/10 border border-purple-500/20 rounded-lg">
          <p className="text-purple-300 text-sm font-medium">
            {styles.length} style{styles.length > 1 ? 's' : ''} selected: {styles.map(s => STYLES.find(st => st.id === s)?.name).join(" + ")}
          </p>
        </div>
      )}

      {showCustom && <CustomStyleCreator onApply={applyCustomStyle} onClose={() => setShowCustom(false)} />}
    </div>
  );
}
