import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";



// Define colors for each slice
const COLORS = ["#8884d8", "#82ca9d"]; // Group A: Purple, Group B: Green

function MyPieChart(props) {
   const data = [
  { name: props.battingTeam, value: props.battingProb },
  { name: props.bowlingTeam, value: props.bowlingProb }
];

  return (
    <PieChart width={350} height={300}>
      <Pie
        data={data}
        dataKey="value"
        nameKey="name"
        outerRadius={85}
    label={({ value }) => `${value}%`}
    labelLine={false}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
}

export default MyPieChart;
