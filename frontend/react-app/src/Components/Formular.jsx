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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const steps = getSteps();

  const [studentData, setStudentData] = useState({
    nume: "",
    prenume: "",
    telefon: "",
    facultate: "",
    specializare: "",
    anulDeStudiu: "",
    numarMatricol: "",
  });

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

  const submitForm = () => {
    console.log(studentData);
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
        setIsSubmitted(true);
      })
      .catch((error) => {
        toast.error("Eroare la trimiterea formularului.");
        console.error("Error:", error);
      });
  };

  const downloadCerereDeBursa = () => {
    fetch("http://localhost:8080/student/downloadCerereDeBursa")
      .then((response) => {
        if (response.ok) {
          return response.blob();
        }
        throw new Error("Network response was not ok.");
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));
        const a = document.createElement("a");
        a.href = url;
        a.download = "cerere_de_bursa.txt";
        document.body.appendChild(a);
        a.click();

        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
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
        {activeStep === steps.length - 1 ? (
          <div>
            <Button variant="contained" color="primary" onClick={handleNext}>
              Trimite
            </Button>
            <br></br>
            <br></br>
            {isSubmitted && (
              <Button
                variant="contained"
                color="primary"
                onClick={downloadCerereDeBursa}
              >
                Descarcă cererea
              </Button>
            )}
          </div>
        ) : (
          <Button variant="contained" color="primary" onClick={handleNext}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}
