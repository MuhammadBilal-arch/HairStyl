import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';
import DataTable from 'react-data-table-component';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { ASSETS } from '../../images/path';
import { useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';
import { ToggleButton } from '../../components/toggle';
import { InputWithLabel } from '../../components/inputWithLabel';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import ChartTwo from '../../components/ChartTwo';
import { ChartLine } from '../../components/ChartLine';
import { API_HANDLER, showToast } from '../../utils/functions';
import { END_POINTS } from '../../utils/endpoints';
import { fetchAdmins, onUpdateAdminStatus } from '../../redux/slices/admins';
import { useDispatch } from 'react-redux';
import { TOAST_TYPE } from '../../utils/constants';
import { fetchAllCategories, onUpdateCategoryStatus } from '../../redux/slices/category';

export const Categories = () => {
  const dispatch = useDispatch<any>();
  const { categories } = useSelector((state: any) => state.Category);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCategories({}));
  }, []);

  const customStyles = {
    rows: {
      style: {
        minHeight: '45px', // override the row height
        padding: '4px 0',
      },
    },
    headCells: {
      style: {
        paddingLeft: '20px', // override the cell padding for head cells
        paddingRight: '20px',
      },
    },
    cells: {
      style: {
        paddingLeft: '20px', // override the cell padding for data cells
        paddingRight: '20px',
      },
    },
  };

  const onChangeStatus = (category: any) => {
    dispatch(
      onUpdateCategoryStatus({
        _id: category.id,
        status: category.status == 0 ? 1 : 0,
      })
    );
  };

  const columns = [
    {
      name: 'Categories Added',
      selector: 'Categories Added',
      width: '200px', // Specify the width here
      cell: (row: any) => (
        <div className="flex w-full cursor-pointer items-center space-x-2 font-semibold">
          <div className=""> {row?.name || 'Ray'}</div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Profit on category',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          <select
            className="focus-none w-32 border border-[#DFDFDF] py-1 px-2 text-center outline-none"
            defaultValue={row?.percentage}
          >
            {[
              5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85,
              90, 95, 100,
            ].map((item, index) => (
              <option key={index} value={item}>
                {item} %
              </option>
            ))}
          </select>
        </div>
      ),
    },
    {
      name: 'Hide / Unhide',
      selector: (row: any) => (
        <div className="flex items-center space-x-4">
          <ToggleButton
            onChangeStatus={() => onChangeStatus(row)}
            status={row.status == 0 ? false : true}
            text=""
            id={row.id}
          />
        </div>
      ),
    },
    {
      name: 'Delete',
      selector: (row: any) => (
        <div className="cursor-pointer">
          <RiDeleteBin6Line onClick={() => onDeleteCategory(row)} />
        </div>
      ),
    },
  ] as any;

  const validationSchema = Yup.object({
    category_name: Yup.string().required('Field is required'),
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      category_name: '',
      percent: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        name: values.category_name,
        percentage: values.percent || 0,
      };
      const result = await API_HANDLER(
        'POST',
        END_POINTS.CATEGORIES.ADD,
        payload
      );
      if (result?.data?.status == 'success') {
        dispatch(fetchAdmins({}));
        showToast(result.data.message, TOAST_TYPE.success);
        dispatch(fetchAllCategories({}));
      }
    },
  });

  const onDeleteCategory = async (category: any) => {
    const result = await API_HANDLER(
      'GET',
      END_POINTS.CATEGORIES.DELETE + '/' + category.id,
      {}
    );
    if (result?.data?.status == 'success') {
      dispatch(fetchAllCategories({}));
      showToast(result.data.message, TOAST_TYPE.success);
    }
  };

  return (
    <DefaultLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <h1
            onClick={() => navigate(-1)}
            className="text-normal flex items-center space-x-2 font-semibold text-black-primary md:text-xl"
          >
            <FaArrowLeft className="text-lg font-normal" />
            <span>Categories</span>
          </h1>
        </div>
        <h1
            className="text-normal mt-5 flex items-center space-x-2 font-semibold text-black-primary md:text-base"
          >
            <span>All Categories</span>
          </h1>

        <DataTable
          className="font-semibold text-black-primary"
          columns={columns}
          data={categories}
          fixedHeader
          customStyles={customStyles}
        />

        <form onSubmit={formik.handleSubmit} className="space-y-10">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex w-full items-center justify-between md:col-span-3">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                + Add New Category
              </h1>
            </div>
            <InputWithLabel
              label="Category Name"
              placeholder="Enter Category Name"
              type="text"
              name="category_name"
              value={formik?.values?.category_name}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.category_name}
              touched={formik?.touched?.category_name}
              style={true}
            />
            <div className="flex flex-col space-y-2 w-full">
              <label
                htmlFor="percent"
                className={`text-sm font-semibold ${'text-black-primary'}`}
              >
                Profit on Category
              </label>
              <select
                id="percent"
                name="percent"
                value={formik?.values?.percent}
                onChange={formik?.handleChange}
                onBlur={formik?.handleBlur}
                className="focus-none min-w-32 border border-[#DFDFDF] py-2 px-5 text-center outline-none"
              >
                {[
                  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80,
                  85, 90, 95, 100,
                ].map((item, index) => (
                  <option key={index} value={item}>
                    {item} %
                  </option>
                ))}
              </select>
            </div>
            <div className='w-full space-y-1'>
              <div className='text-transparent'>asd</div>
              <button
                type="submit"
                className="h-9 w-full bg-black-primary px-4 py-1.5 text-center text-white"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};
