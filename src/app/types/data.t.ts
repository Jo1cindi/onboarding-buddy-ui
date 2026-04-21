export type BuddyStatus = "has_buddy" | "no_buddy" | "no_response";

export interface NewHire {
    id: string;
    newHireName: string;
    role: string;
    manager: string;
    region: string;
    buddyStatus: BuddyStatus;
    buddyName?: string;
    buddyEmail?: string;
    responseDate?: string;
}

export const hireData: NewHire[] = [
    {
        id: "1",
        newHireName: "Trey Morgan",
        role: "Cloud Architect",
        manager: "Kerri Lampard",
        region: "Africa",
        buddyStatus: "has_buddy",
        buddyName: "James Osei",
        buddyEmail: "j.osei@microsoft.com",
        responseDate: "2025-03-10",
    },
    {
        id: "2",
        newHireName: "Elena Rodriguez",
        role: "Software Engineer II",
        manager: "David Chen",
        region: "Asia",
        buddyStatus: "no_buddy",
    },
    {
        id: "3",
        newHireName: "Marcus Thorne",
        role: "Product Manager",
        manager: "Sarah Jenkins",
        region: "EMEA",
        buddyStatus: "no_response",
        buddyName: "Priya Nair",
        buddyEmail: "p.nair@microsoft.com",
    },
    {
        id: "4",
        newHireName: "Aaliyah Khan",
        role: "UX Designer",
        manager: "Kerri Lampard",
        region: "Asia",
        buddyStatus: "has_buddy",
        buddyName: "Tom Wu",
        buddyEmail: "t.wu@microsoft.com",
        responseDate: "2025-03-15",
    },
];

export const buddyStatusConfig: Record<BuddyStatus, { label: string; bg: string; text: string }> = {
    has_buddy:   { label: "Has Buddy",   bg: "bg-[#10A095]/15", text: "text-[#10A095]" },
    no_buddy:    { label: "No Buddy",    bg: "bg-red-500/15",   text: "text-red-500"   },
    no_response: { label: "No Response", bg: "bg-amber-500/15", text: "text-amber-600" },
};