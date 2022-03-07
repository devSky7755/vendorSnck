import { Box, Container, Card, Typography, Button, Grid } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import PinInput from 'react-pin-input';
import { useNavigate } from 'react-router';
import MultiToggle from 'react-multi-toggle'
import { useState } from 'react';
import { blue } from '@mui/material/colors';
import MuiPhoneNumber from 'material-ui-phone-number';

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

const options = [
    { displayName: 'PIN', value: 0 },
    { displayName: 'PHONE', value: 1 }
]

function LoginPage() {
    const navigate = useNavigate();

    const [viewMode, setViewMode] = useState(0);
    const [phone, setPhone] = useState('');

    return (
        <OnboardingWrapper>
            <Helmet>
                <title>Snackr - Vendor</title>
            </Helmet>
            <Container maxWidth='sm' sx={{ mt: 10 }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} className='text-center'>
                        <Box style={{ width: 240 }} className='m-auto'>
                            <MultiToggle options={options} selectedOption={viewMode} onSelectOption={value => {
                                setViewMode(value);
                            }}></MultiToggle>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        {
                            viewMode === 0 ? (
                                <Card sx={{ p: 8, mb: 10, borderRadius: 0 }}>
                                    <Typography sx={{ mb: 2 }} variant="h1">
                                        Enter Your PIN
                                    </Typography>
                                    <PhoneWrapper>
                                        <PinInput
                                            length={4}
                                            initialValue=""
                                            secret
                                            onChange={(value, index) => { }}
                                            type="numeric"
                                            inputMode="number"
                                            inputStyle={{ borderColor: 'blue', borderWidth: 4, fontSize: '20px', fontWeight: 600, color: 'blue' }}
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
                            ) : (
                                <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                                    <Typography sx={{ mb: 2 }} variant="h1">
                                        Login With Phone
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
                                    <PhoneWrapper>
                                        <Button variant='contained' color='primary' fullWidth onClick={() => {
                                            navigate('/dashboard');
                                        }}>Next</Button>
                                    </PhoneWrapper>
                                </Card>
                            )
                        }
                    </Grid>
                </Grid>

            </Container>
        </OnboardingWrapper>
    );
}

export default LoginPage;
