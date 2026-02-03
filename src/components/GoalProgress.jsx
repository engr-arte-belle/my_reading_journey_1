export default function GoalProgress({ current, goal }) {
  const percent = Math.min((current / goal) * 100, 100).toFixed(1);

  return (
    <div style={{ widt: 300 }}>
      <p>🎯 Goal: {goal} books</p>
      <p>📚 Read: {current} books ({percent}%)</p>

      <div style={{ background: "#ddd", height: 20, borderRadius: 10 }}>
        <div
          style={{ width: `${percent}%`, height: "100%", background: "green", borderRadius: 10 }}
        />
      </div>
    </div>
  );
}