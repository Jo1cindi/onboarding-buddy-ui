/* eslint-disable */
"use-client";

import { IRoute } from '@/src/app/types/navigation';
import { HiX } from 'react-icons/hi';
import SidebarLinks from './Links';
import { LuLayers2 } from 'react-icons/lu';
import { IoLogOutOutline } from 'react-icons/io5';
import { useRouter } from 'next/navigation';

function SidebarHorizon(props: { routes: IRoute[];[x: string]: any }) {
    const router = useRouter();

    const { routes, open, setOpen } = props;
    return (
        <div
            className={`duration-175 linear relative !z-50 flex h-full flex-col bg-black shadow-2xl shadow-white/5 transition-all text-white xl:!z-0
      translate-x-0`}
        >
            <div
                className="absolute left-8 top-8 block cursor-pointer"
            >
                <div className='text-white flex gap-2 items-center pb-4'>
                    <LuLayers2 size={20} />
                    <div>
                        <h4 className='font-bold text-sm'>Onboarding Buddy</h4>
                        <p className='text-xs text-[#e8e6df]'>HR Console</p>
                    </div>
                </div>

            </div>

            <div className="mb-7 mt-[100px] h-px bg-gray-700" />

            <ul className="mb-auto pt-1">
                <SidebarLinks routes={routes} />
            </ul>

            <div className='border-y border-b-white/60 flex gap-2 border-t-white/60 p-4 text-white/60' onClick={()=>router.push('/')}>
                <IoLogOutOutline />
                <p className='text-sm'>Back to Home</p>
            </div>
        </div>
    );
}
export default SidebarHorizon;