interface ButtonProps {
    text: string;
    onClick?: () => void;
}
export default function SecondaryButton({ text, onClick }: ButtonProps) {
    return (
        <button className="text-white w-fit cursor-pointer text-base px-4 py-3 rounded-xl bg-[#c03bc4] hover:bg-[#c03bc4]" onClick={onClick}>
            {text}
        </button>
    )
}