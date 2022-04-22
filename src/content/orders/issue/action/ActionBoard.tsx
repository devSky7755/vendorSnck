import { ACTIONS, DELIVERYING_ACTIONS, PICKUP_ACTIONS } from '../contants';
import { DelayOrder } from './delay';
import { CancelOrderBoard } from './cancel';
import { useEffect } from 'react';

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

const ActionBoard = ({ order, action, setDlgTitle, handleClose }) => {
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

  useEffect(() => {
    setDlgTitle(getActionObj()?.action?.label);
  }, []);

  return (
    <>
      {getActionObj()?.action?.value === 'delay-order' && (
        <DelayOrder handleClose={handleClose} />
      )}
      {getActionObj()?.action?.value === 'cancel-order' && (
        <CancelOrderBoard handleClose={handleClose} />
      )}
    </>
  );
};

export default ActionBoard;
