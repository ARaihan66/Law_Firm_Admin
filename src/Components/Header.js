import React from "react";
import { Navbar, IconButton } from "@material-tailwind/react";
import logo from "../Assets/Logo.png";
import { Link } from "react-router-dom";
const Header = ({ openDrawer }) => {
  return (
    <Navbar className="sticky top-0 z-10 h-max max-w-full rounded-none py-2 px-4 lg:px-8 lg:py-4">
      <div className="flex items-center justify-between text-blue-gray-900">
        <Link to="/home">
          <div className="flex items-center">
            <img src={logo} alt="brand" className="w-[300px] h-[80px]" />
            {/*<div className="h-[50px] w-[3px] bg-indigo-900 mx-2"></div>
            <p className="text-xl font-semibold uppercase">PROFILE</p>*/}
          </div>
        </Link>

        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={openDrawer}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </IconButton>
      </div>
    </Navbar>
  );
};

export default Header;
