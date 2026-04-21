"use client";

import React, { useState, useMemo, useEffect, useCallback } from "react";

// ─── Interfaces ───────────────────────────────────────────────────────────────

interface SortIconProps {
  direction: "asc" | "desc" | null;
}

interface PaginationProps {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
}

/**
 * T is the shape of your data row (e.g., User, Product)
 */
export interface ColumnDef<T> {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  align?: "left" | "right" | "center";
  width?: string;
  render?: (value: any, row: T) => React.ReactNode;
  /** Mark this column as an action column — clicking it will NOT open the row detail modal */
  isAction?: boolean;
}

interface TableProps<T> {
  columns: ColumnDef<T>[];
  data: T[];
  pageSize?: number;
  searchable?: boolean;
  placeholder?: string;
  emptyText?: string;
  className?: string;
  /** Optional: override what's shown in the modal header */
  modalTitle?: (row: T) => string;
  /** Optional: render custom modal body content */
  modalContent?: (row: T) => React.ReactNode;
}

// ─── Sort icon ────────────────────────────────────────────────────────────────
function SortIcon({ direction }: SortIconProps) {
  return (
    <span className="inline-flex flex-col ml-1.5 opacity-40 group-hover:opacity-70 transition-opacity">
      <svg
        width="8"
        height="5"
        viewBox="0 0 8 5"
        className={`mb-px transition-opacity ${direction === "asc" ? "opacity-100" : ""}`}
      >
        <path d="M4 0l4 5H0z" fill="currentColor" />
      </svg>
      <svg
        width="8"
        height="5"
        viewBox="0 0 8 5"
        className={`transition-opacity ${direction === "desc" ? "opacity-100" : ""}`}
      >
        <path d="M4 5L0 0h8z" fill="currentColor" />
      </svg>
    </span>
  );
}

// ─── Pagination ────────────────────────────────────────────────────────────────
function Pagination({ page, totalPages, onChange }: PaginationProps) {
  const pages = useMemo(() => {
    const items: (number | string)[] = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        totalPages <= 7 ||
        i === 1 ||
        i === totalPages ||
        Math.abs(i - page) <= 1
      ) {
        items.push(i);
      } else if (items[items.length - 1] !== "…") {
        items.push("…");
      }
    }
    return items;
  }, [page, totalPages]);

  const btn =
    "inline-flex items-center justify-center h-8 min-w-[2rem] px-2 rounded-md text-sm border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed transition-colors";
  const activeCls =
    "!bg-zinc-900 dark:!bg-white !text-white dark:!text-zinc-900 !border-zinc-900 dark:!border-white font-medium";

  return (
    <div className="flex items-center justify-between px-4 py-3 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/60">
      <p className="text-xs text-zinc-400 dark:text-zinc-500">
        Page {page} of {totalPages}
      </p>
      <div className="flex items-center gap-1">
        <button
          className={btn}
          disabled={page === 1}
          onClick={() => onChange(page - 1)}
          aria-label="Previous page"
        >
          ‹
        </button>

        {pages.map((p, i) =>
          typeof p === "number" ? (
            <button
              key={p}
              className={`${btn} ${page === p ? activeCls : ""}`}
              onClick={() => onChange(p)}
            >
              {p}
            </button>
          ) : (
            <span
              key={`ellipsis-${i}`}
              className="text-zinc-400 dark:text-zinc-600 px-1 text-sm"
            >
              …
            </span>
          )
        )}

        <button
          className={btn}
          disabled={page === totalPages}
          onClick={() => onChange(page + 1)}
          aria-label="Next page"
        >
          ›
        </button>
      </div>
    </div>
  );
}

// ─── Row Detail Modal ──────────────────────────────────────────────────────────
interface RowModalProps<T> {
  row: T | null;
  columns: ColumnDef<T>[];
  onClose: () => void;
  title?: (row: T) => string;
  customContent?: (row: T) => React.ReactNode;
}

