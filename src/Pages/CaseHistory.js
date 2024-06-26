import React from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import { Card, CardBody, CardFooter } from "@material-tailwind/react";

const CaseHistory = () => {
  const [data, setData] = useState();
  const [id, setId] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [formData, setFormData] = useState({
    achievement: "",
    numeric: "",
  });

  const { achievement, numeric } = formData;

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    //const formDataToSend = new FormData();
    //formDataToSend.append("achievement", achievement);
    //formDataToSend.append("numeric", numeric);

    //console.log(formDataToSend);
    try {
      const responseData = await fetch(`http://localhost:8000/api/case/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const data = await responseData.json();
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

  const handleUpdate = (id, achievement, numeric) => {
    setId(id);
    setUpdateData(true);
    setFormData({
      achievement: achievement,
      numeric: numeric,
    });
    window.scrollTo(0, 0);
  };

  const handleUpdateSubmit = async () => {
    //const formDataToSend = new FormData();
    //formDataToSend.append("achievement", achievement);
    //formDataToSend.append("numeric", numeric);
    try {
      const response = await fetch(
        `http://localhost:8000/api/case/update/${id}`,
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
        `http://localhost:8000/api/case/delete/${id}`,
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
          `http://localhost:8000/api/case/get`,
          {
            method: "GET",
            credentials: "include",
          }
        );

        const serviceData = await response.json();
        console.log(serviceData);
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
      <p className="text-center uppercase pt-5 text-3xl font-semibold text-deep-purple-800">
        Add Case History
      </p>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="mt-6 p-8 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow rounded">
            <Input
              type="text"
              name="achievement"
              value={achievement}
              onChange={handleOnChange}
              size="lg"
              label="Case History Achievement"
            />
            <Input
              type="text"
              name="numeric"
              value={numeric}
              onChange={handleOnChange}
              size="lg"
              label="Case History Numeric"
            />

            {updateData ? (
              <Button color="blue" type="button" onClick={handleUpdateSubmit}>
                Update
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
        <div className="md:px-10 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {data &&
            data?.map((item, i) => (
              <Card className="mt-6 relative" key={i}>
                <CardBody className="mb-14">
                  <div>
                    <div>
                      <h1 className="text-xl font-semibold">
                        Case History Achievement :
                        <span className="text-[17px] text-xl font-normal ml-1">
                          <br />
                          {item.achievement}
                        </span>
                      </h1>
                      <p className="text-xl font-semibold mt-1">
                        Case History Numeric:
                        <span className="text-[17px] font-normal ml-1">
                          <br /> {item.numeric}
                        </span>
                      </p>
                    </div>
                  </div>
                </CardBody>
                <CardFooter className="pt-0 absolute bottom-0 w-full">
                  <div className="flex justify-between ">
                    <Button
                      onClick={() => {
                        handleUpdate(item._id, item.achievement, item.numeric);
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

export default CaseHistory;
