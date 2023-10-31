import { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { PaginationComponent } from './pagination';

import { ASSETS } from '../../images/path';
import { BsFilter } from 'react-icons/bs';

export const Table = ({ heading, columns, data, filterByDays }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const location = useLocation();
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [filterActive, setFilterActive] = useState('All time');

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

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const filteredData = data?.filter(
    (row: any) =>
      row?.email?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
      row?.fname?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
      row?._id == searchValue
  );

  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  return (
    <div>
      <div className="flex items-start justify-between">
        <h1 className="text-normal flex items-center space-x-2 font-semibold text-black-primary md:text-xl">
          <FaArrowLeft className="text-lg font-normal" /> <span>{heading}</span>
        </h1>
        {filterByDays && ( 
          <div className="flex h-8 items-center space-x-6  border-b border-gray-normal text-sm font-medium md:text-base">
            <div
              className={`${
                filterActive === 'All time'
                  ? 'mt-0.5 h-full border-b-2 border-black-primary'
                  : 'mt-0.5 h-full border-b-2 border-transparent'
              }`}
            >
              All time
            </div>
            <div
              className={`${
                filterActive === '30 days'
                  ? 'mt-0.5 h-full border-b-2 border-black-primary'
                  : 'mt-0.5 h-full border-b-2 border-transparent'
              }`}
            >
              30 days
            </div>
            <div
              className={`${
                filterActive === '7 days'
                  ? 'mt-0.5 h-full border-b-2 border-black-primary'
                  : 'mt-0.5 h-full border-b-2 border-transparent'
              }`}
            >
              7 days
            </div>
            <div
              className={`${
                filterActive === '24 days'
                  ? 'mt-0.5 h-full border-b-2 border-black-primary'
                  : 'mt-0.5 h-full border-b-2 border-transparent'
              }`}
            >
              24 days
            </div>
            <div
              className={`${
                filterActive === 'filter'
                  ? 'mt-2 h-full border-b-2 border-black-primary'
                  : 'mt-2 h-full border-b-2 border-transparent'
              }`}
            >
              <img src={ASSETS.ICONS.FILTER} alt="" />
            </div>
          </div>
        )}
      </div>
      <div className="items-center flex justify-between py-5">
        <div className="flex space-x-2">
          <button className="flex items-center space-x-2 bg-gray-xl py-1 px-4 font-semibold text-gray-base">
            <span>All</span>
            <FaTimes />
          </button>
          <button className="spaace-x-2 flex items-center space-x-2 border border-gray-normal px-4">
            <BsFilter />
            <span>More filters</span>
          </button>
        </div>
        <div className="flex h-8 items-center space-x-2 border border-black-primary border-opacity-30 bg-white px-4 text-sm">
          <FaSearch className="text-black-primary text-opacity-30" />
          <input
            id="search"
            placeholder="Search"
            onChange={handleSearchInputChange}
            className=" h-full text-sm font-semibold placeholder-black-primary placeholder-opacity-30 outline-none"
            type="text"
          />
        </div>
      </div>

      <DataTable
        // title="Vehicle Management"
        className="font-semibold text-black-primary"
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
        selectableRows
        // selectedRows={selectedRows}
        onSelectedRowsChange={({ selectedRows }) =>
          setSelectedRows(selectedRows)
        }
      />
    </div>
  );
};
