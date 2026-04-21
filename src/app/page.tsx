"use client";

import { useRouter } from "next/navigation";
import Banner from "../components/LandingPage/Banner";
import PrimaryButton from "../components/Shared/PrimaryButton";

export default function LandingPage() {
  const statistics = [
    { value: 74, label: "New Hires This Week" },
    { value: 69, label: "New Responses Received" },
    { value: 41, label: "Buddy Rate" },
    { value: 28, label: "Exceptions Open" },
  ];

  const router = useRouter();

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#0078d4] to-[#c03bc4] pt-2">
      <main className="grid grid-cols-1 lg:grid-cols-2 w-full min-h-screen">

        {/* Left Column */}
        <div className="bg-black w-full flex flex-col justify-center px-6 sm:px-10 lg:px-16 py-14 lg:py-0">
          <h1 className="text-white font-bold text-3xl sm:text-4xl lg:text-5xl">
            Onboarding Buddy
          </h1>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-[#0078d4] to-[#c03bc4] bg-clip-text text-transparent">
            Program Console
          </h1>
          <p className="text-[#e8e6df]/80 text-sm sm:text-base my-4 max-w-md">
            Track new hire outreach, manage buddy assignments, review survey
            responses, and resolve exceptions — all in one place
          </p>
          <div className="w-fit">
            <PrimaryButton
              text="Open Console"
              onClick={() => router.push("/dashboard/home")}
            />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full flex items-center justify-center bg-gradient-to-r from-[#0078d4] to-[#c03bc4] py-12 lg:py-0">
  <Banner className="w-full flex justify-center items-center px-4 sm:px-8">
    <div className="rounded-2xl bg-[#454142] overflow-hidden border border-white/10 w-full max-w-sm sm:max-w-md lg:max-w-xs xl:max-w-sm mx-auto">

              {/* Header */}
              <div className="bg-white py-3 pl-4">
                <p className="text-black text-base font-medium">
                  This Week at a Glance
                </p>
                <p className="text-sm text-[#454142]">
                  April 12 to April 18, 2026
                </p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 divide-x divide-y divide-white/30">
                {statistics?.map((statistic, index) => (
                  <div
                    className="pl-6 sm:pl-8 py-5 sm:py-6 pr-6 sm:pr-10 bg-[#454142]"
                    key={index}
                  >
                    <h4 className="font-semibold text-white text-xl">
                      {statistic?.value}
                    </h4>
                    <p className="text-sm text-[#e8e6df]/60">
                      {statistic?.label}
                    </p>
                  </div>
                ))}
              </div>

              {/* Footer 1 */}
              <div className="w-full border-t border-white/30 p-4 text-center text-[#e8e6df]/60 text-xs">
                <p>Last sync: 13/04/2026 21:20</p>
              </div>

              {/* Footer 2 */}
              <div className="w-full border-t border-white/30 p-4 text-center text-[#e8e6df]/60 text-xs">
                <p>Flow running active</p>
              </div>
            </div>
          </Banner>
        </div>

      </main>
    </div>
  );
}