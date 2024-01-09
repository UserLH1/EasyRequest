import { Button, Step, StepLabel, Stepper } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-toastify";
import FormularDatePersonale from "./FormularDatePersonale";
import FormularDetalii from "./FormularDetalii";

function getSteps() {
  return ["Formular Date Personale", "Formular Detalii Suplimentare"];
}

export default function Formular() {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const [studentData, setStudentData] = useState({
    nume: " ",
    prenume: " ",
    telefon: " ",
    facultate: " ",
    specializare: " ",
    anulDeStudiu: " ",
    numarMatricol: " ",
  });
  // console.log("Student data formular ", studentData);
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      submitForm();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
    setStudentData({
      nume: "",
      prenume: "",
      telefon: "",
      facultate: "",
      specializare: "",
      anulDeStudiu: "",
      numarMatricol: "",
    });
  };

  const submitForm = () => {
    console.log(studentData);
    // toast.success("Formularul a fost trimis cu succes!");
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      })
      .then((data) => {
        toast.success("Formularul a fost trimis cu succes!");
        console.log("Student added:", data);
        handleReset(); // Optionally reset after submission
      })
      .catch((error) => {
        toast.error("Eroare la trimiterea formularului.");
        console.error("Error:", error);
      });
  };

  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <FormularDatePersonale
            studentData={studentData}
            setStudentData={setStudentData}
          />
        );
      case 1:
        return (
          <FormularDetalii
            studentData={studentData}
            setStudentData={setStudentData}
          />
        );
      default:
        throw new Error("Unknown step");
    }
  }

  return (
    <div>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {getStepContent(activeStep)}
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </div>
    </div>
  );
}
