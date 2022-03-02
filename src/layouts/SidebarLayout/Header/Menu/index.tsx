import {
  Box,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem
} from '@mui/material';
import { useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import ExpandMoreTwoToneIcon from '@mui/icons-material/ExpandMoreTwoTone';

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
                  bottom: -10px;
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
              primaryTypographyProps={{ noWrap: true }}
              primary="NEW"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/orders/preparing"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="PREPARING"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/orders/delivery"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
              primary="DELIVERY"
            />
          </ListItem>
          <ListItem
            classes={{ root: 'MuiListItem-indicators' }}
            button
            component={NavLink}
            to="/orders/pickup"
          >
            <ListItemText
              primaryTypographyProps={{ noWrap: true }}
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
              primaryTypographyProps={{ noWrap: true }}
              primary="ALL"
            />
          </ListItem>
          {
            /*
            <ListItem
              classes={{ root: 'MuiListItem-indicators' }}
              button
              ref={ref}
              onClick={handleOpen}
            >
              <ListItemText
                primaryTypographyProps={{ noWrap: true }}
                primary={
                  <Box display="flex" alignItems="center">
                    Others
                    <Box display="flex" alignItems="center" pl={0.3}>
                      <ExpandMoreTwoToneIcon fontSize="small" />
                    </Box>
                  </Box>
                }
              />
            </ListItem>
            */
          }
        </List>
      </ListWrapper>
      <Menu anchorEl={ref.current} onClose={handleClose} open={isOpen}>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/overview">
          Overview
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/tabs">
          Tabs
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/cards">
          Cards
        </MenuItem>
        <MenuItem sx={{ px: 3 }} component={NavLink} to="/components/modals">
          Modals
        </MenuItem>
      </Menu>
    </>
  );
}

export default HeaderMenu;
