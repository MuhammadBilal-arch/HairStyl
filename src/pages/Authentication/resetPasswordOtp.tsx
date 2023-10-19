import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
 
import { onLoginUser } from '../../redux/slices/user/user';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ASSETS } from '../../images/path';
import { BtnFilled } from '../../components/button';
import OTPInput from 'react-otp-input';

export const ResetPasswordOtp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { isLogged, isLoading, error, user } = useSelector(
    (state: any) => state.User
  );

  const [otp, setotp] = useState(); 

  const onEnterCode = async (value) => {
    setotp(value);
    if (value.length === 5) { 
      navigate('/reset-password')
    }
  };

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
    password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      dispatch(onLoginUser(values));
    },
  });

  return (
    <div className="flex h-screen max-h-screen flex-col justify-between p-2 md:p-4">
      <div
        style={{
          backgroundImage: `url(${ASSETS.AUTH.RESET_PASSWORD_COVER})`,
        }}
        className="h-full bg-top bg-no-repeat md:bg-contain"
      >
        <div className="mb-10 px-5 pt-5 text-base font-semibold text-black-primary sm:text-lg md:text-xl lg:text-2xl xl:py-5 2xl:py-5">
          Hairstyl
        </div>
        <div className="flex flex-col items-center justify-center space-y-6">
          <img src={ASSETS.AUTH.SEARCH_SELECT_STYL} alt="" className="h-14" />
          <div className="flex h-full w-full flex-col justify-center space-y-14 rounded-lg bg-white px-5 pb-10 shadow-equal sm:w-80">
            <form
              onSubmit={formik.handleSubmit}
              className="flex w-full flex-col rounded-xl  text-black-primary"
            >
              <div className="my-5 flex w-full flex-col space-y-2">
                <h1 className=" w-full  text-xl font-bold md:text-2xl">
                  Reset Password
                </h1>
                <div className="text-xs md:text-sm">
                  Enter your 5 digits one time password
                </div>
              </div>
              <div className="w-full space-y-2 2xl:space-y-3">
                <OTPInput
                  containerStyle={{ width: '100%' }}
                  value={otp}
                  isInputNum={true}
                  onChange={onEnterCode}
                  numInputs={5}
                  renderInput={(props) => <input {...props} />}
                  inputStyle={{
                    width: '45px',
                    height: '45px',
                    border: '1px solid #D9D9D9',
                    borderRadius: '10%',
                  }}
                  renderSeparator={
                    <span className="w-1 text-transparent sm:w-3">-</span>
                  }
                />

                <div className="space-y-5 pt-4">
                  <BtnFilled
                    text="Next"
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
      </div>
      <div className="text-center text-xs font-semibold text-gray-normal md:text-right md:text-sm">
        @ 2023, Made with ❤️ by{' '}
        <span className="font-semibold text-yellow-primary">KST Team</span> for
        a better web.
      </div>
    </div>
  );
};
