import { Box, Container, Card, Typography, TextField, Button, Switch, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import OnboardingStepper from '../OnboardingStepper';
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
    padding: 16px 32px 8px 32px;
`
);

const StyledDivider = styled(Divider)(
    () => `
    margin: 0px 32px;
    `
);

const steps = ['Order Type', 'Queue Setting', 'Accept Orders'];

function OnboardingAcceptOrder() {
    const navigate = useNavigate();
    return (
        <OnboardingWrapper>
            <Helmet>
                <title>Hot Dog Stand is set up!</title>
            </Helmet>
            <Container maxWidth='sm'>
                <Box sx={{ mt: 10 }}>
                    <OnboardingStepper steps={steps} activeStep={2}></OnboardingStepper>
                </Box>
                <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                    <Typography sx={{ mb: 2 }} variant="h1">
                        Hot Dog Stand is set up!
                    </Typography>
                    <Typography component="span" variant="subtitle1">
                        Your venue is available for online orders.<br />
                        Next we recommend to:
                    </Typography>
                    <PhoneWrapper>
                        <Button color='primary'>Add your team member</Button>
                    </PhoneWrapper>
                    <StyledDivider />
                    <PhoneWrapper>
                        <Button color='primary'>Review your menu</Button>
                    </PhoneWrapper>
                    <PhoneWrapper>
                        <Button variant='contained' color='primary' fullWidth
                            onClick={() => {
                                navigate('/help', {
                                    state: { showSkip: true },
                                    replace: true
                                });
                            }}
                        >START ACCEPTING ORDERS</Button>
                    </PhoneWrapper>
                </Card>
            </Container>
        </OnboardingWrapper>
    );
}

export default OnboardingAcceptOrder;
