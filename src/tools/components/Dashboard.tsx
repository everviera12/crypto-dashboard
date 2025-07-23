import type { CoinType } from "../types/coins.types";
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Filler
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Filler);

type DashboardProps = {
    selectedCoin: CoinType;
    labels: string[];
    prices: number[];
};

export default function Dashboard({ selectedCoin, labels, prices }: DashboardProps) {

    return (
        <div className="mt-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-lg p-6 border border-gray-200">
            <img src={selectedCoin.image} alt={'Cryoto logo'} className="rounded-full size-6" />

            <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                7-Day Price Trend – {selectedCoin.name}
            </h2>
            <Line
                data={{
                    labels,
                    datasets: [
                        {
                            label: "USD Price",
                            data: prices,
                            fill: true,
                            backgroundColor:
                                selectedCoin.price_change_percentage_24h >= 0
                                    ? "rgba(34,197,94,0.1)"
                                    : "rgba(239,68,68,0.1)",
                            borderColor:
                                selectedCoin.price_change_percentage_24h >= 0
                                    ? "#22c55e"
                                    : "#ef4444",
                            pointRadius: 3,
                            pointBackgroundColor:
                                selectedCoin.price_change_percentage_24h >= 0
                                    ? "#22c55e"
                                    : "#ef4444",
                            tension: 0.4,
                        },
                    ],
                }}
                options={{
                    responsive: true,
                    plugins: {
                        legend: { display: false },
                        tooltip: {
                            mode: "index",
                            intersect: false,
                        },
                    },
                    scales: {
                        x: {
                            ticks: { color: "#4B5563" },
                            grid: { display: false },
                        },
                        y: {
                            ticks: { color: "#4B5563" },
                            grid: { color: "#E5E7EB" },
                        },
                    },
                }}
            />
        </div>
    );
}