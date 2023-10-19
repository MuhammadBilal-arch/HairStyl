import { RxDragHandleDots2 } from 'react-icons/rx';
import { BsStar } from 'react-icons/bs';
import { ImBin } from 'react-icons/im';

export const InventoryCards = ({
  title,
  onClick,
  quantity,
  onDelete,
  onDragStart,
  onDragEnd,
  onDragEnter,
}: any) => {
  return (
    <div
      onDragStart={onDragStart}
      onDragEnter={onDragEnter}
      onDragEnd={onDragEnd}
      onDragOver={(e) => e.preventDefault()}
      draggable
      className="flex cursor-pointer flex-col space-y-2 rounded-md hover:bg-grey-modal bg-white px-4 py-6 shadow-equal shadow-graydark"
    >
      <div className="flex items-center justify-between font-semibold">
        <div className="flex items-center space-x-2 text-black-primary">
          <RxDragHandleDots2 className="text-2xl" />
          <div className="space-x-1">
            <span onClick={onClick}>{title}</span>
            <span className="text-graydark">({quantity || 0})</span>
          </div>
          <div className="group relative">
            <BsStar className="" />
            <div className="absolute bg-white -left-4 -top-7 z-50  hidden rounded-md py-0.5 px-1.5 text-xs  text-black-primary shadow-equal shadow-graydark duration-1000 group-hover:block">
              Feature
            </div>
          </div>
        </div>
        <div className="group relative" onClick={onDelete}>
          <ImBin className="text-purple-primary" />
          <div className="absolute -left-4 -top-7 z-50 hidden  rounded-md bg-white py-0.5 px-1.5 text-xs  text-black-primary shadow-equal shadow-graydark duration-1000 group-hover:block">
            Delete
          </div>
        </div>
      </div>
    </div>
  );
};
