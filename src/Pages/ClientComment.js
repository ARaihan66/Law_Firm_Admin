import React, { useState, useEffect } from "react";
import avater from "../Assets/avater.png";
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
import { deleteCommentData, fetchCommentData } from "../features/commentSlice";

export const ClientComment = () => {
  //const [id, setId] = useState(null);

  const { isLoading, data, error } = useSelector((state) => state.comment);
  console.log(data)
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    dispatch(deleteCommentData(id))
    .unwrap()
    .then((response) => {
      if (response === id) {
        toast.success("FAQ deleted successfully");
      } else {
        toast.error("Error deleting FAQ");
      }
    })
    .catch((error) => {
      toast.error(error.message);
    });
  };


  useEffect(() => {
    dispatch(fetchCommentData())
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
        Words form Client
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
        {data &&
          data?.map((item, i) => (
            <Card className="mt-6 relative" key={i}>
              <div className="flex justify-center">
                <img src={avater} alt="cardimage" className="w-[100px] mt-4" />
              </div>
              <CardBody className="mb-14">
                <Typography variant="h5" className="mb-2">
                  {item.name}
                </Typography>
                <Typography>
                  <p className="text-xl font-semibold mt-1 ">
                    Phone :
                    <span className="text-[17px] font-normal ml-1">
                      <br />
                      {item.phone}
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
                      <br /> {item.comment}
                    </span>
                  </p>
                </Typography>
              </CardBody>
              <CardFooter className="pt-0 bottom-0">
                <div className="flex justify-between">
                  <Button
                    color="red"
                    className="mb-0"
                    onClick={() => {
                      handleDelete(item._id);
                    }}
                  >
                    Delete
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
      <Toaster />
    </div>
  );
};
