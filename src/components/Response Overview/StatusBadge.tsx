import { BuddyStatus, buddyStatusConfig } from "@/src/app/types/data.t";

export default function StatusBadge({ status }: { status: BuddyStatus }) {
    const { label, bg, text } = buddyStatusConfig[status];
    return (
        <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${bg} ${text}`}>
            {label}
        </span>
    );
}