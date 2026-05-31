import { CgPlayPause } from "react-icons/cg";
import { BsPlayFill } from "react-icons/bs";

import { AiFillPlayCircle } from "react-icons/ai";
import React, { useEffect, useRef, useState } from "react";
import aboutData from "../dummy/AboutUs";
import OurChefs from "../Sections/OurChefs";

const AboutPage = () => {
  const videoRef = useRef();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  useEffect(() => {
    if (isVideoPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [isVideoPlaying]);
  return (
    <div className="">
      {/* Hero */}
      <section
        className="h-75 flex flex-col items-center justify-center text-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1552566626-52f8b828add9')",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>
        <h1 className="relative text-6xl font-bold text-white">About Us</h1>
      </section>

      {/* About Section */}
      <section className="py-16 px-6 text-center max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold text-white mb-4">
          We Invite you to Visit Our Restaurant
        </h2>
        <p className="text-gray-400 text-sm mb-8">
          We are only here to provide your value and inshallah we will do..
        </p>

        <div className="relative rounded-xl overflow-hidden shadow-lg">
          <div className="absolute w-full h-full z-20 bg-[#33333348]" />
          <video
            ref={videoRef}
            loop
            muted
            className="w-full"
            src="https://videos.pexels.com/video-files/857149/857149-sd_640_246_30fps.mp4"
          ></video>

          <button
            onClick={() => setIsVideoPlaying(!isVideoPlaying)}
            className="absolute z-30 inset-0 flex items-center justify-center"
          >
            {!isVideoPlaying ? (
              <div className="w-16 h-16 bg-[#ff6467] rounded-full flex items-center justify-center text-white text-xl">
                <CgPlayPause size={30} />
              </div>
            ) : (
              <div className="w-16 h-16 bg-[#ff6467] rounded-full flex items-center justify-center text-white text-xl">
                <BsPlayFill size={30} />
              </div>
            )}
          </button>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 bg-[#0a0a0a] text-center">
        <h2 className="text-3xl font-semibold text-white mb-10">What We Do</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto">
          {aboutData.map((item, i) => {
            const Icon = item?.Icon;
            return (
              <div
                key={i}
                className="px-10 py-5 flex border-2 border-b-4 border-[#484848]  items-center  flex-col w-full  rounded-r-[100px] bg-clip-padding backdrop-filter z-50 relative backdrop-blur-sm bg-opacity-10"
              >
                <div className="w-18 h-18 mx-auto bg-[#ff6467] rounded-full flex items-center justify-center text-white text-xl mb-4">
                  <Icon size={30} />
                </div>

                <h3 className="text-white text-xl font-medium">{item?.name}</h3>

                <p className="text-gray-400 text-sm mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <OurChefs />

    </div>
  );
}

export default AboutPage;