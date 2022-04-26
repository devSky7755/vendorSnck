import {
  Box,
  Button,
} from '@mui/material';
import { Customer } from 'src/models/customer';

interface BulkActionsProps {
  onAction: Function;
  selected: Customer[];
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
