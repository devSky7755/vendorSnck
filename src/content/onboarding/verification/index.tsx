import { Box, Container, Card, Typography, TextField, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import OnboardingStepper from '../OnboardingStepper';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { getVendorStand, postAuthentication, postLogin } from 'src/Api/apiClient';
import { login } from 'src/reducers/auth/action';
import { useAlert } from 'react-alert';
import { isVendorApp } from 'src/models/constant';
import { setVendorStand } from 'src/reducers/venues/action';

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

const steps = ['Login', '2-Step Verification'];

function OnboardingVerification({ phone, login, setVendorStand }) {
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('Enter 4-digit code');
    const [err, setError] = useState(false);

    const navigate = useNavigate();
    const alert = useAlert();

    useEffect(() => {
        if (!phone) {
            navigate('/onboarding/phone');
        }
    }, [phone])

    const handleTryAgain = () => {
        const phoneString = phone.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replace('-', '');

        postAuthentication(phoneString).then(res => {
            if (res.success) {
                alert.success('Verification code is resent to your phone!');
            } else {
                alert.error(res.message);
            }
        }).catch(ex => {
            console.log(ex.message);
        });
    }

    const handleVerify = () => {
        const phoneString = phone.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replace('-', '');

        postLogin(phoneString, code).then(res => {
            if (res.success) {
                login(res.data.token, res.data.admin || res.data.staff);
                if (isVendorApp) {
                    getVendorStand(res.data.staff.vendorStandId).then(res => {
                        if (res) {
                            setVendorStand(res);
                            navigate('/onboarding/ordertype')
                        } else {
                            alert.error('Cannot find vendor stand');
                        }
                    }).catch(e => {
                        alert.error('Cannot find vendor stand');
                        console.log(e.message);
                    });
                }
            } else {
                setError(true);
                setMessage(res.message);
            }
        }).catch(ex => {
            console.log(ex.message);
        })
    }

    const onKeyDown = (e)=>{
        if (e.key === 'Enter') {
            if (code && code.length === 4) {
                handleVerify();
            }
        }
    }

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
                    <Typography component="span" variant="body1">
                        A text message with a verificiation code<br />
                        has been sent to &nbsp;
                    </Typography>
                    <Typography component="span" variant="body1" style={{ fontWeight: 500 }}>
                        {phone}
                    </Typography>
                    <PhoneWrapper>
                        <TextField
                            inputProps={{ maxLength: 4, inputMode: 'numeric', pattern: '[0-9]*' }}
                            variant='outlined'
                            label='Verification code'
                            fullWidth
                            value={code}
                            autoFocus
                            onKeyDown={onKeyDown}
                            helperText={message}
                            error={err}
                            style={{ fontSize: 16, fontWeight: 500 }}
                            onChange={(e) => {
                                setCode(e.target.value);
                            }}
                        />
                    </PhoneWrapper>
                    <PhoneWrapper>
                        <Button disabled={!code || code.length !== 4} variant='contained' color='primary' fullWidth onClick={handleVerify}>Verify</Button>
                    </PhoneWrapper>
                    <div>
                        Didn't receive a code? <Button size='small' style={{ textTransform: 'none' }} onClick={handleTryAgain} >Try Again</Button>
                    </div>
                </Card>
            </Container>
        </OnboardingWrapper>
    );
}

function reduxState(state) {
    return {
        phone: state.auth && state.auth.data && state.auth.data.mobileNo
    }
}
export default connect(reduxState, { login, setVendorStand })(OnboardingVerification);

