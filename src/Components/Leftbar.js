import React from "react";
import { List, ListItem } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import toast, { Toaster } from 'react-hot-toast';

const Leftbar = () => {
  const navigate = useNavigate();

  const handleOnClick = () => {
    window.scrollTo(0, 0);
  };

  const logOut = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/admin/log-out",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
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
    <div className="w-full max-w-[20rem] p-4">
      <List className="overflow-y-auto h-screen">
        <Link to="/home" onClick={handleOnClick}>
          <ListItem>Admin</ListItem>
        </Link>
        <Link to="/home/faq" onClick={handleOnClick}>
          <ListItem>FAQ's</ListItem>
        </Link>
        <Link to="/home/history" onClick={handleOnClick}>
          <ListItem>Case History</ListItem>
        </Link>
        <Link to="/home/advocate" onClick={handleOnClick}>
          <ListItem>Add Lawer</ListItem>
        </Link>
        <Link to="/home/servicess" onClick={handleOnClick}>
          <ListItem>Add Practice Area</ListItem>
        </Link>
        <Link to="/home/client_comment" onClick={handleOnClick}>
          <ListItem>Client Comment</ListItem>
        </Link>

        <Link to="/home/client_request" onClick={handleOnClick}>
          <ListItem>Client Consultancy Request</ListItem>
        </Link>

        <Link to="/home/client_contact" onClick={handleOnClick}>
          <ListItem>Client Contact</ListItem>
        </Link>

        <Link to="/reset-password">
          <ListItem>Reset Password</ListItem>
        </Link>

        <ListItem onClick={logOut}>
          <AiOutlineLogin className="mr-2" />
          Logout
        </ListItem>
      </List>
      <Toaster />
    </div>
  );
};

export default Leftbar;
