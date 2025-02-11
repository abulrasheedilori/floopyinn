import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { RootState } from '../common/reduxtk/store';
import OverviewScreen from './dashboard/task/views/screens/OverviewScreen';
import { useAppSelector } from '../common/reduxtk/hooks';
import SignUpScreen from './auth/views/screens/SignUpScreen';
import DashboardLayout from './dashboard/DashboardLayout';
import Toast from '../common/components/Toast';
import LoginScreen from './auth/views/screens/LoginScreen';
import { navItems } from './navigation/navItems';

const RouterLayout = () => {
    const isAuthenticated = useAppSelector((state: RootState) => state.auth.isAuthenticated);
    console.log("isAuthenticated:", isAuthenticated);

    return (
        <section>
            <Toast />
            <BrowserRouter>
                <Routes>
                    {isAuthenticated ? (
                        <>
                            <Route path="/" element={<DashboardLayout />}>
                                <Route index element={<OverviewScreen />} />
                                {navItems.map((item) => (
                                    <Route key={item.name} path={item.path} element={item.element} />
                                ))}
                            </Route>
                        </>
                    ) : (
                        <>
                            <Route path="/" element={<SignUpScreen />} />
                            <Route path="/login" element={<LoginScreen />} />
                        </>
                    )}
                    <Route path="*" element={<SignUpScreen />} />
                </Routes>
            </BrowserRouter>
        </section>
    );
};

export default RouterLayout;
