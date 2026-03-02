import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const fakeSalesData = [
  { month: 'Jan', sales: 4000, customers: 240 },
  { month: 'Feb', sales: 3000, customers: 221 },
  { month: 'Mar', sales: 5000, customers: 229 },
  { month: 'Apr', sales: 4780, customers: 200 },
  { month: 'May', sales: 5890, customers: 218 },
  { month: 'Jun', sales: 4390, customers: 250 },
  { month: 'Jul', sales: 4490, customers: 210 },
  { month: 'Aug', sales: 4700, customers: 230 },
  { month: 'Sep', sales: 4200, customers: 215 },
  { month: 'Oct', sales: 5300, customers: 240 },
  { month: 'Nov', sales: 6100, customers: 260 },
  { month: 'Dec', sales: 7000, customers: 300 },
];

const COLORS = [
  "#3b82f6", "#f97316", "#10b981", "#f59e42", "#6366f1", "#e11d48",
  "#facc15", "#14b8a6", "#a21caf", "#f43f5e", "#0ea5e9", "#22d3ee"
];

const SalesChart = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-4xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Monthly Sales Overview</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={fakeSalesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="sales" stroke="#3b82f6" />
          <Line type="monotone" dataKey="customers" stroke="#f97316" />
        </LineChart>
      </ResponsiveContainer>
      <h2 className="text-xl font-semibold mt-8 mb-4 text-center">Sales Distribution by Month</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={fakeSalesData}
            dataKey="sales"
            nameKey="month"
            cx="50%"
            cy="50%"
            outerRadius={100}
            fill="#3b82f6"
            label
          >
            {fakeSalesData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
