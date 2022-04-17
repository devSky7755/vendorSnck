import { Box, Container, Card, Typography, Button, Switch, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import OnboardingStepper from '../OnboardingStepper';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { VendorStand } from 'src/models/vendorStand';
import { getVendorStand, patchVendorStand } from 'src/Api/apiClient';

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

const steps = ['Service Settings', 'Queue Setting', 'Accept Orders'];

function OnboardingOrderType({ vendorStandId, token }) {
    const navigate = useNavigate();

    const [vendor, setVendor] = useState<VendorStand>(null);
    useEffect(() => {
        if (vendorStandId) {
            getVendorStand(vendorStandId).then(res => {
                setVendor(res);
            })
        }
    }, [vendorStandId])

    const handleNext = () => {
        var patch = {
            pickupAvailable: vendor.pickupAvailable,
            deliveryAvailable: vendor.deliveryAvailable
        }
        patchVendorStand(token, vendor, patch).then(_ => {
            navigate('/onboarding/queue');
        });
    }

    return (
        <OnboardingWrapper>
            <Helmet>
                <title>Service Settings</title>
            </Helmet>
            <Container maxWidth='sm'>
                <Box sx={{ mt: 10 }}>
                    <OnboardingStepper steps={steps} activeStep={0}></OnboardingStepper>
                </Box>
                <Card sx={{ p: 8, mt: 4, mb: 10, borderRadius: 0 }}>
                    <Typography sx={{ mb: 2 }} variant="h1">
                        Login successful!
                    </Typography>
                    <Typography component="span" variant="body1">
                        Set up your vendor stand <b>{vendor && vendor.name}</b><br />
                        to start accepting orders
                    </Typography>
                    <PhoneWrapper sx={{ mt: 3 }}>
                        <Switch checked={vendor && vendor.pickupAvailable} onChange={e => {
                            setVendor({
                                ...vendor,
                                pickupAvailable: e.target.checked
                            })
                        }}></Switch><Typography component="span" variant="body1"> Accept pickup orders</Typography>
                    </PhoneWrapper>
                    <StyledDivider />
                    <PhoneWrapper>
                        <Switch checked={vendor && vendor.deliveryAvailable} onChange={e => {
                            setVendor({
                                ...vendor,
                                deliveryAvailable: e.target.checked
                            })
                        }}></Switch><Typography component="span" variant="body1"> Accept delivery orders</Typography>
                    </PhoneWrapper>
                    <PhoneWrapper>
                        <Button variant='contained' color='primary' fullWidth onClick={handleNext}>Next</Button>
                    </PhoneWrapper>
                </Card>
            </Container>
        </OnboardingWrapper>
    );
}

function reduxState(state) {
    return {
        token: state.auth && state.auth.token,
        vendorStandId: state.auth && state.auth.data && state.auth.data.vendorStandId
    }
}
export default connect(reduxState)(OnboardingOrderType);