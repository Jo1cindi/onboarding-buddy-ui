"use client";

import React, { useState, useMemo, useEffect } from "react";
import HireCard from "./HireCard";
import HireDetailPanel from "./HireDetailPanel";
import { NewHire } from "@/src/app/types/data.t";

interface GridViewProps {
    data: NewHire[];
    onAssign: (hireId: string, buddyName: string, buddyEmail: string) => void;
}

function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const mq = window.matchMedia("(max-width: 767px)");
        setIsMobile(mq.matches);
        const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);
    return isMobile;
}

export default function GridView({ data, onAssign }: GridViewProps) {
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [sheetVisible, setSheetVisible] = useState(false);
    const isMobile = useIsMobile();

    const filtered = useMemo(() => {
        const q = query.toLowerCase().trim();
        if (!q) return data;
        return data.filter((h) =>
            h.newHireName.toLowerCase().includes(q) ||
            h.role.toLowerCase().includes(q) ||
            h.region.toLowerCase().includes(q) ||
            h.manager.toLowerCase().includes(q)
        );
    }, [data, query]);

    const selectedHire = data.find((h) => h.id === selectedId) ?? null;

    useEffect(() => {
        if (selectedId && isMobile) {
            requestAnimationFrame(() => setSheetVisible(true));
        } else {
            setSheetVisible(false);
        }
    }, [selectedId, isMobile]);

    const handleCardClick = (id: string) => {
        setSelectedId((prev) => (prev === id ? null : id));
    };

    const closeSheet = () => {
        setSheetVisible(false);
        setTimeout(() => setSelectedId(null), 300);
    };

    const searchInput = (placeholder = "Search by name, role, region…") => (
        <div className="relative mb-4 shrink-0">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#454142]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
            </svg>
            <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-white border border-[#454142]/40 text-[#454142] focus:outline-none focus:ring-2 focus:ring-[#0078D4]/40 transition placeholder:text-[#454142]/30"
            />
        </div>
    );

    return (
        <>
            {/* ── Desktop / tablet: side-by-side ── */}
            <div className="hidden md:flex gap-0 h-full min-h-0">
                <div className="flex flex-col w-[55%] shrink-0 border-r border-[#454142]/15 pr-6">
                    {searchInput()}
                    <p className="text-xs text-[#454142]/50 mb-3 shrink-0">{filtered.length} of {data.length} records</p>
                    <div className="grid grid-cols-2 gap-3 overflow-y-auto pb-2" style={{ scrollbarWidth: "thin" }}>
                        {filtered.length === 0 ? (
                            <div className="col-span-2 py-12 text-center text-sm text-[#454142]/40">No records match your search</div>
                        ) : (
                            filtered.map((hire) => (
                                <HireCard key={hire.id} hire={hire} selected={hire.id === selectedId} onClick={() => handleCardClick(hire.id)} />
                            ))
                        )}
                    </div>
                </div>
                <div className="flex-1 min-w-0 pl-6 overflow-hidden">
                    <HireDetailPanel hire={selectedHire} onAssign={onAssign} />
                </div>
            </div>

            {/* ── Mobile: stacked cards ── */}
            <div className="flex flex-col md:hidden h-full min-h-0">
                {searchInput("Search…")}
                <p className="text-xs text-[#454142]/50 mb-3 shrink-0">{filtered.length} of {data.length} records</p>
                <div className="flex flex-col gap-3 overflow-y-auto pb-4" style={{ scrollbarWidth: "thin" }}>
                    {filtered.length === 0 ? (
                        <div className="py-12 text-center text-sm text-[#454142]/40">No records match your search</div>
                    ) : (
                        filtered.map((hire) => (
                            <HireCard key={hire.id} hire={hire} selected={hire.id === selectedId} onClick={() => handleCardClick(hire.id)} />
                        ))
                    )}
                </div>
            </div>

            {/* ── Bottom sheet — only mounts on mobile ── */}
            {isMobile && selectedId && (
                <>
                    <div
                        className="fixed inset-0 z-40"
                        style={{
                            background: "rgba(0,0,0,0.3)",
                            backdropFilter: "blur(2px)",
                            opacity: sheetVisible ? 1 : 0,
                            transition: "opacity 250ms ease",
                        }}
                        onClick={closeSheet}
                    />
                    <div
                        className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl bg-white overflow-hidden"
                        style={{
                            maxHeight: "82vh",
                            boxShadow: "0 -8px 40px rgba(0,0,0,0.15)",
                            transform: sheetVisible ? "translateY(0)" : "translateY(100%)",
                            transition: "transform 300ms cubic-bezier(0.32,0.72,0,1)",
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <div className="flex justify-center pt-3 pb-1 shrink-0">
                            <div className="w-10 h-1 rounded-full bg-[#454142]/20" />
                        </div>
                        <div className="flex-1 overflow-y-auto">
                            <HireDetailPanel
                                hire={selectedHire}
                                onAssign={(id, name, email) => { onAssign(id, name, email); closeSheet(); }}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
}