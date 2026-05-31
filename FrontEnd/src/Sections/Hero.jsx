import React, { useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { RxVideo } from "react-icons/rx";

const Hero = () => {
  const [isVideoDialogOpen, setIsVideoDialogOpen] = useState(false)
  return (
    <>
      {isVideoDialogOpen &&
        <div className="h-screen w-screen fixed top-0 left-0 bg-black z-100">
          <div className="w-[80%] h-[80%] flexCenter">
            <button onClick={() => setIsVideoDialogOpen(false)} className="absolute px-5 py-2 rounded-full bg-[#ff4757] right-10 top-5">Close</button>
            <video className="w-full h-full" autoPlay muted loop>
              <source src="https://res.cloudinary.com/dcrkdgbd9/video/upload/v1777965107/Online_delivery_tracking_on_smartphone_gif_video_animation_gb0hzp.mp4" type="video/mp4" />
            </video>
          </div>
        </div>}
      <div className="NameImageContainer w-full h-[50vh] sm:min-h-screen flex items-start justify-center relative">
        <div className="absolute w-full flexCenter">
          <h1 className="text-[0px] sm:text-6xl md:text-[400px] tracking-[50px] text-[#797979]  font-bold text-center mt-20">
            Punjab
          </h1>
        </div>
        <div className="absolute z-20 w-full flexCenter">
          <LazyLoadImage
            src="https://res.cloudinary.com/dcrkdgbd9/image/upload/v1777964121/BurgerBG_xy73p4.png"
            className="md:scale-[0.8] scale-[0.6]"
            alt="Burger"
          />
        </div>
        <div className="absolute z-10 w-full flexCenter">
          <LazyLoadImage
            className="w-full scale-[1.1] md:scale-[0.9] h-full object-fill"
            src="https://res.cloudinary.com/dcrkdgbd9/image/upload/v1777964149/ChilliBg_hmvme9.png"
            alt="Chilli"
          />
        </div>
      </div>
      <div className="SectionWithTextEtc relative w-full flex items-center md:px-10 px-5  justify-center z-50 -sm:mt-20 mt-0">
        <div className="px-10 py-14 flex border-2 border-b-4 border-[#484848]  items-center  flex-col w-full  rounded-[30px] bg-clip-padding backdrop-filter z-50 relative backdrop-blur-sm bg-opacity-10 ">
          <h1 className="md:text-3xl text-md WholeSiteFont text-white">Try Our New</h1>
          <h1 className="md:text-4xl text-lg mt-5 font-semibold text-white uppercase">
            Cheeze Bluster
          </h1>
          <p className="md:text-2xl text-md mt-2 font-semibold tracking-[0.2em] text-white md:w-[90%] w-full text-center">
            At <span className="text-[#ff4757]">Urban Bites</span>, we invite you to embark on a culinary journey that
            celebrates the rich tapestry of flavors and traditions that define
            our beloved region. Our menu is a vibrant mosaic of authentic
            Punjabi dishes, crafted with love and passion by our skilled chefs.
            From the fiery spices of our signature curries to the comforting
            warmth of our freshly baked breads, every bite is a celebration of
            Punjab's culinary heritage. Whether you're craving the bold flavors
            of our tandoori delights or the comforting embrace of our hearty
            lentil dishes.
          </p>
          <div className="w-full text-lg mt-4 flex sm:flex-row flex-col justify-evenly items-center">
            <button className="mt-5 px-10 border-2 border-[#FF4757] py-3 BrandBG text-white font-bold rounded-full hover:opacity-90 transition duration-300">
              Order Now!
            </button>
            <button onClick={() => setIsVideoDialogOpen(true)} className="mt-5 px-10 flexCenter gap-4  py-3  font-bold rounded-full hover:bg-[#FF4757] border-2 border-[#FF4757] hover:text-white hover:border-none text-[#FF4757] transition duration-300">
              <RxVideo size={24} /> How to process order
            </button>
          </div>

          <div className="flex   justify-evenly mt-20 w-full items-center flex-col md:flex-row gap-5">
            {/* User Reviews */}
            <div className="NameImgeAndName">
              <div
                onClick={() =>
                  window.open("https://maps.app.goo.gl/NL4VgYkfDLsQoLbq9")
                }
                className="Imges flex -space-x-5"
              >
                <LazyLoadImage
                  className="w-13 h-13 rounded-full "
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt=""
                />
                <LazyLoadImage
                  className="w-13 h-13 rounded-full "
                  src="https://randomuser.me/api/portraits/men/34.jpg"
                  alt=""
                />
                <LazyLoadImage
                  className="w-13 h-13 rounded-full "
                  src="https://randomuser.me/api/portraits/women/42.jpg"
                  alt=""
                />
              </div>
              <h1 className="text-white -ml-3 font-bold mt-2 tracking-[0.2em]">
                100+ Reviews
              </h1>
            </div>
            {/* Place */}
            <div className="flex justify-center items-center flex-col">
              <LazyLoadImage
                className="w-13 h-13 rounded-full "
                src="https://res.cloudinary.com/dcrkdgbd9/image/upload/v1777964215/LalianMap_wpowph.jpg"
                alt=""
              />
              <h1 className="text-white font-bold mt-2 tracking-[0.2em]">
                12+ Neighbourhood Places
              </h1>
            </div>
            {/* items */}
            <div className="flex justify-center items-center flex-col">
              <LazyLoadImage
                className="w-13 h-13 rounded-full "
                src="https://res.cloudinary.com/dcrkdgbd9/image/upload/v1777964216/PizzaSlice_xet5sn.jpg"
                alt="punjab pizza club"
              />
              <h1 className="text-white font-bold mt-2 tracking-[0.2em]">
                129+ items
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
