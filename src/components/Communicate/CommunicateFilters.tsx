"use client";

import React, { useState } from "react";

interface CommunicateFilterProps {
    onApplyFilters: (filters: CommunicateFilterState) => void;
    roles: string[];
    teams: string[];
    regions: string[];
}

export interface CommunicateFilterState {
    role: string;
    team: string;
    buddyStatus: string;
    region: string;
}

export default function CommunicateFilterBar({
    onApplyFilters,
    roles,
    teams,
    regions
}: CommunicateFilterProps) {

    const [filters, setFilters] = useState<CommunicateFilterState>({
        role: "",
        team: "",
        buddyStatus: "",
        region: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters((prev) => ({ ...prev, [name]: value }));
    };

    const handleApply = () => {
        onApplyFilters(filters);
    };

    const clearFilters = () => {
        const reset = { role: "", team: "", buddyStatus: "", region: "" };
        setFilters(reset);
        onApplyFilters(reset);
    };

    const commonCls = "px-3 py-2 text-sm rounded-lg border border-[#454142]/50 transition min-w-[150px] h-[40px]";
    const selectCls = `${commonCls} bg-white text-[#454142] focus:outline-none focus:ring-2 focus:ring-zinc-300 appearance-none pr-8 cursor-pointer`;
    const labelCls = "text-xs font-medium text-black uppercase tracking-wider";

    const FilterSelect = ({ label, name, value, options }: { label: string, name: string, value: string, options: string[] }) => (
        <div className="flex flex-col gap-1.5">
            <label className={labelCls}>{label}</label>
            <div className="relative">
                <select name={name} value={value} onChange={handleChange} className={selectCls}>
                    <option value="">All</option>
                    {options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <ChevronIcon />
            </div>
        </div>
    );

    return (
        <div className="flex flex-wrap items-end gap-4 border-b border-zinc-200 pb-6">
            <FilterSelect label="Role" name="role" value={filters.role} options={roles} />
            <FilterSelect label="Team" name="team" value={filters.team} options={teams} />

            <div className="flex flex-col gap-1.5">
                <label className={labelCls}>Buddy Status</label>
                <div className="relative">
                    <select
                        name="buddyStatus"
                        value={filters.buddyStatus}
                        onChange={handleChange}
                        className={selectCls}
                    >
                        <option value="">All</option>
                        <option value="Buddy Assigned">Buddy Assigned</option>
                        <option value="No Buddy">No Buddy</option>
                        <option value="No Response">No Response</option>
                    </select>
                    <ChevronIcon />
                </div>
            </div>

            <FilterSelect label="Region" name="region" value={filters.region} options={regions} />

            {/* Apply Button - Matches input width */}
            <div className="flex flex-col gap-1.5">
                <button
                    onClick={handleApply}
                    className={`${commonCls} text-white bg-[#0078D4] hover:bg-[#c03bc4] cursor-pointer font-medium shadow-sm border-transparent`}
                >
                    Apply
                </button>
            </div>

            {/* Reset Button - Matches input width and gap */}
            {/* <div className="flex flex-col gap-1.5">
                <button
                    onClick={clearFilters}
                    className={`${commonCls} text-[#454142] bg-[#e8e6df] hover:bg-[#d6d4ce] cursor-pointer font-medium border-transparent`}
                >
                    Reset
                </button>
            </div> */}
        </div>
    );
}

const ChevronIcon = () => (
    <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#454142]"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
);