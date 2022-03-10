import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Grid, Container, Typography, Box, Button, styled } from '@mui/material';
import Footer from 'src/components/Footer';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneIphoneOutlinedIcon from '@mui/icons-material/PhoneIphoneOutlined';
import PinInput from 'react-pin-input';

const ColoredBox = styled(Box)(
    ({ theme }) => `
    background: #E3F2FD;
    `
);

function UserProfile() {
    return (
        <>
            <Helmet>
                <title>Profile</title>
            </Helmet>
            <PageTitleWrapper>
                <Typography variant="h3" component="h3" sx={{ py: 1 }}>
                    User Profile
                </Typography>
            </PageTitleWrapper>
            <Container maxWidth="sm" sx={{ mt: 8 }}>
                <Grid
                    container
                    spacing={2}
                >
                    <Grid item xs={12}>
                        <Box sx={{ mb: 2 }}>
                            <Typography variant="h3" component="span">
                                Jack Jackson
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={12} >
                        <Grid container spacing={2} className='border-bottom'>
                            <Grid item><EmailOutlinedIcon /></Grid>
                            <Grid item className='flex-auto'>
                                <Typography component="span">
                                    johnson@gmail.com
                                </Typography>
                            </Grid>
                            <Grid item className='float-right'>
                                <Button color='primary'>CHANGE</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12}>
                        <Grid container spacing={2} className='border-bottom'>
                            <Grid item><PhoneIphoneOutlinedIcon /></Grid>
                            <Grid item className='flex-auto'>
                                <Typography component="span">
                                    (555) 123-4553
                                </Typography>
                            </Grid>
                            <Grid item className='float-right'>
                                <Button color='primary'>CHANGE</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    {
                        /*
                        <Grid item xs={12}>
                        <ColoredBox sx={{ mr: 2, py: 4 }}>
                            <Typography sx={{ px: 4, pb: 2 }} style={{ textAlign: 'center' }}>
                                Your Owner PIN can be used to access all areas
                                of your Snackr account.
                            </Typography>
                            <Box style={{ textAlign: 'center' }}>
                                <PinInput
                                    length={4}
                                    initialValue=""
                                    //secret
                                    onChange={(value, index) => { }}
                                    type="numeric"
                                    inputMode="number"
                                    style={{ padding: '12px' }}
                                    inputStyle={{ fontSize: '28px', fontWeight: 500, background: 'white' }}
                                    inputFocusStyle={{ borderColor: 'blue' }}
                                    onComplete={(value, index) => { }}
                                    autoSelect={true}
                                    regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
                                />
                            </Box>
                        </ColoredBox>
                    </Grid>
                    */
                    }
                    {
                        /*
                        <Grid item xs={12}>
                            <Typography component="h5" variant='h5'>
                                Password
                            </Typography>
                            <Box sx={{ pt: 1, pb: 2 }}>
                                <Typography component={'span'}>
                                    It's a good idea to use a strong password that you're not using elsewhere
                                </Typography>
                            </Box>
                            <Box>
                                <Button color='primary'>CHANGE PASSWORD</Button>
                            </Box>
                        </Grid>
                        */
                    }
                </Grid>
            </Container>
            <Footer />
        </>
    );
}

export default UserProfile;
