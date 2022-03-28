import {
  Box,
  Button,
} from '@mui/material';
import { Order } from 'src/models/order';

interface BulkActionsProps {
  onReset?: Function,
  onPrint?: Function,
  onIssue?: Function,
  onView?: Function,
  selected: Order[]
};

const BulkActions: React.FC<BulkActionsProps> = (props) => {
  const { selected } = props;

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent='flex-start' style={{ marginTop: 8, paddingRight: 8 }}>
        <Box display="flex" alignItems="center">
          <Button
            color='primary'
            sx={{ ml: 1 }}
            variant="contained"
            disabled={!selected || !selected.length}
            onClick={props.onPrint()}
          >
            PRINT SELECTED {selected && selected.length > 0 && `(${selected.length})`}
          </Button>
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            color='primary'
            sx={{ ml: 1 }}
            variant="contained"
            disabled={!selected || !selected.length}
            onClick={() => {
              props.onView();
            }}
          >
            VIEW ITEMS {selected && selected.length > 0 && `(${selected.length})`}
          </Button>
        </Box>
        {
          selected && selected.length === 1 &&
          < Box display="flex" alignItems="center">
            <Button
              color='primary'
              sx={{ ml: 1 }}
              onClick={() => {
                props.onIssue();
              }}
            >
              ISSUE WITH ORDER
            </Button>
          </Box>
        }
        <Box display="flex" sx={{ ml: 'auto' }}>
          <Button
            color='primary'
            sx={{ ml: 1 }}
            onClick={() => {
              props.onReset();
            }}
          >
            RESET
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default BulkActions;
