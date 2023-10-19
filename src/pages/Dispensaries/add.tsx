import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import ReactGoogleAutocomplete from 'react-google-autocomplete';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { InputWithLabelBorderBottom } from '../../components/inputWithLabel';

import DefaultLayout from '../../layout/DefaultLayout';
import { onRegisterDispensary } from '../../redux/slices/dispensaries';
import { useDispatch } from 'react-redux';
import { BiImageAdd } from 'react-icons/bi';

const GOOGLE_API = 'AIzaSyB4rhPN6CCk7S80itxLaDM8_EQfHuZprVQ';
export const AddDispensary = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const [uploadedImg, setUploadedImg] = useState<any>();
  const [dispensaryStatus, setDispensaryStatus] = useState<any>(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      location: '',
      state: '',
      city: '',
      lat: '',
      lng: '',
      street: '',
      phone: '',
      email: '',
      zipCode: '',
      unit: '',
      image: '',
      description: '',
      password: '',
    },
    validationSchema: Yup.object({}),

    onSubmit: async (values) => {
      const data = new FormData();

      data.append('name', values?.name);
      data.append('description', values.description);
      data.append('location', values.location);
      data.append('street', values.street);
      data.append('state', values.state);
      data.append('city', values.city);
      if (values.unit) {
        data.append('unit', values.unit);
      }

      data.append('zipCode', values.zipCode);

      data.append('phone', values.phone);
      data.append('longitude', values.lng);
      data.append('latitude', values.lat);
      data.append('email', values.email);
      data.append('password', values?.password);
      data.append('delivery_time', '25 to 30 mints');
      data.append('image', values?.image);
      data.append('rating', '5');
      data.append('status', dispensaryStatus);

      dispatch(onRegisterDispensary(data));
    },
  });

  const handlePlaceSelected = (place: any) => {
    if (place) {
      console.log(place);
      const { geometry } = place;

      const { location } = geometry;
      const { lat, lng } = location;
      console.log('Latitude:', lat());
      console.log('Longitude:', lng());
      console.log(place?.formatted_address);
      formik.setFieldValue('location', place?.formatted_address);
      formik.setFieldValue('lat', lat());
      formik.setFieldValue('lng', lng());
      const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat()},${lng()}&key=${GOOGLE_API}`;

      fetch(geocodingUrl)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.status === 'OK' && data.results.length > 0) {
            const result = data.results[0];
            // Extract desired information from the result object
            // const formattedAddress = result.formatted_address;
            const street = result.address_components.find((component:any) =>
              component.types.includes('route')
            )?.long_name;
            const city = result.address_components.find((component:any) =>
              component.types.includes('locality')
            )?.long_name;
            const state = result.address_components.find((component:any) =>
              component.types.includes('administrative_area_level_1')
            )?.long_name;
            const postalCode = result.address_components.find((component:any) =>
              component.types.includes('postal_code')
            )?.long_name;

            formik.setFieldValue('street', street);
            formik.setFieldValue('city', city);
            formik.setFieldValue('state', state);
            formik.setFieldValue('zipCode', postalCode);
          } else {
            console.error('Error fetching location details:', data.status);
          }
        })
        .catch((error) => {
          console.error('Error fetching location details:', error);
        });
    } else {
      console.log(place, '2');
    }
  };

  const onUploadImage = (e: any) => {
    e.preventDefault();
    var file = e.target.files[0];
    formik.setFieldValue('image', file);
    setUploadedImg(URL.createObjectURL(file));
  };

  const onChangeDispensaryStatus = (e:any) => {
    console.log(e.target.value);
    setDispensaryStatus(!dispensaryStatus);
  };

  return (
    <DefaultLayout>
      <div className="space-y-4 px-4">
        <div
          className="flex cursor-pointer items-center space-x-2 text-black-primary"
          onClick={() => navigate(-1)}
        >
          <FaLongArrowAltLeft /> <span>Back</span>
        </div>
        <div className="">
          <div className="space-y-6">
            <div className="flex flex-col">
              <h1 className="text-normal space-x-1 font-semibold text-black-primary md:text-xl">
                Create New Dispensary
              </h1>
            </div>

            <form onSubmit={formik.handleSubmit} className="space-y-6">
              <div className="grid w-full grid-cols-2 gap-y-2 gap-x-12">
                <InputWithLabelBorderBottom
                  label="Dispensary"
                  placeholder="Enter Dispensary Name"
                  type="text"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={false}
                />
                <InputWithLabelBorderBottom
                  label="Description"
                  placeholder="Enter Description"
                  type="text"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={false}
                />
                <InputWithLabelBorderBottom
                  label="Email"
                  placeholder="Enter Email"
                  type="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={false}
                />
                <InputWithLabelBorderBottom
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={false}
                />
                <InputWithLabelBorderBottom
                  label="Phone"
                  placeholder="Enter Phone"
                  type="number"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  style={false}
                />
              </div>
              <div className="space-y-4">
                <h1 className="w-full text-sm font-bold text-black-2 md:text-base">
                  Address Information
                </h1>
                <div className="grid w-full grid-cols-2 gap-y-2 gap-x-12">
                  <div className="flex flex-col space-y-1">
                    <label
                      className="text-sm 
                  text-gray-transparent
                "
                    >
                      Address
                    </label>
                    <ReactGoogleAutocomplete
                      apiKey={GOOGLE_API}
                      onPlaceSelected={handlePlaceSelected}
                      className="border-b border-grey-primary bg-transparent py-2 text-sm placeholder-black-primary outline-none"
                    />
                  </div>
                  <InputWithLabelBorderBottom
                    label="Street"
                    placeholder="Enter Address"
                    type="text"
                    name="street"
                    value={formik.values.street}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    style={false}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <InputWithLabelBorderBottom
                      label="State"
                      placeholder="Enter State"
                      type="text"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={false}
                    />
                    <InputWithLabelBorderBottom
                      label="City"
                      placeholder="Enter City"
                      type="text"
                      name="name"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={false}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <InputWithLabelBorderBottom
                      label="Zip Code"
                      placeholder="Enter ZipCode"
                      type="text"
                      name="zipCode"
                      value={formik.values.zipCode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={false}
                    />

                    <InputWithLabelBorderBottom
                      label="Unit (Optional)"
                      placeholder="Enter Unit"
                      type="text"
                      name="unit"
                      value={formik.values.unit}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={false}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <InputWithLabelBorderBottom
                      label="Latitude"
                      placeholder="Enter latitude"
                      type="text"
                      name="lat"
                      value={formik.values.lat}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={false}
                    />
                    <InputWithLabelBorderBottom
                      label="Longitude"
                      placeholder="Enter Longitude"
                      type="text"
                      name="lng"
                      value={formik.values.lng}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      style={false}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 items-end gap-3">
                <div className="space-y-4">
                  <h1 className="w-full text-sm font-bold text-black-2 md:text-base">
                    Store Front Image
                  </h1>
                  <div>
                    <label
                      htmlFor="product-image"
                      className="overflow-hidden rounded-md "
                    >
                      {!uploadedImg ? (
                        <div className="flex h-32 w-32  items-center justify-center bg-[#D9D9D9]">
                          <BiImageAdd className="text-6xl" />
                        </div>
                      ) : (
                        <img
                          src={uploadedImg}
                          alt=""
                          className="h-32 w-32 bg-grey-primary bg-opacity-20 object-contain "
                        />
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
                <div className="flex flex-col space-y-4">
                  <div className=" flex flex-col space-y-2 pt-4">
                    <div className="relative mr-2 inline-block w-10 select-none align-middle transition duration-200 ease-in">
                      <input
                        onChange={onChangeDispensaryStatus}
                        type="checkbox"
                        name="toggle"
                        id="toggle"
                        checked={dispensaryStatus}
                        className="toggle-checkbox absolute block h-6 w-6 cursor-pointer appearance-none rounded-full border-4 bg-gray-extraLight"
                      />
                      <label
                        htmlFor="toggle"
                        className="toggle-label block h-6 cursor-pointer overflow-hidden rounded-full bg-gray-text"
                      ></label>
                    </div>
                    {dispensaryStatus ? (
                      <label
                        htmlFor="toggle"
                        className="text-sm font-bold text-green-base"
                      >
                        Account is Active
                      </label>
                    ) : (
                      <label
                        htmlFor="toggle"
                        className="text-sm font-bold text-gray-transparent"
                      >
                        Account is Inactive
                      </label>
                    )}
                  </div>
                </div>
                <div className="mt-4 flex items-center justify-end">
                  <button
                    disabled={!formik.dirty ? true : false}
                    type="submit"
                    className={`h-10 w-32  rounded-md ${
                      !formik.dirty
                        ? 'bg-gray-transparent'
                        : 'bg-purple-primary'
                    } font-medium text-white sm:font-semibold`}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
