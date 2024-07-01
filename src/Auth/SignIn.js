import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';

import { Link, useNavigate } from "react-router-dom";
const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;
  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setFormData((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const { success, message } = data;
     
      if (success) {
        toast.success(message);
        navigate("/home")
      }else{
        toast.error(message)
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-silver">
      <div className="p-8 rounded-xl shadow-xl bg-white w-[450px] mx-2">
        <p className="text-xl font-bold my-3">Sign In</p>
        <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
          <Input
            name="email"
            value={email}
            label="Enter Email"
            type="email"
            size="lg"
            onChange={handleOnChange}
          />
          <Input
            name="password"
            value={password}
            label="Enter Password"
            type="password"
            size="lg"
            onChange={handleOnChange}
          />

          <div className="flex justify-between">
            <Link to="/forgot-password">Forgot password?</Link>
            {/*<Link to="/reset-password">Reset password?</Link>*/}
          </div>
          <div class="pt-1">
            <button
              class="block w-full select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
            >
              Sign In
            </button>
            <p class="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
              Don't have an account?
              <Link
                to="/signup"
                class="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-pink-500"
              >
                Sign up
              </Link>
            </p>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default SignIn;
