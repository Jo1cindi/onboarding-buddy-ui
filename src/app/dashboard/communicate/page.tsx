"use client";

import React, { useState, useMemo } from "react";
import CommunicateFilterBar from "@/src/components/Communicate/CommunicateFilters";
import Table, { ColumnDef } from "@/src/components/Shared/Table";

interface NewHire {
  id: string;
  newHireName: string;
  newHireEmail: string;
  role: string;
  buddyEmail: string;
  status: boolean;
}

const tableData: NewHire[] = [
  { id: "1", newHireName: "Trey Morgan", newHireEmail: "morgantrey@microsoft.com", role: "Cloud Architect", buddyEmail: "kerri.lampard@microsoft.com", status: true },
  { id: "2", newHireName: "Elena Rodriguez", newHireEmail: "e.rodriguez@microsoft.com", role: "Software Engineer II", buddyEmail: "dchen@microsoft.com", status: false },
  { id: "3", newHireName: "Marcus Thorne", newHireEmail: "mthorne@microsoft.com", role: "Product Manager", buddyEmail: "sjenkins@microsoft.com", status: true },
  { id: "4", newHireName: "Aaliyah Khan", newHireEmail: "akhan@microsoft.com", role: "UX Designer", buddyEmail: "kerri.lampard@microsoft.com", status: true },
  { id: "5", newHireName: "Julian Voss", newHireEmail: "jvoss@microsoft.com", role: "Security Analyst", buddyEmail: "maurelius@microsoft.com", status: false },
];

export default function Communicate() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const allIds = tableData.map((r) => r.id);
  const allSelected = allIds.length > 0 && allIds.every((id) => selectedIds.has(id));
  const someSelected = !allSelected && allIds.some((id) => selectedIds.has(id));

  const toggleAll = () => setSelectedIds(allSelected ? new Set() : new Set(allIds));

  const toggleRow = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const columns: ColumnDef<NewHire>[] = [
    {
      key: "id",
      label: "",
      sortable: false,
      width: "w-10",
      render: (value) => (
        <input
          type="checkbox"
          checked={selectedIds.has(value)}
          onChange={() => toggleRow(value)}
          onClick={(e) => e.stopPropagation()}
          className="w-4 h-4 rounded border-[#454142]/40 accent-[#0078D4] cursor-pointer"
        />
      ),
    },
    {
      key: "newHireName",
      label: "New Hire",
      render: (value) => (
        <span className="font-medium text-[#454142]">{value}</span>
      ),
    },
    {
      key: "newHireEmail",
      label: "New Hire Email",
    },
    {
      key: "role",
      label: "Role",
      width: "w-48",
    },
    {
      key: "status",
      label: "Status",
      align: "center",
      render: (value) => (
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${value ? "bg-[#10A095]/20 text-[#10A095]" : "bg-red-500/20 text-red-500"}`}>
          {value ? "Has Buddy" : "No Buddy"}
        </span>
      ),
    },
  ];

  const columnsWithSelectAll = useMemo<ColumnDef<NewHire>[]>(
    () => [{ ...columns[0], label: "" }, ...columns.slice(1)],
    [selectedIds]
  );

  return (
    <div className="flex flex-col xl:flex-row gap-4 md:gap-6 w-full min-h-full">

      {/* Left panel */}
      <div className="xl:w-2/3 w-full border-b xl:border-b-0 xl:border-r border-[#454142]/40 bg-[#e8e6df]/30 md:-mx-8 px-4 md:px-8 pt-6 pb-6">
        <div className="mb-6">
          <p className="text-xl font-semibold text-black">Filter Recipients</p>
          <p className="text-sm md:text-base text-[#454152]">
            To view all available records, select "All" across all tabs and click "Apply Filters"
          </p>
        </div>

        <div className="w-full flex flex-col">
          <div className="mb-4 overflow-x-auto">
            <CommunicateFilterBar
              roles={["Cloud Architect", "Software Engineer", "UX Designer"]}
              teams={["Azure", "Identity", "Office 365"]}
              regions={["North America", "EMEA", "APAC"]}
              onApplyFilters={(data) => console.log("Filtering by:", data)}
            />
          </div>

          {/* Selection summary bar */}
          <div className="flex items-center gap-3 mb-2 min-h-[28px]">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#454142] select-none">
              <input
                type="checkbox"
                checked={allSelected}
                ref={(el) => { if (el) el.indeterminate = someSelected; }}
                onChange={toggleAll}
                className="w-4 h-4 rounded border-[#454142]/40 accent-[#0078D4] cursor-pointer"
              />
              Select all
            </label>

            {selectedIds.size > 0 && (
              <>
                <span className="text-xs text-[#454142]/60">·</span>
                <span className="text-xs text-[#0078D4] font-medium">
                  {selectedIds.size} selected
                </span>
                <button
                  onClick={() => setSelectedIds(new Set())}
                  className="text-xs text-[#454142]/50 hover:text-red-500 transition-colors"
                >
                  Clear
                </button>
              </>
            )}
          </div>

          {/* Scrollable table on small screens */}
          <div className="overflow-x-auto">
            <Table columns={columnsWithSelectAll} data={tableData} />
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div className="xl:w-1/3 w-full xl:pl-10 flex flex-col pt-0 xl:pt-6 pb-6">
        <p className="text-xl font-semibold text-black mb-1">Compose Message</p>
        <p className="text-sm md:text-base text-[#454152] mb-4">
          You are about to send messages to a teams channel
        </p>
        <p className="text-sm md:text-base text-[#454142] mb-2">
          {selectedIds.size === 0 ? (
            <span className="text-[#454142]/50">No recipients selected</span>
          ) : (
            <>
              Sending to{" "}
              <span className="font-semibold text-[#0078D4]">
                {selectedIds.size} {selectedIds.size === 1 ? "recipient" : "recipients"}
              </span>
            </>
          )}
        </p>

        <div>
          <textarea
            placeholder="Type your message here..."
            className="w-full h-40 p-3 border border-[#0078d4]/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0078D4] transition resize-none mb-4 placeholder:text-[#454142]/40 text-[#454142]"
          />
          <div className="flex items-center justify-between gap-3">
            <button
              disabled={selectedIds.size === 0}
              className="bg-[#0078D4] text-white px-6 py-2 rounded-md hover:bg-[#c03bc4] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#0078D4]"
            >
              Send Message
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}