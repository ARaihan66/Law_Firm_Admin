import React, { useEffect, useState } from "react";
import { Input, Button, Card, CardBody, CardFooter, Typography } from "@material-tailwind/react";
import { useDispatch, useSelector } from "react-redux";
import { addCaseData, deleteCaseData, updateCaseData, fetchCaseData } from "../features/caseHistorySlice";
import Lottie from "react-lottie";
import Loading from "../Animation/Loader.json";
import toast, { Toaster } from "react-hot-toast";

const CaseHistory = () => {
  const [id, setId] = useState(null);
  const [updateData, setUpdateData] = useState(false);
  const [formData, setFormData] = useState({
    achievement: "",
    numeric: ""
  });

  const { achievement, numeric } = formData;
  const { isLoading, data, error } = useSelector((state) => state.case);
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!achievement || !numeric) {
      toast.error("Please fill up all fields");
      return;
    }

    if (updateData) {
      dispatch(updateCaseData({ id, formData }))
      .unwrap()
      .then((response) => {
        console.log("Res", response);
        if (response.success) {
          toast.success(response.message);
          resetForm();
        } else {
          toast.error(response.message || "Update failed");
        }
      }).catch((error) => {
        toast.error("Update failed: " + error.message);
        console.log(error)
      });
    } else {
      dispatch(addCaseData(formData)).then((response) => {
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

  const handleUpdate = (id, achievement, numeric) => {
    setId(id);
    setUpdateData(true);
    setFormData({ achievement, numeric });
    window.scrollTo(0, 0);
  };

  const handleDelete = (id) => {
    dispatch(deleteCaseData(id))
      .unwrap()
      .then((response) => {
        if (response === id) {
          toast.success("Case history deleted successfully");
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
    setFormData({ achievement: "", numeric: "" });
    dispatch(fetchCaseData());
  };

  useEffect(() => {
    dispatch(fetchCaseData());
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
            <Button color="blue" type="submit">
              {updateData ? "Update" : "Submit"}
            </Button>
          </div>
        </form>
      </div>
      <div className="flex justify-center">
        <div className="md:px-10 p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {data &&
            data.map((item, i) => (
              <Card className="mt-6 relative" key={i}>
                <CardBody className="mb-14">
                  <div>
                    <Typography variant="h5" color="blue-gray" className="mb-2">
                      Case History Achievement: <br /> {item.achievement}
                    </Typography>
                    <Typography variant="h6">
                      Case History Numeric: <br /> {item.numeric}
                    </Typography>
                  </div>
                </CardBody>
                <CardFooter className="pt-0 absolute bottom-0 w-full flex justify-between">
                  <Button
                    onClick={() => handleUpdate(item._id, item.achievement, item.numeric)}
                    color="green"
                  >
                    Update
                  </Button>
                  <Button
                    onClick={() => handleDelete(item._id)}
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

export default CaseHistory;
