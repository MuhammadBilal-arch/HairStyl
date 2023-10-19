import { useLocation, useNavigate } from 'react-router-dom';
import DefaultLayout from '../../layout/DefaultLayout';
import { InventoryCards } from '../../components/Inventory/Cards';
import { AiOutlinePlus } from 'react-icons/ai';
import { EditCategoryCards } from '../../components/Inventory/EditCategory';
import { ModalComponent } from '../../components/modal';
import { useState, useEffect } from 'react';
import { FaLongArrowAltLeft, FaTimes } from 'react-icons/fa';

import { BtnFilled, PurpleOutlineBtn } from '../../components/button';
import { InputWithLabelBorderBottom } from '../../components/inputWithLabel';
import { ASSETS } from '../../images/path';
import { BiImageAdd } from 'react-icons/bi';
import { useDispatch } from 'react-redux';
import {
  fetchAllProducts,
  onAddProduct,
  onDeleteProduct,
  onUpdateProduct,
} from '../../redux/slices/products';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { onUpdateCategory } from '../../redux/slices/category';
import { BASE_URL } from '../../utils/urls';

export const EditInventory = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const location = useLocation();
  const { products } = useSelector((state: any) => state?.Products);

  const [ItemModal, setItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [image, setimage] = useState<any>();
  const [uploadedImg, setUploadedImg] = useState<any>();
  const [selectItemData, setSelectItemData] = useState();
  const [editing, setEditing] = useState(false);

  const [categoryName, setCategoryName] = useState(location?.state?.name);

  useEffect(() => {
    const payload = {
      dispensary: location?.state?.dispensary,
      category: location?.state?.category,
    };
    dispatch(fetchAllProducts(payload));
  }, []);

  const onUploadImage = (e: any) => {
    e.preventDefault();
    var file = e.target.files[0];
    setimage(file);
    console.log('called');
    setUploadedImg(URL.createObjectURL(file));
  };

  const onSelectDeleteItem = (item: any) => {
    setSelectItemData(item);
    setItemModal(!ItemModal);
  };

  const onDeleteItem = () => {
    const formData = new FormData();
    formData.append('id', selectItemData?._id);
    formData.append('dispensary', selectItemData?.dispensary);
    formData.append('category', selectItemData?.category);
    dispatch(onDeleteProduct(formData));
    setItemModal(!ItemModal);
  };
  const validationSchema = Yup.object({
    // email: Yup.string()
    //   .email('Invalid email address')
    //   .required('Email is required'),
    // password: Yup.string().required('Password is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: selectItemData?.name || '',
      description: selectItemData?.description || '',
      amount: selectItemData?.amount || '',
      quantity: selectItemData?.quantity || '',
      unit: selectItemData?.unit || '',
      image: selectItemData?.image || '',
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log(values);

      let data = new FormData();
      data.append('name', values.name);
      data.append('description', values.description);
      data.append('amount', values.amount);
      data.append('unit', values.amount);
      data.append('quantity', values.quantity);
      if (values.image) {
        data.append('image', values.image);
      }
      data.append('dispensary', location?.state?.dispensary);
      data.append('category', location?.state?.category);

      if (editing) {
        data.append('id', selectItemData._id);
        setEditing(false);
        dispatch(onUpdateProduct(data));
      } else {
        dispatch(onAddProduct(data));
      }

      setShowEditItemModal(!showEditItemModal);
    },
  });

  const EditItemModalContent = (
    <form
      onSubmit={formik.handleSubmit}
      className="z-50 mx-auto flex flex-col space-y-4  rounded-xl bg-grey-modal py-4 text-black-primary "
    >
      <div className="space-y-1.5">
        <div className="flex w-full items-center justify-between px-4">
          <h1 className="text-black w-full text-sm font-bold md:text-base">
            {editing ? 'Edit Item: Flower' : 'Add Product'}
          </h1>
          <FaTimes
            className="cursor-pointer"
            onClick={() => setShowEditItemModal(!showEditItemModal)}
          />
        </div>
        <div className="border-black w-full border  border-dotted"></div>
      </div>
      <div className="space-y-2 px-4">
        <div className="space-y-1">
          <label
            htmlFor="details"
            className="text-black w-full text-sm font-bold md:text-base "
          >
            Product Name
          </label>
          <input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            // errors={formik?.errors?.name}
            // touched={formik?.touched?.name}
            className="w-full  rounded-md border border-grey-primary bg-transparent p-3 outline-none"
          />
        </div>
        <div className="space-y-1">
          <label
            htmlFor="details"
            className="text-black w-full text-sm font-bold md:text-base "
          >
            Product Description
          </label>
          <textarea
            rows={3}
            name="description"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full  rounded-md border border-grey-primary bg-transparent p-3 outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="details"
            className="text-black w-full text-sm font-bold md:text-base"
          >
            Product Details
          </label>
          <div className="grid grid-cols-3 space-x-10">
            <div className="">
              <InputWithLabelBorderBottom
                label="Quality*"
                placeholder="Quantity"
                type="text"
                name="quantity"
                value={formik.values.quantity}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={true}
              />
            </div>
            <div className="">
              <InputWithLabelBorderBottom
                label="Unit"
                placeholder="Unit Name e.g 'gram'"
                type="text"
                name="unit"
                value={formik.values.unit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={true}
              />
            </div>
            <div className="">
              <InputWithLabelBorderBottom
                label="Amount"
                placeholder="Amount"
                type="number"
                name="amount"
                value={formik.values.amount}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                style={true}
              />
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-black w-full text-sm font-bold md:text-base">
            Product Image
          </h1>
          <div>
            <label
              htmlFor="product-image"
              className="overflow-hidden rounded-md "
            >
              {!uploadedImg ? (
                <div className="flex h-28 w-28  items-center justify-center bg-[#D9D9D9]">
                  <BiImageAdd className="text-6xl" />
                </div>
              ) : (
                <div className="relative h-28 w-28 group cursor-pointer">
                  <img
                    src={uploadedImg}
                    alt=""
                    className="h-28 w-28 absolute left-0 top-0 bg-grey-primary bg-opacity-20 "
                  />
                  <div className="hidden group-hover:flex h-28 w-28 absolute left-0 top-0 z-10  items-center justify-center bg-[#D9D9D9]">
                    <BiImageAdd className="text-6xl" />
                  </div>
                </div>
              )}
            </label>
            <input
              type="file"
              id="product-image"
              accept="image/*"
              onChange={(e: any) => {
                formik?.setFieldValue('image', e?.target.files[0]);
                onUploadImage(e);
              }}
              className="hidden"
            />
          </div>
        </div>

        <div className="flex items-end justify-end space-x-2 px-4">
          <PurpleOutlineBtn
            text="Cancel"
            onClick={() => setShowEditItemModal(!showEditItemModal)}
          />
          <BtnFilled
            background="bg-purple-primary"
            color="text-white"
            round="2xl"
            text="Save"
            // onClick={() => setShowEditItemModal(!showEditItemModal)}
          />
        </div>
      </div>
    </form>
  );

  const ItemModalContent = (
    <div className="z-50 mx-auto flex flex-col space-y-4  rounded-xl bg-grey-modal py-5">
      <div className="flex w-full items-center justify-between px-4">
        <h1 className="text-black w-full text-sm font-bold md:text-base">
          Delete {selectItemData?.name}
        </h1>
        <FaTimes
          className="cursor-pointer"
          onClick={() => setItemModal(!ItemModal)}
        />
      </div>
      <div className="border-black w-full border  border-dotted"></div>
      <div className="flex w-full flex-col space-y-3 px-4 text-sm font-semibold">
        <div className="text-black font-bold">
          Are you sure want to delete {selectItemData?.name}?
        </div>
        <div>Qty: #{selectItemData?.quantity || 0} in Stock</div>
      </div>
      <div className="flex items-end justify-end space-x-2 px-4">
        <BtnFilled
          background="bg-white"
          color="text-black"
          round="md"
          text="Cancel"
          onClick={() => setItemModal(!ItemModal)}
        />
        <BtnFilled
          background="bg-red-delete"
          color="text-white"
          text="Delete"
          round="md"
          onClick={onDeleteItem}
        />
      </div>
    </div>
  );

  const onOpenAddItemModal = () => {
    setSelectItemData('');
    setUploadedImg('');
    setShowEditItemModal(!showEditItemModal);
    setEditing(false);
  };

  const onChangeCategoryName = () => {
    const formData = new FormData();
    formData.append('dispensary', location.state.dispensary);
    formData.append('id', location.state.category);
    formData.append('name', categoryName);
    dispatch(onUpdateCategory(formData));
  };
  return (
    <DefaultLayout>
      <ModalComponent
        style="w-10/12 md:w-1/2 xl:w-1/3 mx-auto rounded-xl mx-auto absolute right-0 left-0 top-[15%] overflow-hidden"
        content={ItemModalContent}
        modal={ItemModal}
        onModalStatus={() => setItemModal(!ItemModal)}
      />
      <ModalComponent
        style="w-10/12 md:w-1/2 xl:w-1/2 mx-auto rounded-xl mx-auto absolute right-0 left-0 top-[10%] overflow-hidden"
        content={EditItemModalContent}
        modal={showEditItemModal}
        onModalStatus={() => setShowEditItemModal(!showEditItemModal)}
      />

      <div className="space-y-6">
        <div
          className="flex cursor-pointer items-center space-x-2 text-black-primary"
          onClick={() => navigate(-1)}
        >
          <FaLongArrowAltLeft /> <span>Back</span>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="text-normal text-xl font-semibold text-black-primary md:text-2xl">
            Edit Category: {categoryName}
          </h1>
          <button
            onClick={onChangeCategoryName}
            className="flex h-full items-center rounded-3xl border-2 border-purple-primary px-4 py-1 text-sm font-semibold text-purple-primary"
          >
            Save Changes
          </button>
        </div>
        <div className="flex w-48 flex-col space-y-1">
          <label className="text-sm font-semibold text-black-2">
            Category Name
          </label>
          <input
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
            type="text"
            className="h-7 rounded-sm border-none bg-white px-2 shadow-equal shadow-graydark outline-none"
          />
        </div>
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <h1 className="text-normal space-x-1 font-semibold text-black-primary md:text-xl">
              <span>Items</span>
              <span className="text-grey-primary">({products?.length})</span>
            </h1>
            <button
              onClick={onOpenAddItemModal}
              className="flex h-full items-center space-x-1 rounded-md bg-purple-primary px-4 py-1.5 text-sm text-white"
            >
              <AiOutlinePlus />
              <span>Add New Items</span>
            </button>
          </div>
          <div className="space-y-2.5 py-5">
            {products?.map((item: any, index: any) => (
              <EditCategoryCards
                key={index}
                onClick={() => {
                  setSelectItemData(item);
                  setUploadedImg(`${BASE_URL}/${item?.image}`);
                  setEditing(true);
                  setShowEditItemModal(!showEditItemModal);
                }}
                title={item?.name}
                image={item?.image}
                item={item}
                amount={item?.amount}
                quantity={item?.quantity}
                onDelete={() => onSelectDeleteItem(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
