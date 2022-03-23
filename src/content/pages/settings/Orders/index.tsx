import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Box, Button, styled, Switch } from '@mui/material';
import Footer from 'src/components/Footer';
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';
import InputSlider from 'src/content/onboarding/InputSlider';
import { connect } from 'react-redux';
import { FC, useEffect, useState } from 'react';
import { pauseFor } from 'src/reducers/setting/action';

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
    pauseFor: Function
}

const OrderSettings: FC<OrdersSettingProp> = ({ pauseUntil, pauseFor }) => {
    const [render, setRender] = useState(false);

    let current = Date.now();
    let seconds = 0;
    if (pauseUntil) {
        seconds = Math.floor((pauseUntil - current) / 1000);
    }

    const pause = (minute) => {
        pauseFor(minute);
    }

    useEffect(() => {
        const intervalId = setInterval(() => {
            setRender(x => !x);
        }, 250);

        return function () {
            clearInterval(intervalId);
        }
    }, []);



    return (
        <>
            <Helmet>
                <title>Order Settings</title>
            </Helmet>
            <PageTitleWrapper>
                <Typography variant="h3" component="h3" sx={{ py: 0.5 }}>
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
                                <Typography component="span" variant='h5'>
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
                        <Typography component="h5" variant='h5'>
                            Availability
                        </Typography>
                        <BorderedBox>
                            <Switch></Switch> Available for Orders
                        </BorderedBox>
                        <BorderedBox>
                            <Switch></Switch> Pickup Orders
                        </BorderedBox>
                        <BorderedBox>
                            <Switch></Switch> Delivery Orders
                        </BorderedBox>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 4 }}>
                        <Typography component="h5" variant='h5'>
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
                        <Typography component="h5" variant='h5'>
                            Order amount per 10 min
                        </Typography>
                        <BorderedBox>
                            <InputSlider maxValue={30}></InputSlider>
                        </BorderedBox>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 0 }}>
                        <Typography component="h5" variant='h5'>
                            Pickup order queue
                        </Typography>
                        <BorderedBox>
                            <InputSlider maxValue={30}></InputSlider>
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
        pauseUntil: (state.setting && state.setting.pauseUntil) || new Date()
    }
}
export default connect(reduxState, { pauseFor })(OrderSettings);


