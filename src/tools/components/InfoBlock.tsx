import Icon from "./Icon";

type InfoBlockProps = {
    title: string;
    value: string | number;
    subtitle: string;
    imageSrc?: string;
    iconName?: string;
    valueClassName?: string;
};

export default function InfoBlock({
    title,
    value,
    subtitle,
    iconName,
    imageSrc,
    valueClassName,
}: InfoBlockProps) {
    return (
        <div className="bg-black bg-opacity-80 p-6 rounded-lg shadow-md text-white grid gap-2 lg:w-[20rem]">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold tracking-wide">{title}</h3>
                {imageSrc && (
                    <img
                        src={imageSrc}
                        alt="Crypto logo"
                        className="rounded-full w-9 h-9 object-cover border border-gray-600"
                    />
                )}
                {iconName && (
                    <Icon name={iconName} className="w-7 h-7 text-gray-300 hover:text-white transition-colors" />
                )}
            </div>

            <span className={`text-2xl font-semibold tracking-tight ${valueClassName}`}>
                {value}
            </span>

            <span className="text-xs font-medium uppercase text-gray-400 tracking-wider">
                {subtitle}
            </span>
        </div>
    );
}
