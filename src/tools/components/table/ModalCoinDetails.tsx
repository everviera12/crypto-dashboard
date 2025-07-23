import { useEffect, useState } from "react";
import type { CoinType } from "../../types/coins.types";
import Icon from "../Icon";

type Props = {
    coin: CoinType | null;
    onClose: () => void;
};

export default function ModalCoinDetails({ coin, onClose }: Props) {
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        if (!coin) return;

        const stored = localStorage.getItem("favorites");
        const favorites: CoinType[] = stored ? JSON.parse(stored) : [];
        setIsFavorite(favorites.some((fav) => fav.id === coin.id));
    }, [coin]);

    const toggleFavorite = () => {
        if (!coin) return;

        const stored = localStorage.getItem("favorites");
        const favorites: CoinType[] = stored ? JSON.parse(stored) : [];

        let updatedFavorites: CoinType[];

        if (favorites.some((fav) => fav.id === coin.id)) {
            updatedFavorites = favorites.filter((fav) => fav.id !== coin.id);
            setIsFavorite(false);
        } else {
            updatedFavorites = [...favorites, coin];
            setIsFavorite(true);
        }

        localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    };

    if (!coin) return null;

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
        >
            <div
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-6 relative max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <img src={coin.image} alt={coin.name} className="size-12" />
                        <div>
                            <h2 className="text-2xl font-bold text-gray-800">{coin.name}</h2>
                            <p className="text-sm uppercase text-gray-500">{coin.symbol}</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button
                            onClick={toggleFavorite}
                            className="p-2 rounded-full bg-gray-100 hover:bg-red-100 transition"
                        >
                            <Icon
                                name="heart"
                                className={`size-6 ${isFavorite ? "text-red-500" : "text-gray-400"}`}
                            />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <Icon name="close" className="size-6 text-gray-700" />
                        </button>
                    </div>
                </div>

                {/* Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-700">
                    <div>
                        <strong>Current Price:</strong> ${coin.current_price.toLocaleString()}
                    </div>
                    <div>
                        <strong>24h High:</strong> ${coin.high_24h.toLocaleString()}
                    </div>
                    <div>
                        <strong>24h Low:</strong> ${coin.low_24h.toLocaleString()}
                    </div>
                    <div>
                        <strong>Market Cap:</strong> ${coin.market_cap.toLocaleString()}
                    </div>
                    <div>
                        <strong>Total Volume:</strong> ${coin.total_volume.toLocaleString()}
                    </div>
                    <div>
                        <strong>ATH:</strong> ${coin.ath.toLocaleString()}{" "}
                        <span className="text-xs text-gray-500">
                            ({new Date(coin.ath_date).toLocaleDateString()})
                        </span>
                    </div>
                    <div>
                        <strong>ATL:</strong> ${coin.atl.toLocaleString()}{" "}
                        <span className="text-xs text-gray-500">
                            ({new Date(coin.atl_date).toLocaleDateString()})
                        </span>
                    </div>
                    <div>
                        <strong>Circulating Supply:</strong> {coin.circulating_supply.toLocaleString()}
                    </div>
                    <div>
                        <strong>Total Supply:</strong> {coin.total_supply?.toLocaleString() || "N/A"}
                    </div>
                    <div>
                        <strong>Price Change 24h:</strong> ${coin.price_change_24h.toFixed(2)} (
                        {coin.price_change_percentage_24h.toFixed(2)}%)
                    </div>
                </div>
            </div>
        </div>
    );
}
