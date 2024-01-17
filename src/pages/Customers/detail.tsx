import { useEffect, useCallback, useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import { FaArrowLeft,  FaStar } from 'react-icons/fa';
import {  useNavigate, useParams } from 'react-router-dom';
import { InputWithLabel } from '../../components/inputWithLabel';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import { ToggleButton } from '../../components/toggle';
import { AiOutlineRight } from 'react-icons/ai';
import { onUpdateVendorStatus } from '../../redux/slices/vendors';
import { useSelector } from 'react-redux';

export const UserDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { id } = useParams()
  const [status, setStatus] = useState(0);
  const { users } = useSelector((state: any) => state.Users);
  const [user , setUser] = useState<any>()

  useEffect(() => {

    if(id){
      users.find((item:any) => {
        if(item.id == id){
          setUser(item)
          setStatus(item.status)
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
            <span>Customer </span>
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

        </form>
      </div>
    </DefaultLayout>
  );
};
