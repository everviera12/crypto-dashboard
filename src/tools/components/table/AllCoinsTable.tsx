import { useEffect, useState } from "react";
import type { CoinType } from "../../types/coins.types";

export default function AllCoinsTable({ coins }: { coins: CoinType[] | null }) {

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // filter coins based on search term
    const filteredCoins = coins?.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // update page when search term changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm]);

    return (
        <div className='relative overflow-x-auto text-left rounded-xl'>
            <table className="w-full table-auto border-separate border-spacing-0 text-sm text-[#e0e0e0] bg-[#0f0f0f] rounded-lg overflow-hidden shadow-[0_0_20px_rgba(0,255,255,0.1)]">
                <input
                    type="text"
                    placeholder="Search coin..."
                    className="w-full rounded-md px-4 py-2 text-white border border-cyan-700 placeholder-cyan-400 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />

                <thead>
                    <tr className="bg-[#1a1a1a] text-cyan-400">
                        <th className="px-6 py-4 text-left border-b border-cyan-700">Name</th>
                        <th className="px-6 py-4 text-left border-b border-cyan-700">Symbol</th>
                        <th className="px-6 py-4 text-right border-b border-cyan-700">Price</th>
                        <th className="px-6 py-4 text-right border-b border-cyan-700">Change 24h</th>
                        <th className="px-6 py-4 text-right border-b border-cyan-700">Market Cap</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredCoins
                        ?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
                        .map((coin) => (
                            <tr
                                key={coin.id}
                                className="transition-all duration-200 hover:bg-[#1a1f22] hover:shadow-[0_0_10px_rgba(0,255,255,0.2)]"
                            >
                                <td className="px-6 py-4 border-b border-[#222]">{coin.name}</td>
                                <td className="px-6 py-4 border-b border-[#222] uppercase text-cyan-300">{coin.symbol}</td>
                                <td className="px-6 py-4 border-b border-[#222] text-right">${coin.current_price.toLocaleString()}</td>
                                <td
                                    className={`px-6 py-4 border-b border-[#222] text-right 
                                        ${coin.price_change_percentage_24h >= 0
                                            ? "text-green-400"
                                            : "text-red-400"
                                        }`}
                                >
                                    {coin.price_change_percentage_24h.toFixed(2)}%
                                </td>
                                <td className="px-6 py-4 border-b border-[#222] text-right">${coin.market_cap.toLocaleString()}</td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <div className="flex justify-between items-center mt-4 px-2 text-cyan-300">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-[#1a1a1a] rounded hover:bg-[#222] disabled:opacity-50"
                >
                    Previous
                </button>

                <span>
                    Page {currentPage} of {Math.ceil((filteredCoins?.length || 0) / itemsPerPage)}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage((prev) =>
                            prev < Math.ceil((filteredCoins?.length || 0) / itemsPerPage) ? prev + 1 : prev
                        )
                    }
                    disabled={currentPage >= Math.ceil((filteredCoins?.length || 0) / itemsPerPage)}
                    className="px-4 py-2 bg-[#1a1a1a] rounded hover:bg-[#222] disabled:opacity-50"
                >
                    Next
                </button>
            </div>

        </div>
    );
}