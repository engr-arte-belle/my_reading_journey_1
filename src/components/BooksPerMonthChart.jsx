import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ResponsiveContainer } from "recharts";

export default function BooksPerMonthChart({ data = [] }) {
  if (!data.length) return <p>No data available.</p>

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar
          dataKey="books"
          isAnimationActive={true}
          animationDuration={800}
          animationEasing="ease-out"
        />
        <CartesianGrid strokeDasharray="1 1" />
      </BarChart>
    </ResponsiveContainer>
  );
}