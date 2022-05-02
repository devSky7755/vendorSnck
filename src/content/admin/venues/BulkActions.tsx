import {
  Box, Menu, MenuItem, Button,
} from '@mui/material';
import { useState } from 'react';
import { Venue } from 'src/models/venue';

interface BulkActionsProps {
  onAction: Function;
  selected: Venue[];
};

const BulkActions: React.FC<BulkActionsProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { selected } = props;

  const handleCloseAction = (action) => {
    setAnchorEl(null);
    props.onAction(action);
  }

  return (
    <Box display="flex" alignItems="center" justifyContent='flex-start' style={{ paddingTop: 8, paddingRight: 8 }}>
      <Box display="flex" alignItems="center">
        <Button
          color='primary'
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
          color='primary'
          sx={{ ml: 1 }}
          style={{ width: 150 }}
          variant="outlined"
          disabled={!selected || !selected.length}
          onClick={(e) => {
            setAnchorEl(e.currentTarget);
          }}
        >
          Bulk Action
        </Button>
        <Menu
          anchorEl={anchorEl}
          transformOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          open={anchorEl !== null}
          onClose={() => {
            setAnchorEl(null);
          }}
          MenuListProps={{
            'aria-labelledby': 'basic-button',
          }}
        >
          <MenuItem onClick={() => handleCloseAction('Bulk Active')}>Mark all&nbsp;<b>Active</b></MenuItem>
          <MenuItem onClick={() => handleCloseAction('Bulk Inactive')}>Mark all&nbsp;<b>Inactive</b></MenuItem>
          <MenuItem onClick={() => handleCloseAction('Bulk Delete')}>Delete&nbsp;<b>Venues</b></MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default BulkActions;
