import { useState } from "react";

export default function Settings() {
  const [goal, setGoal] = useState(50);

  return (
    <div>
      <h1>⚙️ Settings</h1>

      <label>Reading Goal (Books per Year):</label>
      <input type="number" value={goal} onChange={e => setGoal(e.target.value)} />

      <p>Your goal is: {goal} books</p>
    </div>
  );
}