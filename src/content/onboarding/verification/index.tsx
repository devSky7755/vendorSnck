import { Box, Container, Card, Typography, TextField, Button } from '@mui/material';
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
    padding: 16px 32px 16px 32px;
`
);

const steps = ['Your Phone', '2-Step Verification'];

function OnboardingVerification() {
    const [code, setCode] = useState('');
    const [err, setError] = useState(null);

    const navigate = useNavigate();

    return (
        <OnboardingWrapper>
            <Helmet>
                <title>2-Step Verification</title>
            </Helmet>
            <Container maxWidth='sm'>
                <Box sx={{ mt: 10 }}>
                    <OnboardingStepper steps={steps} activeStep={1}></OnboardingStepper>
                </Box>
                <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                    <Typography sx={{ mb: 2 }} variant="h1">
                        2-Step Verification
                    </Typography>
                    <Typography component="span" variant="subtitle1">
                        A text message with a verificiation code<br />
                        has been sent to <b>+61 403 911 104</b>
                    </Typography>
                    <PhoneWrapper>
                        <TextField
                            variant='outlined'
                            label='Verification Code'
                            fullWidth
                            value={code}
                            helperText='Enter 6-digit code'
                            inputProps={{ maxLength: 6 }}
                            error={err}
                            style={{ fontSize: 18 }}
                            onChange={(e) => {
                                setCode(e.target.value);
                            }}
                        />
                    </PhoneWrapper>
                    <PhoneWrapper>
                        <Button variant='contained' color='primary' fullWidth onClick={() => {
                            navigate('/onboarding/ordertype')
                        }}>Verify</Button>
                    </PhoneWrapper>
                    <div>
                        Didn't receive a code? <Button size='small'>Try Again</Button>
                    </div>
                </Card>
            </Container>
        </OnboardingWrapper>
    );
}

export default OnboardingVerification;
