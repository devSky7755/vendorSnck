import { Box, Container, Card, Typography, TextField, Checkbox, Button } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import MuiPhoneNumber from 'material-ui-phone-number';
import { styled } from '@mui/material/styles';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import OnboardingStepper from '../OnboardingStepper';

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

function OnboardingPhone() {
    const [phone, setPhone] = useState('');

    const navigate = useNavigate();

    return (
        <OnboardingWrapper>
            <Helmet>
                <title>Snackr - Vendor</title>
            </Helmet>
            <Container maxWidth='sm'>
                <Box sx={{ mt: 10 }}>
                    <OnboardingStepper steps={steps} activeStep={0}></OnboardingStepper>
                </Box>
                <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                    <Typography sx={{ mb: 2 }} variant="h1">
                        Welcome to Snackr
                    </Typography>
                    <Typography component="span" variant="subtitle1">
                        Let’s make sure it’s really you.<br />
                        Your phone number will be used for 2-Step Verification.
                    </Typography>
                    <PhoneWrapper>
                        <MuiPhoneNumber
                            variant='outlined'
                            fullWidth
                            value={phone}
                            style={{ fontSize: 18 }}
                            defaultCountry={'us'}
                            onChange={(value) => {
                                setPhone(value);
                            }}
                        />
                    </PhoneWrapper>
                    <div style={{ textAlign: 'left', paddingLeft: 32 }}>
                        <Checkbox></Checkbox> I agree to Snackr <Link target='_blank' to={'/terms_policy'}>Terms &amp; Privacy Policy</Link>
                    </div>
                    <PhoneWrapper>
                        <Button variant='contained' color='primary' fullWidth onClick={() => {
                            navigate('/onboarding/verification');
                        }}>Next</Button>
                    </PhoneWrapper>
                </Card>
            </Container>
        </OnboardingWrapper>
    );
}

export default OnboardingPhone;
