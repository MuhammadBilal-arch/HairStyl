import React from 'react';
import Select from 'react-select';
import { FaCheck } from 'react-icons/fa';

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    background: '#fff',
    borderColor: '#9e9e9e',
    minHeight: '30px',
    height: '30px',
    boxShadow: state.isFocused ? null : null,
  }),

  valueContainer: (provided, state) => ({
    ...provided,
    height: '30px',
    padding: '0 6px',
  }),

  input: (provided, state) => ({
    ...provided,
    margin: '0px',
  }),
  indicatorSeparator: (state) => ({
    display: 'none',
  }),
  indicatorsContainer: (provided, state) => ({
    ...provided,
    height: '30px',
  }),
};



const CustomOption = ({ innerProps, label, isSelected }) => (
  <div
    {...innerProps}
    className="flex items-center justify-between whitespace-nowrap font-medium px-3 py-1.5 text-sm text-black-primary"
  >
    <div>{label}</div>
    <div>
      {!isSelected && <FaCheck style={{ color: 'transparent' }} />}
      {isSelected && <FaCheck className='text-green-checked'/>}
    </div>
  </div>
);

export const CustomSelect = ({ options , onSelectOption }) => {
  return (
    <Select
      className="z-1 text-sm w-full"
      options={options}
      styles={customStyles}
      components={{
        Option: CustomOption,
        IndicatorSeparator: () => null,
      }}
      onChange={onSelectOption}
    />
  );
};
