import { Input } from "@material-tailwind/react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/signin");
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-silver">
      <div className="p-8 rounded-xl shadow-xl bg-white w-[450px] mx-2">
        <p className="text-xl font-bold my-3">Reset Password</p>
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <Input
            name="oldPassword"
            label="Enter Old Password"
            type="password"
            size="lg"
          />

          <Input
            name="newPassword"
            label="Enter New Password"
            type="password"
            size="lg"
          />
          <div class="pt-1">
            <button
              class="block w-full select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
              data-ripple-light="true"
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
