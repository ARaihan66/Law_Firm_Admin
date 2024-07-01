import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { Link } from "react-router-dom";
const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:8000/api/admin/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      const {success, message } = data;
      
      if (success) {
        toast.success(message);
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
        <p className="text-xl font-bold my-3">Sign Up</p>
        <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
          <Input
            name="username"
            value={username}
            label="Enter Name"
            type="text"
            size="lg"
            onChange={handleOnChange}
          />
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
          <button
            class="block w-full select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="submit"
            data-ripple-light="true"
          >
            Sign Up
          </button>
        </form>
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
      <Toaster />
    </div>
  );
};

export default SignUp;