export const fetchCoinHistory = async (coinId: string) => {

    try {
        const url = new URL(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart`);
        url.searchParams.set("vs_currency", "usd");
        url.searchParams.set("days", "7");
        url.searchParams.set("interval", "daily");

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`Error fetching coin history: ${res.statusText}`);

        const data = await res.json();
        // console.log(`Coin history of ${coinId} from server side`, data);
        return data
    } catch (error) {
        console.error(error);
        throw error;
    }
};