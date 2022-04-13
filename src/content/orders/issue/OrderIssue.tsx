import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {
  Grid,
  Container,
  Typography,
  Box,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  styled
} from '@mui/material';
import Footer from 'src/components/Footer';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ACTIONS } from './index';

const FlexBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: row;
    `
);

const OrderIssue = ({}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [action, setAction] = useState();

  const handleChangeAction = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: any = (event.target as HTMLInputElement).value;
    setAction(value);
    navigate(`/orders/issue/${id}/${value}`);
  };

  return (
    <>
      <Helmet>
        <title>Issue with Order</title>
      </Helmet>
      <PageTitleWrapper>
        <FlexBox sx={{ alignItems: 'center' }}>
          <IconButton disableRipple onClick={(event) => navigate(-1)}>
            <KeyboardArrowLeftIcon />
          </IconButton>
          <Typography variant="h5" component="h5" sx={{ py: 0.5 }}>
            Issue with Order
          </Typography>
        </FlexBox>
      </PageTitleWrapper>
      <Container maxWidth="sm">
        <Grid container spacing={2}>
          <Grid item xs={12} sx={{ mt: 4 }}>
            <FormControl>
              <FormLabel id="choose-action-group">Choose action</FormLabel>
              <RadioGroup
                aria-labelledby="choose-action-group"
                name="radio-actions-group"
                value={action}
                onChange={handleChangeAction}
              >
                {ACTIONS.map((actionObj, key) => {
                  return (
                    <FormControlLabel
                      key={key}
                      value={actionObj.value}
                      control={<Radio />}
                      label={actionObj.label}
                    />
                  );
                })}
              </RadioGroup>
            </FormControl>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default OrderIssue;
