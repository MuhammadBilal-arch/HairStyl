import { IoCloudUploadOutline } from "react-icons/io5";

export const ExportToExcel = ({ data, columns, fileName }) => {

  const exportToExcel = () => {
    console.log(data,"data")

    const csvContent = 'data:text/csv;charset=utf-8,' +
      columns.map(column => column).join(',') + '\n' +
      data.map(row => columns.map(column => row[column]).join(',')).join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${fileName}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button className='border flex space-x-2 items-center border-gray-extraLight h-9 px-5 rounded-md text-black-primary text-sm' onClick={exportToExcel}>
    <IoCloudUploadOutline className="text-base" />
      <div className="text-sm font-semibold">Export Sales</div>
      </button>
  );
};
 
