import './index.css'
import Toast from './common/components/Toast';
import LoginScreen from './features/auth/screens/LoginScreen';
import { Provider } from 'react-redux';
import { store } from './common/reduxtk/store';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SignUpScreen from './features/auth/screens/SignUpScreen';
import TaskScreen from './features/dashboard/task/screens/TaskScreen';
import DashboardLayout from './features/dashboard/DashboardLayout';

const App = () =>{
  return (
    <section>
      <Toast />
      <Provider store={store}> 
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<TaskScreen />} />
            
          </Route>
          <Route path="*" element={<SignUpScreen />} />
        </Routes>
      </BrowserRouter>
      </Provider> 
    </section>
  );
}

export default App
