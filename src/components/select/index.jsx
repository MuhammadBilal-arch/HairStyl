import React from 'react';
import Select from 'react-select';
import { FaCheck } from 'react-icons/fa';

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 16px',
    color: state.isSelected ? 'white' : 'black',
    backgroundColor: state.isSelected ? '#007bff' : 'white',
  }),
};

const CustomOption = ({ innerProps, label, isSelected }) => (
  <div {...innerProps} className='flex space-x-2 items-center text-xs px-2 whitespace-nowrap'>
    {isSelected && <FaCheck  />}
    {!isSelected && <FaCheck style={{  color:"transparent" }} />}
    <div>{label}</div>
  </div>
);

export const CustomSelect = ({options}) => {
  return (
    <Select
      className="z-1 bg-yellow-primary"
      options={options}
      styles={customStyles}
      components={{
        Option: CustomOption,
        IndicatorSeparator: () => null,
      }}

    
    />
  );
};
