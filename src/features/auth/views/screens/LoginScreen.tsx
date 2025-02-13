import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { showToast } from '../../../../common/middleware/showToast.ts';
import { auth } from '../../../../common/firebase.ts';
import { CustomFacebookLoginButton, CustomGoogleLoginButton } from '../components/CustomSocialMediaLoginButton.tsx.tsx';
import { facebookSignIn, googleSignIn } from '../../authSlice.ts';
import { useAppDispatch, useAppSelector } from '../../../../common/reduxtk/hooks.ts';
import floopyinnLogo from "../../../../assets/playstore.png";
import { useEffect } from 'react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);


  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  });

  // 🔹 Handle email/password login
  const handleSubmit = async (values: { email: string; password: string }, { resetForm }: any) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password); //decided not to use thunk here
      showToast("success", "Login successful!");
      resetForm();
      navigate('/');
    } catch (error: any) {
      showToast("error", error.message);
    }
  };

  // 🔹 Handle Google sign-in
  const handleGoogleSignIn = async () => {
    try {
      await dispatch(googleSignIn())
      navigate('/');
    } catch (error: any) {
      showToast("error", error.message);
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
    <section className='w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
      <section className='w-[70vw] h-[70vh] flex flex-col items-center justify-start border border-slate-50 shadow-lg rounded-2xl'>
        <section className='w-[33vw] h-full flex flex-col items-stretch justify-center px-4'>
          <section className='flex flex-col items-center justify-center'>
            <section className="flex justify-center items-center">
              <img src={floopyinnLogo} alt="logo" className="rounded-full h-32 w-32" />
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

          <p className='text-center mt-4'>
            Don't have an account? <a href="/signup" className='hover:underline font-bold'>Sign up here.</a>
          </p>
          <hr className='text-slate-200 my-8' />

          <section className='flex flex-col items-center justify-center'>
            <CustomFacebookLoginButton onClick={handleFacebookSignIn} />
            <CustomGoogleLoginButton onClick={handleGoogleSignIn} />
          </section>

        </section>
      </section>
    </section>
  );
};

export default Login;
