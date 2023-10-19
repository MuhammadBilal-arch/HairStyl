import React from 'react';
import { useDispatch } from 'react-redux';
import { onUpdateDispensaryInfo } from '../../redux/slices/dispensaries';
import { ToggleButton } from '../../components/toggle';

export const DispensaryInfo = ({ dispensary }) => {
  const dispatch = useDispatch<any>();
  const onChangeDispensaryStatus = () => {
    const formData = new FormData() as any;
    formData.append('id', dispensary?.dispensary?._id);
    formData.append('status', !dispensary?.dispensary?.status);
    dispatch(onUpdateDispensaryInfo(formData));
  };
  return (
    <>
      <div className="grid w-full grid-cols-2 gap-y-4 gap-x-12">
        <div className="flex flex-col text-sm">
          <div>Dispensary</div>
          <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
            <div className="text-black-primary">
              {dispensary?.dispensary?.name}
            </div>
          </div>
        </div>
        <div className="flex flex-col text-sm">
          <div>Address</div>
          <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
            <div className="text-black-primary">
              {dispensary?.dispensary?.location}
            </div>
          </div>
        </div>
        <div className="flex flex-col text-sm">
          <div>Email</div>
          <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
            <div className="text-black-primary">{dispensary?.email}</div>
          </div>
        </div>
        <div className="flex flex-col text-sm">
          <div>Phone</div>
          <div className="text flex justify-between border-b border-black-primary border-opacity-20 py-2 font-semibold">
            <div className="text-black-primary">
              {dispensary?.dispensary?.phone}
            </div>
          </div>
        </div>
      </div>
      <ToggleButton
        onChangeStatus={onChangeDispensaryStatus}
        status={dispensary?.dispensary?.status}
      />
    </>
  );
};
