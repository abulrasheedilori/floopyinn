import './index.css'
import Toast from './common/components/Toast';
import LoginScreen from './features/auth/screens/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './common/reduxtk/store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignUpScreen from './features/auth/screens/SignUpScreen';
import TaskScreen from './features/dashboard/task/views/screens/TaskScreen';
import DashboardLayout from './features/dashboard/DashboardLayout';
import AccountScreen from './features/dashboard/task/views/screens/AccountScreen';
import AttendanceScreen from './features/dashboard/task/views/screens/AttendanceScreen';
import EmployeeScreen from './features/dashboard/task/views/screens/EmployeeScreen';
import HrtabScreen from './features/dashboard/task/views/screens/HrtabScreen';
import MeetingScreen from './features/dashboard/task/views/screens/MeetingScreen';
import MessageScreen from './features/dashboard/task/views/screens/MessageScreen';
import NoticeScreen from './features/dashboard/task/views/screens/NoticeScreen';
import OrganizationScreen from './features/dashboard/task/views/screens/OrganizationScreen';
import SettingScreen from './features/dashboard/task/views/screens/SettingScreen';
import TicketScreen from './features/dashboard/task/views/screens/TicketScreen';
import OverviewScreen from './features/dashboard/task/views/screens/OverviewScreen';
import { FaCog, FaHome, FaUser } from 'react-icons/fa';

export type NavItemType = {
  name: string;
  path: string;
  icon: React.ReactNode;
  element: React.ReactNode;
  nestedItem: NavItemType[];
};

export const navItems: NavItemType[] = [
  {
    name: 'Overview', path: '/', icon: <FaHome />, element: <OverviewScreen />,
    nestedItem: []
  },
  {
    name: 'Meeting', path: '/meeting', icon: <FaUser />,
    element: <MeetingScreen />,
    nestedItem: []
  },
  {
    name: 'Message', path: '/message', icon: <FaCog />,
    element: <MessageScreen />,
    nestedItem: []
  },
  {
    name: 'Project', path: '/project', icon: <FaCog />,
    element: <TaskScreen />,
    nestedItem: []
  },
  {
    name: 'Ticket', path: '/ticket', icon: <FaCog />,
    element: <TicketScreen />,
    nestedItem: []
  },
  {
    name: 'Employee', path: '/employee', icon: <FaCog />,
    element: <EmployeeScreen />,
    nestedItem: [
      {name: 'Overview', path: '/', icon: <FaHome />, element: <OverviewScreen />, nestedItem: []},
      {name: 'Overview', path: '/', icon: <FaHome />, element: <OverviewScreen />, nestedItem: []},
      {name: 'Overview', path: '/', icon: <FaHome />, element: <OverviewScreen />, nestedItem: []},
    ]
  },
  {
    name: 'Attendance', path: '/attendance', icon: <FaCog />,
    element: <AttendanceScreen />,
    nestedItem: [
      {name: 'Overview', path: '/', icon: <FaHome />, element: <OverviewScreen />, nestedItem: []},
      {name: 'Overview', path: '/', icon: <FaHome />, element: <OverviewScreen />, nestedItem: []},
      {name: 'Overview', path: '/', icon: <FaHome />, element: <OverviewScreen />, nestedItem: []},
    ]  },
  {
    name: 'Notice', path: '/notice', icon: <FaCog />,
    element: <NoticeScreen />,
    nestedItem: []
  },
  {
    name: 'HR Tab', path: '/hrtab', icon: <FaCog />,
    element: <HrtabScreen />,
    nestedItem: [
      {name: 'Overview', path: '/', icon: <FaHome />, element: <OverviewScreen />, nestedItem: []},
      {name: 'Overview', path: '/', icon: <FaHome />, element: <OverviewScreen />, nestedItem: []},
      {name: 'Overview', path: '/', icon: <FaHome />, element: <OverviewScreen />, nestedItem: []},
    ]  },
  {
    name: 'Organization', path: '/organization', icon: <FaCog />,
    element: <OrganizationScreen />,
    nestedItem: []
  },
  {
    name: 'Account', path: '/account', icon: <FaCog />,
    element: <AccountScreen />,
    nestedItem: []
  },
  {
    name: 'Settings', path: '/settings', icon: <FaCog />,
    element: <SettingScreen />,
    nestedItem: []
  },
];

const App = () =>{
// const {isAuthenticated} = useAppSelector(state => state.auth);

  return (
    <section>
      <Toast />
      <Provider store={store}> 
      <BrowserRouter>
        <Routes>
          {/* {isAuthenticated ? (
            <Route path="/" element={<Navigate to="/overview" />} />
              ) : (
                <Route path="/" element={<SignUpScreen />} />
              )} */}
          <Route path="/" element={<DashboardLayout />} >
            <Route index element={<TaskScreen />} />
            {navItems.map((item) => (
              <Route path={item.path} element={item.element} />
            )) }
          </Route>
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<SignUpScreen />} />
        </Routes>
      </BrowserRouter>
      </Provider> 
    </section>
  );
}

export default App
