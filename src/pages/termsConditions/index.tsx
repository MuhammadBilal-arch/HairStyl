import { useEffect, useState } from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { FaArrowLeft, FaSearch, FaTimes } from 'react-icons/fa';

import { useSelector } from 'react-redux';
import DefaultLayout from '../../layout/DefaultLayout';

import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { API_HANDLER, showToast } from '../../utils/functions';
import { TOAST_TYPE } from '../../utils/constants';

export const TermsConditions = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [termsCustomer, setTermsCustomer] = useState<any>();
  const [termsClient, setTermsClient] = useState<any>();

  useEffect(() => {
    onGetTermsAndConditions();
  }, []);

  const onGetTermsAndConditions = async () => {
    const result = await API_HANDLER('GET', 'getSettings', {});
    if (result?.data?.status == 'success') {
      setTermsCustomer(result?.data?.data?.termsCustomer);
      setTermsClient(result?.data?.data?.termsClient);
    }
  };

  const onUpdateTermsAndConditions = async () => {
    if(!termsCustomer || !termsClient) {
      showToast('Please enter terms and conditions', TOAST_TYPE.error);
      return;
    }
    const payload = {
      termsCustomer,
      termsClient
    }
    const result = await API_HANDLER('POST', 'updateAppSetting', payload);
    if (result?.data?.status == 'success') { 
      showToast(result?.data?.message, TOAST_TYPE.success);
    }
  };


  return (
    <DefaultLayout>
      <div className="space-y-6">
        <div className="flex items-start justify-between">
          <h1
            onClick={() => navigate(-1)}
            className="text-normal flex items-center space-x-2 font-semibold text-black-primary md:text-xl"
          >
            <FaArrowLeft className="text-lg font-normal" />
            <span>Terms & Conditions</span>
          </h1>
        </div>
        <div>
          <div>
            <h1
              onClick={() => navigate(-1)}
              className="text-normal flex items-center font-semibold text-black-primary md:text-xl"
            >
              Terms & conditions for customer app
            </h1>
            <div className="my-5 text-base">
              Type terms & conditions for shop owner app:
            </div>
          </div>

          <ReactQuill
            theme="snow"
            placeholder="Type anything"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link'],
              ],
            }}
            value={termsCustomer}
            onChange={(value)=> setTermsCustomer(value)}
          />
        </div>
        <div>
          <div>
            <h1
              onClick={() => navigate(-1)}
              className="text-normal flex items-center font-semibold text-black-primary md:text-xl"
            >
              Terms & conditions for client app
            </h1>
            <div className="my-5 text-base">
              Type terms & conditions for client app:
            </div>
          </div>

          <ReactQuill
            theme="snow"
            placeholder="Type anything"
            modules={{
              toolbar: [
                [{ header: [1, 2, false] }],
                ['bold', 'italic', 'underline'],
                ['image', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                ['link'],
              ],
            }}
            value={termsClient}
            onChange={(value)=> setTermsClient(value)}
          />
        </div>

        <div className="flex w-full items-center justify-end ">
          <div className="flex items-center space-x-2 text-sm ">
            <button className="px-5 py-1.5">Clear</button>
            <button
              onClick={onUpdateTermsAndConditions}
              className="bg-black-primary px-5 py-1.5 text-center text-white"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};
