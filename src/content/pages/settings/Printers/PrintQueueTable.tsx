import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { PrintQueue, PrintQueueStatus } from 'src/models/printer';

interface PrintQueuesTableProps {
  className?: string;
  printQueues: PrintQueue[];
  //onEditingPrintQueue: Function
}

interface Filters {
  status?: PrintQueueStatus;
}

const getStatusLabel = (printQueueStatus: PrintQueueStatus): JSX.Element => {
  const color = printQueueStatus === 'Printing' ? 'success' : 'warning';
  return <Label color={color}>{printQueueStatus}</Label>;
};

const applyFilters = (
  printQueues: PrintQueue[],
  filters: Filters
): PrintQueue[] => {
  return printQueues.filter((printQueue) => {
    let matches = true;

    if (filters.status && printQueue.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const applyPagination = (
  printQueues: PrintQueue[],
  page: number,
  limit: number
): PrintQueue[] => {
  return printQueues.slice(page * limit, page * limit + limit);
};

const PrintQueuesTable: FC<PrintQueuesTableProps> = ({ printQueues }) => {

  const [selectedPrintQueues, setSelectedPrintQueues] = useState<string[]>(
    []
  );
  const selectedBulkActions = selectedPrintQueues.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'Printing',
      name: 'Printing'
    },
    {
      id: 'In queue',
      name: 'In queue'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllPrintQueues = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedPrintQueues(
      event.target.checked
        ? printQueues.map((printQueue) => printQueue.id)
        : []
    );
  };

  const handleSelectOnePrintQueue = (
    event: ChangeEvent<HTMLInputElement>,
    printQueueId: string
  ): void => {
    if (!selectedPrintQueues.includes(printQueueId)) {
      setSelectedPrintQueues((prevSelected) => [
        ...prevSelected,
        printQueueId
      ]);
    } else {
      setSelectedPrintQueues((prevSelected) =>
        prevSelected.filter((id) => id !== printQueueId)
      );
    }
  };

  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  const filteredPrintQueues = applyFilters(printQueues, filters);
  const paginatedPrintQueues = applyPagination(
    filteredPrintQueues,
    page,
    limit
  );
  const selectedSomePrintQueues =
    selectedPrintQueues.length > 0 &&
    selectedPrintQueues.length < printQueues.length;
  const selectedAllPrintQueues =
    selectedPrintQueues.length === printQueues.length;
  const theme = useTheme();

  return (
    <Card>
      {selectedBulkActions && (
        <Box flex={1} px={2} py={1} height={59}>
          <BulkActions />
        </Box>
      )}
      {!selectedBulkActions && (
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  size='small'
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  checked={selectedAllPrintQueues}
                  indeterminate={selectedSomePrintQueues}
                  onChange={handleSelectAllPrintQueues}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Seen</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedPrintQueues.map((printQueue) => {
              const isPrintQueueSelected = selectedPrintQueues.includes(
                printQueue.id
              );
              return (
                <TableRow
                  hover
                  key={printQueue.id}
                  selected={isPrintQueueSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isPrintQueueSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOnePrintQueue(event, printQueue.id)
                      }
                      value={isPrintQueueSelected}
                    />
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {printQueue.id}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {getStatusLabel(printQueue.status)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {printQueue.time_string}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">

                  </TableCell>

                  <TableCell align="right">
                    {
                      /*
                      <Tooltip title="Edit PrintQueue" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          onClick={() => {
                            //onEditingPrintQueue(printQueue);
                          }}
                          color="inherit"
                          size="small"
                        >
                          <EditTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      */
                    }
                    <Tooltip title="Delete" arrow>
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Box p={2}>
        <TablePagination
          component="div"
          count={filteredPrintQueues.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  );
};

PrintQueuesTable.propTypes = {
  printQueues: PropTypes.array.isRequired
};

PrintQueuesTable.defaultProps = {
  printQueues: []
};

export default PrintQueuesTable;