import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputPassword, InputWithLabel } from '../../components/inputWithLabel';
import { onLoginUser } from '../../redux/slices/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ASSETS } from '../../images/path';
import { BtnFilled } from '../../components/button';
import { ToggleButton } from '../../components/toggle';

export const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [remember, setRemember] = useState(false);
  const { isLogged, isLoading, error, user } = useSelector(
    (state: any) => state.User
  );

  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    if (isLoadingRef.current && !isLoading && error === null) {
      if (isLogged) {

          navigate('/home');
      }
    }
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // navigate('/home');
      dispatch(onLoginUser(values));
    },
  });

  const onUpdateRememberMe = () => {
    setRemember(!remember);
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex h-screen w-full flex-col px-8 py-5 md:w-1/2 2xl:py-8">
        <div className="mb-10 text-2xl font-semibold text-black-primary">
          Hairstyl
        </div>
        <div className="flex h-full flex-col justify-center space-y-14  lg:px-12 xl:px-24">
          <form
            onSubmit={formik.handleSubmit}
            className="flex w-full flex-col rounded-xl  text-black-primary"
          >
            <div className="my-5 flex w-full flex-col space-y-2">
              <h1 className=" w-full  text-xl font-bold md:text-2xl">
                Welcome Back
              </h1>
              <div>Enter your email and password to sign in</div>
            </div>
            <div className="w-full space-y-2 2xl:space-y-3">
              <InputWithLabel
                label="Email"
                placeholder="Your email address"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.email}
                touched={formik?.touched?.email}
                style={true}
              />
              <InputPassword
                label="Password"
                placeholder="Your password"
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.password}
                touched={formik?.touched?.password}
                disabled={false}
                style={true}
              />
                <div className='pt-4'>
                <ToggleButton
                onChangeStatus={onUpdateRememberMe}
                status={remember}
                text="Remember Me"
              />
                </div>
              <div className="space-y-5 pt-4">
                <BtnFilled
                  text="Sign In"
                  background="bg-yellow-primary"
                  color="text-black-primary"
                  width="w-full"
                />

                <div className="space-y-4 px-8 text-black-primary">
                  <div className="cursor-pointer text-center text-xs text-black-primary sm:text-sm md:text-base">
                    Forgot Password?{' '}
                    <span
                      onClick={() => navigate('/reset-password-email')}
                      className="font-semibold"
                    >
                      Reset Password
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div className=" text-sm font-semibold text-gray-normal">
            @ 2023, Made with ❤️ by{' '}
            <span className="font-semibold text-yellow-primary">KST Team</span>{' '}
            for a better web.
          </div>
        </div>
      </div>
      <div className="hidden h-screen w-1/2 object-contain p-5 md:block">
        <div
          style={{ backgroundImage: `url(${ASSETS.AUTH.SIGN_IN_COVER})` }}
          className={`flex h-full flex-col items-center justify-center rounded-br-[75px]`}
        >
          <div className="flex flex-col items-center justify-center space-y-2">
            <img src={ASSETS.AUTH.SEARCH_SELECT_STYL} alt="" className="h-14" />
            <div className="space-y-1 border border-black-primary px-10 py-5 text-center font-semibold text-black-primary">
              <div className="text-xs">Learn more about style on</div>
              <div className="text-base sm:text-lg md:text-xl">
                (support@hairstyl.co.uk)
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* {isLoading && <Loading />} */}
    </div>
  );
};
