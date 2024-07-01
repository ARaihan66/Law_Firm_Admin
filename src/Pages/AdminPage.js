import React, { useState, useEffect } from "react";
import { Input, Textarea, Button, Card, CardBody, CardFooter, CardHeader } from "@material-tailwind/react";
import Lottie from "react-lottie";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminData, addAdmin, updateAdmin, deleteAdmin } from "../features/adminSlice";
import Loading from "../Animation/Loader.json";
import toast, { Toaster } from 'react-hot-toast';

const AdminPage = () => {
  const [id, setId] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [formData, setFormData] = useState({
    instituteName: "",
    about: "",
    imageUrl: null,
  });
  const { isLoading, data, error } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const { instituteName, about, imageUrl } = formData;

  useEffect(() => {
    dispatch(fetchAdminData());
  }, [dispatch]);

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

    if (!instituteName || !about) {
      toast.error("Please fill up all fields");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("imageUrl", imageUrl);
    formDataToSend.append("instituteName", instituteName);
    formDataToSend.append("about", about);

    if (updateData) {
      dispatch(updateAdmin({ id, formData: formDataToSend })).then((response) => {
        if (response.payload.success) {
          toast.success(response.payload.message);
          resetForm();
        } else {
          toast.error(response.payload.message);
        }
      });
    } else {
      dispatch(addAdmin(formDataToSend)).then((response) => {
        if (response.payload.success) {
          toast.success(response.payload.message);
          resetForm();
        } else {
          toast.error(response.payload.message);
        }
      });
    }
  };

  const resetForm = () => {
    setUpdateData(false);
    setId(null);
    setFormData({ instituteName: "", about: "", imageUrl: null });
    dispatch(fetchAdminData());
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

  //const handleDelete = (adminId) => {
  //  dispatch(deleteAdmin(adminId)).then((response) => {
  //    if (response.type === "admin/deleteAdmin/fulfilled") {
  //      toast.success("Admin deleted successfully");
  //      dispatch(fetchAdminData());
  //    } else {
  //      toast.error("Error deleting admin");
  //    }
  //  });
  //};

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
            <Button color="blue" type="submit">
              {updateData ? "Update Admin" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <div className="md:px-20 p-5 grid grid-cols-1 gap-4">
          {data?.length > 0 &&
            data.map((item, index) => (
              <Card key={index} className="mt-6 relative">
                <CardHeader color="blue-gray" className="mt-4">
                  <img
                    src={`http://localhost:8000/${item?.imageUrl}`}
                    alt="cardimageUrl"
                    className="w-[100%] object-cover"
                  />
                </CardHeader>
                <CardBody className="mb-14">
                  <div>
                    <h1 className="text-xl font-semibold">
                      Institute Name:
                      <span className="text-[17px] font-normal ml-1">
                        <br />
                        {item?.instituteName}
                      </span>
                    </h1>
                    <p className="text-xl font-semibold mt-1 text-justify">
                      About:
                      <span className="text-[17px] font-normal ml-1">
                        <br /> {item?.about}
                      </span>
                    </p>
                  </div>
                </CardBody>
                <CardFooter className="pt-0 absolute bottom-0 w-full">
                  <div className="flex justify-center items-center">
                    <Button
                      onClick={() =>
                        handleUpdate(item._id, item.instituteName, item.about)
                      }
                      color="green"
                    >
                      Update
                    </Button>
                    {/*<Button
                      onClick={() => handleDelete(item._id)}
                      color="red"
                    >
                      Delete
                    </Button>*/}
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

export default AdminPage;
