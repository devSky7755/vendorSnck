import {
  Box,
  Button,
} from '@mui/material';
import { Order } from 'src/models/order';

interface BulkActionsProps {
  onReset?: Function,
  onPrint?: Function,
  onIssue?: Function,
  selected: Order[]
};

const BulkActions: React.FC<BulkActionsProps> = (props) => {
  const { selected } = props;

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent='flex-start'>
        <Box display="flex" alignItems="center">
          <Button
            color='primary'
            sx={{ ml: 1 }}
            variant="contained"
            disabled={!selected || !selected.length}
          >
            PRINT SELECTED ({selected.length})
          </Button>
        </Box>
        {
          selected && selected.length === 1 &&
          < Box display="flex" alignItems="center">
            <Button
              color='primary'
              sx={{ ml: 1 }}
            >
              ISSUE WITH ORDER
            </Button>
          </Box>
        }
        <Box display="flex" sx={{ ml: 'auto' }}>
          <Button
            color='primary'
            sx={{ ml: 1 }}
          >
            RESET
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default BulkActions;
