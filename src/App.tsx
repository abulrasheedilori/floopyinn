// import { BrowserRouter, Route, Routes } from 'react-router-dom'
// import SignUpScreen from './features/auth/screens/SignUpScreen'
import './index.css'
import Toast from './common/components/Toast';
import LoginScreen from './features/auth/screens/LoginScreen';
import DashboardScreen from './features/dashbook/DashboardLayout';
// import LoginScreen from './features/auth/screens/LoginScreen';
// import { Provider } from 'react-redux';
// import { store } from './common/reduxtk/store';
// import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import LoginScreen from './features/auth/screens/LoginScreen';

const App = () =>{
  return (
    <section>
      <Toast />
      {/* <Provider store={store}> */}
      {/* <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignUpScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="*" element={<SignUpScreen />} />
        </Routes>
      </BrowserRouter> */}
      <DashboardScreen />
      {/* </Provider> */}
    </section>
  );
}


export default App
