interface BannerProps {
    children: React.ReactNode;
    className?: string;
}


export default function Banner({ children, className }: BannerProps) {
    return (
        <div className={`relative w-full h-full overflow-hidden bg-gradient-to-br from-[#0078d4] to-[#c03bc4] rounded-2xl ${className}`}>

            {/* Triangle Texture Overlay */}
            <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="xMidYMid slice"
                viewBox="0 0 800 300"
            >
                {/* Large filled triangles */}
                <polygon points="800,300 560,300 800,120" fill="white" opacity="0.06" />
                <polygon points="0,0 260,0 0,180"         fill="white" opacity="0.06" />
                <polygon points="650,0 800,0 800,110"     fill="white" opacity="0.08" />
                <polygon points="0,220 0,300 130,300"     fill="white" opacity="0.08" />
                <polygon points="200,300 400,300 300,180" fill="white" opacity="0.05" />
                <polygon points="420,0 580,0 500,120"     fill="white" opacity="0.05" />
                <polygon points="680,180 780,300 580,300" fill="white" opacity="0.06" />

                {/* Small accent triangles */}
                <polygon points="100,0 160,0 130,50"     fill="white" opacity="0.10" />
                <polygon points="300,0 340,0 320,35"     fill="white" opacity="0.08" />
                <polygon points="60,150 100,150 80,200"  fill="white" opacity="0.07" />
                <polygon points="700,60 740,60 720,100"  fill="white" opacity="0.09" />
                <polygon points="450,200 490,200 470,250" fill="white" opacity="0.07" />
                <polygon points="560,140 610,140 585,190" fill="white" opacity="0.06" />
                <polygon points="250,80 290,80 270,130"  fill="white" opacity="0.05" />
                <polygon points="370,220 410,220 390,270" fill="white" opacity="0.07" />
                <polygon points="160,240 200,300 120,300" fill="white" opacity="0.06" />
                <polygon points="620,240 680,300 560,300" fill="white" opacity="0.05" />
                <polygon points="740,130 800,130 800,200" fill="white" opacity="0.07" />
                <polygon points="0,50 50,0 0,0"           fill="white" opacity="0.09" />

                {/* Hairline outline triangles for depth */}
                <polygon points="350,50 450,50 400,150"  fill="none" stroke="white" strokeWidth="0.8" opacity="0.12" />
                <polygon points="100,80 220,80 160,200"  fill="none" stroke="white" strokeWidth="0.8" opacity="0.10" />
                <polygon points="580,80 700,80 640,200"  fill="none" stroke="white" strokeWidth="0.6" opacity="0.10" />
                <polygon points="50,130 150,270 0,270"   fill="none" stroke="white" strokeWidth="0.6" opacity="0.08" />
                <polygon points="750,20 800,100 700,100" fill="none" stroke="white" strokeWidth="0.6" opacity="0.10" />
            </svg>

            {/* Content */}
            <div className="relative z-10 w-full h-full flex items-center justify-center p-8 text-white">
                {children}
            </div>
        </div>
    );
}