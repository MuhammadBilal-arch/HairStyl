import { useEffect, useCallback, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaArrowLeft,  FaStar } from 'react-icons/fa';
import {  useNavigate, useParams } from 'react-router-dom';
import { InputWithLabel } from '../../components/inputWithLabel';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { ToggleButton } from '../../components/toggle';
import { ASSETS } from '../../images/path';
import { SwipperComponent } from '../../components/swiper';
import { AiOutlineRight } from 'react-icons/ai';
import { onUpdateVendorStatus } from '../../redux/slices/vendors';
import { useSelector } from 'react-redux';

export const VendorDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { id } = useParams()
  const [status, setStatus] = useState(0);
  const { vendors } = useSelector((state: any) => state.Vendors);
  const [user , setUser] = useState<any>()

  useEffect(() => {

    if(id){
      vendors.find((vendor:any) => {
        console.log(vendor,'vendor')
        if(vendor.id == id){
          setUser(vendor)
          setStatus(vendor.status)
          console.log(vendor)
        }
      })
    }
  
  }, [id])
  

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      personal_name: user?.name || '',
      shop_name: user?.shopName || '',
      email: user?.email || '',
      city: user?.city || '',
      contact: user?.phoneNumber || '',
      bank_name: user?.bankDetails?.bankName || '',
      account_name: user?.bankDetails?.accountName || '',
      account_number: user?.bankDetails?.accountNumber || '',
      branch_code: user?.bankDetails?.code || '',
      shop_services: '',
      shop_products: '',
      status: '',
    },

    onSubmit: async (values) => {
    },
  });
  
  const onChangeStatus = (user:any) => {
    setStatus(status == 0 ? 1 : 0)    

    dispatch(onUpdateVendorStatus({
      _id:id,
      status: status == 0 ? 1 : 0
    }));
  };

  return (
    <DefaultLayout>
      <div>
        <div className="w-full">
          <h1
            onClick={() => navigate(-1)}
            className="text-normal flex w-full items-center space-x-2 font-semibold text-black-primary md:text-xl"
          >
            <FaArrowLeft className="text-lg font-normal" />{' '}
            <span>Clients </span>
            <AiOutlineRight /> <span>{user?.name}</span>
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
                onChangeStatus={onChangeStatus}
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
          {user?.services != null && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex w-full items-center justify-between md:col-span-2">
                <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                  Shop services
                </h1>
              </div>
              {
                user?.services?.map((item, index) => (
                  <div 
                  key={index}
                  className="flex items-center justify-between border-b border-gray-base py-1 text-sm">
                  <label htmlFor="deep_massage" className="space-y-1">
                    <div className="space-x-1">
                      <span className="font-semibold text-black-base">
                        {item.name}
                      </span>
                      <span className="text-gray-base">45 Minutes</span>
                    </div>
                    <div>€ {item.tokenAmount}</div>
                  </label>
                  <input
                    name="deep_massage"
                    type="checkbox"
                    checked
                    className="h-4 w-4 accent-yellow-primary"
                  />
                </div>
                ))
              }    
            </div>
          )}
          {user?.products != null && (
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex w-full items-center justify-between md:col-span-2">
                <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                  Shop products
                </h1>
              </div>
              {user?.products?.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border-b border-gray-base py-1 text-sm"
                >
                  <label htmlFor="deep_massage" className="flex space-x-4">
                    <img
                      src={ASSETS.AUTH.SIGN_IN_COVER}
                      alt=""
                      className="h-10 w-10 object-cover"
                    />
                    <div className="space-y-1">
                      <span className="font-semibold text-black-base">
                        {item?.name}
                      </span>

                      <div>€ {item?.price}</div>
                    </div>
                  </label>
                  <input
                    name="deep_massage"
                    type="checkbox"
                    checked
                    className="h-4 w-4 accent-yellow-primary"
                  />
                </div>
              ))}
            </div>
          )}
          <div className="grid gap-4 md:grid-cols-2">
            {user?.services != null && (
              <div className="flex flex-col space-y-2">
                <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                  Shop services
                </h1>

                <div className="grid grid-cols-4 gap-4">
                  {user?.services?.map((item, index) => (
                    <div key={index} className="flex flex-col">
                      <div className="flex flex-col items-center justify-center space-y-1">
                        <div className="relative h-20 w-20 md:h-24 md:w-24">
                          <img
                            src={item.image || ASSETS.DUMMY_IMAGE}
                            alt=""
                            className="h-full w-full overflow-hidden rounded-full object-cover "
                          />
                          <div className="absolute left-[5%] right-[5%] bottom-0 flex w-[90%] items-center justify-center space-x-2 rounded-xl border border-gray-base bg-white px-1 py-0.5 text-xs text-black-base md:left-[15%] md:right-[15%] md:w-[70%] md:px-4">
                            <span> {user?.rating}</span>
                            <FaStar className="text-black-base" />
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1 text-center text-xs md:text-sm">
                          <h1 className="font-semibold text-black-base">
                            {user?.name}
                          </h1>
                          <div className="">{item?.name}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {user?.timeAvailability != null && (
              <div className="flex flex-col space-y-2 text-xs sm:text-sm">
                <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                  Shop Timings:
                </h1>

                <div className="flex justify-between border-b-2 border-gray-base py-2 font-semibold">
                  <div className="text-gray-base">Monday to Thursday</div>
                  <div className="text-black-base">
                    {user?.timeAvailability.startTime}{' '}
                    {user?.timeAvailability.endTime}
                  </div>
                </div>
                {/* <div className="flex justify-between border-b-2 border-gray-base py-2 font-semibold">
                <div className="text-gray-base">Friday to Saturday</div>
                <div className="text-black-base">03:00 am 07:00 pm</div>
              </div>
              <div className="flex justify-between border-b-2 border-gray-base py-2 font-semibold">
                <div className="text-gray-base">Sunday</div>
                <div className="text-black-base">Closed</div>
              </div> */}
              </div>
            )}
          </div>
          {user?.image != null && (
            <div className="flex h-52 flex-col space-y-4">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                Shop pictures
              </h1>
              <SwipperComponent
                list={user?.image}
                // list={
                //   [
                //   { img: ASSETS.SWIPER.SWIPER_1 },
                //   { img: ASSETS.SWIPER.SWIPER_2 },
                //   { img: ASSETS.SWIPER.SWIPER_3 },
                //   { img: ASSETS.SWIPER.SWIPER_1 },
                //   { img: ASSETS.SWIPER.SWIPER_2 },
                //   { img: ASSETS.SWIPER.SWIPER_3 },
                // ]
                // }
              />
            </div>
          )}
        </form>
      </div>
    </DefaultLayout>
  );
};
