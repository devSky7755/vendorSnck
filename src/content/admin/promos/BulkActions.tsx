import { Box, Button, MenuItem } from '@mui/material';
import { Promo } from 'src/models/promo';
import { useState } from 'react';
import { ACTIONS, StyledMenu } from 'src/components/BulkAction';

interface BulkActionsProps {
  onAction: Function;
  selected: Promo[];
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
            onClick={(e) => handleClose(ACTIONS.COMMENCE_NOW.action)}
            disableRipple
          >
            <div
              dangerouslySetInnerHTML={{
                __html: ACTIONS.COMMENCE_NOW.label
              }}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.EXPIRE_NOW.action)}
            disableRipple
          >
            <div
              dangerouslySetInnerHTML={{
                __html: ACTIONS.EXPIRE_NOW.label
              }}
            />
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.DELETE_PROMOS.action)}
            disableRipple
          >
            <div
              dangerouslySetInnerHTML={{
                __html: ACTIONS.DELETE_PROMOS.label
              }}
            />
          </MenuItem>
        </StyledMenu>
      </Box>
    </Box>
  );
};

export default BulkActions;
