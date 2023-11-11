import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useLocation } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { PaginationComponent } from './pagination';

import { ASSETS } from '../../images/path';
import { BsFilter } from 'react-icons/bs';
import { CustomSelect } from '../select/index.jsx';
import { useCalendar } from '../calendar/index.js';

export const Table = ({ heading, columns, data, filterByDays, goBack }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');

  const location = useLocation();
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const [filterActive, setFilterActive] = useState('All time');
  const [filterMore, setFilterMore] = useState(false);

  const {
    onHandleSelectedDates,
    startDate,
    endDate,
    showCalendar,
    onToggleCalendar,
    selectionRange,
  } = useCalendar();

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

  const filteredRows = React.useMemo(() => {
    if (
      startDate.toDateString() === new Date().toDateString() ||
      endDate.toDateString() === new Date().toDateString()
    ) {
      return paginatedData;
    }
    const start = startDate?.toISOString().substring(0, 10);
    const end = endDate?.toISOString().substring(0, 10);
    return paginatedData.filter((row) => {
      const rowDate = new Date(row.updatedAt).toISOString().substring(0, 10);
      return rowDate >= start && rowDate <= end;
    });
  }, [startDate, endDate, paginatedData]);

  return (
    <div className="space-y-2">
      <div className="flex items-start justify-between pb-4">
        {goBack ? (
          <h1 className="text-normal flex items-center space-x-2 font-semibold text-black-primary md:text-xl">
            <FaArrowLeft className="text-lg font-normal" />{' '}
            <span>{heading}</span>
          </h1>
        ) : (
          <h1 className="text-normal font-semibold text-black-primary md:text-xl">
            {heading}
          </h1>
        )}
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
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {/* <button className="flex items-center space-x-2 bg-gray-xl py-1 px-4 font-semibold text-gray-base">
            <span>All</span>
            <FaTimes />
          </button> */}
          <div className="w-32">
            <CustomSelect
              options={[
                { value: 'All', label: 'All' },
                { value: 'Top rated', label: 'Top rated' },
                { value: 'Top selling', label: 'Top selling' },
                { value: 'Active', label: 'Active' },
              ]}
            />
          </div>
          <button
            onClick={() => setFilterMore(!filterMore)}
            className="flex items-center space-x-2 whitespace-nowrap border border-gray-normal px-4"
          >
            <BsFilter />
            <span>More filters</span>
          </button>
        </div>
        <div className="flex h-8 items-center space-x-2 rounded-sm border border-black-primary border-opacity-40 bg-white px-4 text-sm">
          <FaSearch className="text-black-primary text-opacity-40" />
          <input
            id="search"
            placeholder="Search"
            onChange={handleSearchInputChange}
            className=" h-full w-28 text-sm font-medium placeholder-black-primary placeholder-opacity-50 outline-none"
            type="text"
          />
        </div>
      </div>
      {filterMore && (
        <div className="relative grid grid-cols-5 gap-2">
          <CustomSelect
            options={[
              { value: 'All products', label: 'All products' },
              { value: 'All services', label: 'All services' },
              { value: 'Products & services', label: 'Products & services' },
            ]}
          />
          <CustomSelect
            options={[
              { value: 'Yesterday', label: 'Yesterday' },
              { value: 'Last week', label: 'Last week' },
              { value: 'Last month', label: 'Last month' },
              { value: 'All time', label: 'All time' },
            ]}
          />
          <CustomSelect
            options={[
              { value: 'Top selling services', label: 'Top selling services' },
              { value: 'Top selling shops', label: 'Top selling shops' },
              { value: 'Top selling products', label: 'Top selling products' },
            ]}
          />

          <div
           
            className={`relative h-full w-8 cursor-pointer`}
          >
            <img  onClick={onToggleCalendar} src={ASSETS.ICONS.FILTER} alt="" />

            {showCalendar && (
              <div className="absolute left-0 top-10 z-50 flex justify-end">
                <DateRange
                  editableDateInputs={true}
                  onChange={onHandleSelectedDates}
                  moveRangeOnFirstSelection={false}
                  ranges={[selectionRange]}
                />
              </div>
            )}
          </div>
        </div>
      )}
      <DataTable
        // title="Vehicle Management"
        className="z-0 font-semibold text-black-primary"
        columns={columns}
        data={filteredRows}
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
