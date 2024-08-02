import { Input, Textarea } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import Lottie from "react-lottie";
import Loading from "../Animation/Loader.json";
import toast, { Toaster } from 'react-hot-toast';
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addServiceData, deleteServiceData, fetchServiceData, updateServiceData } from "../features/serviceSlice";


const Services = () => {
  const [id, setId] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [formData, setFormData] = useState({
    service_type: "",
    service_description: "",
  });

  const { service_type, service_description } = formData;

  const { isLoading, data, error } = useSelector((state) => state.service);
  const dispatch = useDispatch();

  const handleOnChange = (event) => {
    setFormData((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (!service_type || !service_description) {
      toast.error("Please fill up all fields");
      return;
    }

    try {
      if (updateData) {
        const response = await dispatch(updateServiceData({ id, formData })).unwrap();
        if (response.success) {
          toast.success(response.message);
          resetForm();
        } else {
          toast.error(response.message || "Update failed");
        }
      } else {
        const response = await dispatch(addServiceData(formData)).unwrap();
        if (response.success) {
          toast.success(response.message);
          resetForm();
        } else {
          toast.error(response.message || "Addition failed");
        }
      }
    } catch (error) {
      toast.error("Operation failed: " + error.message);
    }
  };
  


  const handleUpdate = (id, service_type, service_description) => {
    setId(id);
    setUpdateData(true);
    setFormData({
      service_type: service_type,
      service_description: service_description,
    });
    window.scrollTo(0, 0);
  };


  const handleDelete = async (id) => {
    dispatch(deleteServiceData(id))
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

  const resetForm = () => {
    setUpdateData(false);
    setId(null);
    setFormData({ service_type: "", service_description: "" });
    dispatch(fetchServiceData());
  };

  useEffect(() => {
   dispatch(fetchServiceData())
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
      {" "}
      <p className="text-center uppercase pt-5 text-3xl font-semibold text-deep-purple-800">
        Add Practice Area
      </p>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="mt-6 p-8 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow rounded">
            <Input
              onChange={handleOnChange}
              size="lg"
              label="Practice Type"
              name="service_type"
              value={service_type}
            />
            <Textarea
              onChange={handleOnChange}
              size="lg"
              name="service_description"
              value={service_description}
              label="Practice Description"
            />

            {updateData ? (
              <Button color="blue" type="submit" >
                Update Practice Area
              </Button>
            ) : (
              <Button color="blue" type="submit">
                Add Practice Area
              </Button>
            )}
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <div>
          {data &&
            data?.map((item, i) => (
              <Card
                key={i}
                className="mt-6  w-[350px] md:w-[600px] lg:w-[900px]"
              >
                <CardBody>
                  <Typography variant="h5" color="blue-gray" className="mb-2">
                    {item.service_type}
                  </Typography>
                  <Typography>{item.service_description}</Typography>
                </CardBody>
                <CardFooter className="pt-0 flex justify-between">
                  <Button
                    onClick={() => {
                      handleUpdate(
                        item._id,
                        item.service_type,
                        item.service_description
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
                  >
                    Delete
                  </Button>
                </CardFooter>
              </Card>
            ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Services;
