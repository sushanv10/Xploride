import { FaUsers, FaBoxOpen, FaMotorcycle, FaMapMarkedAlt } from 'react-icons/fa';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  XAxis,
  YAxis,
  Legend,
} from 'recharts';

const dashboardData = [
  { title: 'Users', count: 120, icon: <FaUsers size={32} className="text-blue-400" />, color: 'from-blue-800 to-blue-600' },
  { title: 'Products', count: 48, icon: <FaBoxOpen size={32} className="text-green-400" />, color: 'from-green-800 to-green-600' },
  { title: 'Bikes', count: 20, icon: <FaMotorcycle size={32} className="text-purple-400" />, color: 'from-purple-800 to-purple-600' },
  { title: 'Tours', count: 15, icon: <FaMapMarkedAlt size={32} className="text-yellow-400" />, color: 'from-yellow-700 to-yellow-500' },
];

// Sample chart data
const userStats = [
  { month: 'Jan', users: 10 },
  { month: 'Feb', users: 20 },
  { month: 'Mar', users: 15 },
  { month: 'Apr', users: 25 },
  { month: 'May', users: 35 },
];

const productCategoryData = [
  { name: 'Bikes', value: 20 },
  { name: 'Tours', value: 15 },
  { name: 'Accessories', value: 13 },
];

const COLORS = ['#38bdf8', '#a78bfa', '#facc15'];

const Main = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-gray-900 via-black to-gray-800 py-2 px-6 text-white">
      <h1 className="text-3xl font-bold text-center mb-10">Admin Dashboard</h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {dashboardData.map((item, index) => (
          <div
            key={index}
            className={`bg-gradient-to-br ${item.color} p-6 rounded-2xl shadow-lg hover:scale-105 transition-transform`}
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-1">{item.title}</h2>
                <p className="text-3xl font-bold">{item.count}</p>
              </div>
              <div>{item.icon}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-blue-400 mb-4">Monthly User Signups</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={userStats}>
              <XAxis dataKey="month" stroke="#ccc" />
              <YAxis stroke="#ccc" />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-[#1f1f1f] p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold text-purple-400 mb-4">Product Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={productCategoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {productCategoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Main;
