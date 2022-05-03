import {
  Box,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { NotificationsBadge } from '../Buttons/Notifications';

const ListWrapper = styled(Box)(
  ({ theme }) => `
        margin-left: ${theme.spacing(8)};
        .MuiTouchRipple-root {
            display: none;
        }
        
        .MuiListItem-root {
            transition: ${theme.transitions.create(['color', 'fill'])};
            
            &.MuiListItem-indicators {
                padding: ${theme.spacing(1, 3)};
                color: ${theme.sidebar.textColor};
                
                &:before {
                  height: 3px;
                  width: 100%;
                  opacity: 0;
                  visibility: hidden;
                  display: block;
                  position: absolute;
                  bottom: -12px;
                  left: 0px;
                  transition: all .2s;
                  border-radius: ${theme.general.borderRadiusLg};
                  content: "";
                  background: ${theme.header.indicatorColor};
                }

                &.active,
                &:active,
                &:hover {
                    background: transparent;
                    color: white;
                    &:before {
                      opacity: 1;
                      visibility: visible;
                      
                    }
                }
            }
        }
`
);

function HeaderMenu() {

  const ref = useRef<any>(null);
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleOpen = (): void => {
    setOpen(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  return (
    <>
      <ListWrapper>
        <List disablePadding component={Box} display="flex">
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/orders/new"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true, variant: 'button' }}
              primary="NEW"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/orders/preparing"
          >
            <NotificationsBadge showZero={false} badgeContent={3} color='warning'>
              <ListItemText
                primaryTypographyProps={{ noWrap: true, variant: 'button' }}
                primary="PREPARING"
                sx={{ mx: 1 }}
              />
            </NotificationsBadge>
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/orders/delivery"
          >
            <NotificationsBadge showZero={false} badgeContent={2} color='warning'>
              <ListItemText
                primaryTypographyProps={{ noWrap: true, variant: 'button' }}
                primary="DELIVERY"
                sx={{ mx: 1 }}
              />
            </NotificationsBadge>
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/orders/pickup"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true, variant: 'button' }}
              primary="PICKUP"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/orders/all"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true, variant: 'button' }}
              primary="ALL"
            />
          </ListItem>
        </List>
      </ListWrapper>
    </>
  );
}

export default HeaderMenu;
