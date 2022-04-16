import { Helmet } from 'react-helmet-async';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {
  Grid,
  Container,
  Typography,
  Box,
  IconButton,
  styled
} from '@mui/material';
import Footer from 'src/components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import { ACTIONS, DELIVERYING_ACTIONS, PICKUP_ACTIONS } from '../contants';
import { DelayOrder } from './delay';
import { CancelOrderBoard } from './cancel';
import { Order, temp_orders } from 'src/models/order';

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
const getPathAction = (type, actionsWrapper, action) => {
  let res = null;
  actionsWrapper.forEach((aw) => {
    aw.actions.forEach((act) => {
      if (act.value === action)
        res = {
          type,
          action: act
        };
    });
  });
  return res;
};

const ActionBoard = ({}) => {
  const { id, action } = useParams();

  const order = temp_orders.find((order: Order) => order.id === parseInt(id));
  const getActionObj = () => {
    if (order.status === 'New') {
      return getPathAction('New', ACTIONS, action);
    }
    if (order.status === 'Preparing') {
      return getPathAction('Preparing', ACTIONS, action);
    }
    if (
      (order.status === 'Ready' && order.order_type === 'Delivery') ||
      order.status === 'Delivering'
    ) {
      return getPathAction('Delivering', DELIVERYING_ACTIONS, action);
    }
    if (
      (order.status === 'Ready' && order.order_type === 'Pickup') ||
      order.status === 'Waitlist'
    ) {
      return getPathAction('Pickup', PICKUP_ACTIONS, action);
    }
  };

  console.log(getActionObj());
  const navigate = useNavigate();

  return (
    getActionObj() && (
      <>
        <Helmet>
          <title>{getActionObj()?.action?.label}</title>
        </Helmet>
        <PageTitleWrapper>
          <FlexBox sx={{ alignItems: 'center' }}>
            <IconButton disableRipple onClick={(event) => navigate(-1)}>
              <KeyboardArrowLeftIcon />
            </IconButton>
            <Typography variant="h5" component="h5" sx={{ py: 0.5 }}>
              {getActionObj()?.action?.label}
            </Typography>
          </FlexBox>
        </PageTitleWrapper>
        <ContentWrapper
          maxWidth="sm"
          sx={{ pt: 4, display: 'flex', flexDirection: 'column' }}
        >
          {getActionObj()?.action?.value === 'delay-order' && <DelayOrder />}
          {getActionObj()?.action?.value === 'cancel-order' && (
            <CancelOrderBoard />
          )}
        </ContentWrapper>
        <Footer />
      </>
    )
  );
};

export default ActionBoard;
