import { InputWithLabel } from '../../../components/inputWithLabel';
import { useFormik } from 'formik';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { BtnFilled } from '../../../components/button';
import { ModalComponent } from '../../../components/modal';
import { END_POINTS } from '../../../utils/endpoints';
import { API_HANDLER, showToast } from '../../../utils/functions';
import { TOAST_TYPE } from '../../../utils/constants';

export const UpdatePassword = ({
  updateProfileModal,
  onUpdateProfileModal,
  defaultValue,
}) => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    current_password: Yup.string().required('Field is required'),
    new_password: Yup.string().required('Field is required'),
    confirm_password: Yup.string().required('Field is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      current_password: '',
      new_password: '',
      confirm_password: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        currentPassword: values.current_password,
        newPassword: values.new_password,
        confirmPassword: values.confirm_password,
      };
      const result = await API_HANDLER(
        'POST',
        END_POINTS.AUTH.RESET_PASSWORD,
        payload
      );
      showToast(result.data.data.message, TOAST_TYPE.success);
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
                label="Current Password"
                placeholder="Current Password"
                type="password"
                name="current_password"
                value={formik.values.current_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.current_password}
                touched={formik?.touched?.current_password}
                style={true}
              />
            </div>
            <div className="w-8/12">
              <InputWithLabel
                label="New Password"
                placeholder="New Password"
                type="password"
                name="new_password"
                value={formik.values.new_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.new_password}
                touched={formik?.touched?.new_password}
                style={true}
              />
            </div>
            <div className="w-8/12">
              <InputWithLabel
                label="Confirm New Password"
                placeholder="Confirm New Password"
                type="password"
                name="confirm_password"
                value={formik.values.confirm_password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.confirm_password}
                touched={formik?.touched?.confirm_password}
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
