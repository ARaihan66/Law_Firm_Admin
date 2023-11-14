import React from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
const AdminPage = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");

  const handaleSubmit = () => {
    console.log("update");
    const formData = new FormData();
    formData.append("image", image);
    formData.append("name", name);
    formData.append("about", about);

    fetch("", {
      method: "PUT",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  };
  return (
    <div>
      {" "}
      <p className="text-center pt-5 text-3xl font-semibold text-deep-purple-800">
        Add Admin Information
      </p>
      <div className="flex justify-center">
        <form action="" onSubmit={handaleSubmit}>
          <div className="mt-6 p-8 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow rounded">
            <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              size="lg"
            />
            <Input
              onChange={(e) => setName(e.target.value)}
              size="lg"
              label="Your Name"
            />
            <Input
              onChange={(e) => setAbout(e.target.value)}
              size="lg"
              label="About Yourself"
            />

            <Button color="blue" type="submit">
              SUBMIT
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPage;
