import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { register, reset } from "../features/auth/authSlice";
import background3 from "../assets/icon1.png";

const Register = () => {
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    password2: "",
    age: "",
    gender: "",
  });

  const { email, password, password2, age, gender } = formData;

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

  const submitRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !password2 || !age || !gender) {
      toast.error("Please fill in all fields");
    } else if (!email.endsWith("@mahindrauniversity.edu.in")) {
      toast.error("Invalid Email ID");
    } else if (password !== password2) {
      toast.error("Passwords do not match");
    } else if (password.length < 8) {
      toast.error("Password must be atleast 8 characters");
    } else {
      const userData = {
        email,
        password,
        password2,
        age,
        gender,
      };
      //console.log(userData);
      dispatch(register(userData));
    }
  };

  return (
    <div
      className="relative flex flex-col w-full h-screen text-white justify-center items-center"
      style={{
        backgroundImage: `url(${background3})`,
        backgroundSize: "contain",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
    >
      <div className="flex flex-col p-5 text-[#ffffff] rounded-lg border-solid border-8 border-[#191919] bg-[#111111]">
        <h2 className="font-azeret text-2xl sm:text-4xl">Welcome</h2>
        <p className="text-lg sm:text-3xl font-mono">
          Sign up and let the magic unfold!
        </p>
        <form className="flex flex-col" onSubmit={submitRegister}>
          <p className="mt-6 text-white font-bold font-cutive">Email</p>
          <input
            type="email"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={onChange}
          />
          <p className="text-white font-bold font-cutive">
            e.g.DarthVader@DeathStarU.edu.in
          </p>
          <p className="mt-6 text-white font-bold font-cutive">Password</p>
          <input
            type="password"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
            id="password"
            name="password"
            placeholder="Enter password"
            value={password}
            onChange={onChange}
          />
          <p className="text-white font-bold font-cutive">
            Create a strong and fresh password
          </p>
          <p className="mt-6 text-white font-bold font-cutive">
            Confirm Password
          </p>
          <input
            type="password"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
            id="password2"
            name="password2"
            value={password2}
            placeholder="Confirm password"
            onChange={onChange}
          />
          <p className="mt-6 text-white font-bold font-cutive">Age</p>
          <input
            type="text"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
            id="age"
            name="age"
            value={age}
            placeholder="Enter age"
            onChange={onChange}
          />
          <p className="mt-6 text-white font-bold font-cutive">Gender</p>
          <input
            type="text"
            className="px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500 text-black"
            id="gender"
            name="gender"
            placeholder="Enter Male | Female"
            value={gender}
            onChange={onChange}
          />
          <div className="mt-6">
            <button
              type="submit"
              className=" px-4 py-2 border rounded-md bg-black text-white font-bold text-lg focus:outline-none hover:bg-gray-800"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
