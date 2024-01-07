import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { InputWithLabel } from '../../components/inputWithLabel';
import { onLoginUser } from '../../redux/slices/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ASSETS } from '../../images/path';
import { BtnFilled } from '../../components/button';
import { API_HANDLER, API_HANDLER_FORM_DATA_NORMAL, showToast } from '../../utils/functions';
import { END_POINTS } from '../../utils/endpoints';
import { TOAST_TYPE } from '../../utils/constants';

export const ResetPasswordEmail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { isLogged, isLoading, error, user } = useSelector(
    (state: any) => state.User
  );

  const isLoadingRef = useRef(isLoading);

  useEffect(() => {
    if (isLoadingRef.current && !isLoading && error === null) {
      if (isLogged) {
        if (user?.accountType === 'SUPER_ADMIN') {
          navigate('/dispensaries');
        } else {
          navigate('/orders');
        }
      }
    }
    isLoadingRef.current = isLoading;
  }, [isLoading]);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: async (values) => {

      const formData = new FormData();
      formData.append('email', values.email);

      const result = await API_HANDLER_FORM_DATA_NORMAL(
        'POST',
        END_POINTS.AUTH.FORGOT,
        formData
      );
      console.log(result, 'result');
      if (result?.data) {
        showToast(result.data.msg, TOAST_TYPE.success);
      }
    },
      // navigate('/reset-password-otp');
    // },
  });

  return (
    <div className="flex relative h-screen max-h-screen flex-col justify-between p-2 md:p-4">
      <div
        style={{
          backgroundImage: `url(${ASSETS.AUTH.RESET_PASSWORD_COVER})`,
        }}
        className="h-1/2 w-full rounded-3xl bg-top bg-no-repeat md:bg-cover"
      >
        <div className="mb-10 px-5 pt-5 text-base font-semibold text-black-primary sm:text-lg md:text-xl lg:text-2xl xl:py-5 2xl:py-5">
          Hairstyl
        </div>
      </div>
      <div className="flex flex-col absolute px-5 sm:px-0 left-0 top-[15%] lg:top-[25%] 2xl:top-[35%] 3xl:top-[40%] right-0 items-center justify-center space-y-6">
        <img src={ASSETS.AUTH.SEARCH_SELECT_STYL} alt="" className="h-14" />
        <div className="flex h-full w-full flex-col justify-center space-y-14 rounded-tl-xl rounded-br-xl bg-white px-5 pb-10 shadow-equal sm:w-80">
          <form
            onSubmit={formik.handleSubmit}
            className="flex w-full flex-col   text-black-primary"
          >
            <div className="my-5 flex w-full flex-col space-y-2">
              <h1 className=" w-full  text-xl font-bold md:text-2xl">
                Reset Password
              </h1>
              <div className="text-xs md:text-sm">
                Enter your email to reset password
              </div>
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

              <div className="space-y-5 pt-4">
                <BtnFilled
                  // text="Send OTP"
                  text="Submit"
                  background="bg-yellow-primary"
                  color="text-black-primary"
                  width="w-full"
                />

                <div className="space-y-4 px-8 text-black-primary">
                  <div
                    onClick={() => navigate('/')}
                    className="cursor-pointer text-center text-xs text-black-primary sm:text-sm md:text-base"
                  >
                    <span className="font-semibold">Sign in instead</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div className="text-center text-xs font-semibold text-gray-normal md:text-right md:text-sm">
        @ 2023, Made with ❤️ by{' '}
        <span className="font-semibold text-yellow-primary">KST Team</span> for
        a better web.
      </div>
    </div>
  );
};
