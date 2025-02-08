import { signUpWithEmail, signInWithGoogle, signInWithFacebook, User } from '../authSlice';
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { GoogleLoginButton, FacebookLoginButton } from 'react-social-login-buttons';
import { useAppDispatch } from '../../../common/reduxtk/store';
// import { useNavigate } from 'react-router-dom';

const SignUpScreen: React.FC = () => {
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  const dispatch = useAppDispatch();
  // const navigate = useNavigate();

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
  };

  const handleFacebookSignIn = () => {
    dispatch(signInWithFacebook());
  };

  return (
    <section className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <section className='w-[70vw] h-[90vh] flex flex-col items-center justify-start border border-slate-50 shadow-lg rounded-2xl'>
        <section className='w-[33vw] h-full flex flex-col items-stretch justify-center px-4'>
          <section className='flex flex-col items-center justify-center'>
            <section className="flex justify-center items-center">
              <img src="../../../assets/floopyinn_logo.png" alt="logo" className="rounded-full h-32 w-32"/>
            </section>
            <h2 className='text-3xl text py-2 font-extrabold'>Create an account</h2>
            <p className='pb-8 text-slate-400 text-center'>We'd love to have you on board. Join over 500+ customers worldwide.</p>
          </section>

          <section className='flex flex-col items-center justify-center'>
          <FacebookLoginButton onClick={handleFacebookSignIn} />
          <GoogleLoginButton onClick={handleGoogleSignIn} />
          </section>
          <hr className='text-slate-200 my-8'/>

          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', terms: false }}
            validationSchema={validationSchema}
            onSubmit={(values, { resetForm }) => {
              const user: User = {firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password};
                  dispatch(signUpWithEmail(user));
              console.log('Form Data:', values);
              resetForm();
            }}
          >
            {({  isValid, dirty }) => (
              <Form className='flex flex-col items-center justify-center'>
                <section className='w-full my-2'>
                  <label className='text-start font-bold py-4'>First Name <span className='text-red-500'>*</span></label>
                  <Field name="firstName" placeholder="Enter your First Name" className='border h-[50px] border-gray-200 w-full rounded-lg p-2 focus:outline-gray-300' />
                  <ErrorMessage name="firstName" component="div" className='text-red-500 text-xs' />
                </section>
                
                <section className='w-full my-2'>
                  <label className='text-start font-bold py-4'>Last Name <span className='text-red-500'>*</span></label>
                  <Field name="lastName" placeholder="Enter your Last Name" className='border h-[50px] border-gray-200 w-full rounded-lg p-2 focus:outline-gray-300' />
                  <ErrorMessage name="lastName" component="div" className='text-red-500 text-xs' />
                </section>

                <section className='w-full my-2'>
                  <label className='text-start font-bold py-4'>Email <span className='text-red-500'>*</span></label>
                  <Field name="email" type="email" placeholder="Enter your Email" className='border h-[50px] border-gray-200 w-full rounded-lg p-2 focus:outline-gray-300' />
                  <ErrorMessage name="email" component="div" className='text-red-500 text-xs' />
                </section>

                <section className='w-full my-2'>
                  <label className='text-start font-bold py-4'>Password <span className='text-red-500'>*</span></label>
                  <Field name="password" type="password" placeholder="Enter your Password" className='border h-[50px] border-gray-200 w-full rounded-lg p-2 focus:outline-gray-300' />
                  <ErrorMessage name="password" component="div" className='text-red-500 text-xs' />
                </section>

                <section className='w-full my-2 text-center'>
                  <label className='flex items-center justify-center'>
                    <Field type="checkbox" name="terms" className='mr-2' />
                    <span className='text-slate-400 text-sm'>I agree to the <span className='text-black'>terms and privacy</span> policies.</span>
                  </label>
                  <ErrorMessage name="terms" component="div" className='text-red-500 text-xs' />
                </section>

                <button
                  className={`w-full h-[50px] my-8 rounded-2xl ${
                    isValid && dirty ? 'bg-black text-slate-200' : 'bg-gray-400 text-gray-700'
                  }`}
                  type="submit" disabled={!(isValid && dirty)}>Sign Up
                </button>
              </Form>
            )}
          </Formik>

          <p className='text-center'>
            Already have an account? <a href="/login" className='hover:underline font-bold'>Login here.</a>
          </p>
        </section>
      </section>
    </section>
  );
};

export default SignUpScreen;

