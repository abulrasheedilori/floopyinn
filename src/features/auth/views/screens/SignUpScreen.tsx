import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useAppDispatch } from '../../../../common/reduxtk/hooks';
import { facebookSignIn, googleSignIn, signUpWithEmail, User } from '../../authSlice';
import { CustomFacebookLoginButton, CustomGoogleLoginButton } from '../components/CustomSocialMediaLoginButton.tsx';
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../../../common/middleware/showToast.ts';
import floopyinnLogo from "../../../../assets/playstore.png"

const SignUpScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const validationSchema = Yup.object<User>({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    terms: Yup.boolean().oneOf([true], 'You must accept the terms and conditions'),
  });

  const handleGoogleSignIn = async () => {
    try {
      const resultAction = await dispatch(googleSignIn());
      //  Check if the action was rejected
      if (googleSignIn.rejected.match(resultAction)) {
        showToast("info", resultAction.payload?.toString() || "Something went wrong");
        return;
      }
      //  Success case
      showToast("success", `User is logged in successfully`);
      navigate("/");
    } catch (err: any) {
      showToast("error", err.message);
    }
  };

  const handleFacebookSignIn = async () => {
    try {
      const resultAction = await dispatch(facebookSignIn());

      if (facebookSignIn.rejected.match(resultAction)) {
        showToast("error", resultAction.payload?.toString() || "Facebook sign-in failed");
        return;
      }

      showToast("success", "User logged in successfully");
      navigate("/");
    } catch (error: any) {
      showToast("error", error.message || "Something went wrong");
    }
  };


  return (
    <section className='w-[100vw] h-[100vh] bg-slate-50 flex flex-col justify-center items-center'>
      <section className='w-[70vw] bg-white h-[90vh] flex flex-col items-center justify-start border border-slate-50 shadow-lg rounded-2xl'>
        <section className='w-[33vw] h-full flex flex-col items-stretch justify-center px-4'>
          <section className='flex flex-col items-center justify-center'>
            <section className="flex justify-center items-center">
              <img src={floopyinnLogo} alt="logo" className="rounded-full h-24 w-24" />
            </section>
            <h2 className='text-3xl text py-2 font-extrabold'>Create An account</h2>
            <p className='pb-8 text-slate-400 text-center'>We'd love to have you on board. Join over 500+ customers worldwide.</p>
          </section>

          <section className='flex flex-col items-center justify-center'>
            <CustomFacebookLoginButton onClick={handleFacebookSignIn} />
            <CustomGoogleLoginButton onClick={handleGoogleSignIn} />
          </section>
          <hr className='text-slate-200 my-8' />

          <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '', terms: false }}
            validationSchema={validationSchema}
            onSubmit={async (values, { resetForm }) => {
              const user: User = { firstName: values.firstName, lastName: values.lastName, email: values.email, password: values.password };
              try {
                const resultAction = await dispatch(signUpWithEmail(user));
                //  Check if the action was rejected
                if (signUpWithEmail.rejected.match(resultAction)) {
                  showToast("info", resultAction.error.message || "Something went wrong");
                  return;
                }
                //  Success case
                showToast("success", `${values.firstName} is logged in successfully`);
                resetForm();
                navigate("/");
              } catch (err: any) {
                showToast("error", err);
              }
            }}
          >
            {({ isValid, dirty, isSubmitting }) => (
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
                  className={`w-full h-[50px] my-8 rounded-2xl ${isValid && dirty ? 'bg-black text-slate-200' : 'bg-gray-400 text-gray-700'
                    }`}
                  type="submit" disabled={!(isValid && dirty)}>{isSubmitting ? "Signing you in" : "Sign Up"}
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

