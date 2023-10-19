import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
export const PaginationComponent = ({
  paginationProps,
  setPage,
  setRowsPerPage,
  rowsPerPage
}:any) => {
  const {rowCount, currentPage } = paginationProps;

  const handleRowsPerPageChange = (e:any) => { 
    const newRowsPerPage = parseInt(e.target.value); 
    setPage(1);
    setRowsPerPage(newRowsPerPage);
  };

  const firstRowIndex = (currentPage - 1) * rowsPerPage + 1;
  const lastRowIndex = Math.min(currentPage * rowsPerPage, rowCount);

  return (
    <div className="flex items-center justify-end px-5 h-12 pt-1 border-t border-[#E0E0E0] rounded-bl-lg rounded-br-lg shadow-equal text-sm text-black-base bg-white">
      <div className="mr-3">
        Rows Per Page:
        <select
          value={rowsPerPage}
          onChange={handleRowsPerPageChange}
          className="mx-2 px-2 py-1  rounded outline-none"
        >
          <option value={10}>10</option>
          <option value={20}>20</option>
          <option value={50}>50</option>
        </select>
      </div>
      <div className="mr-3">
        {firstRowIndex} to {lastRowIndex} of {rowCount}
      </div>
      <div className="mr-3 space-x-2 flex items-center text-xl">
        <button
          onClick={() => setPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <GrFormPrevious
            className={`${
              currentPage === 1
                ? "text-gray-primary opacity-50"
                : "text-black-primary cursor-pointer"
            }`}
          />
        </button>
        <button
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === Math.ceil(rowCount / rowsPerPage)}
        >
          <GrFormNext
            className={`${
              currentPage === Math.ceil(rowCount / rowsPerPage)
                ? "text-gray-primary opacity-50"
                : "text-black-primary cursor-pointer"
            }`}
          />
        </button>
      </div>
    </div>
  );
};
