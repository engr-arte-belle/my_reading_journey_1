import { 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

import { useTheme } from "../context/ThemeContext";
import { chartTheme } from "../utils/chartTheme";

export default function BooksPerMonthChart({ data = [] }) {
  if (!data.length) return <p>No data available.</p>

  const { theme } = useTheme();
  const colors = chartTheme[theme];

  return (
    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data}>
        <XAxis stroke={colors.axis} dataKey="month" />
        <YAxis stroke={colors.axis} />
        <Tooltip contentStyle={{
          backgroundColor: colors.tooltipBg,
          color: colors.tooltipText,
          border: "none",
          borderRadius: 8,
        }} />
        <Bar
          dataKey="books"
          isAnimationActive={true}
          animationDuration={800}
          animationEasing="ease-out"
          fill={colors.bar}
        />
        <CartesianGrid stroke={colors.grid} strokeDasharray="1 1" />
      </BarChart>
    </ResponsiveContainer>
  );
}