import { Box, Button, MenuItem } from '@mui/material';
import { useState } from 'react';
import { Customer } from 'src/models/customer';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { ACTIONS, StyledMenu } from 'src/components/BulkAction';

interface BulkActionsProps {
  onAction: Function;
  selected: Customer[];
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
          id="bulk-menu"
          color="primary"
          sx={{ ml: 1 }}
          style={{ width: 160 }}
          variant="outlined"
          disabled={!selected || !selected.length}
          // onClick={() => {
          //   props.onAction('Bulk Action', selected);
          // }}
          aria-controls={open ? 'demo-customized-menu' : undefined}
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
            onClick={(e) => handleClose(ACTIONS.ENABLE_TEMPORARY_BLOCK.action)}
            disableRipple
          >
            {ACTIONS.ENABLE_TEMPORARY_BLOCK.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.DISABLE_TEMPORARY_BLOCK.action)}
            disableRipple
          >
            {ACTIONS.DISABLE_TEMPORARY_BLOCK.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.ENABLE_PERMANENT_BLOCK.action)}
            disableRipple
          >
            {ACTIONS.ENABLE_PERMANENT_BLOCK.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.DISABLE_PERMANENT_BLOCK.action)}
            disableRipple
          >
            {ACTIONS.DISABLE_PERMANENT_BLOCK.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.DELETE_CUSTOMERS.action)}
            disableRipple
          >
            {ACTIONS.DELETE_CUSTOMERS.label}
          </MenuItem>
        </StyledMenu>
      </Box>
    </Box>
  );
};

export default BulkActions;
