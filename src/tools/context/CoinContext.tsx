import { createContext, useContext, useEffect, useState } from "react";
import type { CoinType } from "../types/coins.types";

type CoinContextType = {
    coins: CoinType[] | null;
    loading: boolean;
    error: string | null
    fetchCoins: (page?: number, perPage?: number) => void;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined)

/*
 ** CoinProvider wraps your app and provides access to coin data from the CoinGecko API throughout the component tree.
 */
export const CoinProvider = ({ children }: { children: React.ReactNode }) => {
    const [coins, setCoins] = useState<CoinType[] | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    /**
     * Fetches coins data from the CoinGecko API and updates the state.
     * @param page - The page number to fetch (default: 1).
     * @param perPage - The number of coins per page (default: 10).
     */
    const fetchCoins = async (page: number = 1, perPage: number = 10) => {
        const public_key = import.meta.env.VITE_COINGECKO_PUBLIC_KEY;

        const url = new URL('https://api.coingecko.com/api/v3/coins/markets');

        url.searchParams.set('vs_currency', 'usd');
        url.searchParams.set('page', String(page));
        url.searchParams.set('per_page', String(perPage));
        url.searchParams.set('x_cg_demo_api_key', public_key);

        try {
            setLoading(true);
            const res = await fetch(url.toString());
            if (!res.ok) throw new Error('cannot fetch data');
            const data: CoinType[] = await res.json();
            setCoins(data);
        } catch (err: unknown) {
            setError(err instanceof Error ? err.message : 'error fetching data');
        } finally {
            setLoading(false);
        }
    };

    const DEFAULT_PER_PAGE = 10;
    useEffect(() => {
        fetchCoins(1, DEFAULT_PER_PAGE);
    }, []);

    return (
        <CoinContext.Provider value={{ coins, loading, error, fetchCoins }}>
            {children}
        </CoinContext.Provider>
    )
}

/**
 * Custom hook to access the coin context.
 * Throws an error if used outside the CoinProvider.
 */
export const useCoins = () => {
    const context = useContext(CoinContext)
    if (!context) throw new Error('useCoins must be used within a CoinProvider')
    return context
}