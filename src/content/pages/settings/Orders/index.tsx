import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Box, Button, styled, Switch } from '@mui/material';
import Footer from 'src/components/Footer';
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';
import InputSlider from 'src/content/onboarding/InputSlider';
import { connect } from 'react-redux';
import { FC, useEffect, useState } from 'react';
import { VendorStand } from 'src/models/vendorStand';
import { pauseFor } from 'src/reducers/setting/action';
import { patchVendorStand } from 'src/Api/apiClient';
import { setVendorStand } from 'src/reducers/venues/action';

const ColoredBox = styled(Box)(
    ({ theme }) => `
    background: #FFFAEA;
    `
);

const BorderedBox = styled(Box)(
    ({ theme }) => `
    border-bottom: 1px solid ${theme.general.borderColor};
    padding-top: ${theme.spacing(1)};
    padding-bottom: ${theme.spacing(1)};
    `
);

interface OrdersSettingProp {
    pauseUntil: number;
    vendorStand: VendorStand;
    pauseFor: Function;
    token: string;
    setVendorStand: Function;
}

const OrderSettings: FC<OrdersSettingProp> = ({ token, pauseUntil, vendorStand, pauseFor, setVendorStand }) => {
    const [render, setRender] = useState(false);
    const [vendor, setVendor] = useState(vendorStand);

    let current = Date.now();
    let seconds = 0;
    if (pauseUntil) {
        seconds = Math.floor((pauseUntil - current) / 1000);
    }

    const pause = (minute) => {
        pauseFor(minute);
    }

    useEffect(() => {
        setVendor(vendorStand);
    }, [vendorStand]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRender(x => !x);
        }, 250);

        return function () {
            clearInterval(intervalId);
        }
    }, []);

    const handleChange = (key, value) => {
        if (!vendor) return;
        if (vendor[key] === value) return;

        let patch = {};
        patch[key] = value;

        patchVendorStand(token, vendor, patch).then(res => {
            setVendorStand(res);
        }).catch(ex => {
            console.log(ex.message);
        })
    }

    return (
        <>
            <Helmet>
                <title>Order Settings</title>
            </Helmet>
            <PageTitleWrapper>
                <Typography variant="h5" component="h5" sx={{ py: 0.5 }}>
                    Order Settings
                </Typography>
            </PageTitleWrapper>
            <Container maxWidth="sm">
                {
                    seconds > 0 &&
                    <ColoredBox sx={{ pt: 2, pl: 2, pb: 1, mt: 2 }} className='border-bottom'>
                        <Grid container spacing={1}>
                            <Grid item><PauseCircleFilledOutlinedIcon color='warning' /></Grid>
                            <Grid item className='py-0 my-auto'>
                                <Typography component="span" variant='subtitle1'>
                                    Paused orders for {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')} min
                                </Typography>
                            </Grid>
                        </Grid>
                    </ColoredBox>
                }
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <Typography variant='subtitle1'>
                            Availability
                        </Typography>
                        <BorderedBox>
                            <Switch checked={(vendor && vendor.available) || false}
                                onChange={e => {
                                    handleChange('available', e.target.checked);
                                }}
                            /> <Typography component='span' variant='body1'>Available for Orders</Typography>
                        </BorderedBox>
                        <BorderedBox>
                            <Switch checked={(vendor && vendor.pickupAvailable) || false}
                                onChange={e => {
                                    handleChange('pickupAvailable', e.target.checked);
                                }}
                            /> <Typography component='span' variant='body1'>Pickup Orders</Typography>
                        </BorderedBox>
                        <BorderedBox>
                            <Switch checked={(vendor && vendor.deliveryAvailable) || false}
                                onChange={e => {
                                    handleChange('deliveryAvailable', e.target.checked);
                                }} />
                            <Typography component='span' variant='body1'>Delivery Orders</Typography>
                        </BorderedBox>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <Typography variant='subtitle1'>
                            Pause orders
                        </Typography>
                        <BorderedBox sx={{ pt: 2, pb: 2 }}>
                            <Grid container justifyContent='space-between'>
                                <Grid item>
                                    <Button onClick={() => {
                                        pause(5);
                                    }} style={{ width: 130 }} size='small' variant='outlined' color='primary'>+5 MIN</Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => {
                                        pause(15);
                                    }} style={{ width: 130 }} size='small' variant='outlined' color='primary'>+15 MIN</Button>
                                </Grid>
                                <Grid item>
                                    <Button onClick={() => {
                                        pause(30);
                                    }} style={{ width: 130 }} size='small' variant='outlined' color='primary'>+30 MIN</Button>
                                </Grid>
                            </Grid>
                        </BorderedBox>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <Typography variant='subtitle1'>
                          Set the total number of orders you can fulfil every 10 minutes. Don’t worry - this can be changed later!
                        </Typography>

                        <BorderedBox>
                            {
                                vendor &&
                                <InputSlider defaultValue={(vendor && vendor.orderCapacity) || 0} maxValue={30}
                                    onChange={v => {
                                        handleChange('orderCapacity', v);
                                    }}
                                />
                            }
                        </BorderedBox>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 0 }}>
                        <Typography variant='subtitle1'>
                          Set the total number of customers you want to notify to pick up their orders at any one time.
                        </Typography>
                        <BorderedBox>
                            {
                                vendor &&
                                <InputSlider maxValue={30} defaultValue={(vendor && vendor.pickupQueueCapacity) || 0}
                                    onChange={v => {
                                        handleChange('pickupQueueCapacity', v);
                                    }}
                                />
                            }
                        </BorderedBox>
                    </Grid>
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

function reduxState(state) {
    return {
        token: state.auth && state.auth.token,
        pauseUntil: (state.setting && state.setting.pauseUntil) || new Date(),
        vendorStand: state.venues && state.venues.vendorStand
    }
}
export default connect(reduxState, { pauseFor, setVendorStand })(OrderSettings);


