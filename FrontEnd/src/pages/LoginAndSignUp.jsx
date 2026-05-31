/* eslint-disable react-hooks/exhaustive-deps */
import { BiImage } from "react-icons/bi";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { BACK_END_API } from "../Constants";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const LoginAndSignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    if (user.name) {
      navigate("/");
    }
  }, []);
  const [CurrentForm, setCurrentForm] = useState("signup");
  const [isShowPass, setIsShowPass] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [profileImg, setprofileImg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageUpload = async (e) => {
    e.preventDefault();
    setLoading(true)
    const file = e.target.files[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await fetch(`${BACK_END_API}/api/auth/upload-image`, {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        toast.success(result.message);
        setprofileImg(result.url);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false)
    }
  };

  const ImgRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password.length < 8) {
      toast.error("Password Must be greater than 8 characters");
    }
    try {
      setLoading(true);
      if (CurrentForm == "login") {
        const res = await fetch(`${BACK_END_API}/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        });

        const result = await res.json();
        if (!result.success) {
          toast.error(result.message);
        } else {
          localStorage.setItem("PPCUserToken", result?.data.token);
          toast.success(`WelCome! ${result.data.name}`);
          dispatch(
            login({
              isLogged: true,
              isEmailVerified: result?.data.isEmailVerified,
              phone: result?.data.phone,
              role: result?.data.role,
              email: result?.data.email,
              profile: result?.data.profile,
              name: result?.data.name,
              address: result?.data.address,
              token: result?.data.token,
            }),
          );
          navigate("/");
        }
      } else {
        if (profileImg == "") {
          return toast.error("Please Upload Profile Image")
        }
        const res = await fetch(`${BACK_END_API}/api/auth/signup`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
            name: formData.name,
            profile: profileImg
          }),
        });

        const result = await res.json();
        if (!result.success) {
          toast.error(result.message);
        } else {
          localStorage.setItem("PPCUserToken", result?.data.token);
          toast.success(`WelCome! ${result?.data.name} Please Verify Your Email`);
          dispatch(
            login({
              isLogged: true,
              isEmailVerified: result?.data.isEmailVerified,
              phone: result?.data.phone,
              role: result?.data.role,
              profile: result?.data.profile,
              email: result?.data.email,
              name: result?.data.name,
              address: result?.data.address,
              token: result?.data.token,
            }),
          );
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="w-full sm:w-87.5 text-center bg-white/6 border border-white/10 rounded-2xl px-8"
      >
        <h1 className="text-white text-3xl mt-10 font-medium">
          {CurrentForm === "login" ? "Login" : "Sign up"}
        </h1>

        <p className="text-gray-400 text-sm mt-2">Please sign in to continue</p>

        {CurrentForm !== "login" && (
          <>
            <div className="flex justify-center items-center flex-col">
              {!profileImg && (
                <>
                  <input
                    onChange={(e) => handleImageUpload(e)}
                    ref={ImgRef}
                    hidden
                    type="file"
                  />
                  <div
                    onClick={() => ImgRef.current.click()}
                    className="w-full flex py-6 x-5 gap-2 border rounded-4xl mt-2 border-dotted justify-center items-center"
                  >
                    <BiImage size={28} />
                    Profile Image
                  </div>
                </>
              )}
              {
                Loading && "Loading.."
              }
              {profileImg && (
                <img
                  className="w-20 h-20 rounded-full"
                  src={profileImg}
                  alt="user profile"
                />
              )}
            </div>
            <div className="flex items-center mt-6 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-red-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
              <CgProfile size={27} color="gray" />
              <input
                type="text"
                name="name"
                placeholder="Name"
                className="w-full border-none outline-none "
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
          </>
        )}

        <div className="flex items-center w-full mt-4 bg-white/5 ring-2 ring-white/10 focus-within:ring-red-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
          <HiOutlineMail size={27} color="gray" />
          <input
            type="email"
            name="email"
            placeholder="Email id"
            className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none "
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className=" flex items-center mt-4 w-full bg-white/5 ring-2 ring-white/10 focus-within:ring-indigo-500/60 h-12 rounded-full overflow-hidden pl-6 gap-2 transition-all ">
          <MdPassword size={27} color="gray" />
          <input
            type={isShowPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="w-full bg-transparent text-white placeholder-white/60 border-none outline-none"
            value={formData.password}
            onChange={handleChange}
            required
          />
          {isShowPass ? (
            <FaRegEyeSlash
              onClick={() => setIsShowPass(!isShowPass)}
              size={27}
              color="gray"
              className="mr-3"
            />
          ) : (
            <FaEye
              onClick={() => setIsShowPass(!isShowPass)}
              size={27}
              color="gray"
              className="mr-3"
            />
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full h-11 rounded-full text-white bg-[#ff4757] hover:bg-[#ff4756a8] transition "
        >
          {CurrentForm === "login"
            ? Loading
              ? "Loging..."
              : "Login"
            : Loading
              ? "Creating..."
              : "Create Account"}
        </button>

        <p
          onClick={() =>
            setCurrentForm((prev) => (prev === "login" ? "register" : "login"))
          }
          className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer"
        >
          {CurrentForm === "login"
            ? "Don't have an account?"
            : "Already have an account?"}
          <span className="text-red-400 hover:underline ml-1">click here</span>
        </p>
      </form>
      {/* Soft Backdrop*/}
      <div className="fixed inset-0 -z-1 pointer-events-none">
        <div className="absolute left-1/2 top-20 -translate-x-1/2 w-245 h-115 bg-linear-to-tr from-red-800/35 to-transparent rounded-full blur-3xl" />
        <div className="absolute right-12 bottom-10 w-105 h-55 bg-linear-to-bl from-red-700/35 to-transparent rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default LoginAndSignUp;
