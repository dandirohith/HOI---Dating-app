import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../features/auth/authSlice";
import background2 from "../assets/icon1.png";

const Login = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const submitLogin = (e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };

    //console.log(userData);
    dispatch(login(userData));
  };

  return (
    <div
      className="relative flex flex-col w-full h-screen text-white justify-center items-center"
      style={{
        backgroundImage: `url(${background2})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="flex flex-col p-5 text-[#ffffff] rounded-lg border-solid border-8 border-[#191919] bg-[#111111]">
        <h2 className="font-azeret text-2xl sm:text-4xl">Welcome</h2>
        <p className="text-xl sm:text-3xl font-cutive">
          Swipe. Match. Connect. Hoi.
        </p>
        <form className="flex flex-col" onSubmit={submitLogin}>
          <p className="mt-6 text-white font-bold font-cutive">Email</p>
          <input
            type="email"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
            id="email"
            name="email"
            value={email}
            onChange={onChange}
            placeholder="Enter your email"
          />
          <p className="mt-6 text-white font-bold font-cutive">Password</p>
          <input
            type="password"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
            id="password"
            name="password"
            value={password}
            onChange={onChange}
            placeholder="Enter password"
          />
          <div className="mt-6">
            <button
              type="submit"
              className=" px-4 py-2 border rounded-md bg-black text-white font-bold text-lg focus:outline-none hover:bg-gray-800"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
