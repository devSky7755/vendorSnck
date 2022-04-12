import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import {
  Grid,
  Container,
  Typography,
  Box,
  Button,
  styled,
  Switch
} from '@mui/material';
import Footer from 'src/components/Footer';
import { FC, useEffect, useState } from 'react';

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

const OrderIssue = ({}) => {
  return (
    <>
      <Helmet>
        <title>Issue with Order</title>
      </Helmet>
      <PageTitleWrapper>
        <Typography variant="h5" component="h5" sx={{ py: 0.5 }}>
          Issue with Order
        </Typography>
      </PageTitleWrapper>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 4 }}>
            <Typography variant="subtitle1">Choose action</Typography>
            <BorderedBox>
              <Typography component="span" variant="body1">
                Delay order
              </Typography>
            </BorderedBox>
            <BorderedBox>
              <Typography component="span" variant="body1">
                Re-assign to pickup
              </Typography>
            </BorderedBox>
            <BorderedBox>
              <Typography component="span" variant="body1">
                Cancel order
              </Typography>
            </BorderedBox>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default OrderIssue;
