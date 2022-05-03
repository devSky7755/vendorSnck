import {
  Box,
  Button, MenuItem, Menu
} from '@mui/material';
import { useState } from 'react';
import { MenuItem as MenuItemModel, BulkPatchMenuItem } from 'src/models/menu_item';

interface BulkActionsProps {
  onAction: Function;
  selected: MenuItemModel[];
};

const BulkActions: React.FC<BulkActionsProps> = (props) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { selected } = props;

  const handleCloseAction = (action, patch: BulkPatchMenuItem) => {
    setAnchorEl(null);
    props.onAction(action, patch);
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
          <MenuItem onClick={() => handleCloseAction('Bulk Update', { available: true })}>Set&nbsp;<b>Available</b></MenuItem>
          <MenuItem onClick={() => handleCloseAction('Bulk Update', { available: false })}>Set&nbsp;<b>Unavailable</b></MenuItem>
          <MenuItem onClick={() => handleCloseAction('Bulk Update', { mostPopular: true })}>Enable&nbsp;<b>Most Popular</b></MenuItem>
          <MenuItem onClick={() => handleCloseAction('Bulk Update', { mostPopular: false })}>Disable&nbsp;<b>Most Popular</b></MenuItem>
          <MenuItem onClick={() => handleCloseAction('Bulk Update', { containsAlcohol: true })}>Contains&nbsp;<b>Alcohol</b></MenuItem>
          <MenuItem onClick={() => handleCloseAction('Bulk Update', { containsAlcohol: false })}>Does Not Contain&nbsp;<b>Alcohol</b></MenuItem>
          <MenuItem onClick={() => handleCloseAction('Bulk Delete', {})}>Delete&nbsp;<b>Menu Items</b></MenuItem>
        </Menu>
      </Box>
    </Box>
  );
}

export default BulkActions;
