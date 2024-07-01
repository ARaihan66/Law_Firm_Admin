import React, { useEffect, useState } from "react";
import { Input, Textarea, Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addQuestionData, deleteQuestionData, fetchQuestionData, updateQuestionData } from "../features/questionSlice";
import Lottie from "react-lottie";
import Loading from "../Animation/Loader.json";
import toast, { Toaster } from 'react-hot-toast';

const Question = () => {
  const [id, setId] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  });

  const { isLoading, data, error } = useSelector((state) => state.question);
  const dispatch = useDispatch();

  const { question, answer } = formData;

  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!question || !answer) {
      toast.error("Please fill up all fields");
      return;
    }

    if (updateData) {
      dispatch(updateQuestionData({ id, formData }))
        .unwrap()
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            resetForm();
          } else {
            toast.error(response.message || "Update failed");
          }
        })
        .catch((error) => {
          toast.error("Update failed: " + error.message);
        });
    } else {
      dispatch(addQuestionData(formData))
        .unwrap()
        .then((response) => {
          if (response.success) {
            toast.success(response.message);
            resetForm();
          } else {
            toast.error(response.message || "Addition failed");
          }
        })
        .catch((error) => {
          toast.error("Addition failed: " + error.message);
        });
    }
  };

  const handleUpdate = (id, question, answer) => {
    setId(id);
    setUpdateData(true);
    setFormData({ question, answer });
    window.scrollTo(0, 0);
  };

  const resetForm = () => {
    setUpdateData(false);
    setId(null);
    setFormData({ question: "", answer: "" });
    dispatch(fetchQuestionData());
  };

  const handleDelete = (id) => {
    dispatch(deleteQuestionData(id))
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
    dispatch(fetchQuestionData());
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
        Frequently Asked Questions
      </p>
      <div className="flex justify-center">
        <form onSubmit={handleSubmit}>
          <div className="mt-6 p-6 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow-lg rounded-lg">
            <Input
              name="question"
              value={question}
              onChange={handleOnChange}
              size="lg"
              label="Question"
            />
            <Textarea
              name="answer"
              value={answer}
              onChange={handleOnChange}
              size="lg"
              label="Answer"
            />
            <Button color="blue" type="submit">
              {updateData ? "Update FAQ" : "Add FAQ"}
            </Button>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <div>
          {data?.length > 0 && data.map((item, i) => (
            <Card key={i} className="mt-6 w-[350px] md:w-[600px] lg:w-[900px]">
              <CardBody>
                <Typography variant="h5" color="blue-gray" className="mb-2">
                  {item.question}
                </Typography>
                <Typography>{item.answer}</Typography>
              </CardBody>
              <CardFooter className="pt-0 flex justify-between">
                <Button onClick={() => handleUpdate(item._id, item.question, item.answer)} color="green">
                  Update
                </Button>
                <Button onClick={() => handleDelete(item._id)} color="red">
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

export default Question;
