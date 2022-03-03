import { Box, Container, Card, Typography, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import OnboardingStepper from '../OnboardingStepper';
import PinInput from 'react-pin-input';
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
    padding: 16px 32px 16px 32px;
`
);

const steps = ['Your Phone', '2-Step Verification', 'Pin'];

function OnboardingPin() {
    const navigate = useNavigate();
    return (
        <OnboardingWrapper>
            <Helmet>
                <title>Owner PIN</title>
            </Helmet>
            <Container maxWidth='sm'>
                <Box sx={{ mt: 10 }}>
                    <OnboardingStepper steps={steps} activeStep={2}></OnboardingStepper>
                </Box>
                <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                    <Typography sx={{ mb: 2 }} variant="h1">
                        Owner PIN
                    </Typography>
                    <Typography component="span" variant="subtitle1">
                        Your Owner PIN can be used to access all <br />
                        areas of your Snackr account.
                    </Typography>
                    <PhoneWrapper>
                        <PinInput
                            length={4}
                            initialValue=""
                            //secret
                            onChange={(value, index) => { }}
                            type="numeric"
                            inputMode="number"
                            style={{ padding: '10px' }}
                            inputStyle={{ fontSize: '20px', fontWeight: 600 }}
                            inputFocusStyle={{ borderColor: 'blue' }}
                            onComplete={(value, index) => { }}
                            autoSelect={true}
                            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                        />
                    </PhoneWrapper>
                    <PhoneWrapper>
                        <Button variant='contained' color='primary' fullWidth onClick={() => {
                            navigate('/onboarding/ordertype');
                        }}>Next</Button>
                    </PhoneWrapper>
                </Card>
            </Container>
        </OnboardingWrapper>
    );
}

export default OnboardingPin;
