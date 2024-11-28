// App.js (React)
import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post("https://api.testzeus-hercules.com/endpoint", { input });
      setResult(response.data.output);
    } catch (error) {
      setResult("Error fetching data: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header>
        <h1>TestZeus-Hercules Interface</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit}>
          <label htmlFor="input">Enter Input:</label>
          <input
            id="input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Processing..." : "Submit"}
          </button>
        </form>
        <section>
          <h2>Result</h2>
          <pre>{result}</pre>
        </section>
      </main>
    </div>
  );
};

export default App;