function RowModal<T extends Record<string, any>>({
  row,
  columns,
  onClose,
  title,
  customContent,
}: RowModalProps<T>) {
  const [visible, setVisible] = useState(false);

  // Animate in when row appears
  useEffect(() => {
    if (row) {
      // tiny delay so the CSS transition fires
      const id = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(id);
    } else {
      setVisible(false);
    }
  }, [row]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!row) return null;

  const heading = title ? title(row) : `Row Details`;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 40,
          background: "rgba(0,0,0,0.35)",
          backdropFilter: "blur(2px)",
          transition: "opacity 200ms ease",
          opacity: visible ? 1 : 0,
        }}
        aria-hidden
      />

      {/* Panel */}
      <div
        role="dialog"
        aria-modal
        aria-label={heading}
        style={{
          position: "fixed",
          top: 0,
          right: 0,
          bottom: 0,
          zIndex: 50,
          width: "min(420px, 95vw)",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.12)",
          transform: visible ? "translateX(0)" : "translateX(100%)",
          transition: "transform 280ms cubic-bezier(0.32, 0.72, 0, 1)",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "18px 20px 16px",
            borderBottom: "1px solid rgba(0,120,212,0.15)",
            background: "rgba(0,120,212,0.06)",
            flexShrink: 0,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Blue accent bar */}
            <span
              style={{
                display: "inline-block",
                width: 3,
                height: 20,
                borderRadius: 2,
                background: "#0078D4",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontWeight: 600,
                fontSize: 15,
                color: "#111",
                fontFamily: "sans-serif",
                letterSpacing: "-0.01em",
              }}
            >
              {heading}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 30,
              height: 30,
              borderRadius: 6,
              border: "1px solid #e4e4e7",
              background: "#fff",
              cursor: "pointer",
              color: "#71717a",
              fontSize: 16,
              transition: "background 150ms, color 150ms",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "#f4f4f5";
              (e.currentTarget as HTMLButtonElement).style.color = "#0078D4";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#fff";
              (e.currentTarget as HTMLButtonElement).style.color = "#71717a";
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {customContent ? (
            customContent(row)
          ) : (
            <dl style={{ margin: 0 }}>
              {columns.map((col, idx) => {
                const rawValue = row[col.key as keyof T];
                const displayValue = col.render
                  ? col.render(rawValue, row)
                  : rawValue != null
                  ? String(rawValue)
                  : "—";

                return (
                  <div
                    key={String(col.key)}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: 3,
                      padding: "12px 0",
                      borderBottom:
                        idx < columns.length - 1
                          ? "1px solid #f0f0f0"
                          : "none",
                    }}
                  >
                    <dt
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: "0.07em",
                        color: "#0078D4",
                        fontFamily: "sans-serif",
                      }}
                    >
                      {col.label}
                    </dt>
                    <dd
                      style={{
                        margin: 0,
                        fontSize: 14,
                        color: "#1a1a1a",
                        fontFamily: "sans-serif",
                        fontWeight: 400,
                        lineHeight: 1.5,
                        wordBreak: "break-word",
                      }}
                    >
                      {displayValue}
                    </dd>
                  </div>
                );
              })}
            </dl>
          )}
        </div>

        {/* Footer */}
        <div
          style={{
            padding: "14px 20px",
            borderTop: "1px solid #f0f0f0",
            background: "#fafafa",
            flexShrink: 0,
          }}
        >
          <button
            onClick={onClose}
            style={{
              width: "100%",
              padding: "8px 0",
              borderRadius: 8,
              border: "1px solid #e4e4e7",
              background: "#fff",
              color: "#454142",
              fontSize: 13,
              fontWeight: 500,
              cursor: "pointer",
              fontFamily: "sans-serif",
              transition: "background 150ms",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background =
                "#f4f4f5")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLButtonElement).style.background = "#fff")
            }
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}

