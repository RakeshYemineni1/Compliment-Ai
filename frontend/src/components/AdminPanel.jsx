import { useState, useEffect } from "react";
import axios from "axios";

export default function AdminPanel({ onBack }) {
  const [adminKey, setAdminKey] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [providers, setProviders] = useState({ openai: "", gemini: "" });
  const [keys, setKeys] = useState([]);
  const [showPasswords, setShowPasswords] = useState(false);

  const authenticate = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/api-keys", {
        headers: { adminkey }
      });
      localStorage.setItem("adminKey", adminKey);
      setAuthenticated(true);
      setKeys(data);
    } catch (error) {
      alert("Invalid admin key");
      setAuthenticated(false);
    }
  };

  const loadKeys = async () => {
    const key = localStorage.getItem("adminKey");
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/api-keys", {
        headers: { adminkey: key }
      });
      setKeys(data);
    } catch {
      localStorage.removeItem("adminKey");
      setAuthenticated(false);
    }
  };

  const saveKey = async (provider) => {
    if (!providers[provider]) {
      alert("Please enter an API key");
      return;
    }
    const key = localStorage.getItem("adminKey");
    try {
      await axios.post(
        "http://localhost:5000/api/admin/api-keys",
        { provider, apiKey: providers[provider] },
        { headers: { adminkey: key } }
      );
      alert(`${provider} key saved successfully!`);
      loadKeys();
      setProviders({ ...providers, [provider]: "" });
    } catch (error) {
      alert("Failed to save key: " + error.message);
    }
  };

  useEffect(() => {
    const key = localStorage.getItem("adminKey");
    if (key) {
      setAdminKey(key);
      setAuthenticated(true);
      loadKeys();
    }
  }, []);

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
          <h2 className="text-2xl font-bold text-white mb-4">Admin Access</h2>
          <input
            type={showPasswords ? "text" : "password"}
            placeholder="Enter Admin Secret Key"
            className="w-full p-3 bg-gray-700 text-white rounded mb-4"
            value={adminKey}
            onChange={(e) => setAdminKey(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && authenticate()}
          />
          <label className="flex items-center text-white mb-4 cursor-pointer">
            <input
              type="checkbox"
              checked={showPasswords}
              onChange={(e) => setShowPasswords(e.target.checked)}
              className="mr-2"
            />
            Show password
          </label>
          <button
            onClick={authenticate}
            className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700"
          >
            Authenticate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <button onClick={onBack} className="mb-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">
        ← Back
      </button>

      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">API Key Management</h1>

        <label className="flex items-center text-white mb-6 cursor-pointer">
          <input
            type="checkbox"
            checked={showPasswords}
            onChange={(e) => setShowPasswords(e.target.checked)}
            className="mr-2 w-4 h-4"
          />
          Show API keys
        </label>

        <div className="grid gap-6">
          {["openai", "gemini"].map((provider) => (
            <div key={provider} className="bg-gray-800 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-4 capitalize">{provider}</h3>
              <input
                type={showPasswords ? "text" : "password"}
                placeholder={`Enter ${provider} API Key`}
                className="w-full p-3 bg-gray-700 text-white rounded mb-4"
                value={providers[provider]}
                onChange={(e) => setProviders({ ...providers, [provider]: e.target.value })}
              />
              <button
                onClick={() => saveKey(provider)}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Save {provider} Key
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-gray-800 p-6 rounded-lg">
          <h3 className="text-xl font-bold text-white mb-4">Active Keys</h3>
          {keys.length === 0 ? (
            <p className="text-gray-400">No API keys configured</p>
          ) : (
            keys.map((key) => (
              <div key={key.provider} className="flex justify-between items-center text-white mb-2 bg-gray-700 p-3 rounded">
                <span className="capitalize font-bold">{key.provider}</span>
                <span className={key.isActive ? "text-green-400" : "text-red-400"}>
                  {key.isActive ? "✓ Active" : "✗ Inactive"}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
