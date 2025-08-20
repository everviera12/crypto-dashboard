import { useEffect, useMemo, useState } from 'react';
import './App.css'
import { fetchCoins } from './tools/services/fetch.coins';
import type { CoinPriceHistoryType, CoinType } from './tools/types/coins.types';
import Component404 from './tools/components/Component404';
import Loader from './tools/components/Loader';
import { fetchCoinHistory } from './tools/services/fetch.market_chart';
import { Dashboard } from './tools/components/Dashboard';
import TableCryptos from './tools/components/TableCryptos';
import { Box, Card, CardContent, Typography } from '@mui/material';

function App() {
    const [coins, setCoins] = useState<CoinType[]>([]);
    const [chartData, setChartData] = useState<CoinPriceHistoryType>();
    const [loader, setLoader] = useState(true);
    const [selectedCoin, setSelectedCoin] = useState('bitcoin')

    // const cacheCoinsPrice = useRef<Record<string, CoinPriceHistoryType>>({});

    /**
     * Fetch coins from the CoinGecko API
     * @fetchCoins - function to fetch all coins from the API
     *
     * 
     * Fetch coin history from API when a coin is selected
     * @fetchCoinHistory - function to fetch coin history from the API
     * @selectedCoin - selected coin from the dropdown
     * @setChartData - data.prices is an array of arrays with [timestamp, price]
    */
    useEffect(() => {
        fetchCoins()
            .then((data) => setCoins(data))
            .catch((error) => {
                console.error(error);
                setCoins([]);
            })
            .finally(() => setLoader(false));
    }, []);

    useEffect(() => {
        if (!selectedCoin) return;
        fetchCoinHistory(selectedCoin)
            .then((data) => {
                console.log(`✅ Data of: ${selectedCoin}`, data);
                setChartData(data);
            })
            .catch((error) => {
                console.error(error);
                setChartData(undefined);
            });
    }, [selectedCoin]);

    /**
     * Memoized value that returns the coin object matching the currently selected coin ID.
     * It recalculates only when `coins` or `selectedCoin` change.
     *
     * @param coins - List of all coins fetched from the API.
     * @param selectedCoin - The ID of the coin selected from the dropdown.
     * @returns The coin object that matches the selected ID, or undefined if not found.
     */
    const selectedCoinData = useMemo(() => {
        return coins?.find(coin => coin.id === selectedCoin);
    }, [coins, selectedCoin]);

    return (
        <div className='space-y-6'>
            <div className='p-6 flex gap-4 items-center justify-end'>
                <a href="https://github.com/everviera12/crypto-dashboard" target="_blank" rel="noreferrer">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="size-6" viewBox="0 0 16 16">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8" />
                    </svg>
                </a>
            </div>

            {loader ? (
                <Loader />
            ) : coins && coins?.length > 0 ? (
                <div className='grid gap-6'>

                    <div className='relative inline-block w-[10rem] cursor-pointer'>
                        <select className="p-2.5 bg-gray-100 rounded appearance-none cursor-pointer w-full" value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
                            <option value={""}>Select coin</option>
                            {coins?.slice(0, 10).map(coin => (
                                <option key={coin.id} value={coin.id}>{coin.name}</option>
                            ))}
                        </select>

                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="absolute right-2 top-1/2 -translate-y-1/2 size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                        </svg>
                    </div>

                    {selectedCoinData && (
                        <Box className='grid justify-between lg:flex'>
                            <Card sx={{ maxWidth: 300, borderRadius: 1, boxShadow: 0 }}>
                                <CardContent className='grid gap-4'>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        children={`${selectedCoinData.name} (${selectedCoinData.symbol.toUpperCase()})`}
                                    />
                                    <img src={selectedCoinData.image} alt={selectedCoinData.name} className='w-10' />
                                </CardContent>
                            </Card>

                            <Card sx={{ maxWidth: 300, borderRadius: 1, boxShadow: 0 }}>
                                <CardContent className='grid gap-4'>
                                    <Typography variant="body2" color="text.secondary" children="Current Price" />
                                    <Typography fontWeight={600}
                                        children={`$${selectedCoinData.current_price.toLocaleString()}`}
                                    />
                                </CardContent>
                            </Card>

                            <Card sx={{ maxWidth: 300, borderRadius: 1, boxShadow: 0 }}>
                                <CardContent className='grid gap-4'>
                                    <Typography variant="body2" color="text.secondary" children="24h Change" />
                                    <Typography fontWeight={600}
                                        children={`${selectedCoinData.price_change_percentage_24h.toFixed(2)}%`}
                                        color={
                                            selectedCoinData.price_change_percentage_24h >= 0 ? "success.main" : "error.main"
                                        }
                                    />
                                </CardContent>
                            </Card>

                            <Card sx={{ maxWidth: 300, borderRadius: 1, boxShadow: 0 }}>
                                <CardContent className='grid gap-4'>
                                    <Typography variant="body2" color="text.secondary">
                                        Total Volume
                                    </Typography>
                                    <Typography variant="subtitle1" fontWeight={600}>
                                        ${selectedCoinData.total_volume.toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    )}

                    {chartData && selectedCoinData && (
                        <Dashboard
                            chartData={chartData}
                            isPricePositive={selectedCoinData.price_change_percentage_24h >= 0}
                        />
                    )}

                    {coins && (
                        <div className='py-16 overflow-y-auto'>
                            <TableCryptos coins={coins} />
                        </div>
                    )}
                </div>
            ) : (
                <Component404 text='No coins found. Please check back later.' />
            )
            }
        </div >
    )
}

export default App