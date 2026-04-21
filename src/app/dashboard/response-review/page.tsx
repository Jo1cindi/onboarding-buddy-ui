"use client";

import React, { useState } from "react";
import { hireData, NewHire } from "../../types/data.t";
import GridView from "@/src/components/Response Overview/GridView";
import ListView from "@/src/components/Response Overview/ListView";


type ViewMode = "grid" | "list";

export default function ResponseReview() {
    const [viewMode, setViewMode] = useState<ViewMode>("grid");
    const [data, setData] = useState<NewHire[]>(hireData);

    const handleAssign = (hireId: string, buddyName: string, buddyEmail: string) => {
        setData((prev) =>
            prev.map((h) =>
                h.id === hireId
                    ? { ...h, buddyStatus: "has_buddy", buddyName, buddyEmail, responseDate: new Date().toISOString().split("T")[0] }
                    : h
            )
        );
    };

    return (
        <div className="flex flex-col h-screen font-sans">
            {/* Page header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6 shrink-0">
                <div>
                    <p className="text-xl font-semibold text-black">Response Review</p>
                    <p className="text-sm text-[#454142]/60">
                        Track buddy assignments and new hire onboarding status
                    </p>
                </div>

                {/* View toggle */}
                <div className="flex items-center gap-1 p-1 rounded-lg bg-[#e8e6df]/60 border border-[#454142]/15 self-start sm:self-auto">
                    <button
                        onClick={() => setViewMode("grid")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            viewMode === "grid"
                                ? "bg-white text-[#0078D4] shadow-sm border border-[#0078D4]/20"
                                : "text-[#454142] hover:text-[#0078D4]"
                        }`}
                    >
                        {/* Grid icon */}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                        </svg>
                        Grid
                    </button>
                    <button
                        onClick={() => setViewMode("list")}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
                            viewMode === "list"
                                ? "bg-white text-[#0078D4] shadow-sm border border-[#0078D4]/20"
                                : "text-[#454142] hover:text-[#0078D4]"
                        }`}
                    >
                        {/* List icon */}
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                        List
                    </button>
                </div>
            </div>

            {/* View content */}
            <div className="flex-1 min-h-0">
                {viewMode === "grid" ? (
                    <GridView data={data} onAssign={handleAssign} />
                ) : (
                    <ListView data={data} onAssign={handleAssign} />
                )}
            </div>
        </div>
    );
}