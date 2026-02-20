import { useState } from "react";
import Dashboard from "./components/Dashboard";
import ImageUploader from "./components/ImageUploader";
import StyleMixer from "./components/StyleMixer";
import CaptionPanel from "./components/CaptionPanel";

export default function App() {
  const [view, setView] = useState("main");
  const [image, setImage] = useState(null);
  const [styles, setStyles] = useState([]);
  const [captions, setCaptions] = useState([]);
  const [customStyle, setCustomStyle] = useState(null);

  if (view === "dashboard") return <Dashboard onBack={() => setView("main")} />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <h1 className="text-xl font-bold text-white">Compliment AI</h1>
          </div>
          <button
            onClick={() => setView("dashboard")}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">AI-Powered Caption Generator</h2>
          <p className="text-xl text-gray-400">Upload, style, and generate creative captions instantly</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <ImageUploader image={image} setImage={setImage} />
            <StyleMixer styles={styles} setStyles={setStyles} customStyle={customStyle} setCustomStyle={setCustomStyle} />
          </div>
          
          <CaptionPanel 
            image={image} 
            styles={customStyle ? [customStyle] : styles}
            captions={captions} 
            setCaptions={setCaptions} 
          />
        </div>
      </div>
    </div>
  );
}
