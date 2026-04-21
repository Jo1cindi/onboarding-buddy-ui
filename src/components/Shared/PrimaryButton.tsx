interface ButtonProps {
    text: string;
    onClick?: () => void;
}
export default function PrimaryButton({ text, onClick }: ButtonProps) {
    return (
        <button className="text-white w-fit cursor-pointer text-sm px-4 py-3 h-fit rounded-md bg-[#0078d4] hover:bg-[#c03bc4]" onClick={onClick}>
            {text}
        </button>
    )
}