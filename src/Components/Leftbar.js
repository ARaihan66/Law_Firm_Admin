import React, { useState } from "react";
import { List, ListItem } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Leftbar = () => {
  const navigate = useNavigate();
  const logOut = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/admin/log-out", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

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
        <Link to="/home">
          <ListItem>Admin</ListItem>
        </Link>
        <Link to="/home/faq">
          <ListItem>FAQ's</ListItem>
        </Link>
        <Link to="/home/history">
          <ListItem>Case History</ListItem>
        </Link>
        <Link to="/home/advocate">
          <ListItem>Add Lawer</ListItem>
        </Link>
        <Link to="/home/servicess">
          <ListItem>Add Practice Area</ListItem>
        </Link>
        <Link to="/home/client_comment">
          <ListItem>Client Comment</ListItem>
        </Link>

        <Link to="/home/client_appointment">
          <ListItem>Appointment</ListItem>
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
