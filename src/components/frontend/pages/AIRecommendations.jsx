import React, { useState } from "react";

const AIRecommendations = () => {
  const [preferences, setPreferences] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const getSuggestions = async () => {
    try {
      const response = await fetch("http://localhost:5000/suggest-trips", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preferences: preferences.split(",") }),
      });
      const data = await response.json();
      if (data.success) setSuggestions(data.suggestions);
    } catch (error) {
      console.error("Error fetching AI recommendations", error);
    }
  };

  return (
    <div className="ai-recommendations">
      <h2>AI Recommendations</h2>
      <input
        type="text"
        placeholder="Enter preferences (e.g., Beach, City)"
        value={preferences}
        onChange={(e) => setPreferences(e.target.value)}
        className="preference-input"
      />
      <button className="btn" onClick={getSuggestions}>Get Suggestions</button>
      <ul>
        {suggestions.map((suggestion, index) => (
          <li key={index}>{suggestion.destination} - {suggestion.activity}</li>
        ))}
      </ul>
    </div>
  );
};

export default AIRecommendations;
