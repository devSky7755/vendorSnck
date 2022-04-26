import { Box, Container, Card, Typography, Checkbox, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import MuiPhoneNumber from 'material-ui-phone-number';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OnboardingStepper from '../OnboardingStepper';
import { setPhone } from 'src/reducers/auth/action';
import { connect } from 'react-redux';
import { postAuthentication } from 'src/Api/apiClient';

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
    padding: 32px 32px 16px 32px;
`
);

const steps = ['Login', '2-Step Verification'];

function OnboardingPhone({ setPhone }) {
    const [phone, setPhoneNumber] = useState('');
    const [touAgreed, setTouAgreed] = useState(false);
    const [err, setError] = useState(false);
    const [message, setMessage] = useState('');

    const navigate = useNavigate();

    const onToggleAggrement = (e) => {
        setTouAgreed(e.target.checked);
    }

    const handleNext = () => {
        const phoneString = phone.replaceAll('(', '').replaceAll(')', '').replaceAll(' ', '').replace('-', '');
        setPhone(phone);

        postAuthentication(phoneString).then(res => {
            if (res.success) {
                navigate('/onboarding/verification');
            } else {
                setError(true);
                setMessage(res.message);
            }
        }).catch(ex => {
            console.log(ex.message);
        });
    }

    const onKeyDown = (e) => {
        if (e.key === 'Enter') {
            const disabled = !touAgreed || !phone || phone.length < 8;  
            if (!disabled) {
                handleNext();
            }
        }
    }

    const disabled = !touAgreed || !phone || phone.length < 8;

    return (
        <OnboardingWrapper>
            <Helmet>
                <title>Snackr - Vendor</title>
            </Helmet>
            <Container maxWidth='sm'>
                <Box sx={{ mt: 10 }}>
                    <OnboardingStepper steps={steps} activeStep={0} error={err}></OnboardingStepper>
                </Box>
                <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                    <Typography sx={{ mb: 2 }} variant="h1">
                        Welcome to Snackr
                    </Typography>
                    <Typography component="span" variant='body1'>
                        Let’s make sure it’s really you.<br />
                        Your phone number will be used for 2-Step Verification.
                    </Typography>
                    <PhoneWrapper>
                        <MuiPhoneNumber
                            variant='outlined'
                            fullWidth
                            value={phone}
                            style={{ fontSize: 16, fontWeight: 500 }}
                            defaultCountry={'us'}
                            helperText={message}
                            error={err}
                            autoFocus
                            onKeyDown={onKeyDown}
                            disableAreaCodes={true}
                            onChange={(value) => {
                                setPhoneNumber(value);
                            }}
                        />
                    </PhoneWrapper>
                    <div style={{ textAlign: 'left', paddingLeft: 32, display: 'flex' }}>
                        <Checkbox checked={touAgreed} onChange={onToggleAggrement}></Checkbox>
                        <Typography variant='body2' className='my-auto'>
                            I agree to the Snackr <Link target='_blank' to={'/terms_policy'}>EULA, Terms of Use &amp; Privacy Policy.</Link>
                        </Typography>
                    </div>
                    <PhoneWrapper>
                        <Button disabled={disabled} variant='contained' color='primary' fullWidth onClick={handleNext}>Next</Button>
                    </PhoneWrapper>
                </Card>
            </Container>
        </OnboardingWrapper>
    );
}

function reduxState(state) {
    return {
    }
}
export default connect(reduxState, { setPhone })(OnboardingPhone);
