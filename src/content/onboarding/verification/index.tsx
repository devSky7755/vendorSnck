import { Box, Container, Card, Typography, TextField, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import OnboardingStepper from '../OnboardingStepper';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';

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

function OnboardingVerification({ phone }) {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('Enter 4-digit code');
    const [err, setError] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        if (!phone) {
            navigate('/onboarding/phone');
        }
    }, [phone])

    return (
        <OnboardingWrapper>
            <Helmet>
                <title>2-Step Verification</title>
            </Helmet>
            <Container maxWidth='sm'>
                <Box sx={{ mt: 10 }}>
                    <OnboardingStepper steps={steps} activeStep={1} error={err}></OnboardingStepper>
                </Box>
                <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                    <Typography sx={{ mb: 2 }} variant="h1">
                        2-Step Verification
                    </Typography>
                    <Typography component="span" variant="subtitle1">
                        A text message with a verificiation code<br />
                        has been sent to <b>{phone}</b>
                    </Typography>
                    <PhoneWrapper>
                        <TextField
                            inputProps={{ maxLength: 4, inputMode: 'numeric', pattern: '[0-9]*' }}
                            variant='outlined'
                            label='Verification Code'
                            fullWidth
                            value={code}
                            helperText={message}
                            error={err}

                            style={{ fontSize: 18 }}
                            onChange={(e) => {
                                setCode(e.target.value);
                            }}
                        />
                    </PhoneWrapper>
                    <PhoneWrapper>
                        <Button disabled={!code || code.length !== 4} variant='contained' color='primary' fullWidth onClick={() => {
                            //setMessage('Wrong verification code');
                            //setError(true);
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

function reduxState(state) {
    return {
        phone: state.auth && state.auth.admin && state.auth.admin.mobileNo
    }
}
export default connect(reduxState)(OnboardingVerification);

