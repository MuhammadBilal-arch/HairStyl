import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaStar } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { fetchUsers } from '../../redux/slices/customers';
import { calculateAge } from '../../utils/functions';
import { ASSETS } from '../../images/path';
import { ToggleButton } from '../../components/toggle';
import { Table } from '../../components/table';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchAllProducts } from '../../redux/slices/products';

export const Products = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { products } = useSelector((state: any) => state.Products);


  useEffect(() => {
    dispatch(fetchAllProducts({}));
  }, []);

  const columns = [
    {
      name: 'Products',
      selector: 'Products',
      width: '250px', // Specify the width here
      cell: (row: any) => (
        <div
          // onClick={() =>
          //   navigate('/product-detail', {
          //     state: row,
          //   })
          // }
          className="flex w-full cursor-pointer items-center space-x-2 font-semibold"
        >
          <img
            src={row?.image || ASSETS.PROFILE.PROFILE_COVER}
            alt=""
            className="h-7 w-7 rounded-full object-cover"
          />
          <div className=""> {row?.name || 'Men beauty kit'}</div>
        </div>
      ),
      sortable: true,
    },
    {
      name: 'Product of shop',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row.product || 'Circle Saloons'}
        </div>
      ),
    },
    {
      name: 'Price',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {`€${row.price}` || '€40'}
        </div>
      ),
    },
    {
      name: 'Sales',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row.sales || 'N/A'}
        </div>
      ),
    },
  ] as any;

  return (
    <DefaultLayout>
      <Table
        goBack={false}
        heading="Products"
        columns={columns}
        data={products}
        filterByDays={false}
        rateFilter={true}
      />
    </DefaultLayout>
  );
};
