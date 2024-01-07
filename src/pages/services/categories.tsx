import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';
import DataTable from 'react-data-table-component';

import { useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { fetchAllCategories } from '../../redux/slices/category';
import { Table } from '../../components/table';

export const ServiceCategories = () => {
  const dispatch = useDispatch<any>();
  const { categories } = useSelector((state: any) => state.Category);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllCategories({}));
  }, []);

  const columns = [
    {
      name: 'Service Categories',
      selector: 'Service Categories',
      width: '200px', // Specify the width here
      cell: (row: any) => (
        <div
        onClick={()=> navigate(`/services/${row?.id}`)}
        className="flex w-full cursor-pointer items-center space-x-2 font-semibold">
          <div className=""> {row?.name || 'N/A'}</div>
        </div>
      ),
      sortable: true,
    },
    // {
    //   name: 'No. of services',
    //   selector: 'No. of services',
    //   width: '200px', // Specify the width here
    //   cell: (row: any) => (
    //     <div className="flex w-full cursor-pointer items-center space-x-2 font-semibold">
    //       <div className=""> {row?.services || 'N/A'}</div>
    //     </div>
    //   ),
    //   sortable: true,
    // },
    {
      name: 'Profit on category',
      selector: 'Profit on category',
      width: '200px', // Specify the width here
      cell: (row: any) => (
        <div className="flex w-full cursor-pointer items-center space-x-2 font-semibold">
          <div className=""> {row?.percentage + '%' || 'N/A'}</div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Sales',
      selector: 'Sales',
      width: '200px', // Specify the width here
      cell: (row: any) => (
        <div className="flex w-full cursor-pointer items-center space-x-2 font-semibold">
          <div className=""> {row?.sales || 'N/A'}</div>
        </div>
      ),
      sortable: true,
    },
  ] as any;

  return (
    <DefaultLayout>
      <div className="space-y-6">
        <Table
          goBack={true}
          heading="Services Categories"
          columns={columns}
          data={categories}
          filterByDays={false}
          statusFilter={false}
          rateFilter={true}
          
        />
      </div>
    </DefaultLayout>
  );
};
