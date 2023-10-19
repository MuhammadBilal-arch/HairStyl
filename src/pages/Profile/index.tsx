import DefaultLayout from '../../layout/DefaultLayout';

import { ModalComponent } from '../../components/modal';
import { useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import { BiImageAdd } from 'react-icons/bi';

import { BtnFilled, PurpleOutlineBtn } from '../../components/button';
import { useSelector } from 'react-redux';
import { BASE_URL } from '../../utils/urls';
import { useDispatch } from 'react-redux';
import { onUpdateUserDispensaryInfo } from '../../redux/slices/user/user';

export const Profile = () => {
  const dispatch = useDispatch<any>();
  const { user } = useSelector((state: any) => state?.User);

  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [uploadedImg, setUploadedImg] = useState<any>(
    `${BASE_URL}/${user?.dispensary?.image}`
  );

  const descriptionRef = useRef(user?.dispensary?.description);

  const onUploadImage = (e: any) => {
    e.preventDefault();
    var file = e.target.files[0];

    setUploadedImg(URL.createObjectURL(file));
    const formData = new FormData();
    formData.append('id', user?.dispensary?._id);
    formData.append('image', file);
    dispatch(onUpdateUserDispensaryInfo(formData));
  };

  const onUpdateDescription = () => {
    const formData = new FormData();
    formData.append('id', user?.dispensary?._id);
    formData.append('description', descriptionRef?.current?.value);
    dispatch(onUpdateUserDispensaryInfo(formData));
    setShowEditItemModal(!showEditItemModal);
  };
  const ItemModalContent = (
    <div className="z-50 mx-auto flex flex-col space-y-4 rounded-xl  bg-grey-modal py-5 text-black-primary">
      <div className="flex w-full items-center justify-between px-4">
        <h1 className="text-black w-full text-sm font-bold md:text-base">
          Edit About Us
        </h1>
        <FaTimes
          className="cursor-pointer"
          onClick={() => setShowEditItemModal(!showEditItemModal)}
        />
      </div>
      <div className="border-black w-full border  border-dotted"></div>
      <div className="space-y-1 px-5">
        <label
          htmlFor="details"
          className="text-black w-full text-sm font-bold md:text-base "
        >
          Description
        </label>
        <textarea
          ref={descriptionRef}
          defaultValue={user?.dispensary?.description}
          placeholder="Please Enter Description"
          rows={4}
          className="w-full   rounded-md border border-none border-grey-primary bg-transparent bg-white p-3 outline-none"
        />
      </div>

      <div className="flex items-end justify-end space-x-2 px-4">
        <BtnFilled
          background="bg-white"
          color="text-black"
          round="md"
          text="Cancel"
          onClick={() => setShowEditItemModal(!showEditItemModal)}
        />
        <BtnFilled
          background="bg-purple-base"
          color="text-white"
          text="Save"
          round="md"
          onClick={onUpdateDescription}
        />
      </div>
    </div>
  );

  return (
    <DefaultLayout>
      <ModalComponent
        style="w-10/12 md:w-1/2 xl:w-1/3 mx-auto rounded-xl mx-auto absolute right-0 left-0 top-[15%] overflow-hidden"
        content={ItemModalContent}
        modal={showEditItemModal}
        onModalStatus={() => setShowEditItemModal(!showEditItemModal)}
      />
      <div className="space-y-8 text-black-primary">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h1 className="text-black w-full text-sm font-bold md:text-base">
              About Us
            </h1>
            <PurpleOutlineBtn
              text="Edit"
              icon={true}
              onClick={() => setShowEditItemModal(!showEditItemModal)}
            />
          </div>
          <p>{user?.dispensary?.description || 'No content added yet'}</p>
        </div>
        <div className="space-y-2">
          <h1 className="text-black w-full text-sm font-bold md:text-base">
            Store Front Image
          </h1>
          <div>
            <label
              htmlFor="product-image"
              className="group overflow-hidden rounded-md"
            >
              {!uploadedImg ? (
                <div className="flex h-36 w-56  items-center justify-center bg-[#D9D9D9]">
                  <BiImageAdd className="text-6xl" />
                </div>
              ) : (
                <div className='relative'>
                  <img
                    src={uploadedImg}
                    alt=""
                    className="h-36 w-56 absolute left-0 top-0 cursor-pointer bg-grey-primary bg-opacity-25 object-contain"
                  />
                  <div className="hidden absolute cursor-pointer left-0 top-0 z-50  h-36 w-56 items-center  justify-center bg-[#111111] bg-opacity-50 group-hover:flex">
                    <BiImageAdd className="text-6xl text-white" />
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
      </div>
    </DefaultLayout>
  );
};
