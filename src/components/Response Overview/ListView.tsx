"use client";

import React, { useState } from "react";
import Table, { ColumnDef } from "@/src/components/Shared/Table";
import StatusBadge from "./StatusBadge";
import AssignBuddyModal from "./AssignBuddyModal";
import { NewHire } from "@/src/app/types/data.t";

interface ListViewProps {
    data: NewHire[];
    onAssign: (hireId: string, buddyName: string, buddyEmail: string) => void;
}

export default function ListView({ data, onAssign }: ListViewProps) {
    const [assignTarget, setAssignTarget] = useState<NewHire | null>(null);

    const columns: ColumnDef<NewHire>[] = [
        {
            key: "newHireName",
            label: "New Hire",
            render: (value) => (
                <span className="font-medium text-[#454142]">{value}</span>
            ),
        },
        {
            key: "role",
            label: "Role",
        },
        {
            key: "manager",
            label: "Manager",
        },
        {
            key: "region",
            label: "Region",
        },
        {
            key: "buddyStatus",
            label: "Buddy Status",
            align: "center",
            sortable: false,
            render: (value) => <StatusBadge status={value} />,
        },
        {
            key: "buddyName",
            label: "Buddy Name",
            render: (value) => value ?? <span className="text-[#454142]/30 text-xs">—</span>,
        },
        {
            key: "buddyEmail",
            label: "Buddy Email",
            render: (value) => value ?? <span className="text-[#454142]/30 text-xs">—</span>,
        },
        {
            key: "responseDate",
            label: "Response Date",
            render: (value) =>
                value
                    ? new Date(value).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
                    : <span className="text-[#454142]/30 text-xs">—</span>,
        },
        {
            key: "id",
            label: "Actions",
            sortable: false,
            align: "center",
            // ⚠️ stopPropagation prevents the row-click detail modal from firing
            render: (_value, row) => (
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setAssignTarget(row);
                    }}
                    className="px-3 py-1 text-xs font-medium rounded-md border border-[#0078D4] text-[#0078D4] hover:bg-[#0078D4] hover:text-white transition-colors cursor-pointer whitespace-nowrap"
                >
                    Assign Buddy
                </button>
            ),
        },
    ];

    return (
        <>
            {/* Horizontally scrollable on small screens */}
            <div className="w-full overflow-x-auto -mx-0">
                <div className="min-w-[640px]">
                    <Table
                        columns={columns}
                        data={data}
                        searchable
                        placeholder="Search records…"
                        modalTitle={(row) => row.newHireName}
                    />
                </div>
            </div>

            <AssignBuddyModal
                hire={assignTarget}
                onClose={() => setAssignTarget(null)}
                onAssign={(id, name, email) => {
                    onAssign(id, name, email);
                    setAssignTarget(null);
                }}
            />
        </>
    );
}