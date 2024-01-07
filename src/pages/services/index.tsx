import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Table } from '../../components/table';
import DefaultLayout from '../../layout/DefaultLayout';
import { fetchAllServices } from '../../redux/slices/services';

export const Services = () => {
  const navigate = useNavigate();
  const { id } = useParams()
  const dispatch = useDispatch<any>();
  const { services } = useSelector((state: any) => state.Services);

  useEffect(() => {
  
    dispatch(fetchAllServices({
      id: id
    }));
  }, []);

  const columns = [
    {
      name: 'Services',
      selector: 'Services',
      width: '250px', // Specify the width here
      cell: (row: any) => (
        <div className="font-semibold text-black-primary">{row?.name}</div>
      ),
      sortable: true,
    },
    {
      name: 'No. of shops offering this service',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {row.no_of_shops || 'N/A'}
        </div>
      ),
    },
    {
      name: 'Price',
      selector: (row: any) => (
        <div className="font-semibold text-black-primary">
          {`€${row.tokenAmount}` || '€0'}
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
        goBack={true}
        heading="Services"
        columns={columns}
        data={services}
        filterByDays={false}
        statusFilter={true}
        rateFilter={false}        
      />
    </DefaultLayout>
  );
};
