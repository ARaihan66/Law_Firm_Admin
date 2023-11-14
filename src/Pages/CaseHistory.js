import React from "react";
import { Input } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import { useState } from "react";
const CaseHistory = () => {
  const [caseHistoryNumber, setCaseHistoryNumber] = useState("");
  const [caseHistoryName, setCaseHistoryName] = useState("");

  const handaleSubmit = () => {
    console.log("update");
    const formData = new FormData();

    formData.append("caseHistoryNumber", caseHistoryNumber);
    formData.append("caseHistoryName", caseHistoryName);

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
        Add Case History
      </p>
      <div className="flex justify-center">
        <form action="" onSubmit={handaleSubmit}>
          <div className="mt-6 p-8 flex flex-col w-[350px] md:w-[600px] lg:w-[900px] gap-6 bg-white shadow rounded">
            <Input
              onChange={(e) => setCaseHistoryNumber(e.target.value)}
              size="lg"
              label="Case History Name"
            />
            <Input
              onChange={(e) => setCaseHistoryName(e.target.value)}
              size="lg"
              label="Case History Number"
            />

            <Button color="blue" type="submit">
              Add Case History
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CaseHistory;
