import React, { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { FaArrowLeft, FaSearch } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { PaginationComponent } from './pagination';

import { ASSETS } from '../../images/path';
import { BsFilter } from 'react-icons/bs';
import { CustomSelect } from '../select/index.jsx';
import { useCalendar } from '../calendar/index.js';

export const Table = ({
  heading,
  columns,
  data,
  filterByDays,
  goBack,
  showPagination,
  showBottomTab,
  onViewAllContent,
  statusFilter,
  rateFilter,
}) => {
  const navigate = useNavigate();
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
  const filteredData = data?.filter((row: any) => {
    return (
      row?.email?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
      row?.name?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
      row?._id == searchValue ||
      (searchValue === 'Active' && row?.status === '1') ||
      (searchValue === 'Inactive' && row?.status === '0') ||
      (searchValue === 'All' && row)
    );
  });

  const paginatedData = filteredData.slice(startIndex, endIndex);

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event.target.value);
  };

  const filteredRows = React.useMemo(() => {
    if (startDate != new Date() && endDate != new Date() && showCalendar) {
      if (
        startDate.toDateString() === new Date().toDateString() ||
        endDate.toDateString() === new Date().toDateString()
      ) {
        return paginatedData;
      }
      // onToggleCalendar();
      const start = startDate?.toISOString().substring(0, 10);
      const end = endDate?.toISOString().substring(0, 10);
      return paginatedData.filter((row) => {
        const rowDate = new Date(row.updated_at).toISOString().substring(0, 10);
        return rowDate >= start && rowDate <= end;
      });
    }

    const currentDate = new Date();

    // Set default values for start and end dates
    let start = currentDate.toISOString().substring(0, 10); // default to today
    let end = currentDate.toISOString().substring(0, 10); // default to today

    // Update start and end dates for different cases
    if (filterActive === '30 days') {
      start = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
        .toISOString()
        .substring(0, 10);
      end = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0)
        .toISOString()
        .substring(0, 10);
    } else if (filterActive === '7 days') {
      const weekStartDate = new Date(currentDate);
      weekStartDate.setDate(currentDate.getDate() - currentDate.getDay());
      start = weekStartDate.toISOString().substring(0, 10);
      end = currentDate.toISOString().substring(0, 10);
    } else if (filterActive === '24 Hours') {
      const last24HoursDate = new Date(currentDate);
      last24HoursDate.setHours(currentDate.getHours() - 24);
      end = currentDate.toISOString();
      start = last24HoursDate.toISOString();
    } else if (filterActive === 'All time') {
      // Return all data without date filtering
      return paginatedData;
    }

    return paginatedData.filter((row) => {
      const rowDate = new Date(row.updated_at).toISOString().substring(0, 10);
      return rowDate >= start && rowDate <= end;
    });
  }, [startDate, endDate, paginatedData, filterActive]);

  const handleSelectOption = (value: any) => {
    if (value.value == 'Active') {
      setSearchValue(value?.value);
    }
    if (value.value == 'Inactive') {
      setSearchValue(value?.value);
    }
    if (value.value == 'All') {
      setSearchValue(value?.value);
    }
    if (value.value == 'Top selling') {
      navigate('/sales-details');
    }
    if (value.value == 'Top rated') {
      navigate('/sales-top-rated');
    }
    if (value.value == 'All time') {
      setFilterActive('All time');
    }
    if (value.value == '30 days') {
      setFilterActive('30 days');
    }
    if (value.value == '7 days') {
      setFilterActive('7 days');
    }
    if (value.value == '24 Hours') {
      setFilterActive('24 Hours');
    }
  };

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
              onClick={() => setFilterActive('All time')}
              className={` cursor-pointer ${
                filterActive === 'All time'
                  ? 'mt-0.5 h-full border-b-2 border-black-primary'
                  : 'mt-0.5 h-full border-b-2 border-transparent'
              }`}
            >
              All time
            </div>
            <div
              onClick={() => setFilterActive('30 days')}
              className={` cursor-pointer ${
                filterActive === '30 days'
                  ? 'mt-0.5 h-full border-b-2 border-black-primary'
                  : 'mt-0.5 h-full border-b-2 border-transparent'
              }`}
            >
              30 days
            </div>
            <div
              onClick={() => setFilterActive('7 days')}
              className={` cursor-pointer ${
                filterActive === '7 days'
                  ? 'mt-0.5 h-full border-b-2 border-black-primary'
                  : 'mt-0.5 h-full border-b-2 border-transparent'
              }`}
            >
              7 days
            </div>
            <div
              onClick={() => setFilterActive('24 Hours')}
              className={` cursor-pointer ${
                filterActive === '24 Hours'
                  ? 'mt-0.5 h-full border-b-2 border-black-primary'
                  : 'mt-0.5 h-full border-b-2 border-transparent'
              }`}
            >
              24 Hours
            </div>
            <div
              className={`
              relative mt-2 flex  h-full w-8 cursor-pointer items-center border-b-2 border-transparent`}
            >
              <img
                onClick={onToggleCalendar}
                src={ASSETS.ICONS.FILTER}
                alt=""
                className="object-contain"
              />

              {showCalendar && (
                <div className="absolute right-0 top-10 z-50 flex justify-end">
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
      </div>
      <div className="flex items-center justify-between">
        <div className="flex space-x-2">
          {rateFilter && (
            <div className="w-32">
              <CustomSelect
                options={[
                  { value: 'All', label: 'All' },
                  { value: 'Top rated', label: 'Top rated' },
                  { value: 'Top selling', label: 'Top selling' },
                ]}
                onSelectOption={handleSelectOption}
              />
            </div>
          )}
          {statusFilter && (
            <div className="w-32">
              <CustomSelect
                options={[
                  { value: 'All', label: 'All' },
                  { value: 'Active', label: 'Active' },
                  { value: 'Inactive', label: 'InActive' },
                ]}
                onSelectOption={handleSelectOption}
              />
            </div>
          )}

          {filterMore && !filterByDays && (
            <div className="relative flex items-center gap-2">
              <CustomSelect
                options={[
                  { value: '24 Hours', label: 'Yesterday' },
                  { value: '7 days', label: 'Last week' },
                  { value: '30 days', label: 'Last month' },
                  { value: 'All time', label: 'All time' },
                ]}
                onSelectOption={handleSelectOption}
              />
              {/* <CustomSelect
            options={[
              { value: 'Top selling services', label: 'Top selling services' },
              { value: 'Top selling shops', label: 'Top selling shops' },
              { value: 'Top selling products', label: 'Top selling products' },
            ]}
          /> */}

              <div
                className={`relative flex h-full w-8  cursor-pointer items-center`}
              >
                <img
                  onClick={onToggleCalendar}
                  src={ASSETS.ICONS.FILTER}
                  alt=""
                  className="object-contain"
                />

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

          {!filterByDays && (
            <button
              onClick={() => setFilterMore(!filterMore)}
              className="flex items-center space-x-2 whitespace-nowrap border border-gray-normal px-4"
            >
              <BsFilter />
              <span>More filters</span>
            </button>
          )}
        </div>
        <div className="flex h-8 items-center space-x-2 rounded-sm border border-black-primary border-opacity-40 bg-white px-4 text-sm">
          <FaSearch className="text-black-primary text-opacity-40" />
          <input
            id="search"
            placeholder="Search"
            onChange={handleSearchInputChange}
            value={searchValue}
            className=" h-full w-28 text-sm font-medium placeholder-black-primary placeholder-opacity-50 outline-none"
            type="text"
          />
        </div>
      </div>
      <DataTable
        // title="Vehicle Management"
        className="z-0 font-semibold text-black-primary"
        columns={columns}
        data={showBottomTab ? filteredRows?.slice(0,4) : filteredRows }
        pagination={showPagination}
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
      {showBottomTab && (
        <div className="mt-5 flex  h-12 items-center justify-between bg-white px-5  text-black-base">
          <button className={`text-sm font-semibold text-gray-text`}>
            {data?.length > 4 ? 4 : filteredRows.slice(0,4)} of {data?.length}
          </button>

          <div className="mr-3 flex items-center space-x-2 text-xl">
            {/* <button className="flex items-center space-x-2 rounded-sm border border-gray-normal px-4  text-base font-semibold">
              <div className="cursor-pointer text-black-primary">Delete</div>
            </button> */}

            <button
              onClick={onViewAllContent}
              className="flex items-center space-x-2 rounded-sm border border-gray-normal px-5 py-1 text-sm font-semibold"
            >
              <div className="cursor-pointer text-black-primary">View All</div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
