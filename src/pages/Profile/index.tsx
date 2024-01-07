import DefaultLayout from '../../layout/DefaultLayout';

import { useState, useRef } from 'react';

import { useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/urls';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { ASSETS } from '../../images/path';
import { InputWithLabel } from '../../components/inputWithLabel';
import { MdAdminPanelSettings, MdOutlineModeEditOutline } from 'react-icons/md';
import { FiArrowUpRight } from 'react-icons/fi';
import { onUpdateUser } from '../../redux/slices/user/user';

export const Profile = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const { user } = useSelector((state: any) => state?.User); 
  const [image , setImage] = useState('');
  const [uploadedImg, setUploadedImg] = useState<any>();

  const validationSchema = Yup.object({
    name: Yup.string().required('Field is required'),
    email: Yup.string().required('Field is required'),
    phoneNumber: Yup.string().required('Field is required'),
    city: Yup.string().required('Field is required'),
    bankName: Yup.string().required('Field is required'),
    accountName: Yup.string().required('Field is required'),
    accountNumber: Yup.string().required('Field is required'),
    code: Yup.string().required('Field is required'),
    // branchCity: Yup.string().required('Field is required'),
    twitter: Yup.string().required('Field is required'),
    facebook: Yup.string().required('Field is required'),
    gmail: Yup.string().required('Field is required'),
    youtube: Yup.string().required('Field is required'),
    // image: Yup.string().required('Field is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {

      name: user.name || '' ,
      email: user.email || '',
      city: user.city || '',
      phoneNumber: user.phoneNumber || '',
      bankName: user?.bankDetails?.bankName || '',
      accountName: user?.bankDetails?.accountName || '',
      accountNumber: user?.bankDetails?.accountNumber || '',
      code: user?.bankDetails?.code || '',
      branchCity: user?.bankDetails?.branchCity || user.city,
      twitter: user?.social?.twitter || '',
      facebook: user?.social?.facebook || '',
      gmail: user?.social?.gmail || '',
      youtube: user?.social?.youtube ||  '',
    },
    validationSchema,
    onSubmit: async (values) => {

      const formData = new FormData();
      formData.append('id', user.id);
      formData.append('name', values.name);
      formData.append('email', values.email);
      formData.append('phoneNumber', values.phoneNumber);
      formData.append('city', values.city);
      formData.append('bankName', values.bankName);
      formData.append('accountName', values.accountName);
      formData.append('accountNumber', values.accountNumber);
      formData.append('code', values.code);
      formData.append('branchCity', values.city);
      formData.append('facebook', values.facebook);
      formData.append('twitter', values.twitter);
      formData.append('gmail', values.gmail);
      formData.append('youtube', values.youtube);
      if(image){
        formData.append('image', image);
        setUploadedImg('')
      }
      else {
        formData.append('image', user.image);
      }

      dispatch(onUpdateUser(formData));
    },
  });


  const onUploadImage = (e: any) => {
    e.preventDefault();
    var file = e.target.files[0];

    setUploadedImg(URL.createObjectURL(file));
    setImage(file)
  };

  return (
    <DefaultLayout>
      <div className="relative">
        <img
          src={ASSETS.PROFILE.PROFILE_COVER}
          alt=""
          className="h-52 w-full object-cover"
        />
        <div className="absolute -bottom-26 flex w-full flex-col items-center justify-between md:flex-row">
          <div className="flex items-center">
            <div className="relative h-34 w-34">
              <img
                src={uploadedImg || user.image || ASSETS.AUTH.SIGN_IN_COVER}
                alt=""
                className="h-32 w-32 object-cover rounded-full"
              />
              <label 
              htmlFor="image"               
              className="absolute cursor-pointer bottom-5 right-5 z-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-yellow-primary">
                <MdOutlineModeEditOutline />
              </label>
              <input
              type="file"
              className="hidden"
              accept="image/*"
              name="image"
              id="image"
              onChange={onUploadImage}
              />
            </div>
            <div>
              <h1 className="text-sm font-semibold text-black-primary md:text-base">
                {user.name}
              </h1>
              <div className="text-xs md:text-sm">{user.email}</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/manage-accounts')}
              className="flex items-center space-x-1 bg-black-primary px-2 py-1.5 text-sm text-white"
            >
              <div>
                <MdAdminPanelSettings className="text-lg" />{' '}
              </div>
              <div>Manage Account </div>
            </button>
            <button
              onClick={() => navigate('/reset-password-email')}
              className="flex items-center space-x-1 bg-black-primary px-2 py-1.5 text-sm text-white"
            >
              <div>Reset Password </div>
              <div>
                <FiArrowUpRight className="text-lg" />
              </div>
            </button>
          </div>
        </div>
      </div>
      <div className="space-y-8 py-14 text-black-primary">
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
            </div>
            <InputWithLabel
              label="Personal Name"
              placeholder="Enter Personal Name"
              type="text"
              name="name"
              value={formik?.values?.name}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.name}
              touched={formik?.touched?.name}
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
              label="Contact"
              placeholder="Enter Contact"
              type="text"
              name="phoneNumber"
              value={formik?.values?.phoneNumber}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.phoneNumber}
              touched={formik?.touched?.phoneNumber}
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
              name="bankName"
              value={formik?.values?.bankName}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.bankName}
              touched={formik?.touched?.bankName}
              style={true}
            />
            <InputWithLabel
              label="Account Name"
              placeholder="Enter Account Name"
              type="text"
              name="accountName"
              value={formik?.values?.accountName}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.accountName}
              touched={formik?.touched?.accountName}
              style={true}
            />
            <InputWithLabel
              label="Account Number"
              placeholder="Enter Account Number"
              type="number"
              name="accountNumber"
              value={formik?.values?.accountNumber}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.accountNumber}
              touched={formik?.touched?.accountNumber}
              style={true}
            />
            <InputWithLabel
              label="Branch Code"
              placeholder="Enter Branch Code"
              type="number"
              name="code"
              value={formik?.values?.code}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.code}
              touched={formik?.touched?.code}
              style={true}
            />
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex w-full items-center justify-between md:col-span-2">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                Social Accounts
              </h1>
            </div>
            <InputWithLabel
              label="Facebook"
              placeholder="Enter Facebook details"
              type="text"
              name="facebook"
              value={formik?.values?.facebook}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.facebook}
              touched={formik?.touched?.facebook}
              style={true}
            />
            <InputWithLabel
              label="Gmail"
              placeholder="Enter Gmail"
              type="text"
              name="gmail"
              value={formik?.values?.gmail}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.gmail}
              touched={formik?.touched?.gmail}
              style={true}
            />
            <InputWithLabel
              label="Youtube"
              placeholder="Enter Youtube"
              type="text"
              name="youtube"
              value={formik?.values?.youtube}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.youtube}
              touched={formik?.touched?.youtube}
              style={true}
            />
            <InputWithLabel
              label="Twitter"
              placeholder="Enter Twitter"
              type="text"
              name="twitter"
              value={formik?.values?.twitter}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.twitter}
              touched={formik?.touched?.twitter}
              style={true}
            />
          </div>

          {/* <div className="space-y-3">
            <h1 className="text-black w-full text-sm font-bold md:text-base">
              Store Front Image
            </h1>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label
                  htmlFor="product-image"
                  className="group overflow-hidden rounded-md"
                >
                  {!uploadedImg ? (
                    <div className="flex flex-col">
                      <div>Terms & conditions for customer app:</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center text-sm">
                        <div>Terms & conditions for customer app:</div>
                        <div>
                          1 text file attached,{' '}
                          <span className="text-blue-primary">
                            click to view
                          </span>{' '}
                          or <span className="text-red-delete">delete</span>
                        </div>
                      </div>
                      <div className="mx-auto w-8/12 rounded-sm border border-gray-normal py-4">
                        <div className="h-full w-full space-y-2 text-center font-semibold">
                          <AiOutlineCloudUpload className="mx-auto text-2xl" />
                          <div>
                            <div className="space-x-1 text-sm">
                              <span className="text-blue-primary">
                                Click to upload
                              </span>{' '}
                              <span className="text-gray-base">
                                or drag and drop
                              </span>
                            </div>
                            <div className="text-sm text-gray-base">
                              .txt file only (max. 5Mb)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="product-image"
                  accept="image/*"
                  onChange={onUploadImage}
                  className="hidden"
                />
              </div>
              <div>
                <label
                  htmlFor="product-image"
                  className="group overflow-hidden rounded-md"
                >
                  {!uploadedImg ? (
                    <div className="flex flex-col">
                      <div>Terms & conditions for customer app:</div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-center text-sm">
                        <div>Terms & conditions for customer app:</div>
                        <div>
                          1 text file attached,{' '}
                          <span className="text-blue-primary">
                            click to view
                          </span>{' '}
                          or <span className="text-red-delete">delete</span>
                        </div>
                      </div>
                      <div className="mx-auto w-8/12 rounded-sm border border-gray-normal py-4">
                        <div className="h-full w-full text-center font-semibold">
                          <AiOutlineCloudUpload className="mx-auto text-2xl" />
                          <div className="space-x-1 text-sm">
                            <span className="text-blue-primary">
                              Click to upload
                            </span>{' '}
                            <span className="text-gray-base">
                              or drag and drop
                            </span>
                          </div>
                          <div className="text-sm text-gray-base">
                            .txt file only (max. 5Mb)
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </label>
                <input
                  type="file"
                  id="product-image"
                  accept="image/*"
                  onChange={onUploadImage}
                  className="hidden"
                />
              </div>
            </div>
          </div> */}
          <div className="flex w-full items-center justify-end ">
            <div className="flex items-center space-x-2 text-sm ">
              <button className="px-2 py-1.5">Cancel</button>
              <button
                type="submit"
                className="bg-black-primary px-2 py-1.5 text-center text-white"
              >
                Save Changes
              </button>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};
