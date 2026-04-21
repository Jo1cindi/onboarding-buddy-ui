"use client";
import React, { useState, useMemo } from "react";
import Tabs from "@/src/components/Shared/Tabs";
import { BsExclamationCircle } from "react-icons/bs";
import { IoMdTime } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import Table, { ColumnDef } from "@/src/components/Shared/Table";
import ProgressBar from "@/src/components/Shared/progressBar";

export interface Exceptions {
  newHireName: string;
  role: string;
  manager: string;
  region: string;
}

const initialTableData: Exceptions[] = [
  { newHireName: "Trey Morgan", role: "Cloud Architect", manager: "Kerri Lampard", region: "Africa" },
  { newHireName: "Elena Rodriguez", role: "Software Engineer II", manager: "David Chen", region: "Asia" },
  { newHireName: "Marcus Thorne", role: "Product Manager", manager: "Sarah Jenkins", region: "EMEA" },
  { newHireName: "Aaliyah Khan", role: "UX Designer", manager: "Kerri Lampard", region: "Asia" },
];

/* ─── Assign Buddy Modal ─────────────────────────────────────── */
function AssignBuddyModal({
  hire,
  onClose,
  onAssign,
}: {
  hire: Exceptions | null;
  onClose: () => void;
  onAssign: (buddyEmail: string) => void;
}) {
  const [buddyEmail, setBuddyEmail] = useState("");
  if (!hire) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[#454142]/10">
          <div>
            <p className="text-lg font-semibold text-[#454142]">Assign Buddy</p>
            <p className="text-sm text-[#454142]/60 mt-0.5">Assigning a buddy for <span className="font-medium text-[#0078D4]">{hire.newHireName}</span></p>
          </div>
          <button onClick={onClose} className="text-[#454142]/40 hover:text-[#454142] transition-colors">
            <IoClose size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 flex flex-col gap-4">
          {/* Hire info */}
          <div className="bg-[#e8e6df]/40 rounded-xl p-4 grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-[#454142]/50 text-xs mb-0.5">New Hire</p>
              <p className="font-medium text-[#454142]">{hire.newHireName}</p>
            </div>
            <div>
              <p className="text-[#454142]/50 text-xs mb-0.5">Role</p>
              <p className="font-medium text-[#454142]">{hire.role}</p>
            </div>
            <div>
              <p className="text-[#454142]/50 text-xs mb-0.5">Manager</p>
              <p className="font-medium text-[#454142]">{hire.manager}</p>
            </div>
            <div>
              <p className="text-[#454142]/50 text-xs mb-0.5">Region</p>
              <p className="font-medium text-[#454142]">{hire.region}</p>
            </div>
          </div>

          {/* Buddy email input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-[#454142]">Buddy Email</label>
            <input
              type="email"
              value={buddyEmail}
              onChange={(e) => setBuddyEmail(e.target.value)}
              placeholder="buddy@microsoft.com"
              className="w-full px-3 py-2.5 border border-[#0078d4]/40 rounded-lg text-sm text-[#454142] placeholder:text-[#454142]/30 focus:outline-none focus:ring-2 focus:ring-[#0078D4] transition"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm rounded-lg text-[#454142] border border-[#454142]/20 hover:bg-[#e8e6df]/40 transition"
          >
            Cancel
          </button>
          <button
            onClick={() => { onAssign(buddyEmail); onClose(); }}
            disabled={!buddyEmail.trim()}
            className="px-4 py-2 text-sm rounded-lg bg-[#0078D4] text-white hover:bg-[#c03bc4] transition disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#0078D4]"
          >
            Assign Buddy
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Confirm Delete Modal ───────────────────────────────────── */
function ConfirmDeleteModal({
  count,
  onCancel,
  onConfirm,
}: {
  count: number;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm">
        <div className="px-6 pt-6 pb-4 border-b border-[#454142]/10 flex items-center justify-between">
          <p className="text-lg font-semibold text-[#454142]">Confirm Deletion</p>
          <button onClick={onCancel} className="text-[#454142]/40 hover:text-[#454142] transition-colors">
            <IoClose size={22} />
          </button>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-[#454142]">
            You are about to delete{" "}
            <span className="font-semibold text-red-500">{count} {count === 1 ? "record" : "records"}</span>.
            This action cannot be undone.
          </p>
        </div>
        <div className="px-6 pb-6 flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm rounded-lg text-[#454142] border border-[#454142]/20 hover:bg-[#e8e6df]/40 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Component ─────────────────────────────────────────── */
export default function ExceptionManagement() {
  const [activeTab, setActiveTab] = useState("noBuddy");

  // Assign Buddy modal
  const [assignTarget, setAssignTarget] = useState<Exceptions | null>(null);

  // Manager Contacted selection + deletion
  const [mcData, setMcData] = useState<Exceptions[]>(initialTableData);
  const [selectedNames, setSelectedNames] = useState<Set<string>>(new Set());
  const [pendingDeleteCount, setPendingDeleteCount] = useState<number | null>(null);

  const allMcNames = mcData.map((r) => r.newHireName);
  const allMcSelected = allMcNames.length > 0 && allMcNames.every((n) => selectedNames.has(n));
  const someMcSelected = !allMcSelected && allMcNames.some((n) => selectedNames.has(n));

  const toggleAll = () => setSelectedNames(allMcSelected ? new Set() : new Set(allMcNames));
  const toggleRow = (name: string) => {
    setSelectedNames((prev) => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const requestDelete = (count: number) => setPendingDeleteCount(count);

  const confirmDelete = () => {
    setMcData((prev) => prev.filter((r) => !selectedNames.has(r.newHireName)));
    setSelectedNames(new Set());
    setPendingDeleteCount(null);
  };

  /* ── Columns: No Buddy & No Response ── */
  const standardColumns = (tab: string): ColumnDef<Exceptions>[] => [
    {
      key: "newHireName",
      label: "New Hire Name",
      render: (value) => <span className="font-medium text-[#454142]">{value}</span>,
    },
    { key: "role", label: "Role", width: "w-48" },
    { key: "manager", label: "Manager" },
    { key: "region", label: "Region" },
    {
      key: "Action",
      label: "Action",
      align: "center",
      isAction: true,
      render: (_, row) => (
        <button
          onClick={() => tab === "noBuddy" && setAssignTarget(row)}
          className={`px-3 py-2 text-sm rounded-lg transition ${
            tab === "noBuddy"
              ? "bg-[#0078D4]/10 text-[#0078D4] hover:bg-[#0078D4]/20"
              : "bg-[#C03BC4]/10 text-[#C03BC4] hover:bg-[#C03BC4]/20"
          }`}
        >
          {tab === "noBuddy" ? "Assign Buddy" : "Contact Manager"}
        </button>
      ),
    },
  ];

  /* ── Columns: Manager Contacted (selectable) ── */
  const mcColumns = useMemo<ColumnDef<Exceptions>[]>(
    () => [
      {
        key: "newHireName",
        label: "",
        sortable: false,
        width: "w-10",
        render: (value) => (
          <input
            type="checkbox"
            checked={selectedNames.has(value)}
            onChange={() => toggleRow(value)}
            onClick={(e) => e.stopPropagation()}
            className="w-4 h-4 rounded border-[#454142]/40 accent-[#0078D4] cursor-pointer"
          />
        ),
      },
      {
        key: "newHireName",
        label: "New Hire Name",
        render: (value) => <span className="font-medium text-[#454142]">{value}</span>,
      },
      { key: "role", label: "Role", width: "w-48" },
      { key: "manager", label: "Manager" },
      { key: "region", label: "Region" },
    ],
    [selectedNames, mcData]
  );

  const tabs = [
    {
      id: "noBuddy",
      label: "No Buddy",
      content: <Table columns={standardColumns("noBuddy")} data={initialTableData} />,
    },
    {
      id: "noResponse",
      label: "No Response",
      content: <Table columns={standardColumns("noResponse")} data={initialTableData} />,
    },
    {
      id: "managerContacted",
      label: "Manager Contacted",
      content: (
        <div className="flex flex-col gap-3">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Select all */}
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#454142] select-none">
              <input
                type="checkbox"
                checked={allMcSelected}
                ref={(el) => { if (el) el.indeterminate = someMcSelected; }}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-[#454142]/40 accent-[#0078D4] cursor-pointer"
              />
              Select all
              {selectedNames.size > 0 && (
                <span className="text-[#0078D4] font-medium ml-1">
                  · {selectedNames.size} selected
                </span>
              )}
            </label>

            {/* Delete actions */}
            <div className="flex items-center gap-2">
              {selectedNames.size > 0 && (
                <button
                  onClick={() => requestDelete(selectedNames.size)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                >
                  Delete selected ({selectedNames.size})
                </button>
              )}
              {mcData.length > 0 && (
                <button
                  onClick={() => requestDelete(mcData.length)}
                  className="px-3 py-1.5 text-xs rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500/20 transition"
                >
                  Delete all
                </button>
              )}
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table columns={mcColumns} data={mcData} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {/* Assign Buddy Modal */}
      {assignTarget && (
        <AssignBuddyModal
          hire={assignTarget}
          onClose={() => setAssignTarget(null)}
          onAssign={(email) => console.log("Assigning buddy:", email, "to", assignTarget?.newHireName)}
        />
      )}

      {/* Confirm Delete Modal */}
      {pendingDeleteCount !== null && (
        <ConfirmDeleteModal
          count={pendingDeleteCount}
          onCancel={() => setPendingDeleteCount(null)}
          onConfirm={confirmDelete}
        />
      )}

      <div className="flex flex-col gap-4 md:gap-6 w-full mt-6">
        {/* Alert banners */}
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="w-full bg-[#D4EC8E]/30 rounded-xl p-4 flex gap-4 items-center">
            <BsExclamationCircle size={32} className="text-[#2A446F] flex-shrink-0" />
            <div>
              <p className="text-[#454142] text-sm md:text-base font-medium">2 hires responded but have no buddy</p>
              <p className="text-xs md:text-sm text-[#454142]">Assign a buddy by using the form below</p>
            </div>
          </div>
          <div className="w-full bg-red-500/20 rounded-xl p-4 flex gap-4 items-center">
            <IoMdTime size={32} className="text-red-500 flex-shrink-0" />
            <div>
              <p className="text-red-500 text-sm md:text-base font-medium">2 hires responded but have no buddy</p>
              <p className="text-xs md:text-sm text-[#454142]">Assign a buddy by using the form below</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-4 overflow-x-auto">
          <Tabs tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />
        </div>

        {/* Progress bars */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { label: "Has Buddy", current: 4, total: 5 },
            { label: "No Buddy", current: 1, total: 5 },
            { label: "No Response", current: 2, total: 5 },
          ].map(({ label, current, total }) => (
            <div key={label} className="shadow-sm rounded-2xl flex flex-col gap-3 p-4 bg-[#e8e6df]/30">
              <ProgressBar label={label} current={current} total={total} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}