"use client";

import NumbersCard from "@/src/components/Shared/NumbersCard"
import Table, { ColumnDef } from "@/src/components/Shared/Table"
import { BiSolidMessageSquareCheck, BiSolidMessageX } from "react-icons/bi"
import { FaLongArrowAltDown, FaUsersSlash } from "react-icons/fa"
import { IoIosPeople } from "react-icons/io"
import { TbUsersPlus } from "react-icons/tb"
import { NewHire } from "../home/page"
import HomeFilterBar, { FilterState } from "@/src/components/Home/HomeFilters";
import { useState } from "react";

export default function CohortOverview() {
    const [dateFilters, setDateFilters] = useState<FilterState>({
        dateSpecific: "",
        startDate: "",
        endDate: "",
        sort: ""
    });
    const numbers = [
        {
            icon: <IoIosPeople color="#0078D4" size={18} />,
            value: 73,
            label: "Hires Contacted",
            iconColor: "#0078D4"
        },
        {
            icon: <BiSolidMessageSquareCheck color="#10A095" size={18} />,
            value: 67,
            label: "Responses In",
            iconColor: "#10A095"
        }, {
            icon: <TbUsersPlus color="#C03BC4" size={18} />,
            value: 49,
            label: "Buddy Assigned",
            iconColor: "#C03BC4"
        }, {
            icon: <FaUsersSlash color="#BB3797" size={18} />,
            value: 2,
            label: "No Buddy",
            iconColor: "#BB3797"
        },
        {
            icon: <BiSolidMessageX color="#2A446F" size={18} />,
            value: 2,
            label: "No Response",
            iconColor: "#2A446F"
        },

    ]

    const columns: ColumnDef<NewHire>[] = [
        {
            key: "newHireName",
            label: "New Hire",
            render: (value, row) => (
                <div className="flex flex-col">
                    <span className="font-medium text-[#454142]">{value}</span>
                    <span className="text-xs text-[#454142]/90">{row.newHireEmail}</span>
                </div>
            ),
        },
        {
            key: "role",
            label: "Role",
            width: "w-40",
        },
        {
            key: "hiringManager",
            label: "Hiring Manager",
            render: (value, row) => (
                <div className="flex flex-col">
                    <span>{value}</span>
                    <span className="text-xs text-[#454142]/70 italic">
                        {row.hiringManagerEmail}
                    </span>
                </div>
            ),
        },
        {
            key: "buddyName",
            label: "Buddy Name",
            render: (value) => value || <span className="text-[#454152]/60">Unassigned</span>
        },
        {
            key: "buddyAlias",
            label: "Buddy Alias",
            render: (value) => value ? <span className="font-mono text-xs">@{value}</span> : "—"
        },
        {
            key: "status",
            label: "Status",
            render: (value) => {
                const styles: Record<string, string> = {
                    "Buddy Assigned": "bg-[#C03BC4]/10 text-[#C03BC4] border-[#C03BC4]/20",
                    "No Buddy": "bg-[#BB3797]/10 text-[#BB3797] border-[#BB3797]/20",
                    "No Response": "bg-[#2A446F]/10 text-[#2A446F] border-[#2A446F]/20",
                    "Response In": "bg-[#10A095]/10 text-[#10A095] border-[#10A095]/20",
                };
                return (
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${styles[value] || "bg-zinc-100 text-zinc-500"}`}>
                        {value}
                    </span>
                );
            }
        },
        {
            key: "hireDate",
            label: "Hire Date",
        },
        {
            key: "hireTenure",
            label: "Tenure",
            align: "center",
            render: (value) => (
                <span className={`font-mono ${value > 0 ? "text-[#10A095]" : "text-[#454142]"}`}>
                    {value}m
                </span>
            ),
        },
    ];

    const tableData = [
        {
            newHireName: "Trey Morgan",
            newHireEmail: "morgantrey@microsoft.com",
            role: "Cloud Architect",
            hiringManager: "Kerri Lampard",
            hiringManagerEmail: "kerri.lampard@microsoft.com",
            buddyName: "John Smith",
            buddyAlias: "jsmith",
            status: "Buddy Assigned",
            hireDate: "3/13/2026",
            hireTenure: 0,
        },
        {
            newHireName: "Elena Rodriguez",
            newHireEmail: "e.rodriguez@microsoft.com",
            role: "Software Engineer II",
            hiringManager: "David Chen",
            hiringManagerEmail: "dchen@microsoft.com",
            buddyName: "Sarah Connor",
            buddyAlias: "sconnor",
            status: "Response In",
            hireDate: "1/10/2026",
            hireTenure: 3,
        },
        {
            newHireName: "Marcus Thorne",
            newHireEmail: "mthorne@microsoft.com",
            role: "Product Manager",
            hiringManager: "Sarah Jenkins",
            hiringManagerEmail: "sjenkins@microsoft.com",
            buddyName: null,
            buddyAlias: null,
            status: "No Buddy",
            hireDate: "2/15/2026",
            hireTenure: 2,
        },
        {
            newHireName: "Aaliyah Khan",
            newHireEmail: "akhan@microsoft.com",
            role: "UX Designer",
            hiringManager: "Kerri Lampard",
            hiringManagerEmail: "kerri.lampard@microsoft.com",
            buddyName: "Priya Das",
            buddyAlias: "pdas",
            status: "Buddy Assigned",
            hireDate: "3/01/2026",
            hireTenure: 1,
        },
        {
            newHireName: "Julian Voss",
            newHireEmail: "jvoss@microsoft.com",
            role: "Security Analyst",
            hiringManager: "Marcus Aurelius",
            hiringManagerEmail: "maurelius@microsoft.com",
            buddyName: null,
            buddyAlias: null,
            status: "No Response",
            hireDate: "3/20/2026",
            hireTenure: 0,
        },
        {
            newHireName: "Sumi Lee",
            newHireEmail: "slee@microsoft.com",
            role: "Data Scientist",
            hiringManager: "David Chen",
            hiringManagerEmail: "dchen@microsoft.com",
            buddyName: "Kevin Hart",
            buddyAlias: "khart",
            status: "Response In",
            hireDate: "12/15/2025",
            hireTenure: 4,
        },
        {
            newHireName: "Oliver Bennett",
            newHireEmail: "obennett@microsoft.com",
            role: "DevOps Engineer",
            hiringManager: "Sarah Jenkins",
            hiringManagerEmail: "sjenkins@microsoft.com",
            buddyName: "Lisa Ray",
            buddyAlias: "lray",
            status: "Buddy Assigned",
            hireDate: "2/28/2026",
            hireTenure: 1,
        },
        {
            newHireName: "Chloe Whitmore",
            newHireEmail: "cwhitmore@microsoft.com",
            role: "Account Executive",
            hiringManager: "Robert Baratheon",
            hiringManagerEmail: "rbaratheon@microsoft.com",
            buddyName: null,
            buddyAlias: null,
            status: "No Buddy",
            hireDate: "3/05/2026",
            hireTenure: 1,
        },
        {
            newHireName: "Liam O'Connor",
            newHireEmail: "loconnor@microsoft.com",
            role: "Technical Writer",
            hiringManager: "Kerri Lampard",
            hiringManagerEmail: "kerri.lampard@microsoft.com",
            buddyName: "Bethany M.",
            buddyAlias: "bmartin",
            status: "Buddy Assigned",
            hireDate: "3/18/2026",
            hireTenure: 0,
        },
        {
            newHireName: "Fatima Zahra",
            newHireEmail: "fzahra@microsoft.com",
            role: "AI Specialist",
            hiringManager: "David Chen",
            hiringManagerEmail: "dchen@microsoft.com",
            buddyName: "Sam Wilson",
            buddyAlias: "swilson",
            status: "Response In",
            hireDate: "1/20/2026",
            hireTenure: 3,
        },
        {
            newHireName: "Ethan Hunt",
            newHireEmail: "ehunt@microsoft.com",
            role: "Systems Administrator",
            hiringManager: "Marcus Aurelius",
            hiringManagerEmail: "maurelius@microsoft.com",
            buddyName: null,
            buddyAlias: null,
            status: "No Response",
            hireDate: "2/10/2026",
            hireTenure: 2,
        },
        {
            newHireName: "Isabella Rossi",
            newHireEmail: "irossi@microsoft.com",
            role: "Marketing Manager",
            hiringManager: "Sarah Jenkins",
            hiringManagerEmail: "sjenkins@microsoft.com",
            buddyName: "Tom Holland",
            buddyAlias: "tholland",
            status: "Buddy Assigned",
            hireDate: "3/10/2026",
            hireTenure: 1,
        },
        {
            newHireName: "Noah Smith",
            newHireEmail: "nsmith@microsoft.com",
            role: "Support Engineer",
            hiringManager: "Robert Baratheon",
            hiringManagerEmail: "rbaratheon@microsoft.com",
            buddyName: null,
            buddyAlias: null,
            status: "No Buddy",
            hireDate: "3/25/2026",
            hireTenure: 0,
        },
        {
            newHireName: "Sofia Mendez",
            newHireEmail: "smendez@microsoft.com",
            role: "Full Stack Developer",
            hiringManager: "David Chen",
            hiringManagerEmail: "dchen@microsoft.com",
            buddyName: "Chris Evans",
            buddyAlias: "cevans",
            status: "Buddy Assigned",
            hireDate: "11/30/2025",
            hireTenure: 5,
        }
    ];

    return (
        <div className="flex flex-col md:gap-6 gap-4">
            <div className="bg-[#e8e6df]/30 rounded-2xl p-4 shadow-sm flex flex-col mt-6">
                <div className="mb-2">
                    <HomeFilterBar onFilterChange={setDateFilters} showSort={false}/>
                </div>
                <div className="grid md:grid-cols-3 lg:grid-cols-5 grid-cols-2 gap-4 mb-2">
                    {
                        numbers?.map((number, index) => (
                            <div key={index}>
                                <NumbersCard number={number} />
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="p-4 shadow-sm rounded-2xl mt-6 bg-[#e8e6df]/30">
                <div>
                    <HomeFilterBar onFilterChange={setDateFilters} />
                </div>
                <div className="w-full flex justify-between items-center mb-4">
                    <p className="text-base font-semibold text-black">
                        Cohort Overview
                    </p>

                    <div className="bg-[#c03bc4]/20 text-black p-2 rounded-md cursor-pointer flex gap-1 items-center">
                        <FaLongArrowAltDown />
                        <p className="text-sm">Export as CSV</p>
                    </div>
                </div>

                <div className="w-full">
                    <Table data={tableData} columns={columns} />
                </div>

            </div>
        </div>
    )
}