import {
  Box,
  Button,
} from '@mui/material';
import { Order } from 'src/models/order';

interface BulkActionsProps {
  onAction: Function;
  selected: Order[];
  type: string;
};

const BulkActions: React.FC<BulkActionsProps> = (props) => {
  const { selected, type } = props;

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent='flex-start' style={{ marginTop: 8, paddingRight: 8 }}>
        {
          type === 'New' &&
          <Box display="flex" alignItems="center">
            <Button
              color='primary'
              sx={{ ml: 1 }}
              variant="contained"
              disabled={!selected || !selected.length}
              onClick={() => {
                props.onAction('Print Bulk', selected);
              }}
            >
              PRINT SELECTED {selected && selected.length > 0 && `(${selected.length})`}
            </Button>
          </Box>
        }
        {
          type === 'Preparing' &&
          <Box display="flex" alignItems="center">
            <Button
              color='primary'
              sx={{ ml: 1 }}
              variant="contained"
              disabled={!selected || !selected.length}
              onClick={() => {
                props.onAction('Ready');
              }}
            >
              Mark as Ready {selected && selected.length > 0 && `(${selected.length})`}
            </Button>
          </Box>
        }
        {
          type === 'Delivery' &&
          <Box display="flex" alignItems="center">
            <Button
              color='primary'
              sx={{ ml: 1 }}
              variant="contained"
              disabled={!selected || !selected.length}
              onClick={() => {
                props.onAction('Dispatch');
              }}
            >
              Dispatch {selected && selected.length > 0 && `(${selected.length})`}
            </Button>
          </Box>
        }
        {
          type === 'Pickup' &&
          <Box display="flex" alignItems="center">
            <Button
              color='primary'
              sx={{ ml: 1 }}
              variant="contained"
              disabled={!selected || !selected.length}
              onClick={() => {
                props.onAction('Dispatch');
              }}
            >
              Picked up {selected && selected.length > 0 && `(${selected.length})`}
            </Button>
          </Box>
        }
        <Box display="flex" alignItems="center">
          <Button
            color='primary'
            sx={{ ml: 1 }}
            variant="contained"
            disabled={!selected || !selected.length}
            onClick={() => {
              props.onAction('View Items');
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
                props.onAction('Issue', selected[0]);
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
              props.onAction('Reset');
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
