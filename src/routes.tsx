import React from 'react';
import { FaExclamation, FaRegEnvelope, FaTools } from 'react-icons/fa';

// Admin Imports

// Icon Imports
import {
    MdHome,
    MdOutlineShoppingCart,
    MdBarChart,
    MdPerson,
    MdLock,
    MdOutlineDynamicFeed,
} from 'react-icons/md';
import { RiHome2Line, RiHome6Line } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';
import { TfiLayoutGrid4Alt } from 'react-icons/tfi';

const routes = [
    {
        name: 'Home',
        layout: '/dashboard',
        path: '/home',
        icon: <RiHome2Line className="h-3 w-3" />,
    },
    {
        name: 'Cohort Overview',
        layout: '/dashboard',
        path: '/cohort-overview',
        icon: <TfiLayoutGrid4Alt className="h-3 w-3" />,
    },
    {
        name: 'Response Review',
        layout: '/dashboard',
        path: 'response-review',
        icon: <RxHamburgerMenu className="h-3 w-3" />,
    },
    {
        name: 'Exception Management',
        layout: '/dashboard',
        path: 'exception-management',
        icon: <FaExclamation className="h-3 w-3" />,
    },
    {
        name: 'Communicate',
        layout: '/dashboard',
        path: 'communicate',
        icon: <FaRegEnvelope className="h-3 w-3" />,
    },
    {
        name: 'Diagnostics/Error Log',
        layout: '/dashboard',
        path: '/diagnostics',
        icon: <FaTools className="h-3 w-3" />,
    }
];
export default routes;