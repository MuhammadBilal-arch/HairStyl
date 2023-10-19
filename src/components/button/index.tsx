import { BiPencil } from 'react-icons/bi';

export const PurpleOutlineBtn = ({ text, onClick, icon }: any) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center space-x-2 rounded-2xl border-2 border-purple-primary px-6 py-1 text-xs Inter font-semibold text-purple-primary md:text-sm"
    >
      {icon && <BiPencil className="font-Bold text-lg" />}
      <span>{text}</span>
    </button>
  );
};

export const BtnFilled = ({ text, onClick, background, color, round , width }: any) => {
  return (
    <button
      type='submit'
      onClick={onClick}
      className={`h-6 py-2 border border-black-primary border-opacity-20 text-xs font-semibold sm:h-6 md:h-9 2xl:h-10
       uppercase md:text-sm ${background} rounded-${round} text-center ${color} px-4 shadow-6 ${width} flex items-center justify-center`}
    >
      {text}
    </button>
  );
};

