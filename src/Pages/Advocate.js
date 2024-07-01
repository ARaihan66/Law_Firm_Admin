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
import { useDispatch, useSelector } from "react-redux";
import { addLawerData, deleteLawerData, fetchLawerData, updateLawerData } from "../features/lawerSlice";
import Lottie from "react-lottie";
import Loading from "../Animation/Loader.json";
import toast, { Toaster } from "react-hot-toast";

export const Advocate = () => {
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

  const { isLoading, data, error } = useSelector((state) => state.lawer);
  const dispatch = useDispatch();


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

    if (!name || !experience || !designation || !description) {
      toast.error("Please fill up all fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("name", name);
    formDataToSend.append("experience", experience);
    formDataToSend.append("designation", designation);
    formDataToSend.append("description", description);
    formDataToSend.append("imageUrl", imageUrl);
    
    if (updateData) {
      dispatch(updateLawerData({id, formData: formDataToSend }))
      .unwrap()
      .then((response) => {
        console.log("Res", response.payload);
        if (response.payload.success) {
          toast.success(response.payload.message);
          resetForm();
        } else {
          toast.error(response.payload.message || "Update failed");
        }
      }).catch((error) => {
        toast.error("Update failed: " + error.message);
        console.log(error)
      });
    } else {
      dispatch(addLawerData(formDataToSend)).then((response) => {
        if (response.payload.success) {
          toast.success(response.payload.message);
          resetForm();
        } else {
          toast.error(response.payload.message || "Addition failed");
        }
      }).catch((error) => {
        toast.error("Addition failed: " + error.message);
      });
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

 

  const handleDelete = async (id) => {
    dispatch(deleteLawerData(id))
      .unwrap()
      .then((response) => {
        if (response === id) {
          toast.success("Lawer deleted successfully");
        } else {
          toast.error("Error deleting case history");
        }
      })
      .catch((error) => {
        toast.error("Deletion failed: " + error.message);
      });
  };


  const resetForm = () => {
    setUpdateData(false);
    setId(null);
    setFormData({ 
      name: "",
      experience: "",
      designation: "",
      description: "",});
    dispatch(fetchLawerData());
  };

  useEffect(() => {
    dispatch(fetchLawerData())
  }, [dispatch]);

  const defaultLoader = {
    loop: true,
    autoplay: true,
    animationData: Loading,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
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
              <Button color="blue" type="submit">
                Update Lawer
              </Button>
            ) : (
              <Button color="blue" type="submit">
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
      <Toaster />
    </div>
  );
};
