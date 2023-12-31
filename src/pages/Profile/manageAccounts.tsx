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

export const ManageAccounts = () => {
  const dispatch = useDispatch<any>();
  const { admins } = useSelector((state: any) => state.Admins);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAdmins({}));
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

  const onChangeStatus = (user: any) => {
    dispatch(
      onUpdateAdminStatus({
        _id: user.id,
        status: user.status == 0 ? 1 : 0,
      })
    );
  };

  const columns = [
    {
      name: 'Account name',
      selector: 'Account name',
      width: '200px', // Specify the width here
      cell: (row: any) => (
        <div className="flex w-full cursor-pointer items-center space-x-2 font-semibold">
          <img
            src={ASSETS.AUTH.SIGN_IN_COVER}
            alt=""
            className="h-7 w-7 rounded-full object-cover"
          />
          <div className=""> {row?.name || 'Ray'}</div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row?.email || 'adil@gmail.com'}
        </div>
      ),
    },
    {
      name: 'Username',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row.name || 'Adil'}
        </div>
      ),
    },
    {
      name: 'Password',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row?.password?.length > 10
            ? row?.password?.substring(0, 10).concat('...')
            : '1231231'}
        </div>
      ),
    },
    {
      name: 'Access ON / OFF',
      selector: (row: any) => (
        <div className="flex items-center space-x-4">
          <ToggleButton
            onChangeStatus={() => onChangeStatus(row)}
            status={row.status == 0 ? false : true}
            text=""
            id={row.id}
          />
          <div className="cursor-pointer">
            <RiDeleteBin6Line onClick={() => onDeleteAdmin(row)} />
          </div>
        </div>
      ),
    },
  ] as any;

  const validationSchema = Yup.object({
    personal_name: Yup.string().required('Field is required'),
    email: Yup.string().required('Field is required'),
    account_name: Yup.string().required('Field is required'),
    password: Yup.string().required('Field is required'),
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      personal_name: '',
      email: '',
      account_name: '',
      password: '',
    },
    validationSchema,
    onSubmit: async (values) => { 
      const payload = {
        name: values.personal_name,
        email: values.email,
        password: values.password,
        account_name: values.account_name,
      };
      const result = await API_HANDLER('POST', END_POINTS.ADMINS.ADD, payload);
      if (result?.data?.status == 'success') {
        dispatch(fetchAdmins({}));
        showToast(result.data.message, TOAST_TYPE.success);
      }
    },
  });

  const onDeleteAdmin = async (user: any) => {
    const result = await API_HANDLER(
      'GET',
      END_POINTS.ADMINS.DELETE + '/' + user.id,
      {}
    );
    if (result?.data?.status == 'success') {
      dispatch(fetchAdmins({}));
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
            <span>Manage Accounts</span>
          </h1>
        </div>

        <DataTable
          className="font-semibold text-black-primary"
          columns={columns}
          data={admins}
          fixedHeader
          customStyles={customStyles}
        />

        <form onSubmit={formik.handleSubmit} className="space-y-10">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex w-full items-center justify-between md:col-span-2">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                + Add Account
              </h1>
            </div>
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
              label="Email"
              placeholder="Type email"
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
              label="Username"
              placeholder="Type user name"
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
              label="Password"
              placeholder="Type password"
              type="password"
              name="password"
              value={formik?.values?.password}
              onChange={formik?.handleChange}
              onBlur={formik?.handleBlur}
              errors={formik?.errors?.password}
              touched={formik?.touched?.password}
              style={true}
            />
          </div>
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
