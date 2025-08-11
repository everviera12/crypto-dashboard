export default function Component404({ text }: { text: string }) {
    return (
        <div
            className="h-screen absolute left-0 w-full top-0 grid grid-rows-[1fr,2fr,1fr] p-8 text-white"
            style={{
                backgroundImage: 'url("/galaxy.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className="flex flex-col items-center justify-center">
                <h1 className="text-8xl font-bold italic tracking-widest animate-pulse">404</h1>
                <p className="text-xl font-medium text-center">{text}</p>
            </div>

            <div className="flex items-center justify-center">
                <img
                    src="/astronauta.png"
                    alt="astronauta-img"
                    className="w-[15rem] md:w-[20rem] animate-float"
                />
                <img
                    src="/ovni.png"
                    alt="ovni-img"
                    className="w-[15rem] md:w-[20rem] animate-hover absolute top-0 left-20 rotate-[10deg]"
                />
            </div>
        </div>
    );
}