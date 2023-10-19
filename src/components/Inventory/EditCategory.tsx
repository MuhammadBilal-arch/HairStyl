import { RxDragHandleDots2 } from 'react-icons/rx';

import { ImBin } from 'react-icons/im';
import { ASSETS } from '../../images/path';
import { BASE_URL } from '../../utils/urls';

export const EditCategoryCards = ({
  title,
  onClick,
  quantity,
  onDelete,
  image,
  amount,
  onDragStart,
  onDragEnd,
  onDragEnter,
  item,
  _id
}: any) => {
  return (
    <div
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e)=> e.preventDefault()}
      className="flex h-20 cursor-pointer hover:bg-grey-modal items-center space-y-2 rounded-md bg-white px-4  shadow-equal shadow-graydark"
      draggable
    >
      <div className="flex w-full justify-between font-semibold">
        <div
          onClick={onClick}
          className="flex items-center space-x-4 text-black-primary w-[95%] "
        >
          <div className="flex items-center space-x-3">
            <RxDragHandleDots2 className="text-2xl" />
            <img
              src={`${BASE_URL}/${image}` || ASSETS?.LOGO}
              alt=""
              className="h-16 w-16 rounded-md bg-graydark bg-opacity-20 object-cover"
            />
          </div>
          <div className="flex flex-col space-y-1 text-sm">
            <span>
              Item Name:{' '}
              {title.length > 60 ? title?.substr(0, 60).concat('...') : title}
            </span>
            <span className="text-graydark">${amount}</span>
            <span className="text-graydark">Qty: #{quantity} in Stock</span>
          </div>
        </div>
        <div onClick={onDelete} className="group relative mt-2">
          <ImBin className="text-purple-primary" />
          <div className="absolute -left-4 -top-7 z-50  hidden rounded-md py-0.5 px-1.5 text-xs  text-black-primary shadow-equal shadow-graydark duration-1000 group-hover:block">
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};
