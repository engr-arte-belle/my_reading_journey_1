export default function SummaryCard({ title, value }) {
  return (
    <div style={{
      background: "#f5f5f5",
      padding: 20,
      borderRadius: 12,
      minWidth: 150,
      textAlign: "center",
      boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)"
    }}>
      <h4>{title}</h4>
      <h1>{value}</h1>
    </div>
  );
}