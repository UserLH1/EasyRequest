import * as React from 'react';
import { Stepper, Step, StepLabel, Button, Typography } from '@mui/material';
import FormularDatePersonale from '../Components/FormularDatePersonale';
import FormularDetalii from '../Components/FormularDetalii';


function getSteps() {
  return ['Formular Date Personale', 'Formular Detalii Suplimentare'];
}

function getStepContent(stepIndex) {
  switch (stepIndex) {
    case 0:
      return <FormularDatePersonale />;
    case 1:
      return <FormularDetalii />;
    default:
      return 'Unknown stepIndex';
  }
}

export default function Formular() {
  const [activeStep, setActiveStep] = React.useState(0);
  const steps = getSteps();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

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
        {activeStep === steps.length ? (
          <div>
            <Typography>All steps completed</Typography>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        ) : (
          <div>
            <Typography>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack}>
                Back
              </Button>
              <Button variant="contained" onClick={handleNext}>
                {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
