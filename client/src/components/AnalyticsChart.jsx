import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AnalyticsChart = ({ summary }) => {
  const labels = summary.map((item) => item.metric);
  const data = {
    labels,
    datasets: [
      {
        label: 'Trend score',
        data: summary.map((item) => item.value),
        backgroundColor: labels.map((label) => {
          const match = summary.find((item) => item.metric === label);
          return match?.trend === 'up' ? '#16a34a' : match?.trend === 'down' ? '#dc2626' : '#c084fc';
        }),
      },
    ],
  };

  return <Bar data={data} options={{ responsive: true, plugins: { legend: { display: false } } }} />;
};

export default AnalyticsChart;
