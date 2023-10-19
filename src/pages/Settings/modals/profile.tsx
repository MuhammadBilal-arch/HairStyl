import { InputWithLabel } from '../../../components/inputWithLabel';
import { useFormik } from 'formik';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { BtnFilled } from '../../../components/button';
import { ModalComponent } from '../../../components/modal';
import { onUpdateUserDispensaryInfo } from '../../../redux/slices/user/user';

export const UpdateProfile = ({
  updateProfileModal,
  onUpdateProfileModal,
  defaultValue,
}) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    name: Yup.string().required('Field is required'),
    email: Yup.string().required('Field is required'),
    phone: Yup.string().required('Field is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: defaultValue?.dispensary?.name || '',
      email: defaultValue?.email || '',
      phone: defaultValue?.dispensary?.phone || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('phone', values.phone);
      formData.append('id', defaultValue?.dispensary?._id);
      dispatch(onUpdateUserDispensaryInfo(formData));
      onUpdateProfileModal();
    },
  });
  return (
    <ModalComponent
      style="w-10/12 md:w-1/2 xl:w-1/3 mx-auto rounded-xl mx-auto absolute right-0 left-0 top-[15%] overflow-hidden"
      modal={updateProfileModal}
      onModalStatus={onUpdateProfileModal}
      content={
        <form
          onSubmit={formik.handleSubmit}
          className="z-50 mx-auto flex flex-col space-y-8  rounded-xl bg-grey-modal py-5"
        >
          <div className="flex flex-col space-y-2">
            <div className="flex w-full items-center justify-between px-4">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                Edit Dispensary Information
              </h1>
              <FaTimes
                className="cursor-pointer"
                onClick={onUpdateProfileModal}
              />
            </div>
            <div className="border-black w-full border  border-dotted"></div>
          </div>
          <div className="space-y-1 px-5">
            <div className="w-8/12">
              <InputWithLabel
                label="Dispensary Name"
                placeholder="Dispensary Name"
                type="text"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.name}
                touched={formik?.touched?.name}
                style={true}
              />
            </div>
            <div className="w-8/12">
              <InputWithLabel
                label="Email Address"
                placeholder="Email Address"
                type="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.email}
                touched={formik?.touched?.email}
                disable={true}
                style={true}
              />
            </div>
            <div className="w-8/12">
              <InputWithLabel
                label="Phone Number"
                placeholder="Phone Number"
                type="number"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors}
                touched={formik?.touched?.phone}
                style={true}
              />
            </div>
          </div>

          <div className="flex items-end justify-end space-x-2 px-4">
            <BtnFilled
              background="bg-white"
              color="text-black"
              round="md"
              text="Cancel"
              width="w-1/3"
              onClick={onUpdateProfileModal}
            />
            <BtnFilled
              background="bg-purple-primary"
              color="text-white"
              text="Save"
              round="md"
              width="w-1/3"
            />
          </div>
        </form>
      }
    />
  );
};
