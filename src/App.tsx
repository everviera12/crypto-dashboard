import './App.css'
import { useEffect, useState } from "react";

import PositiveVariationTable from "./tools/components/table/PositiveVariationTable";
import InfoBlock from './tools/components/InfoBlock';
import { useCoins } from './tools/context/CoinContext'
import { fetchChartData } from "./tools/services/fetchCoinId";
import ModalCoinFav from './tools/components/table/ModalCoinFav';
import Icon from './tools/components/Icon';
import Dashboard from './tools/components/Dashboard';
import AllCoinsTable from './tools/components/table/AllCoinsTable';

const TABLE_HEAD = [
    { label: 'Crypto' },
    { label: 'Symbol' },
    { label: 'Price' },
    { label: 'Change 24h' },
    { label: 'Market Cap' },
    { label: 'More Info' },
]

function App() {
    /** 
    * coins: return all information about the coins
    **/
    const { coins } = useCoins()

    /**
     * Local component states for the dashboard:
     * - selectedCoinId: ID of the cryptocurrency selected for displaying its 7-day price chart (default: 'bitcoin').
     * - labels: Array of time labels (e.g., dates or hours) used as the X-axis in the price chart.
     * - prices: Array of price points matching the labels, used as the Y-axis in the chart.
     * - modalOpen: Flag to control the modal's visibility.
     */
    const [selectedCoinId, setSelectedCoinId] = useState('bitcoin');
    const [labels, setLabels] = useState<string[]>([]);
    const [prices, setPrices] = useState<number[]>([]);
    const [modalOpen, setModalOpen] = useState(false);


    // Get the selected coin from the coins array based on the selectedCoinId
    const selectedCoin = coins?.find(coin => coin.id === selectedCoinId)

    /**
     * Gets the top 5 cryptocurrencies with the highest positive variation in the last 24 hours.
     * 
     * 1. filter: selects only coins with a positive 24h price change.
     * 2. sort: sorts the filtered coins in descending order by their 24h price change.
     * 3. slice: takes the first 5 coins from the sorted array, i.e., the top 5 gainers.
     */
    const positiveVariation = coins?.filter(coin => coin.price_change_percentage_24h > 0)
        .sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h)
        .slice(0, 5);

    // call fetchChartData on component mount to fetch the initial data
    useEffect(() => {
        fetchChartData({
            selectedCoin,
            setLabels,
            setPrices
        });
    }, [selectedCoin]);

    const toggleModal = () => {
        setModalOpen((prev) => !prev);
    };

    return (
        <div className='space-y-6'>
            <div className='p-2 flex gap-4 justify-end'>
                <button onClick={toggleModal}>
                    <Icon className='size-6' name='heart' />
                </button>

                <select
                    name="coins"
                    className="p-2 bg-white text-gray-800 rounded not"
                    value={selectedCoinId}
                    onChange={(e) => setSelectedCoinId(e.target.value)}
                >
                    {coins?.slice(0, 10).map((coin) => (
                        <option key={coin.id} value={coin.id}>
                            {coin.name}
                        </option>
                    ))}
                </select>
            </div>

            {selectedCoin && (
                <div key={selectedCoin.id} className=''>
                    <div className='flex gap-6 flex-col lg:flex-row'>
                        {
                            /* 
                            ** Each InfoBlock shows key data about the coin:
                            - Coin symbol and name
                            - Current price (formatted with commas and currency symbol)
                            - 24-hour percentage change (formatted to 2 decimal places and colored based on positive/negative)
                            - Market capitalization (formatted with commas)
                            
                            ** Formatting details
                            - toLocaleString(): Formats the number as a string with commas and currency symbol
                            - toFixed(): Formats the number as a string with a specified number of decimal places
                            - valueClassName: Adds a class name to the value element based on the percentage change value
                            */
                        }
                        <InfoBlock
                            title={'Crypto'}
                            imageSrc={selectedCoin.image}
                            value={selectedCoin.symbol}
                            subtitle={selectedCoin.name}
                        />

                        <InfoBlock
                            title={'Current Price'}
                            iconName={'money'}
                            value={`$${selectedCoin.current_price.toLocaleString()}`}
                            subtitle={'USD'}
                        />

                        <InfoBlock
                            title={"24h Change"}
                            iconName={'arrow-up'}
                            value={`${selectedCoin.price_change_percentage_24h.toFixed(3)}%`}
                            subtitle={'Last 24 hours'}
                            valueClassName={
                                selectedCoin.price_change_percentage_24h >= 0
                                    ? 'text-green-500'
                                    : 'text-red-500'
                            }
                        />

                        <InfoBlock
                            title={'Market Cap'}
                            iconName={'global'}
                            value={selectedCoin.market_cap.toLocaleString()}
                            subtitle={'USD'}
                        />
                    </div>
                </div>
            )}

            {selectedCoin && (
                <Dashboard selectedCoin={selectedCoin} labels={labels} prices={prices} />
            )}

            {coins ? (
                <AllCoinsTable coins={coins} />
            ) :
                <div className="flex items-center justify-center h-64">
                    <span className="text-red-400 text-xl font-semibold drop-shadow-[0_0_6px_rgba(255,0,0,0.6)]">
                        Data not available
                    </span>
                </div>}

            {positiveVariation && (
                <div className='relative overflow-x-auto text-left rounded-xl'>
                    <PositiveVariationTable
                        columns={TABLE_HEAD.map(col => col.label)}
                        title="Top 5 gainers (Last 24 hours)"
                        description="Cryptocurrencies with the highest positive price change in the last 24 hours."
                        body={positiveVariation}
                    />
                </div>
            )}

            {modalOpen && <ModalCoinFav modal={modalOpen} onClose={toggleModal} />}
        </div>
    )
}

export default App