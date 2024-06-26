import React, { useState } from "react";
import { List, ListItem } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      console.log(data);
      const { success, message } = data;
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
    <div className="h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 ">
      <List>
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
          <ListItem>Client Request</ListItem>
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
      <ToastContainer />
    </div>
  );
};

export default Leftbar;
