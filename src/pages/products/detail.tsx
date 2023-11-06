import DefaultLayout from '../../layout/DefaultLayout';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ASSETS } from '../../images/path';
import { BarChart } from '../../components/chart';

export const ProductDetail = () => {
  const navigate = useNavigate();
  return (
    <DefaultLayout>
      <div className="space-y-4">
        <div className="w-full">
          <h1
            onClick={() => navigate(-1)}
            className="text-normal flex w-full items-center space-x-2 font-semibold text-black-primary md:text-xl"
          >
            <FaArrowLeft className="text-lg font-normal" />{' '}
            <span>Symmmetry Beauty</span>
          </h1>
        </div>
        <BarChart />
        <form className="z-50 mx-auto flex flex-col space-y-8  rounded-xl bg-grey-modal py-5">
          <div className="flex flex-col space-y-2"></div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex w-full items-center justify-between md:col-span-2">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                Shop services
              </h1>
            </div>
            {[1, 2, 3, 4].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between border-b border-gray-base py-1 text-sm"
              >
                <label htmlFor="deep_massage" className="w-full space-y-1">
                  <div className="space-x-1">
                    <span className="font-semibold text-black-primary">
                      Deep Massage -
                    </span>
                    <span className="text-gray-base">45 Minutes</span>
                  </div>
                  <div className="flex w-full items-center justify-between">
                    <div className="text-black-primary">€ 50</div>
                    <div className="space-x-1">
                      <span className="font-semibold text-black-primary">
                        Sales
                      </span>
                      <span className="text-gray-base">€980</span>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex w-full items-center justify-between md:col-span-2">
              <h1 className="text-black w-full text-sm font-bold text-black-base md:text-base">
                Shop products
              </h1>
            </div>

            {[1, 2].map((item, index) => (
              <div className="flex items-center justify-between border-b border-gray-base py-1 text-sm">
                <label htmlFor="deep_massage" className="flex space-x-4 w-full">
                  <img
                    src={ASSETS.AUTH.SIGN_IN_COVER}
                    alt=""
                    className="h-10 w-10 object-cover"
                  />
                  <div className="space-y-1 w-full ">
                    <span className="font-semibold text-black-base">
                      Men Hair Kit
                    </span>

                    <div className="flex w-full items-center justify-between text-xs md:text-sm">
                      <div className="text-black-primary">€ 50</div>
                      <div className="space-x-2">
                        <span className="font-semibold text-black-primary">
                          Sales
                        </span>
                        <span className="text-gray-base">€980</span>
                      </div>
                    </div>
                  </div>
                </label>
              </div>
            ))}
          </div>
        </form>
      </div>
    </DefaultLayout>
  );
};
