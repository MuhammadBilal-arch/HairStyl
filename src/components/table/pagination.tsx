export const PaginationComponent = ({
  paginationProps,
  setPage,
  setRowsPerPage,
  rowsPerPage
}: any) => {
  const { rowCount, currentPage } = paginationProps;
  const totalPages = Math.ceil(rowCount / rowsPerPage);

  const handleRowsPerPageChange = (e: any) => {
    const newRowsPerPage = parseInt(e.target.value);
    setPage(1);
    setRowsPerPage(newRowsPerPage);
  };

  const firstRowIndex = (currentPage - 1) * rowsPerPage + 1;
  const lastRowIndex = Math.min(currentPage * rowsPerPage, rowCount);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex pl-16  items-center justify-between px-5 h-12 text-black-base bg-white mt-5">
        {pageNumbers.slice(currentPage - 1, currentPage + 9).map((pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={`${pageNumber === currentPage ? 'font-semibold text-sm text-gray-text' : ''}`}
          >
            Page {pageNumber} of {totalPages}
          </button>
        ))}
      <div className="mr-3 space-x-2 flex items-center text-xl">
        <button 
        className="flex items-center font-semibold text-base border border-gray-normal px-4 space-x-2"
        onClick={() => setPage(currentPage - 1)} disabled={currentPage === 1}>
          <div
            className={`${
              currentPage === 1
                ? "text-gray-primary opacity-50"
                : "text-black-primary cursor-pointer"
            }`}
          >Previous</div>
        </button>

        <button
          className="flex items-center font-semibold text-base border border-gray-normal px-4 space-x-2"
          onClick={() => setPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <div
            className={`${
              currentPage === totalPages
                ? "text-gray-primary opacity-50"
                : "text-black-primary cursor-pointer"
            }`}
          >Next</div>
        </button>
      </div>
    </div>
  );
};
