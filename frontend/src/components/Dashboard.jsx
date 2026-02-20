import { useState, useEffect } from "react";
import axios from "axios";

export default function Dashboard({ onBack }) {
  const [stats, setStats] = useState(null);
  const [selectedUpload, setSelectedUpload] = useState(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/analytics/stats");
      setStats(data);
    } catch (error) {
      console.error("Failed to load stats");
    }
  };

  if (!stats) return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      <div className="text-white text-xl">Loading analytics...</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <nav className="border-b border-white/10 backdrop-blur-xl bg-black/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <h1 className="text-xl font-bold text-white">Analytics Dashboard</h1>
          </div>
          <button onClick={onBack} className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-white transition">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </button>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Total Uploads</div>
                <div className="text-3xl font-bold text-white">{stats.totalUploads}</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
              </div>
              <div>
                <div className="text-gray-400 text-sm">Total Captions</div>
                <div className="text-3xl font-bold text-white">{stats.totalCaptions}</div>
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-pink-500/20 rounded-lg">
                <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
              </div>
              <div className="flex-1">
                <div className="text-gray-400 text-sm">Top Style</div>
                {stats.topStyle ? (
                  <>
                    <div className="text-xl font-bold text-white capitalize">{stats.topStyle.split(':')[0]}</div>
                    {stats.topStyle.includes(':') && (
                      <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{stats.topStyle.split(':').slice(1).join(':').trim()}</div>
                    )}
                  </>
                ) : (
                  <div className="text-2xl font-bold text-white">N/A</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Style Usage</h2>
          <div className="space-y-3">
            {stats.styleBreakdown?.map((item, index) => {
              const [styleName, ...descParts] = item.style.split(':');
              const description = descParts.join(':').trim();
              
              return (
                <div 
                  key={item.style} 
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-4 h-12">
                    <div className="w-32 flex-shrink-0">
                      <div className="text-white font-semibold text-sm capitalize truncate">{styleName}</div>
                      {description && (
                        <div className="text-xs text-gray-400 line-clamp-1 mt-0.5">{description}</div>
                      )}
                    </div>
                    <div className="flex-1 bg-white/5 rounded-full h-8 overflow-hidden border border-white/10">
                      <div 
                        className="bg-gradient-to-r from-purple-500 to-pink-500 h-full flex items-center justify-end pr-3 text-white text-xs font-bold transition-all duration-500"
                        style={{ width: `${Math.max((item.count / stats.totalUploads) * 100, 5)}%` }}
                      >
                        {item.count}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">Recent Activity</h2>
          <div className="space-y-3">
            {stats.recentUploads?.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No activity yet</p>
            ) : (
              stats.recentUploads?.map((upload, i) => (
                <div 
                  key={i} 
                  onClick={() => setSelectedUpload(upload)}
                  className="flex items-center gap-4 bg-white/5 border border-white/10 p-4 rounded-xl hover:bg-white/10 transition cursor-pointer"
                >
                  <img src={upload.imageUrl} alt="" className="w-20 h-20 object-cover rounded-lg" />
                  <div className="flex-1">
                    <div className="text-white font-semibold capitalize">{upload.styles.join(", ")}</div>
                    <div className="text-gray-400 text-sm">{new Date(upload.createdAt).toLocaleString()}</div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {selectedUpload && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setSelectedUpload(null)}>
          <div className="bg-slate-800 border border-white/10 rounded-2xl p-6 w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Generated Captions</h3>
              <button onClick={() => setSelectedUpload(null)} className="text-gray-400 hover:text-white transition">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="mb-6">
              <img src={selectedUpload.imageUrl} alt="" className="w-full h-64 object-cover rounded-lg" />
            </div>

            <div className="mb-4">
              <div className="text-sm text-gray-400 mb-2">Styles: <span className="text-purple-400 capitalize">{selectedUpload.styles.join(", ")}</span></div>
              <div className="text-sm text-gray-400">Date: {new Date(selectedUpload.createdAt).toLocaleString()}</div>
            </div>

            <div className="space-y-3">
              {selectedUpload.captions?.map((caption, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-white leading-relaxed">{caption}</p>
                </div>
              ))}
              {(!selectedUpload.captions || selectedUpload.captions.length === 0) && (
                <p className="text-gray-500 text-center py-4">No captions available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
