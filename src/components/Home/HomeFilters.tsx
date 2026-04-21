"use client";

import React from "react";

interface FilterBarProps {
    onFilterChange: (filters: FilterState) => void;
    bgColor?: string;
    showSort?: boolean;
}

export interface FilterState {
    dateSpecific: string;
    startDate: string;
    endDate: string;
    sort: "asc" | "desc" | "";
}

export default function HomeFilterBar({ onFilterChange, bgColor, showSort= true }: FilterBarProps) {
    const [filters, setFilters] = React.useState<FilterState>({
        dateSpecific: "",
        startDate: "",
        endDate: "",
        sort: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newFilters = { ...filters, [name]: value };

        if (name === "dateSpecific") {
            newFilters.startDate = "";
            newFilters.endDate = "";
        } else if (name === "startDate" || name === "endDate") {
            newFilters.dateSpecific = "";
        }

        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const reset: FilterState = { dateSpecific: "", startDate: "", endDate: "", sort: "" };
        setFilters(reset);
        onFilterChange(reset);
    };

    const inputCls =
        "px-3 py-2 text-sm rounded-lg border border-[#454142]/50 bg-white text-[#454142] focus:outline-none focus:ring-2 focus:ring-zinc-300 transition";

    return (
        <div className={`flex justify-between gap-4 py-4 ${bgColor}`}>
            <div className="flex gap-3 items-end flex-wrap">

                {/* Date Range */}
                <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-black uppercase tracking-wider">
                        Date Range
                    </label>
                    <div className="flex items-center gap-2">
                        <input
                            type="date"
                            name="startDate"
                            value={filters.startDate}
                            onChange={handleChange}
                            className={inputCls}
                        />
                        <span className="text-[#454142] text-sm">to</span>
                        <input
                            type="date"
                            name="endDate"
                            value={filters.endDate}
                            onChange={handleChange}
                            className={inputCls}
                        />
                    </div>
                </div>

                {/* Sort */}
                {
                    showSort && (
                        <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-medium text-black uppercase tracking-wider">
                        Sort
                    </label>
                    <div className="relative">
                        {/* Chevron icon */}
                        <svg
                            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#454142]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                        <select
                            name="sort"
                            value={filters.sort}
                            onChange={handleChange}
                            className={`${inputCls} pr-8 appearance-none cursor-pointer min-w-[130px]`}
                        >
                            <option value="">Default</option>
                            <option value="asc">A → Z</option>
                            <option value="desc">Z → A</option>
                        </select>
                    </div>
                </div>
                    )
                }

                {/* Clear All */}
                <button
                    onClick={clearFilters}
                    className="text-white cursor-pointer text-sm px-4 py-2 h-fit rounded-md bg-[#0078d4] hover:bg-[#c03bc4] transition-colors"
                >
                    Clear All
                </button>

            </div>
        </div>
    );
}