import { useState } from "react";

export default function CustomStyleCreator({ onApply, onClose }) {
  const [styleName, setStyleName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = () => {
    if (!styleName || !description) {
      alert("Please fill all fields");
      return;
    }
    onApply(`${styleName}: ${description}`);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Create Custom Style</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Style Name</label>
            <input
              type="text"
              placeholder="e.g., Motivational"
              value={styleName}
              onChange={(e) => setStyleName(e.target.value)}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Description</label>
            <textarea
              placeholder="Describe the style tone and characteristics..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="w-full p-3 bg-white/5 border border-white/10 rounded-lg text-white resize-none"
            />
          </div>

          <button
            onClick={handleCreate}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-3 rounded-lg font-semibold transition"
          >
            Create & Apply
          </button>
        </div>
      </div>
    </div>
  );
}
