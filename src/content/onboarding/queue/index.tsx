import { Box, Container, Card, Typography, Button, Divider } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import OnboardingStepper from '../OnboardingStepper';
import InputSlider from '../InputSlider';
import { useNavigate } from 'react-router';
import { connect } from 'react-redux';
import { getVendorStand, patchVendorStand } from 'src/Api/apiClient';
import { VendorStand } from 'src/models/vendor_stand';

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

function OnboardingQueue({ vendorStandId, token }) {
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
            deliveryAvailable: vendor.deliveryAvailable,
            pickupQueueCapacity: vendor.pickupQueueCapacity,
            orderCapacity: vendor.orderCapacity
        }
        patchVendorStand(token, vendor, patch).then(_ => {
            navigate('/onboarding/acceptorder');
        });
    }

    return (
        <OnboardingWrapper>
            <Helmet>
                <title>Queue Setting</title>
            </Helmet>
            <Container maxWidth='sm'>
                <Box sx={{ mt: 10 }}>
                    <OnboardingStepper steps={steps} activeStep={1}></OnboardingStepper>
                </Box>
                <Card sx={{ p: 8, pb: 4, mt: 4, mb: 4, borderRadius: 0 }}>
                    <Typography sx={{ mb: 2 }} variant="h1">
                        Queue Setting
                    </Typography>
                    <Typography component="span" variant="body1">
                        Setup the amount of orders you<br />
                        can accept per 10 minutes.
                    </Typography>
                    {
                        vendor &&
                        <PhoneWrapper sx={{ mt: 3 }}>
                            <InputSlider label='Order amount per 10 min' maxValue={30} defaultValue={vendor.orderCapacity}
                                onChange={v => {
                                    setVendor({
                                        ...vendor,
                                        orderCapacity: v
                                    });
                                }}
                            ></InputSlider>
                        </PhoneWrapper>
                    }
                    <StyledDivider />
                    {
                        vendor &&
                        <PhoneWrapper>
                            <InputSlider label='Maximum orders in pickup queue' maxValue={30} defaultValue={vendor.pickupQueueCapacity}
                                onChange={v => {
                                    setVendor({
                                        ...vendor,
                                        pickupQueueCapacity: v
                                    });
                                }}></InputSlider>
                        </PhoneWrapper>
                    }
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
export default connect(reduxState)(OnboardingQueue);
