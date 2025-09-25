// RecommendWidget.jsx
import React, { useState } from "react";

export default function RecommendWidget() {
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState(null);
  const [localTime, setLocalTime] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  const getAndRecommend = () => {
    setError(null);
    if (!navigator.geolocation) {
      setError("Geolocation not supported by your browser.");
      return;
    }
    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        try {
          const res = await fetch("http://127.0.0.1:8000/recommend", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ lat, lon }),
          });
          const data = await res.json();
          if (res.ok) {
            console.log(data);
            setWeather(data.weather);
            setLocalTime(data.local_time);
            setSuggestions(data.suggestions || []);
            console.log(data.suggestions);
          } else {
            setError(data);
          }
        } catch (err) {
          setError(err.message || "Network error");
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setError("Permission denied or failed to get location: " + err.message);
        setLoading(false);
      },
      {
        enableHighAccuracy: false,
        timeout: 10000,
      }
    );
  };

  return (
    <div className="p-4 bg-white rounded shadow max-w-md">
      <h3 className="text-lg font-semibold mb-2">Context-aware Recommendations</h3>
      <p className="text-sm text-gray-600 mb-3">
        Tap the button to allow location access — we'll fetch local weather & suggest items.
      </p>

      <button
        onClick={getAndRecommend}
        className="px-4 py-2 bg-blue-600 text-white rounded mb-3"
        disabled={loading}
      >
        {loading ? "Finding..." : "Get Recommendations"}
      </button>

      {error && <div className="text-red-600 mb-2">{String(error)}</div>}

      {weather && (
        <div className="mb-3">
          <div className="text-sm text-gray-700">
            Weather: <span className="font-medium">{weather.main}</span> — {weather.description}
          </div>
          <div className="text-sm text-gray-700">Temp: {weather.temp_c}°C</div>
          <div className="text-sm text-gray-700">Local time: {new Date(localTime).toLocaleString()}</div>
        </div>
      )}

      {suggestions.length > 0 && (
        <div>
          <h4 className="font-semibold mb-2">Suggested for you</h4>
          <div className="grid grid-cols-1 gap-3">
            {suggestions.map((p) => (
              <div key={p._id} className="flex items-center gap-3 border rounded p-2">
                <img src={p.image} alt={p.name} className="w-16 h-16 object-cover rounded" />
                <div>
                  <div className="font-semibold">{p.name}</div>
                  <div className="text-sm text-gray-600">{p.desc}</div>
                  <div className="text-sm text-green-600 font-bold">₹{p.price}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
