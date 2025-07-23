import { useEffect, useState } from "react";
import type { CoinType } from "../../types/coins.types";
import Icon from "../Icon";
import ModalCoinDetails from "./ModalCoinDetails";
import { useCoins } from "../../context/CoinContext";

type TableProps = {
    columns: string[];
    title?: string;
    description?: string;
    body: CoinType[];
};

export default function PositiveVariationTable({ columns, title, description, body }: TableProps) {
    const { fetchCoins } = useCoins()


    const [selectedCoin, setSelectedCoin] = useState<CoinType | null>(null);

    const openModal = (coin: CoinType) => setSelectedCoin(coin);
    const closeModal = () => setSelectedCoin(null);

    useEffect(() => {
        fetchCoins(1, 100);
    }, []);

    return (
        <>
            <table className='bg-gray-200 rounded-xl w-full text-gray-800 space-y-2'>
                <caption className="text-xl text-start text-gray-50 font-bold mb-7">
                    <span className='flex items-center gap-2'>
                        <Icon name='arrow-up' className='size-6' />
                        {title}
                    </span>
                    <p className="text-sm font-normal mt-3" dangerouslySetInnerHTML={{ __html: `${description}` }} />
                </caption>

                <thead>
                    <tr>
                        {columns.map(column => (
                            <th key={column} className='p-6'>{column}</th>
                        ))}
                    </tr>
                </thead>

                <tbody className='bg-white divide-y divide-gray-200'>
                    {body.map((coin) => (
                        <tr onClick={() => openModal(coin)} key={coin.id} className="hover:bg-gray-200 cursor-pointer hover:text-gray-800 transition-all text-lg font-medium">
                            <td className="p-6 space-y-2">
                                <img src={coin.image} alt={coin.name} className='rounded-full size-7' />
                                <span>{coin.name}</span>
                            </td>

                            <td className="p-6">
                                <span className='bg-gray-100 uppercase p-2 text-xs rounded-full'>{coin.symbol}</span>
                            </td>

                            <td className="p-6">${coin.current_price.toLocaleString()}</td>

                            <td className="p-6">
                                <div className='flex items-center gap-3 font-bold text-green-600 bg-green-100 rounded-full text-center justify-center px-5 lg:px-0 lg:max-w-32'>
                                    <span className='text-sm'>{coin.price_change_percentage_24h.toFixed(2)}%</span>
                                    <Icon name='arrow-up' className={`size-6`} />
                                </div>
                            </td>

                            <td className="p-6">${coin.market_cap.toLocaleString()}</td>

                            <td className='p-6 flex items-center gap-4'>

                                <button onClick={() => openModal(coin)}>
                                    <Icon name='view' className={`size-6 text-blue-600 hover:scale-110 transition-transform`} />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {selectedCoin && <ModalCoinDetails coin={selectedCoin} onClose={closeModal} />}
        </>
    );
}
