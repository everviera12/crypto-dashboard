export default function Loader() {
    return (
        <div className="absolute h-screen inset-0 z-10 flex items-center justify-center backdrop-blur-md bg-black/60">
            <div className="flex items-center gap-3">
                <span className="animate-spin w-7 h-7 border-[5px] border-white border-b-yellow-400 rounded-full inline-block" />
                <p className="text-white text-xl italic font-medium">Loading...</p>
            </div>
        </div>
    );
}
