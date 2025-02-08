// LoginScreen.tsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { signInWithEmail } from '../authSlice';
// import { useAppDispatch } from '../../../common/reduxtk/store';

// const LoginScreen: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();

//   const handleLogin = (e: React.FormEvent) => {
//     e.preventDefault();
//     dispatch(signInWithEmail({ email, password }));
//     navigate('/');
//   };

//   return (
//     <div>
//       <h2>Log In</h2>
//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Log In</button>
//       </form>
//       <p>
//         Don't have an account? <a href="/">Sign Up</a>
//       </p>
//     </div>
//   );
// };

// export default LoginScreen;



import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';
import { signInWithEmail, signInWithFacebook, signInWithGoogle } from '../authSlice';
import { useAppDispatch } from '../../../common/reduxtk/store';

const Login = () => {
    const dispatch = useAppDispatch();


  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log('Form Data:', values);
    // Implement your login logic here
    dispatch(signInWithEmail({ email: values.email, password: values.password }));
    resetForm();
  };

  const handleFacebookLogin = () => {
    // Implement your Facebook login logic here
    // dispatch(signInWithFacebook());
    console.log('Facebook login clicked');
  };

  const handleGoogleLogin = () => {
    // Implement your Google login logic here
    // dispatch(signInWithGoogle());
    console.log('Google login clicked');
  };

  return (
    <section className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <section className='w-[70vw] h-[70vh] flex flex-col items-center justify-start border border-slate-50 shadow-lg rounded-2xl'>
        <section className='w-[33vw] h-full flex flex-col items-stretch justify-center px-4'>
          <section className='flex flex-col items-center justify-center'>
            <section className="flex justify-center items-center">
              <img src="../../../assets/floopyinn_logo.png" alt="logo" className="rounded-full h-32 w-32"/>
            </section>
            <h2 className='text-3xl text py-2 font-extrabold'>Welcome Back</h2>
            <p className='pb-8 text-slate-400 text-center'>Log in to continue to your account.</p>
          </section>

          <Formik
            initialValues={{ email: '', password: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isValid, dirty }) => (
              <Form className='flex flex-col items-center justify-center'>
                <section className='w-full my-2'>
                  <label className='text-start font-bold py-4'>Email <span className='text-red-500'>*</span></label>
                  <Field name="email" type="email" placeholder="Enter your Email" className='border h-[50px] border-gray-200 w-full rounded-lg p-2 focus:outline-gray-300' />
                  <ErrorMessage name="email" component="div" className='text-red-500 text-sm' />
                </section>

                <section className='w-full my-2'>
                  <label className='text-start font-bold py-4'>Password <span className='text-red-500'>*</span></label>
                  <Field name="password" type="password" placeholder="Enter your Password" className='border h-[50px] border-gray-200 w-full rounded-lg p-2 focus:outline-gray-300' />
                  <ErrorMessage name="password" component="div" className='text-red-500 text-sm' />
                </section>

                <button
                  className={`w-full h-[50px] my-8 rounded-2xl ${isValid && dirty ? 'bg-black' : 'bg-gray-400'} text-slate-200`}
                  type="submit"
                  disabled={!(isValid && dirty)}
                >
                  Log In
                </button>
              </Form>
            )}
          </Formik>

          <section className='flex flex-col items-center justify-center'>
            <p className='text-center mb-4'>Or log in with</p>
            <FacebookLoginButton onClick={handleFacebookLogin} />
            <GoogleLoginButton onClick={handleGoogleLogin} />
          </section>

          <p className='text-center mt-4'>
            Don't have an account? <a href="/signup" className='hover:underline font-bold'>Sign up here.</a>
          </p>
        </section>
      </section>
    </section>
  );
};

export default Login;
