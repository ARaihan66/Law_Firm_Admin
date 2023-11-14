import { Input } from "@material-tailwind/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/home");
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-silver">
      <div className="p-8 rounded-xl shadow-xl bg-white w-[450px] mx-2">
        <p className="text-xl font-bold my-3">Sign Up</p>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
        <Input name="name" label="Enter Name" type="text" size="lg" />
          <Input name="email" label="Enter Email" type="email" size="lg" />
          <Input
            name="password"
            label="Enter Password"
            type="password"
            size="lg"
          />
          <div class="pt-1">
            <button
              class="block w-full select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              Sign Up
            </button>
            <p class="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
              Already have an account??
              <Link
                to="/"
                class="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-pink-500"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
