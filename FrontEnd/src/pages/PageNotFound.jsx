import { BiHomeAlt2 } from "react-icons/bi";
import React from "react";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className="w-full flex-col h-full flexCenter">
      <img
        src="https://i.pinimg.com/originals/17/08/90/170890e64f751e6c7926f851719d4523.gif"
        className="w-[40vh] h-[40vh]"
        alt="Page not found in Punjab Pizza Club"
      />
      <h1 className="text-4xl">Page Not Found 404</h1>
      <p onClick={() => navigate("/")} className="text-lg flexCenter mt-4 gap-4">
        Return To Home <BiHomeAlt2 size={30} />
      </p>
    </div>
  );
};

export default PageNotFound;
