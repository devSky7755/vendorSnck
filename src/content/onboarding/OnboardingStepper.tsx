import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import { styled } from '@mui/material/styles';
import StepLabel from '@mui/material/StepLabel';

interface OnboardingStepperProps {
    steps: string[];
    activeStep?: number;
    error?: boolean;
}

const OnboardingStepper: React.FC<OnboardingStepperProps> = (props) => {
    const activeStep = props.activeStep || 0;

    return (
        <Box sx={{ width: '100%' }}>
            <Stepper activeStep={activeStep} style={{ background: 'transparent' }}>
                {props.steps.map((label, index) => {
                    const stepProps: { completed?: boolean } = { completed: index < activeStep };
                    return (
                        <Step key={label} {...stepProps} active={index === activeStep}>
                            {
                                index <= activeStep ? (
                                    <StepLabel error={index === activeStep && props.error}
                                        StepIconProps={{ sx: { color: index === activeStep && props.error ? 'inherit' : '#FF864E !important' } }}
                                    >{label}</StepLabel>
                                ) : (
                                    <StepLabel >{label}</StepLabel>
                                )
                            }
                        </Step>
                    );
                })}
            </Stepper>
        </Box >
    );
}

export default OnboardingStepper;