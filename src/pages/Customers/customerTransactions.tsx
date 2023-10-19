import { useState, useEffect } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { PaginationComponent } from './pagination';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchTransactionsList } from '../../redux/slices/transactions';

export const TransactionsList = ({ customer }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<any>();

  const { transactions } = useSelector((state: any) => state.Transaction);

  useEffect(() => {
    const formData = new FormData();
    formData.append('customer_id', customer?._id);
    dispatch(fetchTransactionsList(formData));
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

  const columns = [
    {
      name: 'Transaction ID',
      selector: (row: any) => (
        <div
          onClick={() =>
            navigate('/order-details', {
              state: row,
            })
          }
          className="cursor-pointer"
        >
          {row?.transaction_id}
        </div>
      ),
    },
    {
      name: 'Date',
      selector: (row: any) => row?.createdAt,
    },
    {
      name: 'Customer',
      selector: (row: any) =>
        row?.customer_id?.fname + ' ' + row?.customer_id?.lname,
    },
    {
      name: 'Driver',
      selector: (row: any) =>
        row.driver_id
          ? row?.driver_id?.fname + ' ' + row?.driver_id?.lname
          : 'Not Assigned',
    },
    {
      name: 'Status',
      selector: (row: any) =>
        row?.order_id?.order_delivered
          ? 'Completed'
          : !row?.order_id?.order_status
          ? 'Cancelled'
          : 'In Progress',
    },
  ];

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const filteredData = transactions?.filter((row: any) =>
    row?.transaction_id?.toLowerCase()?.includes(searchValue?.toLowerCase())
  );

  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <div className="flex items-center justify-between bg-white px-5 py-5 pb-5">
        <h1 className="text-normal mt-5 font-semibold text-black-primary md:text-xl">
          Transactions
        </h1>
        <div className="flex space-x-2">
          <div className="flex h-8 items-center space-x-2 rounded-2xl border-2 border-black-primary border-opacity-30 bg-white px-2 text-sm">
            <FaSearch />
            <input
              id="search"
              placeholder="Search"
              onChange={handleSearchInputChange}
              className=" h-full text-base outline-none"
              type="text"
            />
          </div>
        </div>
      </div>

      <DataTable
        // title="Vehicle Management"
        columns={columns}
        data={paginatedData}
        pagination
        paginationServer
        paginationTotalRows={location?.state?.length}
        paginationDefaultPage={currentPage}
        paginationComponent={(props) => (
          <PaginationComponent
            paginationProps={props}
            setPage={setCurrentPage}
            setRowsPerPage={setRowsPerPage}
            rowsPerPage={rowsPerPage}
          />
        )}
        fixedHeader
        onChangePage={handlePageChange}
        customStyles={customStyles}
      />
    </div>
  );
};
