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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-6"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 relative max-h-[90vh] overflow-y-auto"
            >
                {/* Botón cerrar */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                >
                    <Icon name="close" className="size-6 text-gray-700" />
                </button>

                <h2 className="text-3xl font-bold text-black mb-8 tracking-wide border-b border-gray-300 pb-4">
                    Favorite coins
                </h2>

                {favCoins.length === 0 ? (
                    <p className="text-center text-gray-700 text-lg">
                        You have no favorite coins saved yet.
                    </p>
                ) : (
                    <ul className="space-y-6 max-h-[420px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-200">
                        {favCoins.map((coin) => (
                            <li
                                key={coin.id}
                                className="flex items-center justify-between bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition cursor-default"
                            >
                                <div className="flex items-center gap-4">
                                    <img
                                        src={coin.image}
                                        alt={coin.name}
                                        className="w-14 h-14 rounded-full"
                                    />
                                    <div>
                                        <h3 className="text-xl font-semibold text-gray-700">{coin.name}</h3>
                                        <p className="uppercase text-sm tracking-wider text-gray-600">
                                            {coin.symbol}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex text-gray-800 flex-col items-end mr-6 min-w-[100px]">
                                    <span className="text-lg font-semibold">
                                        ${coin.current_price.toLocaleString()}
                                    </span>
                                    <small className="text-xs text-gray-500">Market Cap</small>
                                    <span className="text-sm text-gray-400">
                                        ${coin.market_cap.toLocaleString()}
                                    </span>
                                </div>

                                <button
                                    onClick={() => removeFavorite(coin.id)}
                                    className="text-gray-400 hover:text-red-600 transition"
                                >
                                    <Icon name="delete" className="size-6" />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
