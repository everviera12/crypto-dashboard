import { useEffect, useState } from "react";
import type { CoinType } from "../../types/coins.types";
import Icon from "../Icon";

type Props = {
    modal: boolean;
    onClose: () => void;
};

export default function ModalCoinFav({ modal, onClose }: Props) {
    const [favCoins, setFavCoins] = useState<CoinType[]>([]);

    useEffect(() => {
        const saved = localStorage.getItem("favorites");
        if (saved) {
            try {
                const parsed: CoinType[] = JSON.parse(saved);
                setFavCoins(parsed);
            } catch {
                setFavCoins([]);
            }
        }
    }, []);

    const removeFavorite = (id: string) => {
        const filtered = favCoins.filter((coin) => coin.id !== id);
        setFavCoins(filtered);
        localStorage.setItem("favorites", JSON.stringify(filtered));
    };

    if (!modal) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 sm:p-6"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl w-full max-w-2xl p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            >
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                    aria-label="Close modal"
                >
                    <Icon name="close" className="size-6 text-gray-700" />
                </button>

                <h2 className="text-2xl sm:text-3xl font-bold text-black mb-6 sm:mb-8 tracking-wide border-b border-gray-300 pb-3 sm:pb-4">
                    Favorite coins
                </h2>

                {favCoins.length === 0 ? (
                    <p className="text-center text-gray-700 text-base sm:text-lg py-4">
                        You have no favorite coins saved yet.
                    </p>
                ) : (
                    <ul className="space-y-4 sm:space-y-6 text-gray-50 max-h-[calc(90vh-180px)] overflow-y-auto pr-2 sm:pr-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                        {favCoins.map((coin) => (
                            <li
                                key={coin.id}
                                className="bg-gray-700 rounded-lg p-3 sm:p-4 grid grid-cols-3 gap-2 sm:flex sm:items-center sm:justify-between"
                            >
                                <div className="flex items-center gap-2 sm:gap-4 col-span-2 sm:col-auto">
                                    <img
                                        src={coin.image}
                                        alt={coin.name}
                                        className="rounded-full size-8 sm:size-10 lg:size-12"
                                        loading="lazy"
                                    />
                                    <div className="min-w-0">
                                        <h3 className="font-semibold text-sm sm:text-base lg:text-xl truncate">
                                            {coin.name}
                                        </h3>
                                        <p className="uppercase text-xs sm:text-sm tracking-wider text-gray-300">
                                            {coin.symbol}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end justify-center sm:min-w-[100px] sm:mr-4">
                                    <span className="text-sm sm:text-base font-semibold text-gray-50">
                                        ${coin.current_price.toLocaleString(undefined, {
                                            maximumFractionDigits: coin.current_price < 1 ? 6 : 2
                                        })}
                                    </span>
                                    <span className={`text-xs ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                                        {coin.price_change_percentage_24h >= 0 ? '+' : ''}
                                        {coin.price_change_percentage_24h?.toFixed(2)}%
                                    </span>
                                </div>

                                <button
                                    onClick={() => removeFavorite(coin.id)}
                                    className="text-gray-50 hover:text-red-600 transition flex items-center lg:justify-end"
                                    aria-label={`Remove ${coin.name} from favorites`}
                                >
                                    <Icon name="delete" className="size-5 sm:size-6" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}