import React from 'react'
   
const Services = () => {
  return (
   <div className="w-full py-12 px-5 md:px-10 mt-5 flex flex-col items-center justify-center">
        <h1 className="text-6xl text-center tracking-[0.2em] font-bold text-white">
          How we serve you and <br />{" "}
          <span className="text-red-500">deliver</span> your favorite{" "}
          <span className="text-yellow-400">food</span>
        </h1>

        <p className="text-4xl mt-3 font-extralight text-center">
          Fresh, garma garam food at your doorstep <br />
          fast, reliable, and always on time
        </p>

        <div className="IconsAndText w-full flex items-center justify-evenly mt-20 md:flex-row flex-col gap-10">
          <div className="Ready flex-col gap-4 flex items-center justify-center">
            <img src="https://res.cloudinary.com/dcrkdgbd9/image/upload/v1778225232/Ready_ngl2kh.svg" alt="Ready" width="200" height="200" />
            <h1 className="text-lg font-semibold">Freshly Prepared</h1>
            <p className="text-md text-center">
              Your order is made fresh, full taste <br />
              proper desi flavor, no compromise
            </p>
          </div>

          <div className="Ride flex-col gap-4 flex items-center justify-center">
            <img src="https://res.cloudinary.com/dcrkdgbd9/image/upload/v1778225232/Ride_z3cbfy.svg" alt="Ride" width="400" height="400" />
            <h1 className="text-lg font-semibold">Fast Delivery</h1>
            <p className="text-md text-center">
              Rider on the way quickly, no late scene <br />
              food reaches you hot and fresh
            </p>
          </div>

          <div className="Serve flex-col gap-4 flex items-center justify-center">
            <img src="https://res.cloudinary.com/dcrkdgbd9/image/upload/v1778225232/Serve_awblgx.svg" alt="Serve" width="400" height="400" />
            <h1 className="text-lg font-semibold">Ready to Enjoy</h1>
            <p className="text-md text-center">
              Open, eat, and enjoy with family <br />
              full taste, full satisfaction guaranteed
            </p>
          </div>
        </div>
      </div>
  )
}

export default Services
