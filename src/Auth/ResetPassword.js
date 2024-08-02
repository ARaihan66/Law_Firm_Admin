import { Input } from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';

const ResetPassword = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const { oldPassword, newPassword } = formData;

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `https://law-firm-backend-sigma.vercel.app/api/admin/password-change`,
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

      const { success, message } = data;

      if (success) {
        toast.success(message);
        navigate("/")
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
        <p className="text-xl font-bold my-3">Reset Password</p>
        <form className="flex flex-col gap-4" onSubmit={handleOnSubmit}>
          <Input
            name="oldPassword"
            value={oldPassword}
            label="Enter Old Password"
            type="password"
            size="lg"
            onChange={handleOnChange}
          />

          <Input
            name="newPassword"
            value={newPassword}
            label="Enter New Password"
            type="password"
            size="lg"
            onChange={handleOnChange}
          />
          <div class="pt-1">
            <button
              class="block w-full select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              data-ripple-light="true"
            >
              UPDATE
            </button>
          </div>
        </form>
      </div>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
