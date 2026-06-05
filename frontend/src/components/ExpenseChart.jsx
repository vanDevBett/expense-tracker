import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#4f46e5", "#7c3aed", "#db2777", "#ea580c", "#16a34a", "#0891b2", "#ca8a04", "#9f1239"];

export default function ExpenseChart({ data }) {
  const chartData = data.map(item => ({
    name: item.category,
    value: item.total
  }));

  return (
    <div style={styles.container}>
      <h3 style={styles.title}>Spending by Category</h3>
      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          >
            {chartData.map((_, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

const styles = {
  container: { background: "white", borderRadius: "8px", padding: "20px", marginBottom: "24px", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" },
  title: { margin: "0 0 16px", fontSize: "18px" }
};