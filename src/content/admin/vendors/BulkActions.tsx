import { Box, Button, MenuItem } from '@mui/material';
import { VendorStand as Vendor } from 'src/models/vendorStand';
import { useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ACTIONS, StyledMenu } from 'src/components/BulkAction';

interface BulkActionsProps {
  onAction: Function;
  selected: Vendor[];
}

const BulkActions: React.FC<BulkActionsProps> = (props) => {
  const { selected } = props;
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (action: string) => {
    setAnchorEl(null);
    props.onAction('Bulk Action', action);
  };

  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="flex-start"
      style={{ paddingTop: 8, paddingRight: 8 }}
    >
      <Box display="flex" alignItems="center">
        <Button
          color="primary"
          sx={{ ml: 1 }}
          style={{ width: 150 }}
          variant="contained"
          onClick={() => {
            props.onAction('Add New');
          }}
        >
          Add New
        </Button>
      </Box>
      <Box display="flex" alignItems="center">
        <Button
          id="bulk-menu"
          color="primary"
          sx={{ ml: 1 }}
          style={{ width: 160 }}
          variant="outlined"
          disabled={!selected || !selected.length}
          aria-controls={open ? 'bulk-menu' : undefined}
          aria-haspopup="true"
          aria-expanded={open ? 'true' : undefined}
          disableElevation
          onClick={handleClick}
          endIcon={<KeyboardArrowUpIcon />}
        >
          Bulk Action
        </Button>
        <StyledMenu
          id="bulk-menu"
          MenuListProps={{
            'aria-labelledby': 'bulk-menu'
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
        >
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.SET_AVAILABLE.action)}
            disableRipple
          >
            {ACTIONS.SET_AVAILABLE.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.SET_UNAVAILABLE.action)}
            disableRipple
          >
            {ACTIONS.SET_UNAVAILABLE.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.ENABLE_DELIVERY.action)}
            disableRipple
          >
            {ACTIONS.ENABLE_DELIVERY.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.DISABLE_DELIVERY.action)}
            disableRipple
          >
            {ACTIONS.DISABLE_DELIVERY.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.ENABLE_PICKUP.action)}
            disableRipple
          >
            {ACTIONS.ENABLE_PICKUP.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.DISABLE_PICKUP.action)}
            disableRipple
          >
            {ACTIONS.DISABLE_PICKUP.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.DELETE_VENDOR_STANDS.action)}
            disableRipple
          >
            {ACTIONS.DELETE_VENDOR_STANDS.label}
          </MenuItem>
        </StyledMenu>
      </Box>
    </Box>
  );
};

export default BulkActions;
