import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import {
  Typography,
  Box,
  IconButton,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Dialog,
  DialogTitle,
  DialogContent,
  styled
} from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { ReactNode, useEffect, useState } from 'react';
import { ACTIONS } from './index';
import { DELIVERYING_ACTIONS, PICKUP_ACTIONS } from './contants';
import { ActionBoard } from './action';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    // background: theme.palette.success.dark,
    // paddingBottom: 42
  },
  '& .MuiDialogContent-root': {
    display: 'flex',
    flexDirection: 'column',
    padding: theme.spacing(0)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(0)
  }
}));

export interface DialogTitleProps {
  id: string;
  children?: ReactNode;
  onClose: () => void;
}
const BootstrapDialogTitle = (props: DialogTitleProps) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle
      sx={{
        m: 0,
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}
      {...other}
    >
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            color: (theme) => theme.palette.grey[500],
            border: '1px solid white',
            borderRadius: '50%',
            background: 'white'
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

const FlexBox = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    `
);

const OrderIssue = ({ setOpen, order, open }) => {
  const [maxWidth] = useState<DialogProps['maxWidth']>('sm');
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClose = (result = {}) => {
    setOpen(false);
  };
  const [actionDetails, setActionDetails] = useState<any>(null);
  const [dlgTitle, setDlgTitle] = useState('Issue with Order');
  const [action, setAction] = useState();
  const [actionBoard, setActionBoard] = useState(false);
  // const order = temp_orders.find((order: Order) => order.id === parseInt(id));
  const getActions = () => {
    if (order.status === 'new')
      return {
        type: 'New',
        actions: ACTIONS
      };
    if (order.status === 'preparing')
      return {
        type: 'Preparing',
        actions: ACTIONS
      };
    if (
      (order.status === 'ready' && order.order_type === 'delivery') ||
      order.status === 'delivering'
    ) {
      return {
        type: 'Delivering',
        actions: DELIVERYING_ACTIONS
      };
    }
    if (
      (order.status === 'ready' && order.order_type === 'pickup') ||
      order.status === 'waitlist'
    ) {
      return {
        type: 'Pickup',
        actions: PICKUP_ACTIONS
      };
    }
  };

  useEffect(() => {
    setActionDetails(getActions());
  }, []);

  const handleChangeAction = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: any = (event.target as HTMLInputElement).value;
    setAction(value);
    if (['Delivering', 'Pickup'].includes(actionDetails?.type)) {
      handleClose({
        action: value
      });
    } else {
      if (['re-assign'].includes(value)) {
        handleClose({
          action: value
        });
      } else {
        setActionBoard(true);
      }
    }
  };

  const goOrderIssue = () => {
    setDlgTitle('Issue with Order');
    setActionBoard(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={open}
      fullWidth
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      PaperProps={{ style: { maxWidth: 600, minHeight: 600 } }}
    >
      <BootstrapDialogTitle id="order-issue-dialog-title" onClose={handleClose}>
        <FlexBox>
          {actionBoard && (
            <IconButton disableRipple onClick={goOrderIssue}>
              <KeyboardArrowLeftIcon
                sx={{ width: '30px !important', height: '30px !important' }}
              />
            </IconButton>
          )}
          <Typography sx={{ py: 0.5, fontSize: '22px' }}>{dlgTitle}</Typography>
        </FlexBox>
      </BootstrapDialogTitle>
      <DialogContent dividers sx={{ borderBottom: 0 }}>
        <Box sx={{ p: 3, display: 'flex', flexDirection: 'column', flex: 1 }}>
          {!actionBoard &&
            actionDetails?.actions.map((actType, key) => {
              return (
                <FormControl key={key}>
                  <FormLabel id="choose-action-group">
                    {actType.label}
                  </FormLabel>
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
          {actionBoard && (
            <ActionBoard
              order={order}
              action={action}
              setDlgTitle={setDlgTitle}
              handleClose={handleClose}
            />
          )}
        </Box>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default OrderIssue;
