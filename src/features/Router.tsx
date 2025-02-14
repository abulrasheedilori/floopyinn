import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RootState } from '../common/reduxtk/store';
import OverviewScreen from './dashboard/task/views/screens/OverviewScreen';
import { useAppSelector } from '../common/reduxtk/hooks';
import SignUpScreen from './auth/views/screens/SignUpScreen';
import DashboardLayout from './dashboard/DashboardLayout';
import Toast from '../common/components/Toast';
import LoginScreen from './auth/views/screens/LoginScreen';
import { navItems } from './navigation/navItems';
import TaskScreen from './dashboard/task/views/screens/TaskScreen';

const RouterLayout = () => {
    const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <section>
            <Toast />
            <BrowserRouter>
                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<DashboardLayout />}>
                                <Route index element={<TaskScreen />} />
                                {navItems.map((item) => (
                                    <Route key={item.name} path={item.path} element={item.element}>
                                        {item.nestedItem.map((subItem) => (
                                            <Route key={subItem.name} path={subItem.path.replace(`${item.path}/`, '')} element={subItem.element} />
                                        ))}
                                    </Route>
                                ))}
                            </Route>
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<Navigate to="/signup" replace />} />
                            <Route path="/login" element={<LoginScreen />} />
                            <Route path="/signup" element={<SignUpScreen />} />
                        </>
                    )}
                    <Route path="*" element={<Navigate to={isAuthenticated ? '/' : '/login'} replace />} />
                </Routes>

            </BrowserRouter>
        </section>
    );
};

export default RouterLayout;
