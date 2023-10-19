import React from "react";
import { FaTimes } from "react-icons/fa";
import { useFormik } from "formik";
import * as Yup from "yup";

import axios from "axios";
import { useDispatch } from "react-redux";
import { ModalComponent } from "../../../components/modal";
import { InputWithLabel } from "../../../components/inputWithLabel";
import { onUpdateUserDispensaryInfo } from "../../../redux/slices/user/user";


export const AddressModal = ({
  setModalNewAddress,
  modalNewAddress,
  defaultValue,
  edit,
}) => {
  const dispatch = useDispatch();
  const validationSchema = Yup.object({
    street: Yup.string().required("street is required"),
    unit: Yup.string().required("street is required"),
    city: Yup.string().required("street is required"),
    state: Yup.string().required("street is required"),
    zipCode: Yup.string().required("street is required"),
    label: Yup.string().required("street is required"),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      street: defaultValue?.dispensary?.street || "",
      unit: defaultValue?.dispensary?.unit || "",
      city: defaultValue?.dispensary?.city || "",
      state: defaultValue?.dispensary?.state || "",
      zipCode: defaultValue?.dispensary?.zipCode || "",
      label: defaultValue?.dispensary?.location || "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        const { street, unit, city, state, zipCode } = values;

        // Replace 'YOUR_GOOGLE_MAPS_API_KEY' with your actual API key
        const apiKey = 'AIzaSyB4rhPN6CCk7S80itxLaDM8_EQfHuZprVQ'
        const fullAddress = `${street} ${unit}, ${city}, ${state} ${zipCode}`;
        const encodedAddress = encodeURIComponent(fullAddress);

        const geocodingEndpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${apiKey}`;

        axios
          .get(geocodingEndpoint)
          .then(async (response) => {
            if (response.data.results.length > 0) {
              const { lat, lng } = response.data.results[0].geometry.location;
              const formData = new FormData();
              formData.append("street", values.street);
              formData.append("unit", values.unit);
              formData.append("state", values.state);
              formData.append("city", values.city);
              formData.append("zipCode", values.zipCode);
              formData.append("location", values.label);
              formData.append("latitude", lat);
              formData.append("longitude", lng);
              formData.append("id", defaultValue?.dispensary?._id);
              dispatch(onUpdateUserDispensaryInfo(formData));
              setModalNewAddress(!modalNewAddress);
            } else {
              alert("Location not found");
            }
          })
          .catch((error) => {
            console.error("Error fetching geolocation:", error);
          });
      } catch (error:any) {
        console.error("Geocoding failed. Error:", error.message);
      }
    },
  });

  return (
    <ModalComponent
      style="w-10/12 md:w-1/2 xl:w-1/3 mx-auto rounded-xl mx-auto absolute right-0 left-0 top-[15%] overflow-hidden"
      modal={modalNewAddress}
      onModalStatus={() => setModalNewAddress(!modalNewAddress)}
      content={
        <form
          onSubmit={formik.handleSubmit}
          className="mx-auto bg-gray-normal flex flex-col items-center justify-center space-y-4 py-5 rounded-xl "
        >
          <div className="flex items-center justify-between w-full px-10">
            <h1 className="font-bold w-full text-black-dark text-base md:text-lg">
              {edit ? "Update Address" : "Add New Address"}
            </h1>
            <FaTimes
              className="cursor-pointer"
              onClick={() => setModalNewAddress(!modalNewAddress)}
            />
          </div>
          <div className="border border-gray-text  w-full"></div>
          <div className="space-y-3 w-full px-10">
            <div className="grid grid-cols-4 gap-2">
              <div className="col-span-3">
                <InputWithLabel
                  label="Street Address"
                  placeholder="Enter Full Address"
                  type="text"
                  name="street"
                  value={formik.values.street}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errors={formik?.errors?.street}
                  touched={formik?.touched?.street}
                  style={true}
                />
              </div>
              <div>
                <InputWithLabel
                  label="Unit"
                  placeholder="#"
                  type="text"
                  name="unit"
                  value={formik.values.unit}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errors={formik?.errors?.unit}
                  touched={formik?.touched?.unit}
                  style={true}
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <InputWithLabel
                label="City"
                placeholder='e.g. "Network"'
                type="text"
                name="city"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.city}
                touched={formik?.touched?.city}
                style={true}
              />
              <InputWithLabel
                label="State"
                placeholder="e.g.'NJ'"
                type="text"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.state}
                touched={formik?.touched?.state}
                style={true}
              />
              <InputWithLabel
                label="ZIP code"
                placeholder="Zip code"
                type="number"
                name="zipCode"
                value={formik.values.zipCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                errors={formik?.errors?.zipCode}
                touched={formik?.touched?.zipCode}
                style={true}
              />{" "}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <InputWithLabel
                  label="Label"
                  placeholder="e.g. Home"
                  type="text"
                  name="label"
                  value={formik.values.label}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  errors={formik?.errors?.label}
                  touched={formik?.touched?.label}
                  style={true}
                />{" "}
              </div>
            </div>
          </div>
          <button className="bg-purple-base py-3 text-center text-white rounded-md mt-5 w-10/12">
            Update
          </button>
        </form>
      }
    />
  );
};
