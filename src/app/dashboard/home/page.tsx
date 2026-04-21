"use client";

import NumbersCard from "@/src/components/Shared/NumbersCard"
import PrimaryButton from "@/src/components/Shared/PrimaryButton"
import SecondaryButton from "@/src/components/Shared/SecondaryButton"
import Table from "@/src/components/Shared/Table"
import { BiSolidMessageSquareCheck, BiSolidMessageX } from "react-icons/bi"
import { FaUsersSlash } from "react-icons/fa"
import { IoIosPeople } from "react-icons/io"
import { MdWavingHand } from "react-icons/md"
import { TbUsersPlus } from "react-icons/tb"
import { ColumnDef } from "@/src/components/Shared/Table"
import HomeFilterBar, { FilterState } from "@/src/components/Home/HomeFilters";
import { useState } from "react";
import { useRouter } from "next/navigation";


export interface NewHire {
    newHireName: string;
    newHireEmail: string;
    role: string;
    hiringManager: string;
    hiringManagerEmail: string;
    hireDate: string;
    hireTenure: number;
}

export default function Home() {
    const router = useRouter();
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
            width: "w-48",
        },
        {
            key: "hiringManager",
            label: "Hiring Manager",
            render: (value, row) => (
                <div className="flex flex-col">
                    <span>{value}</span>
                    <span className="text-xs text-[#454142]/90">
                        {row.hiringManagerEmail}
                    </span>
                </div>
            ),
        },
        {
            key: "hireDate",
            label: "Hire Date",
        },
        {
            key: "hireTenure",
            label: "Tenure (Mo)",
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
            hireDate: "3/13/2026",
            hireTenure: 0,
        },
        {
            newHireName: "Elena Rodriguez",
            newHireEmail: "e.rodriguez@microsoft.com",
            role: "Software Engineer II",
            hiringManager: "David Chen",
            hiringManagerEmail: "dchen@microsoft.com",
            hireDate: "1/10/2026",
            hireTenure: 3,
        },
        {
            newHireName: "Marcus Thorne",
            newHireEmail: "mthorne@microsoft.com",
            role: "Product Manager",
            hiringManager: "Sarah Jenkins",
            hiringManagerEmail: "sjenkins@microsoft.com",
            hireDate: "2/15/2026",
            hireTenure: 2,
        },
        {
            newHireName: "Aaliyah Khan",
            newHireEmail: "akhan@microsoft.com",
            role: "UX Designer",
            hiringManager: "Kerri Lampard",
            hiringManagerEmail: "kerri.lampard@microsoft.com",
            hireDate: "3/01/2026",
            hireTenure: 1,
        },
        {
            newHireName: "Julian Voss",
            newHireEmail: "jvoss@microsoft.com",
            role: "Security Analyst",
            hiringManager: "Marcus Aurelius",
            hiringManagerEmail: "maurelius@microsoft.com",
            hireDate: "3/20/2026",
            hireTenure: 0,
        },
        {
            newHireName: "Sumi Lee",
            newHireEmail: "slee@microsoft.com",
            role: "Data Scientist",
            hiringManager: "David Chen",
            hiringManagerEmail: "dchen@microsoft.com",
            hireDate: "12/15/2025",
            hireTenure: 4,
        },
        {
            newHireName: "Oliver Bennett",
            newHireEmail: "obennett@microsoft.com",
            role: "DevOps Engineer",
            hiringManager: "Sarah Jenkins",
            hiringManagerEmail: "sjenkins@microsoft.com",
            hireDate: "2/28/2026",
            hireTenure: 1,
        },
        {
            newHireName: "Chloe Whitmore",
            newHireEmail: "cwhitmore@microsoft.com",
            role: "Account Executive",
            hiringManager: "Robert Baratheon",
            hiringManagerEmail: "rbaratheon@microsoft.com",
            hireDate: "3/05/2026",
            hireTenure: 1,
        },
        {
            newHireName: "Liam O'Connor",
            newHireEmail: "loconnor@microsoft.com",
            role: "Technical Writer",
            hiringManager: "Kerri Lampard",
            hiringManagerEmail: "kerri.lampard@microsoft.com",
            hireDate: "3/18/2026",
            hireTenure: 0,
        },
        {
            newHireName: "Fatima Zahra",
            newHireEmail: "fzahra@microsoft.com",
            role: "AI Specialist",
            hiringManager: "David Chen",
            hiringManagerEmail: "dchen@microsoft.com",
            hireDate: "1/20/2026",
            hireTenure: 3,
        },
        {
            newHireName: "Ethan Hunt",
            newHireEmail: "ehunt@microsoft.com",
            role: "Systems Administrator",
            hiringManager: "Marcus Aurelius",
            hiringManagerEmail: "maurelius@microsoft.com",
            hireDate: "2/10/2026",
            hireTenure: 2,
        },
        {
            newHireName: "Isabella Rossi",
            newHireEmail: "irossi@microsoft.com",
            role: "Marketing Manager",
            hiringManager: "Sarah Jenkins",
            hiringManagerEmail: "sjenkins@microsoft.com",
            hireDate: "3/10/2026",
            hireTenure: 1,
        },
        {
            newHireName: "Noah Smith",
            newHireEmail: "nsmith@microsoft.com",
            role: "Support Engineer",
            hiringManager: "Robert Baratheon",
            hiringManagerEmail: "rbaratheon@microsoft.com",
            hireDate: "3/25/2026",
            hireTenure: 0,
        },
        {
            newHireName: "Sofia Mendez",
            newHireEmail: "smendez@microsoft.com",
            role: "Full Stack Developer",
            hiringManager: "David Chen",
            hiringManagerEmail: "dchen@microsoft.com",
            hireDate: "11/30/2025",
            hireTenure: 5,
        }
    ];

    return (
        <div className="flex flex-col md:gap-6 gap-4 w-[100%]">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 mt-4">
                    <MdWavingHand color="#C03BC4" size={20} className="mt-1" />
                    <div>
                        <p className="text-xl font-semibold text-black">Hello Steven!</p>
                        <p className="text-base text-[#454152]">You have 360 new hires in the last 14 days</p>
                    </div>
                </div>
                <PrimaryButton text="View Exceptions" onClick={() => router.push("/dashboard/exception-management")} />
            </div>


            <div className="bg-[#e8e6df]/30 rounded-2xl p-4 shadow-sm flex flex-col">
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

            <div className="p-4 shadow-sm rounded-2xl mt-8 bg-[#e8e6df]/30">
                <div>
                    <HomeFilterBar onFilterChange={setDateFilters} />
                </div>
                <div className="w-full flex justify-between items-center mb-4">
                    <p className="text-base font-semibold text-black">
                        Current 14 Day Cohort - Snapshot
                    </p>

                    <div className="bg-[#c03bc4]/20 text-black p-2 rounded-md">
                        <p className="text-sm">14 Day Hire Count: 360</p>
                    </div>
                </div>

                <div className="w-full">
                    <Table data={tableData} columns={columns} />
                </div>

            </div>
        </div>
    )
}