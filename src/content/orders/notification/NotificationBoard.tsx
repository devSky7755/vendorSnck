import { ReactNode, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  Box,
  Grid,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Badge,
  styled
} from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { NOTIFICATIONS } from './contants';

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
  },
  '& .MuiDialogTitle-root': {
    position: 'absolute',
    right: 0,
    padding: 0,
    top: 0,
    margin: 0
  }
}));

const BootstrapDialogCard = styled(Card)(({ theme }) => ({
  marginTop: '12px',
  maxWidth: 380,
  minWidth: 350,
  minHeight: 420,
  maxHeight: 500,
  background: 'white',
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}));

const BootstrapDialogCardHeader = styled(CardHeader)(({ theme }) => ({
  '& .MuiCardHeader-title': {
    fontSize: 40,
    fontWeight: 400,
    lineHeight: '50px',
    color: 'rgb(0 0 0 / 80%)',
    fontFamily: 'Roboto',
    textAlign: 'center'
  }
}));

const BootstrapBox = styled(Box)(({ theme }) => ({
  '&.MuiBox-root': {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '50px',
    paddingBottom: '50px',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  '&.MuiBox-success': {
    background: theme.palette.success.main
  },
  '&.MuiBox-warning': {
    background: theme.palette.warning.main
  }
}));

const BootstrapBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    fontSize: 150,
    height: 250,
    width: 250,
    borderRadius: 250
  },
  '& .MuiBadge-colorSuccess': {
    border: '25px solid rgb(197 221 187)'
  },
  '& .MuiBadge-colorWarning': {
    border: '25px solid rgb(225 211 191)'
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
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
            border: '1px solid white',
            borderRadius: '50%',
            background: 'white',
            '&.MuiButtonBase-root:hover': {
              bgcolor: 'white'
            }
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

export interface NotificationBoardProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}
const NotificationBoard = (props: NotificationBoardProps) => {
  const { open, setOpen, ...other } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [maxWidth] = useState<DialogProps['maxWidth']>('md');

  const handleClose = () => {
    setOpen(false);
  };

  const notifications = NOTIFICATIONS;

  return (
    <BootstrapDialog
      //onClose={handleClose}
      fullWidth
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      aria-labelledby="notification-dialog-title"
      open={open}
    >
      <BootstrapDialogTitle
        id="notification-dialog-title"
        onClose={handleClose}
      ></BootstrapDialogTitle>
      <DialogContent>
        <Grid container spacing={0} sx={{ flex: 1 }}>
          {notifications.map((notification, key) => (
            <Grid
              item
              md={notifications.length > 1 ? 6 : 12}
              sm={12}
              xs={12}
              key={key}
              sx={{ display: 'flex', flexDirection: 'column' }}
            >
              <BootstrapBox className={`MuiBox-${notification.class}`}>
                <BootstrapDialogCard>
                  <BootstrapDialogCardHeader title={notification.title} />
                  <CardContent
                    sx={{
                      borderBottom: '1px solid #34343412',
                      flex: 1,
                      whiteSpace: 'normal',
                      wordBreak: 'break-word',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <BootstrapBadge
                      badgeContent={notification.count}
                      color={notification.class as any}
                    ></BootstrapBadge>
                  </CardContent>
                  <CardActions
                    disableSpacing
                    sx={{ display: 'flex', justifyContent: 'space-around' }}
                  >
                    <Button variant="outlined">Print Order</Button>
                    <Button variant="contained">View Order</Button>
                  </CardActions>
                </BootstrapDialogCard>
              </BootstrapBox>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default NotificationBoard;
