import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {
  Grid,
  Container,
  Typography,
  Box,
  Button,
  Switch,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  styled
} from '@mui/material';
import Footer from 'src/components/Footer';
import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ACTIONS } from '../contants';
import DelayOrder from './DelayOrder';

const FlexBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: row;
    `
);

const ActionBoard = ({}) => {
  const { action } = useParams();
  const actionObj = ACTIONS.find((actionIt) => {
    return actionIt.value === action;
  });
  const navigate = useNavigate();

  return (
    actionObj && (
      <>
        <Helmet>
          <title>{actionObj.label}</title>
        </Helmet>
        <PageTitleWrapper>
          <FlexBox sx={{ alignItems: 'center' }}>
            <IconButton disableRipple onClick={(event) => navigate(-1)}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography variant="h5" component="h5" sx={{ py: 0.5 }}>
              {actionObj.label}
            </Typography>
          </FlexBox>
        </PageTitleWrapper>
        <Container maxWidth="sm">
          <Grid container spacing={2}>
            <Grid item xs={12} sx={{ mt: 4 }}>
              {actionObj.value === ACTIONS[0].value && <DelayOrder />}
            </Grid>
          </Grid>
        </Container>
        <Footer />
      </>
    )
  );
};

export default ActionBoard;
