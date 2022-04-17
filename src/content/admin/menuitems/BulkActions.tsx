import {
  Box,
  Button,
} from '@mui/material';
import { MenuItem } from 'src/models/menu_item';

interface BulkActionsProps {
  onAction: Function;
  selected: MenuItem[];
};

const BulkActions: React.FC<BulkActionsProps> = (props) => {
  const { selected } = props;

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
          onClick={() => {
            props.onAction('Bulk Action', selected);
          }}
        >
          Bulk Action
        </Button>
      </Box>
    </Box>
  );
}

export default BulkActions;
