import React, { useState } from 'react';
import DefaultLayout from '../../layout/DefaultLayout';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { FaLongArrowAltLeft } from 'react-icons/fa';
import { useLocation, useNavigate } from 'react-router-dom';
import DataTable from 'react-data-table-component';
import { PaginationComponent } from './pagination';
import moment from 'moment';

export const PastOrders = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState('');
  const [showCalendar, setShowCalendar] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
      name: 'Date',
      selector: (row: any) => moment(row?.updatedAt).format('MMM D, YYYY'),
    },
    {
      name: 'Order #',
      selector: (row: any) => (
        <div
          className="cursor-pointer"
          onClick={() =>
            navigate('/order-detail', {
              state: {
                item: row,
                status: '',
              },
            })
          }
        >
          {row._id}
        </div>
      ),
    },
    {
      name: 'Customer Name',
      selector: (row: any) => row.customer.fname + ' ' + row.customer.lname,
    },
    {
      name: 'Status',
      selector: (row: any) =>
        row?.order_delivered ? 'Completed' : 'Cancelled',
    },
  ];

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: 'selection',
  };

  const handleSelect = (ranges: any) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };
  const startIndex = (currentPage - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const filteredData = location.state?.filter(
    (row) =>
      row?.updatedAt?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
      row?.customer.name?.toLowerCase()?.includes(searchValue?.toLowerCase()) ||
      row?._id?.toLowerCase()?.includes(searchValue?.toLowerCase())
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

  const toggleDateRange = () => {
    setShowCalendar(!showCalendar);
  };

  return (
    <DefaultLayout>
      <div>
        <div
          className="flex cursor-pointer items-center space-x-2 text-black-base"
          onClick={() => navigate(-1)}
        >
          <FaLongArrowAltLeft /> <span>Back to Orders</span>
        </div>
        <h1 className="text-normal mt-5 font-semibold text-black-primary md:text-xl">
          Past Orders
        </h1>

        <div className="relative flex justify-between py-2">
          <div className="flex flex-col space-y-0.5">
            <label
              htmlFor="search"
              className="text-sm font-semibold text-black-primary"
            >
              Search
            </label>
            <input
              id="search"
              onChange={handleSearchInputChange}
              className="h-8 rounded-md border-2 border-black-primary border-opacity-20 px-2 text-sm outline-none"
              type="text"
            />
          </div>
          <div className="flex space-x-2">
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor="startDate"
                className="text-sm font-semibold text-black-primary"
              >
                Start Date
              </label>
              <input
                id="startDate"
                className="h-8 rounded-md border-2 border-black-primary border-opacity-20 px-2 text-sm outline-none"
                type="text"
                value={
                  startDate ? startDate?.toISOString().substring(0, 10) : ''
                }
                onClick={toggleDateRange}
                readOnly
              />
            </div>
            <div className="flex flex-col space-y-0.5">
              <label
                htmlFor="endDate"
                className="text-sm font-semibold text-black-primary"
              >
                End Date
              </label>
              <input
                id="endDate"
                className="h-8 rounded-md border-2 border-black-primary border-opacity-20 px-2 text-sm outline-none"
                type="text"
                value={
                  startDate ? startDate?.toISOString().substring(0, 10) : ''
                }
                onClick={toggleDateRange}
                readOnly
              />
            </div>
          </div>

          {showCalendar && (
            <div className="absolute right-0 top-20 z-50 flex justify-end">
              <DateRangePicker
                ranges={[selectionRange]}
                onChange={handleSelect}
                showDateDisplay={false}
                inputRanges={[]}
              />
            </div>
          )}
        </div>
        <DataTable
          // title="Vehicle Management"
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
        />
      </div>
    </DefaultLayout>
  );
};
