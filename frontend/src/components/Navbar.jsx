import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import background1 from "../assets/icon21.png";
import logo from "../assets/logo-img4.png";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const [Nav, setNav] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleNav = () => {
    setNav(!Nav);
  };

  const submitLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <div className="flex flex-1 justify-evenly items-center h-20 mx-auto border-solid border-8 border-[#191919] text-black font-azeret bg-[#ffffff] w-full">
      <img
        className="object-cover"
        href="/"
        src={logo}
        alt="logo"
        width="150"
      />
      <a className="hidden md:flex p-4" href="/about">
        About
      </a>
      {user ? (
        <>
          <a className="hidden md:flex p-4" href="/date">
            Date
          </a>
          <button className="hidden md:flex p-4" onClick={submitLogout}>
            Logout
          </button>
        </>
      ) : (
        <>
          <a className="hidden md:flex p-4" href="/login">
            Login
          </a>
          <a className="hidden md:flex p-4" href="/register">
            Register
          </a>
        </>
      )}
      <div onClick={HandleNav} className="flex md:hidden">
        {Nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <div
        className={
          Nav
            ? "flex flex-col fixed mt-20 right-0 top-0 w-[30%]  border-r border-r-gray-900 bg-[#ffffff] z-10 ease-out-in duration-300"
            : "fixed right-[-100%]"
        }
      >
        <a className="uppercase p-4" href="/about" onClick={(!Nav, HandleNav)}>
          About
        </a>
        {user ? (
          <>
            <a className="uppercase p-4" href="/date">
              Date
            </a>
            <a className="uppercase p-4" onClick={submitLogout}>
              Logout
            </a>
          </>
        ) : (
          <>
            <a
              className="uppercase p-4"
              href="/login"
              onClick={(!Nav, HandleNav)}
            >
              Login
            </a>
            <a
              className="uppercase p-4"
              href="/register"
              onClick={(!Nav, HandleNav)}
            >
              Register
            </a>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
