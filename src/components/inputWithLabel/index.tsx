import { AiOutlineEye } from 'react-icons/ai';
import { FaEyeSlash } from 'react-icons/fa';
import { MdError } from 'react-icons/md';
import { useState } from 'react';

export const InputWithLabel = ({
  label,
  type,
  name,
  placeholder,
  style,
  onChange,
  value,
  disable,
}: //   onChange,
any) => {
  return (
    <div className="space-y-1 ">
      <div className="w-full space-y-1">
        <label
          htmlFor={name}
          className={`text-sm font-semibold ${
            style !== undefined ? 'text-black-primary' : 'text-white'
          }`}
        >
          {label}
        </label>
        <input
          value={value}
          name={name}
          type={type}
          onChange={onChange}
          placeholder={placeholder}
          id={name}
          disabled={disable}
          className="block w-full px-5 py-2 text-sm text-black-primary  placeholder-gray-transparent focus:outline-none border border-black-primary border-opacity-20"
        />
      </div>
    </div>
  );
};

export const InputWithLabelBorderBottom = ({
  label,
  type,
  name,
  placeholder,
  value,
  onChange,
  onBlur,
  style,
}: any) => {
  return (
    <div className="space-y-1 ">
      <div className="w-full space-y-1">
        <label
          htmlFor={name}
          className={`text-sm ${
            style !== undefined ? 'text-gray-transparent' : 'text-white'
          }`}
        >
          {label}
        </label>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          id={name}
          className="block  w-full appearance-none border-b border-grey-primary  bg-transparent py-1.5 text-sm placeholder-black-primary focus:outline-none"
        />
      </div>
    </div>
  );
};

export const InputPassword = ({
  label,
  type,
  name,
  placeholder,
  style,
  touched,
  errors,
  onChange,
  onBlur,
  value,
  disabled,
}:any) => {
  const [accountPinShow, setAccountPinShow] = useState(false);
  return (
    <div className="space-y-1">
      <label
        htmlFor={name}
        className={`text-sm font-semibold ${
          style !== undefined ? 'text-black-primary' : 'text-white'
        }`}
      >
        {label}
      </label>
      <div className="flex w-full border border-black-primary border-opacity-20 bg-white px-5 py-2 text-sm  placeholder-gray-transparent ">
        <input
          type={accountPinShow ? 'text' : 'password'}
          autoComplete="off"
          className="placeholder-gray-placeholder text-sm h-full w-full border-none bg-transparent bg-white font-normal text-black-primary outline-none ring-0 focus:border-none  focus:ring-0"
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          value={value}
          disabled={disabled}
        />
        {accountPinShow ? (
          <AiOutlineEye
            className="cursor-pointer text-xl text-gray-text"
            onClick={() => setAccountPinShow(!accountPinShow)}
          />
        ) : (
          <FaEyeSlash
            className="cursor-pointer text-xl text-gray-text"
            onClick={() => setAccountPinShow(!accountPinShow)}
          />
        )}
      </div>
      {touched && errors && (
        <div className="Inter-Light text-red-primary flex items-center space-x-1 pt-0.5 text-left text-xs">
          <MdError className="md:text-normal text-xs sm:text-sm" />{' '}
          <div>{errors}</div>
        </div>
      )}
    </div>
  );
};
