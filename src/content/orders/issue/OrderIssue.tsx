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
import { Order, temp_orders } from 'src/models/order';
import { ACTIONS } from './index';
import { DELIVERYING_ACTIONS, PICKUP_ACTIONS } from './contants';

const ContentWrapper = styled(Container)(
  ({ theme }) => `
    min-height: calc(100% - 72px);
  `
);

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
  const order = temp_orders.find((order: Order) => order.id === parseInt(id));
  const getActions = () => {
    if (order.status === 'New') return ACTIONS;
    if (order.status === 'Preparing') return ACTIONS;
    if (
      (order.status === 'Ready' && order.order_type === 'Delivery') ||
      order.status === 'Delivering'
    ) {
      return DELIVERYING_ACTIONS;
    }
    if (
      (order.status === 'Ready' && order.order_type === 'Pickup') ||
      order.status === 'Waitlist'
    ) {
      return PICKUP_ACTIONS;
    }
  };

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
      <ContentWrapper
        maxWidth="sm"
        sx={{ pt: 4, display: 'flex', flexDirection: 'column' }}
      >
        {getActions().map((actType, key) => {
          return (
            <FormControl>
              <FormLabel id="choose-action-group">{actType.label}</FormLabel>
              <RadioGroup
                aria-labelledby="choose-action-group"
                name="radio-actions-group"
                value={action}
                onChange={handleChangeAction}
              >
                {actType?.actions.map((actionObj, key) => {
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
              <hr />
            </FormControl>
          );
        })}
      </ContentWrapper>
      <Footer />
    </>
  );
};

export default OrderIssue;
