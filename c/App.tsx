import { useState } from "react";
import axios from "axios";

function App() {
  const [result, setResult] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSchedule = async () => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/v1/projects/1/schedule", {
        tasks: [
          { title: "Design API", estimatedHours: 5, dueDate: "2025-10-25", dependencies: [] },
          { title: "Implement Backend", estimatedHours: 12, dueDate: "2025-10-28", dependencies: ["Design API"] },
          { title: "Build Frontend", estimatedHours: 10, dueDate: "2025-10-30", dependencies: ["Design API"] },
          { title: "End-to-End Test", estimatedHours: 8, dueDate: "2025-10-31", dependencies: ["Implement Backend", "Build Frontend"] }
        ]
      });
      setResult(response.data.recommendedOrder);
    } catch (err) {
      alert("Error fetching schedule");
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Smart Scheduler 🚀</h1>
      <button onClick={handleSchedule} disabled={loading}>
        {loading ? "Scheduling..." : "Generate Schedule"}
      </button>

      {result.length > 0 && (
        <div style={{ marginTop: "20px" }}>
          <h3>Recommended Order:</h3>
          <ol>
            {result.map((task, index) => (
              <li key={index}>{task}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
