"use client";

import { NewHire } from "@/src/app/types/data.t";
import React, { useEffect, useState } from "react";

interface AssignBuddyModalProps {
    hire: NewHire | null;
    onClose: () => void;
    onAssign: (hireId: string, buddyName: string, buddyEmail: string) => void;
}

export default function AssignBuddyModal({ hire, onClose, onAssign }: AssignBuddyModalProps) {
    const [visible, setVisible] = useState(false);
    const [buddyName, setBuddyName] = useState("");
    const [buddyEmail, setBuddyEmail] = useState("");

    useEffect(() => {
        if (hire) {
            setBuddyName(hire.buddyName ?? "");
            setBuddyEmail(hire.buddyEmail ?? "");
            requestAnimationFrame(() => setVisible(true));
        } else {
            setVisible(false);
        }
    }, [hire]);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
        document.addEventListener("keydown", handler);
        return () => document.removeEventListener("keydown", handler);
    }, [onClose]);

    if (!hire) return null;

    const handleSubmit = () => {
        if (!buddyName.trim() || !buddyEmail.trim()) return;
        onAssign(hire.id, buddyName.trim(), buddyEmail.trim());
        onClose();
    };

    const inputCls = "w-full px-3 py-2 text-sm rounded-lg border border-[#454142]/40 bg-white text-[#454142] focus:outline-none focus:ring-2 focus:ring-[#0078D4]/40 transition";

    return (
        <>
            {/* Backdrop */}
            <div
                onClick={onClose}
                style={{
                    position: "fixed", inset: 0, zIndex: 40,
                    background: "rgba(0,0,0,0.3)",
                    backdropFilter: "blur(2px)",
                    transition: "opacity 200ms ease",
                    opacity: visible ? 1 : 0,
                }}
            />

            {/* Dialog */}
            <div
                role="dialog"
                aria-modal
                style={{
                    position: "fixed", inset: 0, zIndex: 50,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    padding: "16px",
                    pointerEvents: "none",
                }}
            >
                <div
                    style={{
                        width: "100%", maxWidth: 440,
                        background: "#fff",
                        borderRadius: 12,
                        boxShadow: "0 20px 60px rgba(0,0,0,0.15)",
                        pointerEvents: "auto",
                        transform: visible ? "scale(1) translateY(0)" : "scale(0.95) translateY(12px)",
                        opacity: visible ? 1 : 0,
                        transition: "transform 250ms cubic-bezier(0.32,0.72,0,1), opacity 200ms ease",
                    }}
                >
                    {/* Header */}
                    <div style={{ padding: "18px 20px 14px", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                            <span style={{ width: 3, height: 20, borderRadius: 2, background: "#0078D4", display: "inline-block" }} />
                            <div>
                                <p style={{ fontWeight: 600, fontSize: 15, color: "#111", margin: 0 }}>Assign Buddy</p>
                                <p style={{ fontSize: 12, color: "#71717a", margin: 0 }}>{hire.newHireName}</p>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            style={{ width: 28, height: 28, borderRadius: 6, border: "1px solid #e4e4e7", background: "#fff", cursor: "pointer", color: "#71717a", fontSize: 14, display: "flex", alignItems: "center", justifyContent: "center" }}
                        >✕</button>
                    </div>

                    {/* Body */}
                    <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 14 }}>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-[#454142] uppercase tracking-wider">Buddy Name</label>
                            <input
                                type="text"
                                value={buddyName}
                                onChange={(e) => setBuddyName(e.target.value)}
                                placeholder="Full name"
                                className={inputCls}
                            />
                        </div>
                        <div className="flex flex-col gap-1.5">
                            <label className="text-xs font-medium text-[#454142] uppercase tracking-wider">Buddy Email</label>
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
                                onChange={() => { }}
                                placeholder="Notes"
                                className={inputCls}
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div style={{ padding: "12px 20px 18px", display: "flex", gap: 10, justifyContent: "flex-end" }}>
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-sm rounded-lg border border-[#454142]/30 text-[#454142] bg-white hover:bg-[#f4f4f5] transition-colors cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={!buddyName.trim() || !buddyEmail.trim()}
                            className="px-4 py-2 text-sm rounded-lg bg-[#0078D4] text-white font-medium hover:bg-[#c03bc4] transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                        >
                            Assign Buddy
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}