import { Box, Container, Card, Typography, TextField, Button, Switch, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import OnboardingStepper from '../OnboardingStepper';
import InputSlider from '../InputSlider';
import { useNavigate } from 'react-router';

const OnboardingWrapper = styled(Box)(
    () => `
    overflow: auto;
    flex: 1;
    text-align: center;
    overflow-x: hidden;
    align-items: center;
`
);

const PhoneWrapper = styled(Box)(
    () => `
    text-align: left;
    padding: 16px 32px 16px 32px;
`
);

const StyledDivider = styled(Divider)(
    () => `
    margin: 0px 32px;
    `
);

const steps = ['Order Type', 'Queue Setting', 'Accept Orders'];

function OnboardingQueue() {
    const navigate = useNavigate();

    return (
        <OnboardingWrapper>
            <Helmet>
                <title>Queue Setting</title>
            </Helmet>
            <Container maxWidth='sm'>
                <Box sx={{ mt: 10 }}>
                    <OnboardingStepper steps={steps} activeStep={1}></OnboardingStepper>
                </Box>
                <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                    <Typography sx={{ mb: 2 }} variant="h1">
                        Queue Setting
                    </Typography>
                    <Typography component="span" variant="subtitle1">
                        Setup the amount of orders you<br />
                        can accept per 10 minutes.
                    </Typography>
                    <PhoneWrapper>
                        <InputSlider label='Order amount per 10 min' maxValue={30}></InputSlider>
                    </PhoneWrapper>
                    <StyledDivider />
                    <PhoneWrapper>
                        <InputSlider label='Pickup order queue' maxValue={30}></InputSlider>
                    </PhoneWrapper>
                    <PhoneWrapper>
                        <Button variant='contained' color='primary' fullWidth onClick={() => {
                            navigate('/onboarding/acceptorder');
                        }}>Next</Button>
                    </PhoneWrapper>
                </Card>
            </Container>
        </OnboardingWrapper>
    );
}

export default OnboardingQueue;
