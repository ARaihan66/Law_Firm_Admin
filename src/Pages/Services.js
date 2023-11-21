import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
const Services = () => {
  const [data, setData] = useState("");
  const [id, setId] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [formData, setFormData] = useState({
    service_type: "",
    service_description: "",
  });

  const { service_type, service_description } = formData;

  const navigate = useNavigate();

  const handleOnChange = (event) => {
    setFormData((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/api/practice/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

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

  const handleUpdate = (id, service_type, service_description) => {
    setId(id);
    setUpdateData(true);
    setFormData({
      service_type: service_type,
      service_description: service_description,
    });
    window.scrollTo(0, 0);
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/practice/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/practice/delete/${id}`,
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
        const response = await fetch("http://localhost:8000/api/practice/get", {
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
      <p className="text-center pt-5 text-3xl font-semibold text-deep-purple-800">
        Add Practice Area
      </p>
      <div className="flex justify-center">
        <form action="">
          <div className="mt-6 p-8 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow rounded">
            <Input
              onChange={handleOnChange}
              size="lg"
              label="Practice Type"
              name="service_type"
              value={service_type}
            />
            <Input
              onChange={handleOnChange}
              size="lg"
              name="service_description"
              value={service_description}
              label="Practice Description"
            />

            {updateData ? (
              <Button color="blue" type="button" onClick={handleUpdateSubmit}>
                Update Practice Area
              </Button>
            ) : (
              <Button color="blue" type="button" onClick={handleSubmit}>
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
      <ToastContainer />
    </div>
  );
};

export default Services;
