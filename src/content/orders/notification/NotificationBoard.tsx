import { ReactNode, useState } from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CardMedia,
  CardActionArea,
  CardActions,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  ButtonGroup,
  Button,
  styled
} from '@mui/material';
import { DialogProps } from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    background: theme.palette.success.dark,
    paddingBottom: 42
  },
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2)
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1)
  }
}));

const BootstrapDialogCard = styled(Card)(({ theme }) => ({
  marginTop: '12px',
  maxWidth: 345,
  minHeight: 420,
  maxHeight: 450,
  background: 'white',
  borderRadius: '3px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
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
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [maxWidth, setMaxWidth] = useState<DialogProps['maxWidth']>('sm');

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
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
      <DialogContent sx={{ display: 'flex', justifyContent: 'center' }}>
        <BootstrapDialogCard>
          <CardHeader title="New Order" sx={{}} />
          <CardContent sx={{ borderBottom: '1px solid #34343412', flex: 1 }}>
            <Typography variant="body2" color="text.secondary">
              This impressive paella is a perfect party dish and a fun meal to
              cook together with your guests. Add 1 cup of frozen peas along
              with the mussels, if you like.
            </Typography>
          </CardContent>
          <CardActions
            disableSpacing
            sx={{ display: 'flex', justifyContent: 'space-around' }}
          >
            <Button variant="outlined">Print Order</Button>
            <Button variant="contained">View Order</Button>
          </CardActions>
          {/* <ButtonGroup
            variant="contained"
            aria-label="contained button group"
            fullWidth
          >
            <Button variant="outlined">Print Order</Button>
            <Button>View Order</Button>
          </ButtonGroup> */}
        </BootstrapDialogCard>
      </DialogContent>
    </BootstrapDialog>
  );
};

export default NotificationBoard;
