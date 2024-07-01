import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import Lottie from "react-lottie";
import Loading from "../Animation/Loader.json";
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from "react-redux";
import { deleteContactData, fetchContactData } from "../features/clientContactSlice";


const ClientContact = () => {
  
  const { isLoading, data, error } = useSelector((state) => state.contact);

  const dispatch = useDispatch();


  const handleDelete = async (id) => {
    dispatch(deleteContactData(id))
      .unwrap()
      .then((response) => {
        if (response === id) {
          toast.success("Request deleted successfully");
        } else {
          toast.error("Error deleting request");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  useEffect(() => {
  dispatch(fetchContactData())
  }, [dispatch]);


  const defaultLoader = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[100vh]">
        <Lottie options={defaultLoader} height={200} width={200} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[100vh] font-bold text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div>
      <p className="text-center uppercase pt-5 text-3xl font-semibold text-deep-purple-800">
        Client Contact
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {data &&
          data?.map((item, i) => (
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
      <Toaster />
    </div>
  );
};

export default ClientContact;