// ─── Main Table ────────────────────────────────────────────────────────────────
export default function Table<T extends Record<string, any>>({
  columns = [],
  data = [],
  pageSize = 8,
  searchable = false,
  placeholder = "Search…",
  emptyText = "No results found",
  className = "",
  modalTitle,
  modalContent,
}: TableProps<T>) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<T | null>(null);

  const alignClass = {
    left: "text-left",
    right: "text-right",
    center: "text-center",
  };

  // Filter + Sort
  const filtered = useMemo(() => {
    let rows = [...data];

    if (query.trim()) {
      const q = query.toLowerCase();
      rows = rows.filter((row) =>
        columns.some((col) => {
          const v = row[col.key as keyof T];
          return v != null && String(v).toLowerCase().includes(q);
        })
      );
    }

    if (sortKey) {
      rows.sort((a, b) => {
        const av = a[sortKey];
        const bv = b[sortKey];
        if (av == null && bv == null) return 0;
        if (av == null) return 1;
        if (bv == null) return -1;
        const cmp =
          typeof av === "number" && typeof bv === "number"
            ? av - bv
            : String(av).localeCompare(String(bv));
        return sortDir === "asc" ? cmp : -cmp;
      });
    }
    return rows;
  }, [data, query, sortKey, sortDir, columns]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const slice = filtered.slice((safePage - 1) * pageSize, safePage * pageSize);

  const handleSort = (key: keyof T) => {
    if (sortKey === key) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
    setPage(1);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1);
  };

  const handleRowClick = useCallback((row: T) => {
    setSelectedRow(row);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedRow(null);
  }, []);

  return (
    <>
      <div className={`w-full font-sans ${className}`}>
        {/* Toolbar */}
        {searchable && (
          <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
            <div className="relative flex-1 min-w-[180px] max-w-xs">
              <svg
                className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#454142]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
                />
              </svg>
              <input
                type="search"
                value={query}
                onChange={handleSearch}
                placeholder={placeholder}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-white text-[#454142] transition border border-[#454142] focus:border-none"
              />
            </div>
            <p className="text-xs text-[#454142] whitespace-nowrap">
              {filtered.length} of {data.length} rows
            </p>
          </div>
        )}

        {/* Table container */}
        <div className="rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0078D4]/20 border-b border-[#0078d4]">
                  {columns.map((col) => (
                    <th
                      key={String(col.key)}
                      className={[
                        "px-4 py-3 font-medium text-xs tracking-wide text-black whitespace-nowrap select-none",
                        alignClass[col.align || "left"],
                        col.width || "",
                        col.sortable !== false
                          ? "cursor-pointer group hover:text-[#0078d4] transition-colors"
                          : "",
                      ]
                        .filter(Boolean)
                        .join(" ")}
                      onClick={
                        col.sortable !== false
                          ? () => handleSort(col.key as keyof T)
                          : undefined
                      }
                    >
                      <span className="inline-flex items-center gap-0.5">
                        {col.label}
                        {col.sortable !== false && (
                          <SortIcon
                            direction={sortKey === col.key ? sortDir : null}
                          />
                        )}
                      </span>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-[#007D84]/20">
                {slice.length === 0 ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-16 text-center text-sm text-black"
                    >
                      {emptyText}
                    </td>
                  </tr>
                ) : (
                  slice.map((row, i) => (
                    <tr
                      key={row.id ?? i}
                      onClick={(e) => {
                        // If the click originated inside an action cell, skip the modal
                        if ((e.target as HTMLElement).closest("[data-action='true']")) return;
                        handleRowClick(row);
                      }}
                      className="hover:bg-white transition-colors cursor-pointer group"
                      title="Click to view details"
                    >
                      {columns.map((col) => {
                        const cellValue = row[col.key as keyof T];
                        return (
                          <td
                            key={String(col.key)}
                            data-action={col.isAction ? "true" : undefined}
                            className={[
                              "px-4 py-3 text-black group-hover:text-[#0078D4] transition-colors",
                              alignClass[col.align || "left"],
                            ].join(" ")}
                          >
                            {col.render ? (
                              col.render(cellValue, row)
                            ) : cellValue != null ? (
                              String(cellValue)
                            ) : (
                              <span className="text-black">—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {/* {totalPages > 1 && (
            <Pagination
              page={safePage}
              totalPages={totalPages}
              onChange={setPage}
            />
          )} */}
        </div>
      </div>

      {/* Row Detail Modal */}
      <RowModal
        row={selectedRow}
        columns={columns}
        onClose={handleCloseModal}
        title={modalTitle}
        customContent={modalContent}
      />
    </>
  );
}