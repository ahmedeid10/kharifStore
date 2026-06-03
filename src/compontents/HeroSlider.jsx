// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// import required modules
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router-dom";

function HeroSlider() {
  return (
    <>
      <div className="hero">
        <div className="container">
          <Swiper
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay, Pagination]}
            className="mySwiper"
          >
            <SwiperSlide>
              <div className="content">
                <h4>Introducing The New</h4>
                <h3>
                  Microsoft Xbox <br /> 360 Controller
                </h3>
                <p>Windows Xp/10/7/8 Ps3 ,Tv Box </p>
                <Link to="/" className="btn">
                  Shop Now
                </Link>
              </div>
              <img src="/img/banner_Hero1.jpg" alt="silider Hero 1" />
            </SwiperSlide>

            <SwiperSlide>
              <div className="content">
                <h4>Introducing The New</h4>
                <h3>
                  Microsoft Xbox <br /> 360 Controller
                </h3>
                <p>Windows Xp/10/7/8 Ps3 ,Tv Box </p>
                <Link to="/" className="btn">
                  Shop Now
                </Link>
              </div>
              <img src="/img/banner_Hero2.jpg" alt="silider Hero 2" />
            </SwiperSlide>

            <SwiperSlide>
              <div className="content">
                <h4>Introducing The New</h4>
                <h3>
                  Microsoft Xbox <br /> 360 Controller
                </h3>
                <p>Windows Xp/10/7/8 Ps3 ,Tv Box </p>
                <Link to="/" className="btn">
                  Shop Now
                </Link>
              </div>
              <img src="/img/banner_Hero3.jpg" alt="silider Hero 3" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </>
  );
}

export default HeroSlider;
