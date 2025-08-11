import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import type { CoinPriceHistoryType } from '../types/coins.types';
import Loader from './Loader';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend
);
export function Dashboard({ chartData }: { chartData: CoinPriceHistoryType }) {

    if (!chartData) return <Loader />;
    if (!chartData.prices || chartData.prices.length === 0) return <p>No data available</p>;

    const labels = chartData.prices.map(([timestamp]) =>
        new Date(timestamp).toLocaleDateString("en-US", { month: "short", day: "numeric" })
    );

    console.log(labels);
    

    const prices = chartData.prices.map(([_, price]) => price);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            tooltip: {
                mode: "index" as const,
                intersect: false,
            },
            title: {
                display: true,
                text: 'Crypto Dashboard' as string,
            },
        },
    };

    const data = {
        labels,
        datasets: [
            {
                label: `Price (USD) of ${labels.length} days`,
                data: prices,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
                fill: true,
            },
        ],
    };

    return (
        <Line options={options} data={data} />
    );
}