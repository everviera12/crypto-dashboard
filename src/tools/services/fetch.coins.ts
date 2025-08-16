import type { CoinType } from "../types/coins.types";

export const fetchCoins = async (): Promise<CoinType[]> => {

    const publicKey = import.meta.env.VITE_COINGECKO_PUBLIC_KEY;

    if (!publicKey) {
        throw new Error("Missing public key for CoinGecko API");
    }

    try {
        const url = new URL("https://api.coingecko.com/api/v3/coins/markets");

        url.searchParams.set("vs_currency", "usd");
        url.searchParams.set("x-cg-demo-api-key", publicKey);

        const response = await fetch(url.toString());

        if (!response.ok) {
            throw new Error(`Failed to fetch coins: ${response.status} ${response.statusText}`);
        }

        const data: CoinType[] = await response.json();
        return data;

    } catch (error) {
        console.error("Error parsing response data", error);
        return [];
    }
}