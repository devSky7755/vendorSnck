import {
  Box,
  Button,
} from '@mui/material';
import { Staff } from 'src/models/staff';

interface BulkActionsProps {
  onAction: Function;
  selected: Staff[];
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
