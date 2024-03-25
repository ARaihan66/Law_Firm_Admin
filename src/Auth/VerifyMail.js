import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const VerifyMail = () => {
  const [statusMessage, setStatusMessage] = useState("");

  const { id, token } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.BASE_URL}/api/admin/${id}/verify/${token}`
        );
        const { message } = response.data;
        setStatusMessage(message);
      } catch (error) {
        if (error.response) {
          console.log(error.message);
        }
      }
    };

    fetchData(); // Call the async function
  }, [id, token]); // Add dependencies to the dependency array if needed

  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden py-6 sm:py-12 bg-white">
      <div className="max-w-xl px-5 text-center">
        <h2 className="mb-2 text-[42px] font-bold text-zinc-800">
          {statusMessage}
        </h2>
        <Link
          to="/"
          className="mt-3 inline-block w-96 rounded bg-indigo-600 px-5 py-3 font-medium text-white shadow-md shadow-indigo-500/20 hover:bg-indigo-700"
        >
          Sign In
        </Link>
      </div>
    </div>
  );
};

export default VerifyMail;
