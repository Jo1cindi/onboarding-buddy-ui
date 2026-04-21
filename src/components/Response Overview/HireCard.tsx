"use client";

import { NewHire } from "@/src/app/types/data.t";
import StatusBadge from "./StatusBadge";

interface HireCardProps {
    hire: NewHire;
    selected: boolean;
    onClick: () => void;
}

export default function HireCard({ hire, selected, onClick }: HireCardProps) {
    const initials = hire.newHireName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();

    return (
        <div
            onClick={onClick}
            className="relative flex flex-col gap-3 p-4 rounded-xl border cursor-pointer transition-all"
            style={{
                background: selected ? "rgba(0,120,212,0.05)" : "#fff",
                borderColor: selected ? "#0078D4" : "rgba(69,65,66,0.15)",
                boxShadow: selected ? "0 0 0 1px #0078D4" : "0 1px 4px rgba(0,0,0,0.06)",
            }}
        >
            {/* Active indicator */}
            {selected && (
                <span
                    style={{
                        position: "absolute", top: 10, right: 10,
                        width: 8, height: 8, borderRadius: "50%",
                        background: "#0078D4",
                    }}
                />
            )}

            {/* Avatar + name */}
            <div className="flex items-center gap-3">
                <div
                    className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold text-white shrink-0"
                    style={{ background: selected ? "#0078D4" : "#454142" }}
                >
                    {initials}
                </div>
                <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#111] truncate">{hire.newHireName}</p>
                    <p className="text-xs text-[#454142]/60 truncate">{hire.role}</p>
                </div>
            </div>

            {/* Meta */}
            <div className="flex flex-col gap-1 text-xs text-[#454142]/70">
                <span>Manager: <span className="text-[#454142]">{hire.manager}</span></span>
                <span>Region: <span className="text-[#454142]">{hire.region}</span></span>
            </div>

            <StatusBadge status={hire.buddyStatus} />
        </div>
    );
}