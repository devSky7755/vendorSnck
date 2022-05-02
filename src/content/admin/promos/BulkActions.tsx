import { Box, Button, MenuItem, Divider } from '@mui/material';
import { Promo } from 'src/models/promo';
import { useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import ArchiveIcon from '@mui/icons-material/Archive';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
            onClick={(e) => handleClose(ACTIONS.COMMENCE_NOW.action)}
            disableRipple
          >
            {ACTIONS.COMMENCE_NOW.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.EXPIRE_NOW.action)}
            disableRipple
          >
            {ACTIONS.EXPIRE_NOW.label}
          </MenuItem>
          <MenuItem
            onClick={(e) => handleClose(ACTIONS.DELETE_PROMOS.action)}
            disableRipple
          >
            {ACTIONS.DELETE_PROMOS.label}
          </MenuItem>
        </StyledMenu>
      </Box>
    </Box>
  );
};

export default BulkActions;
