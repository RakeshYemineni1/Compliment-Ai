import { useState } from "react";
import axios from "axios";
import { playSound } from "./SoundManager";
import ExportModal from "./ExportModal";

export default function CaptionPanel({ image, styles, captions, setCaptions }) {
  const [loading, setLoading] = useState(false);
  const [showExport, setShowExport] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");

  const generateCaptions = async () => {
    if (!image || styles.length === 0) {
      alert("Please upload an image and select at least one style");
      return;
    }

    setLoading(true);
    playSound("generate");

    try {
      const { data } = await axios.post("http://localhost:5000/api/captions/generate", {
        imageData: image,
        styles
      });
      setCaptions(data.captions || []);
      playSound("success");
    } catch (error) {
      alert("Error: " + error.response?.data?.error || "Failed to generate");
      playSound("error");
    } finally {
      setLoading(false);
    }
  };

  const regenerateCaption = async (index) => {
    setLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/api/captions/regenerate", {
        imageData: image,
        styles,
        index,
        currentCaptions: captions
      });
      const newCaptions = [...captions];
      newCaptions[index] = data.captions[0];
      setCaptions(newCaptions);
      playSound("success");
    } catch (error) {
      alert("Failed to regenerate");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditText(captions[index]);
  };

  const saveEdit = () => {
    const newCaptions = [...captions];
    newCaptions[editingIndex] = editText;
    setCaptions(newCaptions);
    setEditingIndex(null);
    playSound("success");
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    playSound("copy");
    alert("Copied to clipboard!");
  };

  const getCharCount = (text, platform) => {
    const limits = { twitter: 280, instagram: 2200, facebook: 63206 };
    return `${text.length}/${limits[platform]}`;
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          <h2 className="text-xl font-semibold text-white">AI Captions</h2>
        </div>
        {captions.length > 0 && (
          <button
            onClick={() => setShowExport(true)}
            className="flex items-center gap-2 px-3 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white text-sm transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Export
          </button>
        )}
      </div>

      <button
        onClick={generateCaptions}
        disabled={loading}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-4 rounded-xl font-semibold text-lg transition disabled:opacity-50 disabled:cursor-not-allowed mb-6 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Generate Captions
          </>
        )}
      </button>

      <div className="space-y-4">
        {captions.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500">No captions yet. Generate some!</p>
          </div>
        ) : (
          captions.map((caption, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-5 rounded-xl hover:bg-white/10 transition">
              {editingIndex === i ? (
                <div className="space-y-3">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white resize-none"
                    rows={3}
                  />
                  <div className="flex gap-2">
                    <button onClick={saveEdit} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm transition">
                      Save
                    </button>
                    <button onClick={() => setEditingIndex(null)} className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg text-sm transition">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-white mb-3 leading-relaxed">{caption}</p>
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-3">
                    <span>Twitter: {getCharCount(caption, 'twitter')}</span>
                    <span>•</span>
                    <span>Instagram: {getCharCount(caption, 'instagram')}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button onClick={() => copyToClipboard(caption)} className="flex items-center gap-1 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 text-green-300 px-3 py-1.5 rounded-lg text-xs transition">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy
                    </button>
                    <button onClick={() => startEdit(i)} className="flex items-center gap-1 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 text-purple-300 px-3 py-1.5 rounded-lg text-xs transition">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit
                    </button>
                    <button onClick={() => regenerateCaption(i)} className="flex items-center gap-1 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/30 text-orange-300 px-3 py-1.5 rounded-lg text-xs transition">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      Regenerate
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        )}
      </div>

      {showExport && <ExportModal captions={captions} image={image} onClose={() => setShowExport(false)} />}
    </div>
  );
}
