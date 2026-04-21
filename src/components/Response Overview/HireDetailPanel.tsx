"use client";

import React, { useState } from "react";
import StatusBadge from "./StatusBadge";
import { NewHire } from "@/src/app/types/data.t";

interface HireDetailPanelProps {
    hire: NewHire | null;
    onAssign: (hireId: string, buddyName: string, buddyEmail: string) => void;
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex flex-col gap-0.5 py-3 border-b border-[#f0f0f0] last:border-0">
            <span className="text-[10px] font-semibold uppercase tracking-widest text-[#0078D4]">{label}</span>
            <span className="text-sm text-[#1a1a1a]">{value}</span>
        </div>
    );
}

export default function HireDetailPanel({ hire, onAssign }: HireDetailPanelProps) {
    const [buddyName, setBuddyName] = useState("");
    const [buddyEmail, setBuddyEmail] = useState("");

    if (!hire) {
        return (
            <div className="flex flex-col items-center justify-center h-full gap-3 text-center px-6">
                <div className="w-12 h-12 rounded-full bg-[#0078D4]/10 flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#0078D4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0zM2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                </div>
                <p className="text-sm font-medium text-[#454142]">Select a record</p>
                <p className="text-xs text-[#454142]/50">Click any card to view details here</p>
            </div>
        );
    }

    const initials = hire.newHireName.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase();
    const needsBuddy = hire.buddyStatus === "no_buddy";

    const inputCls = "w-full px-3 py-2 text-sm rounded-lg border border-[#454142]/40 bg-white text-[#454142] focus:outline-none focus:ring-2 focus:ring-[#0078D4]/40 transition placeholder:text-[#454142]/30";

    const handleAssign = () => {
        if (!buddyName.trim() || !buddyEmail.trim()) return;
        onAssign(hire.id, buddyName.trim(), buddyEmail.trim());
        setBuddyName("");
        setBuddyEmail("");
    };

    return (
        <div className="flex flex-col h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center gap-4 px-6 py-5 border-b border-[#0078D4]/15 bg-[#0078D4]/5 shrink-0">
                <div className="w-12 h-12 rounded-full bg-[#0078D4] flex items-center justify-center text-white font-semibold text-sm shrink-0">
                    {initials}
                </div>
                <div className="min-w-0">
                    <p className="font-semibold text-[#111] text-base truncate">{hire.newHireName}</p>
                    <p className="text-xs text-[#454142]/60 truncate">{hire.role}</p>
                </div>
                <div className="ml-auto shrink-0">
                    <StatusBadge status={hire.buddyStatus} />
                </div>
            </div>

            {/* Details */}
            <div className="px-6 py-2 flex-1">
                <DetailRow label="Manager" value={hire.manager} />
                <DetailRow label="Region" value={hire.region} />
                <DetailRow
                    label="Buddy Name"
                    value={hire.buddyName ?? <span className="text-[#454142]/35 italic">Not provided</span>}
                />
                <DetailRow
                    label="Buddy Email"
                    value={hire.buddyEmail ?? <span className="text-[#454142]/35 italic">Not provided</span>}
                />
                <DetailRow
                    label="Response Date"
                    value={
                        hire.responseDate
                            ? new Date(hire.responseDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })
                            : <span className="text-[#454142]/35 italic">Not provided</span>
                    }
                />
            </div>

            {/* Assign buddy form — only shown when no buddy */}
            {needsBuddy && (
                <div className="px-6 py-5 border-t border-[#0078D4]/15 bg-[#e8e6df]/30 shrink-0">
                    <div className="flex items-center gap-2 mb-4">
                        <span className="w-1 h-4 rounded-full bg-red-500 inline-block" />
                        <p className="text-sm font-semibold text-[#111]">Assign a Buddy</p>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-semibold uppercase tracking-widest text-[#454142]/70">Buddy Name</label>
                            <input
                                type="text"
                                value={buddyName}
                                onChange={(e) => setBuddyName(e.target.value)}
                                placeholder="Full name"
                                className={inputCls}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-semibold uppercase tracking-widest text-[#454142]/70">Buddy Email</label>
                            <input
                                type="email"
                                value={buddyEmail}
                                onChange={(e) => setBuddyEmail(e.target.value)}
                                placeholder="email@microsoft.com"
                                className={inputCls}
                            />
                        </div>
                         <div className="flex flex-col gap-1">
                            <label className="text-[10px] font-semibold uppercase tracking-widest text-[#454142]/70">{"Notes (Optional)"}</label>
                            <textarea
                                value={""}
                                onChange={() => {}}
                                placeholder="Notes"
                                className={inputCls}
                            />
                        </div>
                        <button
                            onClick={handleAssign}
                            disabled={!buddyName.trim() || !buddyEmail.trim()}
                            className="w-full py-2 text-sm font-medium rounded-lg bg-[#0078D4] text-white hover:bg-[#c03bc4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer mt-1"
                        >
                            Assign Buddy
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}