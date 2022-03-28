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

function OnboardingOrderType() {
    const navigate = useNavigate();
    return (
        <OnboardingWrapper>
            <Helmet>
                <title>Order Types</title>
            </Helmet>
            <Container maxWidth='sm'>
                <Box sx={{ mt: 10 }}>
                    <OnboardingStepper steps={steps} activeStep={0}></OnboardingStepper>
                </Box>
                <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                    <Typography sx={{ mb: 2 }} variant="h1">
                        Login Successful!
                    </Typography>
                    <Typography component="span" variant="body1">
                        Setup your location <b>Hot Dog Stand</b><br />
                        to start accepting order
                    </Typography>
                    <PhoneWrapper sx={{ mt: 3 }}>
                        <Switch></Switch><Typography component="span" variant="body1"> Accept Pickup Orders</Typography>
                    </PhoneWrapper>
                    <StyledDivider />
                    <PhoneWrapper>
                        <Switch></Switch><Typography component="span" variant="body1"> Accept Delivery Orders</Typography>
                    </PhoneWrapper>
                    <PhoneWrapper>
                        <Button variant='contained' color='primary' fullWidth onClick={() => {
                            navigate('/onboarding/queue');
                        }}>Next</Button>
                    </PhoneWrapper>
                </Card>
            </Container>
        </OnboardingWrapper>
    );
}

export default OnboardingOrderType;
