import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecoveryPassword = () => {
  const [formData, setFormData] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const { newPassword, confirmPassword } = formData;

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setFormData((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const { id, token } = useParams();

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/${id}/reset/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
 
      const { message, success } = data;
      toast(message);

      if (success) {
        setTimeout(() => {
          navigate("/");
        }, 6000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-silver">
      <div className="p-8 rounded-xl shadow-xl bg-white w-[450px] mx-2">
        <p className="text-xl font-bold my-3">Password Recovery</p>
        <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
          <Input
            name="newPassword"
            value={newPassword}
            onChange={handleOnChange}
            label="Enter New Password"
            type="password"
            size="lg"
          />
          <Input
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleOnChange}
            label="Enter Confirm Password"
            type="password"
            size="lg"
          />
          <div class="pt-1">
            <button
              class="block w-full select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
            >
              SUBMIT
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default RecoveryPassword;
