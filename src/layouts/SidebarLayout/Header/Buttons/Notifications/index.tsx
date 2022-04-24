import {
  alpha,
  Badge,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography
} from '@mui/material';
import { Fragment, useEffect, useRef, useState } from 'react';
import NotificationsActiveTwoToneIcon from '@mui/icons-material/NotificationsActiveTwoTone';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';
import { formatDistance, subDays } from 'date-fns';
import { MockNotifications } from './mock';

export const NotificationsBadge = styled(Badge)(
  ({ theme }) => `
    
    .MuiBadge-badge {
        background-color: ${theme.header.indicatorColor};
        color: white;
        min-width: 16px; 
        height: 16px;
        padding: 0;        

        &::after {
            position: absolute;
            top: 0;
            left: 10;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            box-shadow: 0 0 0 1px ${alpha(theme.palette.error.main, 0.3)};
            content: "";
        }
    }
`
);

function HeaderNotifications() {
  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [notifications] = useState<any[]>(MockNotifications);
  const [unRead, setUnRead] = useState<number>(0);

  useEffect(() => {
    setUnRead(
      notifications.filter((notf) => {
        return !notf.isViewed;
      }).length
    );
  }, [notifications]);
  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Notifications">
        <IconButton
          ref={ref}
          onClick={handleOpen}
          style={{ color: '#FFFFFFBD' }}
        >
          <NotificationsBadge
            badgeContent={5}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <NotificationsActiveTwoToneIcon />
          </NotificationsBadge>
        </IconButton>
      </Tooltip>

      <Drawer anchor="right" open={isOpen} onClose={handleClose}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            px: 2,
            py: 1,
            boxShadow: '0px 1px 6px 0px rgb(0 0 0 / 50%)',
            alignItems: 'center'
          }}
        >
          <NotificationsBadge
            badgeContent={unRead}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <Typography variant="h6">Notifications</Typography>
          </NotificationsBadge>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: (theme) => theme.palette.grey[500],
              background: 'white',
              '&.MuiButtonBase-root:hover': {
                bgcolor: 'white'
              }
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <List sx={{ p: 0, flex: 1 }}>
          {notifications.map((notification, key) => {
            return (
              <Fragment key={key}>
                <ListItem
                  key={key}
                  className={notification.isViewed ? '' : 'bg-warning'}
                  sx={{
                    p: 2,
                    minWidth: 350,
                    display: { xs: 'block', sm: 'flex' }
                  }}
                >
                  <Box flex="1">
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ textTransform: 'none' }}
                      >
                        {formatDistance(new Date(notification.at), new Date(), {
                          addSuffix: true
                        })}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}
                    >
                      <Typography
                        component="span"
                        variant="body2"
                        color="text.secondary"
                        pr="6px"
                      >
                        {notification.title}
                      </Typography>
                      <Button>{notification.action.title}</Button>
                    </Box>
                  </Box>
                </ListItem>
                <Divider light />
              </Fragment>
            );
          })}
        </List>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'end',
            px: 2,
            py: 1,
            boxShadow: '0px 1px 6px 0px rgb(0 0 0 / 50%)',
            alignItems: 'center'
          }}
        >
          <Button>Mark as read</Button>
        </Box>
      </Drawer>
    </>
  );
}

export default HeaderNotifications;
