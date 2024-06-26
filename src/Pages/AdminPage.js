import React, { useRef } from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";

import Lottie from "lottie-web";

const AdminPage = () => {
  const [data, setData] = useState([]);
  const [id, setId] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [formData, setFormData] = useState({
    instituteName: "",
    about: "",
    imageUrl: null,
  });
  const animation = useRef(null);

  const { instituteName, about, imageUrl } = formData;

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      imageUrl: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("imageUrl", imageUrl);
    formDataToSend.append("instituteName", instituteName);
    formDataToSend.append("about", about);

    try {
      const response = await fetch(`http://localhost:8000/api/admin/add`, {
        method: "PUT",
        credentials: "include",
        body: formDataToSend,
      });

      const responseData = await response.json();
      console.log(responseData);

      // Handle success and navigate if needed
      if (responseData.success) {
        toast(responseData.message);
        navigate(0, { reload: true });
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const handleUpdate = (adminId, instituteName, about) => {
    setId(adminId);
    setUpdateData(true);
    setFormData({
      instituteName,
      about,
    });
    window.scrollTo(0, 0);
  };

  const handleUpdateSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("imageUrl", imageUrl);
    formDataToSend.append("instituteName", instituteName);
    formDataToSend.append("about", about);

    try {
      const response = await fetch(
        `http://localhost:8000/api/admin/update/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formDataToSend,
        }
      );

      const responseData = await response.json();
      console.log(responseData);

      // Handle success and navigate if needed
      if (responseData.success) {
        toast(responseData.message);
        setTimeout(() => {
          navigate(0, { reload: true });
        }, 6000);
      } else {
        toast.error(responseData.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/admin/get`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });

        const serviceData = await response.json();
        //console.log(serviceData);
        const { data, message } = serviceData;
        toast(message);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <p ref={animation}></p>
      <p className="text-center uppercase pt-5 text-3xl font-semibold text-deep-purple-800">
      Admin Information
      </p>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="mt-6 p-8 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow rounded">
            <input
              type="file"
              name="imageUrl"
              onChange={handleFileChange}
              size="lg"
            />
            <Input
              type="text"
              onChange={handleOnChange}
              name="instituteName"
              value={instituteName}
              size="lg"
              label="Your Institute Name"
            />
            <Textarea
              onChange={handleOnChange}
              name="about"
              value={about}
              size="lg"
              label="About Yourself"
            />

            {updateData ? (
              <Button color="blue" type="button" onClick={handleUpdateSubmit}>
                Update Admin
              </Button>
            ) : (
              <Button color="blue" type="button" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <div className="md:px-20 p-5 grid grid-cols-1  gap-4">
          {data && data.length > 0 && (
            <Card className="mt-6 relative">
              <CardHeader color="blue-gray" className="mt-4">
                <img
                  src={`http://localhost:8000/` + data[0]?.imageUrl}
                  alt="cardimageUrl"
                  className="w-[100%] object-cover"
                />
              </CardHeader>
              <CardBody className="mb-14">
                <div>
                  <div>
                    <h1 className="text-xl font-semibold">
                      Institute Name :
                      <span className="text-[17px] font-normal ml-1">
                        <br />
                        {data[0]?.instituteName}
                      </span>
                    </h1>

                    <p className="text-xl font-semibold mt-1">
                      About :
                      <span className="text-[17px] font-normal ml-1">
                        <br /> {data[0]?.about}
                      </span>
                    </p>
                  </div>
                </div>
              </CardBody>
              <CardFooter className="pt-0 absolute bottom-0 w-full">
                <div className="flex justify-center ">
                  <Button
                    onClick={() => {
                      handleUpdate(
                        data[0]?._id,
                        data[0]?.instituteName,
                        data[0]?.about
                      );
                    }}
                    color="green"
                  >
                    Update
                  </Button>
                </div>
              </CardFooter>
            </Card>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminPage;
