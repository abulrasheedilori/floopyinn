import React from 'react';
import { FaCog, FaHome, FaUser } from 'react-icons/fa';
import MeetingScreen from '../dashboard/task/views/screens/MeetingScreen';
import MessageScreen from '../dashboard/task/views/screens/MessageScreen';
import TaskScreen from '../dashboard/task/views/screens/TaskScreen';
import TicketScreen from '../dashboard/task/views/screens/TicketScreen';
import EmployeeScreen from '../dashboard/task/views/screens/EmployeeScreen';
import AttendanceScreen from '../dashboard/task/views/screens/AttendanceScreen';
import AccountScreen from '../dashboard/task/views/screens/AccountScreen';
import NoticeScreen from '../dashboard/task/views/screens/NoticeScreen';
import OverviewScreen from '../dashboard/task/views/screens/OverviewScreen';
import HrtabScreen from '../dashboard/task/views/screens/HrtabScreen';
import OrganizationScreen from '../dashboard/task/views/screens/OrganizationScreen';
import SettingScreen from '../dashboard/task/views/screens/SettingScreen';

export type NavItemType = {
    name: string;
    path: string;
    icon: React.ReactNode;
    element: React.ReactNode;
    nestedItem: NavItemType[];
};

export const navItems: NavItemType[] = [
    {
        name: 'Meeting',
        path: '/meeting',
        icon: <FaUser />,
        element: <MeetingScreen />,
        nestedItem: []
    },
    {
        name: 'Message',
        path: '/message',
        icon: <FaCog />,
        element: <MessageScreen />,
        nestedItem: []
    },
    {
        name: 'Project',
        path: '/project',
        icon: <FaCog />,
        element: <TaskScreen />,
        nestedItem: []
    },
    {
        name: 'Ticket',
        path: '/ticket',
        icon: <FaCog />,
        element: <TicketScreen />,
        nestedItem: []
    },
    {
        name: 'Employee',
        path: '/employee',
        icon: <FaCog />,
        element: <EmployeeScreen />,
        nestedItem: [
            { name: 'Overview', path: '/employee/overview', icon: <FaHome />, element: <OverviewScreen />, nestedItem: [] },
            { name: 'Notice', path: '/employee/notice', icon: <FaHome />, element: <NoticeScreen />, nestedItem: [] },
            { name: 'Account', path: '/employee/account', icon: <FaHome />, element: <AccountScreen />, nestedItem: [] },
        ]
    },
    {
        name: 'Attendance',
        path: '/attendance',
        icon: <FaCog />,
        element: <AttendanceScreen />,
        nestedItem: [
            { name: 'Overview', path: '/attendance/overview', icon: <FaHome />, element: <OverviewScreen />, nestedItem: [] },
            { name: 'Notice', path: '/attendance/notice', icon: <FaHome />, element: <NoticeScreen />, nestedItem: [] },
            { name: 'Account', path: '/attendance/account', icon: <FaHome />, element: <AccountScreen />, nestedItem: [] },
        ]
    },
    {
        name: 'Notice',
        path: '/notice',
        icon: <FaCog />,
        element: <NoticeScreen />,
        nestedItem: []
    },
    {
        name: 'HR Tab',
        path: '/hrtab',
        icon: <FaCog />,
        element: <HrtabScreen />,
        nestedItem: [
            { name: 'Overview', path: '/hrtab/overview', icon: <FaHome />, element: <OverviewScreen />, nestedItem: [] },
            { name: 'Notice', path: '/hrtab/notice', icon: <FaHome />, element: <NoticeScreen />, nestedItem: [] },
            { name: 'Account', path: '/hrtab/account', icon: <FaHome />, element: <AccountScreen />, nestedItem: [] },
        ]
    },
    {
        name: 'Organization',
        path: '/organization',
        icon: <FaCog />,
        element: <OrganizationScreen />,
        nestedItem: []
    },
    {
        name: 'Account',
        path: '/account',
        icon: <FaCog />,
        element: <AccountScreen />,
        nestedItem: []
    },
    {
        name: 'Settings',
        path: '/settings',
        icon: <FaCog />,
        element: <SettingScreen />,
        nestedItem: []
    },
];
