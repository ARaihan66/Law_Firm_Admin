import React from "react";
import { Input, Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@material-tailwind/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const Advocate = () => {
  const [data, setData] = useState();
  const [id, setId] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    experience: "",
    designation: "",
    description: "",
    imageUrl: null,
  });

  const { name, experience, designation, description, imageUrl } = formData;

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
    formDataToSend.append("name", name);
    formDataToSend.append("experience", experience);
    formDataToSend.append("designation", designation);
    formDataToSend.append("description", description);
    formDataToSend.append("imageUrl", imageUrl);

    try {
      const responseData = await fetch(
        `http://localhost:8000/api/advocate/add`,
        {
          method: "POST",
          credentials: "include",
          body: formDataToSend,
        }
      );

      const data = await responseData.json();
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

  const handleUpdate = (id, name, experience, designation, description) => {
    setId(id);
    setUpdateData(true);
    setFormData({
      name: name,
      experience: experience,
      designation: designation,
      description: description,
    });
    window.scrollTo(0, 0);
  };

  const handleUpdateSubmit = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("experience", experience);
    formDataToSend.append("designation", designation);
    formDataToSend.append("description", description);
    formDataToSend.append("imageUrl", imageUrl);
    try {
      const response = await fetch(
        `http://localhost:8000/api/advocate/update/${id}`,
        {
          method: "PUT",
          credentials: "include",
          body: formDataToSend,
        }
      );

      const data = await response.json();
      //console.log(data);
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/advocate/delete/${id}`,
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
        const response = await fetch(`http://localhost:8000/api/advocate/get`, {
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
      {" "}
      <p className="text-center uppercase pt-5 text-3xl font-semibold text-deep-purple-800">
        Add Lawer
      </p>
      <div className="flex justify-center">
        <form action="" onSubmit={handleSubmit}>
          <div className="mt-6 p-8 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow rounded-lg">
            <input
              type="file"
              name="imageUrl"
              onChange={handleFileChange}
              size="lg"
            />
            <Input
              type="text"
              name="name"
              value={name}
              onChange={handleOnChange}
              size="lg"
              label="Lawer Name"
            />
            <Input
              type="text"
              name="experience"
              value={experience}
              onChange={handleOnChange}
              size="lg"
              label="Experience"
            />
            <Input
              type="text"
              name="designation"
              value={designation}
              onChange={handleOnChange}
              size="lg"
              label="Designation"
            />
            <Textarea
              type="text"
              name="description"
              value={description}
              onChange={handleOnChange}
              size="lg"
              label="Description"
            />
            {updateData ? (
              <Button color="blue" type="button" onClick={handleUpdateSubmit}>
                Update Lawer
              </Button>
            ) : (
              <Button color="blue" type="button" onClick={handleSubmit}>
                Add Lawer
              </Button>
            )}
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <div className="md:px-20 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {data &&
            data?.map((item, i) => (
              <Card className="mt-6 relative" key={i}>
                <CardHeader color="blue-gray" className="mt-4">
                  <img
                    src={`http://localhost:8000/` + item.imageUrl}
                    alt="cardimageUrl"
                    className="w-[100%] object-cover"
                  />
                </CardHeader>
                <CardBody className="mb-14">
                  <div>
                    <div>
                      <h1 className="text-xl font-semibold">
                        Name :
                        <span className="text-[17px] font-normal ml-1">
                          <br />
                          {item.name}
                        </span>
                      </h1>
                      <p className="text-xl font-semibold mt-1">
                        Experience :
                        <span className="text-[17px] font-normal ml-1">
                          <br /> {item.experience}
                        </span>
                      </p>
                      <p className="text-xl font-semibold mt-1">
                        Designation :
                        <span className="text-[17px] font-normal ml-1">
                          <br /> {item.designation}
                        </span>
                      </p>
                      <p className="text-xl font-semibold mt-1">
                        Description :
                        <span className="text-[17px] font-normal ml-1">
                          <br /> {item.description}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="pt-0 absolute bottom-0 w-full">
                  <div className="flex justify-between ">
                    <Button
                      onClick={() => {
                        handleUpdate(
                          item._id,
                          item.name,
                          item.experience,
                          item.designation,
                          item.description
                        );
                      }}
                      color="green"
                    >
                      Update
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(item._id);
                      }}
                      color="red"
                      className=""
                    >
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};
