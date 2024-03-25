import React, { useState, useEffect } from "react";
import avater from "../Assets/avater.png";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const ClientContact = () => {
  const [contacts, setContacts] = useState("");
  const navigate = useNavigate();
  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/contact/delete/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      const data = await response.json();
      console.log(data);
      const { message, success } = data;
      toast(message);

      if (success) {
        setTimeout(() => {
          navigate(0, { reload: true });
        }, 6000);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.BASE_URL}/api/contact/get`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const { success, data } = await response.json();

        if (success) {
          setContacts(data);
        } else {
          toast("No comment is vailable");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div>
      <p className="text-center pt-5 text-3xl font-semibold text-deep-purple-800">
        Client Contact
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {contacts &&
          contacts?.map((item, i) => (
            <Card className="mt-6 relative" key={i}>
              <CardBody className="mb-14">
                <Typography variant="h5" className="mb-2">
                  {item.name}
                </Typography>
                <Typography>
                  <p className="text-xl font-semibold mt-1 ">
                    Subject :
                    <span className="text-[17px] font-normal ml-1">
                      <br />
                      {item.subject}
                    </span>
                  </p>
                  <p className="text-xl font-semibold mt-1 ">
                    Email :
                    <span className="text-[17px] font-normal ml-1">
                      <br /> {item.email}
                    </span>
                  </p>
                  <p className="text-xl font-semibold mt-1">
                    Comment :
                    <span className="text-[17px] font-normal ml-1">
                      <br /> {item.message}
                    </span>
                  </p>
                </Typography>
              </CardBody>
              <CardFooter className="pt-0 absolute bottom-0">
                <Button
                  color="red"
                  className="mb-0"
                  onClick={() => {
                    handleDelete(item._id);
                  }}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default ClientContact;
