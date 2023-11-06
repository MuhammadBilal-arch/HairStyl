import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useState } from 'react';

export const SwipperComponent = ({ list }) => {
  // const [swiperRef, setSwiperRef] = useState(null);
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    480: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    768: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    1024: {
      slidesPerView: 4,
      spaceBetween: 50,
    },
  };

  return (
    <>
      <Swiper
        // onSwiper={setSwiperRef}
        slidesPerView={4}
        breakpoints={breakpoints}
        centeredSlides={false}
        spaceBetween={30}
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {list?.map((item, index) => (
          <SwiperSlide key={index}>
            <img src={item?.img} alt="" />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};
