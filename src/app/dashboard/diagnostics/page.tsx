"use client";

import HomeFilterBar, { FilterState } from "@/src/components/Home/HomeFilters";
import NumbersCard from "@/src/components/Shared/NumbersCard";
import Table, { ColumnDef } from "@/src/components/Shared/Table";
import { useState } from "react";
import { FaLongArrowAltDown } from "react-icons/fa";
import { GrValidate } from "react-icons/gr";
import { MdTimelapse } from "react-icons/md";
import { SiOpenaccess } from "react-icons/si";
import { TbSum } from "react-icons/tb";

interface Error {
    timeStamp: string;
    action: string;
    errorDetails: string;
}

export default function Diagnostics() {
    const [dateFilters, setDateFilters] = useState<FilterState>({
        dateSpecific: "",
        startDate: "",
        endDate: "",
        sort: ""
    });

    const numbers = [
        {
            icon: <TbSum color="#0078D4" size={18} />,
            value: 0,
            label: "Total Errors",
            iconColor: "#0078D4"
        },
        {
            icon: <MdTimelapse color="#10A095" size={18} />,
            value: 0,
            label: "Transient Errors",
            iconColor: "#10A095"
        }, {
            icon: <GrValidate color="#C03BC4" size={18} />,
            value: 0,
            label: "Validation Errors",
            iconColor: "#C03BC4"
        }, {
            icon: <SiOpenaccess color="#BB3797" size={18} />,
            value: 0,
            label: "Permission Errors",
            iconColor: "#BB3797"
        }
    ]

    const columns: ColumnDef<Error>[] = [
        {
            key: "timestamp",
            label: "Timestamp",
            render: (value, row) => (
                <div className="flex flex-col">
                    <span className="font-medium text-[#454142]">{value}</span>
                    <span className="text-xs text-[#454142]/90">{row.timeStamp}</span>
                </div>
            ),
        },
        {
            key: "Action",
            label: "Hiring Manager",
            render: (value, row) => (
                <div className="flex flex-col">
                    <span>{value}</span>
                    <span className="text-xs text-[#454142]/70 italic">
                        {row.action.split('@')[0]}
                    </span>
                </div>
            ),
        },
        {
            key: "errorDetails",
            label: "Error Details",
            render: (value) => value || <span className="text-[#454152]/60">Unassigned</span>
        },
    ];

    const tableData = [];

    return (
        <div className="flex flex-col md:gap-6 gap-4 w-[100%]">
            <div className="flex justify-between items-center">
                <div className="flex gap-2 mt-4">
                    <div>
                        <p className="text-xl font-semibold text-black">Flow Error Log</p>
                        <p className="text-base text-[#454152] mt-2">FlowErrorLog Dataverse Table - 3 records</p>
                    </div>
                </div>
                <div className="bg-[#c03bc4]/20 text-black p-2 rounded-md cursor-pointer flex gap-1 items-center">
                    <FaLongArrowAltDown />
                    <p className="text-sm">Export as CSV</p>
                </div>
            </div>
            <div className="bg-[#e8e6df]/30 rounded-2xl p-4 shadow-sm flex flex-col">
                {/* <div className="mb-2">
                    <HomeFilterBar onFilterChange={setDateFilters} />
                </div> */}
                <div className="grid md:grid-cols-3 lg:grid-cols-4 grid-cols-2 gap-4 mb-2">
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
                {/* <div>
                    <HomeFilterBar onFilterChange={setDateFilters} />
                </div> */}
                <div className="w-full flex justify-between items-center mb-4">
                    <p className="text-base font-semibold text-black">
                        Cohort Overview
                    </p>
                </div>

                <div className="w-full">
                    <Table data={[]} columns={columns} />
                </div>

            </div>
        </div>
    )
}