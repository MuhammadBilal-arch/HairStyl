import { useEffect, useCallback, useState } from 'react';

import DefaultLayout from '../../layout/DefaultLayout';
import { FaArrowLeft, FaLongArrowAltLeft, FaStar } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import { BtnFilled } from '../../components/button';
import { InputWithLabel } from '../../components/inputWithLabel';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ToggleButton } from '../../components/toggle';
import { ASSETS } from '../../images/path';
import Swiper from 'swiper';
import { SwipperComponent } from '../../components/swiper';
import { AiOutlineRight } from 'react-icons/ai';

export const CustomerDetail = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const dispatch = useDispatch<any>();
  const [status, setStatus] = useState(false);
  const validationSchema = Yup.object({
    tax: Yup.string().required('Field is required'),
    delivery_charges: Yup.string().required('Field is required'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      personal_name: '',
      shop_name: '',
      email: '',
      city: '',
      contact: '',
      bank_name: '',
      account_name: '',
      account_number: '',
      branch_code: '',
      shop_services: '',
      shop_products: '',
      status: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      // const formData = new FormData();
      // formData.append('tax', values.tax);
      // formData.append('delivery_charges', values.delivery_charges);
      // formData.append('id', defaultValue?._id);
      // dispatch(updateTaxes(formData));
      // onUpdateProfileModal();
    },
  });
  return (
    <DefaultLayout>
      <div>
        <div className="w-full">
          <h1
            onClick={()=> navigate(-1)}
          className="text-normal flex w-full items-center space-x-2 font-semibold text-black-primary md:text-xl">
            <FaArrowLeft className="text-lg font-normal" />{' '}
            <span>Clients </span>
            <AiOutlineRight /> <span>Symmmetry Beauty</span>
          </h1>
        </div>
        <form
          onSubmit={formik.handleSubmit}
          className="z-50 mx-auto flex flex-col space-y-8  rounded-xl py-5"
        >
          <div className="flex flex-col space-y-2"></div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex w-full items-center justify-between md:col-span-2">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                Personal Details
              </h1>
              <ToggleButton
                onChangeStatus={() => setStatus(!status)}
                status={status}
                text=""
              />
            </div>
            <InputWithLabel
              label="Personal Name"
              placeholder="Enter Personal Name"
              type="text"
              name="personal_name"
              value={formik?.values?.personal_name}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.personal_name}
              touched={formik?.touched?.personal_name}
              style={true}
            />
            <InputWithLabel
              label="Shop Name"
              placeholder="Enter Shop Name"
              type="text"
              name="shop_name"
              value={formik?.values?.shop_name}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.shop_name}
              touched={formik?.touched?.shop_name}
              style={true}
            />
            <InputWithLabel
              label="Email"
              placeholder="Enter Email"
              type="email"
              name="email"
              value={formik?.values?.email}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.email}
              touched={formik?.touched?.email}
              style={true}
            />
            <InputWithLabel
              label="City"
              placeholder="Enter City"
              type="text"
              name="city"
              value={formik?.values?.city}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.city}
              touched={formik?.touched?.city}
              style={true}
            />
            <InputWithLabel
              label="Contact"
              placeholder="Enter Contact"
              type="text"
              name="contact"
              value={formik?.values?.contact}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.contact}
              touched={formik?.touched?.contact}
              style={true}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex w-full items-center justify-between md:col-span-2">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                Account Details
              </h1>
            </div>
            <InputWithLabel
              label="Bank Name"
              placeholder="Enter Bank Name"
              type="text"
              name="bank_name"
              value={formik?.values?.bank_name}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.bank_name}
              touched={formik?.touched?.bank_name}
              style={true}
            />
            <InputWithLabel
              label="Account Name"
              placeholder="Enter Account Name"
              type="text"
              name="account_name"
              value={formik?.values?.account_name}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.account_name}
              touched={formik?.touched?.account_name}
              style={true}
            />
            <InputWithLabel
              label="Account Number"
              placeholder="Enter Account Number"
              type="number"
              name="account_number"
              value={formik?.values?.account_number}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.account_number}
              touched={formik?.touched?.account_number}
              style={true}
            />
            <InputWithLabel
              label="Branch Code"
              placeholder="Enter Branch Code"
              type="number"
              name="branch_code"
              value={formik?.values?.branch_code}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.branch_code}
              touched={formik?.touched?.branch_code}
              style={true}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex w-full items-center justify-between md:col-span-2">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                Shop services
              </h1>
            </div>
            <div className="flex items-center justify-between border-b border-gray-base py-1 text-sm">
              <label htmlFor="deep_massage" className="space-y-1">
                <div className="space-x-1">
                  <span className="font-semibold text-black-base">
                    Deep Massage -
                  </span>
                  <span className="text-gray-base">45 Minutes</span>
                </div>
                <div>€ 50</div>
              </label>
              <input
                name="deep_massage"
                type="checkbox"
                className="h-4 w-4 accent-yellow-primary"
              />
            </div>
            <div className="flex items-center justify-between border-b border-gray-base py-1 text-sm">
              <label htmlFor="deep_massage" className="space-y-1">
                <div className="space-x-1">
                  <span className="font-semibold text-black-base">
                    Arm Wax -
                  </span>
                  <span className="text-gray-base">45 Minutes</span>
                </div>
                <div>€ 50</div>
              </label>
              <input
                name="deep_massage"
                type="checkbox"
                className="h-4 w-4 accent-yellow-primary"
              />
            </div>
            <div className="flex items-center justify-between border-b border-gray-base py-1 text-sm">
              <label htmlFor="deep_massage" className="space-y-1">
                <div className="space-x-1">
                  <span className="font-semibold text-black-base">
                    Deep Massage -
                  </span>
                  <span className="text-gray-base">45 Minutes</span>
                </div>
                <div>€ 50</div>
              </label>
              <input
                name="deep_massage"
                type="checkbox"
                className="h-4 w-4 accent-yellow-primary"
              />
            </div>
            <div className="flex items-center justify-between border-b border-gray-base py-1 text-sm">
              <label htmlFor="deep_massage" className="space-y-1">
                <div className="space-x-1">
                  <span className="font-semibold text-black-base">
                    Deep Massage -
                  </span>
                  <span className="text-gray-base">45 Minutes</span>
                </div>
                <div>€ 50</div>
              </label>
              <input
                name="deep_massage"
                type="checkbox"
                className="h-4 w-4 accent-yellow-primary"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex w-full items-center justify-between md:col-span-2">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                Shop products
              </h1>
            </div>
            <div className="flex items-center justify-between border-b border-gray-base py-1 text-sm">
              <label htmlFor="deep_massage" className="flex space-x-4">
                <img
                  src={ASSETS.AUTH.SIGN_IN_COVER}
                  alt=""
                  className="h-10 w-10 object-cover"
                />
                <div className="space-y-1">
                  <span className="font-semibold text-black-base">
                    Men Hair Kit
                  </span>

                  <div>€ 50</div>
                </div>
              </label>
              <input
                name="deep_massage"
                type="checkbox"
                className="h-4 w-4 accent-yellow-primary"
              />
            </div>
            <div className="flex items-center justify-between border-b border-gray-base py-1 text-sm">
              <label htmlFor="deep_massage" className="flex space-x-4">
                <img
                  src={ASSETS.AUTH.SIGN_IN_COVER}
                  alt=""
                  className="h-10 w-10 object-cover"
                />
                <div className="space-y-1">
                  <span className="font-semibold text-black-base">
                    Shaving cream
                  </span>

                  <div>€ 50</div>
                </div>
              </label>
              <input
                name="deep_massage"
                type="checkbox"
                className="h-4 w-4 accent-yellow-primary"
              />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col space-y-2">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                Shop services
              </h1>

              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((item, index) => (
                  <div key={index} className="flex flex-col">
                    <div className="flex flex-col items-center justify-center space-y-1">
                      <div className="relative h-20 w-full md:h-28">
                        <img
                          src={ASSETS.AUTH.SIGN_IN_COVER}
                          alt=""
                          className="h-full w-full overflow-hidden rounded-full object-cover "
                        />
                        <div className="absolute left-[5%] right-[5%] bottom-0 flex w-[90%] items-center justify-center space-x-2 rounded-xl border border-gray-base bg-white px-1 py-0.5 text-xs text-black-base md:left-[15%] md:right-[15%] md:w-[70%] md:px-4">
                          <span>5.0</span>
                          <FaStar className="text-black-base" />
                        </div>
                      </div>
                      <div className="flex flex-col space-y-1 text-center text-xs md:text-sm">
                        <h1 className="font-semibold text-black-base">
                          John Seth
                        </h1>
                        <div className="">Haircut Specialist</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col space-y-2 text-xs sm:text-sm">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                Shop Timings:
              </h1>

              <div className="flex justify-between border-b-2 border-gray-base py-2 font-semibold">
                <div className="text-gray-base">Monday to Thursday</div>
                <div className="text-black-base">09:00 am 05:00 pm</div>
              </div>
              <div className="flex justify-between border-b-2 border-gray-base py-2 font-semibold">
                <div className="text-gray-base">Friday to Saturday</div>
                <div className="text-black-base">03:00 am 07:00 pm</div>
              </div>
              <div className="flex justify-between border-b-2 border-gray-base py-2 font-semibold">
                <div className="text-gray-base">Sunday</div>
                <div className="text-black-base">Closed</div>
              </div>
            </div>
          </div>
          <div className="flex h-52 flex-col space-y-4">
            <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
              Shop pictures
            </h1>
            <SwipperComponent
              list={[
                { img: ASSETS.SWIPER.SWIPER_1 },
                { img: ASSETS.SWIPER.SWIPER_2 },
                { img: ASSETS.SWIPER.SWIPER_3 },
                { img: ASSETS.SWIPER.SWIPER_1 },
                { img: ASSETS.SWIPER.SWIPER_2 },
                { img: ASSETS.SWIPER.SWIPER_3 },
              ]}
            />
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};
