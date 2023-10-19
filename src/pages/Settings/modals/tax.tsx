import { InputWithLabel } from '../../../components/inputWithLabel';
import { useFormik } from 'formik';
import { FaTimes } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import * as Yup from 'yup';
import { BtnFilled } from '../../../components/button';
import { ModalComponent } from '../../../components/modal';
import { updateTaxes } from '../../../redux/slices/taxes';

export const TaxProfile = ({
  updateProfileModal,
  onUpdateProfileModal,
  defaultValue,
}) => {
  const dispatch = useDispatch<any>();

  const validationSchema = Yup.object({
    tax: Yup.string().required('Field is required'),
    delivery_charges: Yup.string().required('Field is required'),
  }); 
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      tax: defaultValue?.tax || '',
      delivery_charges: defaultValue?.delivery_charges || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('tax', values.tax);
      formData.append('delivery_charges', values.delivery_charges);
      formData.append('id', defaultValue?._id);
      dispatch(updateTaxes(formData));
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
                Edit Charges Information
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
                label="Tax"
                placeholder="Tax"
                type="number"
                name="tax"
                value={formik.values.tax}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.tax}
                touched={formik?.touched?.tax}
                style={true}
              />
            </div>
            <div className="w-8/12">
              <InputWithLabel
                label="Delivery Charges"
                placeholder="Delivery Charges"
                type="number"
                name="delivery_charges"
                value={formik.values.delivery_charges}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.delivery_charges}
                touched={formik?.touched?.delivery_charges}
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
