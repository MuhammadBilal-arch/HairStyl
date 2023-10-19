import React, { useState, useEffect } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { CSVLink } from 'react-csv';
import { FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { PaginationComponent } from './pagination';

import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { fetchDispensariesList } from '../../redux/slices/dispensaries';

export const Dispensaries = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<any>();

  const { dispensaries } = useSelector((state: any) => state.Dispensaries);

  useEffect(() => {
    const payload = {
      accountType: 'DISPENSARY',
    };
    dispatch(fetchDispensariesList(payload));
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
      name: 'Dispensary Name',
      selector: (row: any) => (
        <div
          className="cursor-pointer text-purple-primary"
          onClick={() =>
            navigate('/dispensary-detail', {
              state: row.dispensary,
            })
          }
        >
          {row?.dispensary?.name}
        </div>
      ),
    },
    {
      name: 'Zip Code',
      selector: (row: any) => row?.dispensary?.zipCode,
    },
    {
      name: 'Email',
      selector: (row: any) => row?.email,
    },
    {
      name: 'Phone Number',
      selector: (row: any) => row?.dispensary?.phone,
    },
    {
      name: 'Status',
      selector: (row: any) =>
        row?.dispensary?.status ? (
          <div className="rounded-sm bg-green-light px-2 py-1 font-semibold text-green-base">
            • Active
          </div>
        ) : (
          <div className="rounded-sm bg-gray-disabled px-2 py-1 font-semibold text-gray-text">
            • Inactive
          </div>
        ),
    },
  ];

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const filteredData = dispensaries?.filter(
    (row: any) =>
      row?.email?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
      row?.dispensary?.name
        ?.toLowerCase()
        ?.includes(searchValue?.toLowerCase()) ||
      row?.dispensary?.zipCode
        ?.toLowerCase()
        ?.includes(searchValue?.toLowerCase()) ||
      row?.dispensary?.phone
        ?.toLowerCase()
        ?.includes(searchValue?.toLowerCase())
  );

  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  return (
    <DefaultLayout>
      <div>
        <div className="flex items-center justify-between pb-5">
          <h1 className="text-normal mt-5 font-semibold text-black-primary md:text-xl">
            Dispensaries
          </h1>
          <div className="flex space-x-2">
            <div className="flex h-10 items-center space-x-2 rounded-2xl border-2 border-black-primary border-opacity-30 bg-white px-2 text-sm">
              <FaSearch />
              <input
                id="search"
                placeholder="Search"
                onChange={handleSearchInputChange}
                className=" h-full text-base outline-none"
                type="text"
              />
            </div>
            <button
              onClick={() => navigate('/add-dispensary')}
              className="h-10 w-32  rounded-md bg-purple-primary font-medium text-white sm:font-semibold"
            >
              Create
            </button>
            {/* <CSVLink data={paginatedData}>Export to CSV</CSVLink> */}
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
    </DefaultLayout>
  );
};
