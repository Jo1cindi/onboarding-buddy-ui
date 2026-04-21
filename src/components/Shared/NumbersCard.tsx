interface NumbersProps {
    number: {
        icon: React.ReactNode;
        value: number | string;
        label: string;
        iconColor: string;
    }
}
export default function NumbersCard({ number }: NumbersProps) {
    return (

        <div className="bg-white shadow-sm rounded-2xl flex flex-col gap-3 p-4">
            <div
                className={`
          p-2 rounded-md flex justify-center items-center w-fit
        
        `}
                style={{
                    backgroundColor: `${number?.iconColor}33`,
                }} >

                {number?.icon}
            </div>
            <div>
                <p className="text-black text-lg font-semibold mb-1">{number?.value}</p>
                <p className="text-[#453152] text-sm">{number?.label}</p>
            </div>
        </div>
    )
}