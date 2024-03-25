import React, { useEffect } from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const Question = () => {
  const [data, setData] = useState("");
  const [id, setId] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const navigate = useNavigate();

  const { question, answer } = formData;

  const handleOnChange = (event) => {
    setFormData((preState) => ({
      ...preState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${process.env.BASE_URL}/api/faq/add`, {
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

  const handleUpdate = (id, question, answer) => {
    setId(id);
    setUpdateData(true);
    setFormData({
      question: question,
      answer: answer,
    });
    window.scrollTo(0, 0);
  };

  const handleUpdateSubmit = async () => {
    try {
      const response = await fetch(
        `${process.env.BASE_URL}/api/faq/update/${id}`,
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
        `${process.env.BASE_URL}/api/faq/delete/${id}`,
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
          `${process.env.BASE_URL}/api/faq/get`,
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
          setData(data);
        } else {
          toast("No FAQ's added yet");
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
        FAQ's
      </p>
      <div className="flex justify-center">
        <form action="">
          <div className="mt-6 p-6 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow-lg rounded-lg">
            <Input
              name="question"
              value={question}
              onChange={handleOnChange}
              size="lg"
              label="Question"
            />
            <Input
              name="answer"
              value={answer}
              onChange={handleOnChange}
              size="lg"
              label="Answer"
            />
            {updateData ? (
              <Button color="blue" type="button" onClick={handleUpdateSubmit}>
                Update Faq's
              </Button>
            ) : (
              <Button color="blue" type="button" onClick={handleSubmit}>
                Add Faq's
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
                    {item.question}
                  </Typography>
                  <Typography>{item.answer}</Typography>
                </CardBody>
                <CardFooter className="pt-0 flex justify-between">
                  <Button
                    onClick={() => {
                      handleUpdate(item._id, item.question, item.answer);
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

export default Question;
