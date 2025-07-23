type FetchChartDataProps = {
    selectedCoin: { id: string } | null | undefined;
    setLabels: React.Dispatch<React.SetStateAction<string[]>>;
    setPrices: React.Dispatch<React.SetStateAction<number[]>>;
};

/**
 * Fetches 7-day price chart data for the specified cryptocurrency and updates the state with formatted labels and prices.
 * 
 * @param selectedCoin - The selected coin object containing at least the coin ID. If null or undefined, the function exits early.
 * @param setLabels - React state setter function to update the chart labels (dates).
 * @param setPrices - React state setter function to update the chart prices (values).
 * 
 * The function fetches price data from CoinGecko's API, formats the timestamps into short weekday labels,
 * extracts the prices, and updates the respective states. Errors during fetch are caught and logged.
 */

export const fetchChartData = async ({ selectedCoin, setLabels, setPrices }: FetchChartDataProps) => {
    if (!selectedCoin) return;

    try {
        const res = await fetch(
            `https://api.coingecko.com/api/v3/coins/${selectedCoin.id}/market_chart?vs_currency=usd&days=7`
        );
        const data = await res.json();

        const formattedLabels = data.prices.map((point: [number, number]) =>
            new Date(point[0]).toLocaleDateString("en-US", {
                weekday: "short"
            })
        );
        const formattedPrices = data.prices.map((point: [number, number]) => point[1]);

        setLabels(formattedLabels);
        setPrices(formattedPrices);
    } catch (err) {
        console.error("Error fetching chart data", err);
    }
};