import { FC, ChangeEvent, useState, Fragment } from 'react';
import {
  Tooltip, Menu,
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
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  CardHeader,
  Typography
} from '@mui/material';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Label from 'src/components/Label';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';
import { PrintQueue, PrintQueueStatus } from 'src/models/printer';

interface PrintQueuesTableProps {
  className?: string;
  printQueues: PrintQueue[];
}

interface Filters {
  status?: PrintQueueStatus;
}

interface GroupedQueue {
  printer: string;
  printer_id: number;
  tasks: PrintQueue[];
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

const PrintQueuesTable: FC<PrintQueuesTableProps> = ({ printQueues }) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [selectedPrintQueues, setSelectedPrintQueues] = useState<string[]>(
    []
  );
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const [actionID, setActionID] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [collapsed, setCollapsed] = useState<number[]>([]);

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

  const handleSelectOneGroup = (
    event: ChangeEvent<HTMLInputElement>,
    filtered: PrintQueue[]
  ): void => {
    if (event.target.checked) {
      const ids = filtered.map(x => x.id);
      setSelectedPrintQueues((prevSelected) => [
        ...prevSelected,
        ...ids
      ]);
    } else {
      setSelectedPrintQueues((prevSelected) =>
        prevSelected.filter((id) => (filtered.findIndex(o => o.id === id) === -1))
      );
    }
  };

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>, queueid: string) => {
    setActionID(queueid);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, queue: PrintQueue) => {
    setAnchorEl(null);
    if (action === 'Cancel') {
    }
  };

  const groupPrintQueue = (tasks: PrintQueue[]) => {
    let grouped: GroupedQueue[] = [];

    tasks.forEach(element => {
      let exist = grouped.find(x => x.printer_id === element.printer_id);
      if (exist) {
        exist.tasks.push(element);
      } else {
        grouped.push({
          printer_id: element.printer_id,
          printer: element.printer_name,
          tasks: [element]
        })
      }
    });

    return grouped;
  }

  const filteredPrintQueues = applyFilters(printQueues, filters);
  const groupedQueues = groupPrintQueue(filteredPrintQueues);

  const selectedSomePrintQueues =
    selectedPrintQueues.length > 0 &&
    selectedPrintQueues.length < printQueues.length;
  const selectedAllPrintQueues =
    selectedPrintQueues.length === printQueues.length;

  return (
    <Card>
      {showFilter && (
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
                  size='small'
                  color="primary"
                  checked={selectedAllPrintQueues}
                  indeterminate={selectedSomePrintQueues}
                  onChange={handleSelectAllPrintQueues}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Time</TableCell>
              <TableCell align="right">
                <Tooltip title={showFilter ? 'Hide Filter' : 'Show Filter'} arrow>
                  <IconButton size='small' onClick={() => {
                    setShowFilter(x => !x);
                  }}>
                    <FilterListIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align="right" padding="checkbox">
                <IconButton size='small' onClick={() => {
                }}>
                  <MoreVertTwoToneIcon fontSize='small' />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedQueues.map((group) => {
              let group_selected = 0;
              group.tasks.forEach(x => {
                if (selectedPrintQueues.includes(x.id)) group_selected++;
              });
              const isGroupSelected = group_selected === group.tasks.length;
              const isPartSelected = group_selected > 0 && group_selected < group.tasks.length;

              const isExpanded = collapsed.includes(group.printer_id) === false;

              return (
                <Fragment key={group.printer_id}>
                  <TableRow
                    className='group-header-row'
                  >
                    <TableCell padding="checkbox" style={{ height: 52 }}>
                      <Checkbox
                        size='small'
                        color="primary"
                        checked={isGroupSelected}
                        indeterminate={isPartSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleSelectOneGroup(event, group.tasks)
                        }
                      />
                    </TableCell>
                    <TableCell colSpan={3}>
                      <Typography
                        variant="subtitle2"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {group.printer}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" component='span'>{group.tasks.length} </Typography>
                      <Typography variant="subtitle2" component='span' color='GrayText'>tasks</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size='small' onClick={() => {
                        if (isExpanded) {
                          setCollapsed([...collapsed, group.printer_id]);
                        } else {
                          setCollapsed(collapsed.filter(x => x !== group.printer_id));
                        }
                      }}>
                        {
                          isExpanded ? <ExpandLessIcon fontSize='small' /> : <ExpandMoreIcon fontSize='small' />
                        }
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {
                    isExpanded && group.tasks.map(printQueue => {
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
                              size='small'
                              color="primary"
                              checked={isPrintQueueSelected}
                              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleSelectOnePrintQueue(event, printQueue.id)
                              }
                              value={isPrintQueueSelected}
                            />
                          </TableCell>
                          <TableCell>
                            {printQueue.id}
                          </TableCell>
                          <TableCell>
                            {getStatusLabel(printQueue.status)}
                          </TableCell>
                          <TableCell>
                            {printQueue.time_string}
                          </TableCell>
                          <TableCell align="right">

                          </TableCell>

                          <TableCell align="right" padding="checkbox">
                            <IconButton size='small' onClick={(event) => {
                              handleClickAction(event, printQueue.id);
                            }}>
                              <MoreVertTwoToneIcon fontSize='small' />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={anchorEl !== null && actionID === printQueue.id}
                              onClose={() => {
                                handleCloseAction('None', printQueue);
                              }}
                              MenuListProps={{
                                'aria-labelledby': 'basic-button',
                              }}
                            >
                              <MenuItem onClick={() => handleCloseAction('Cancel', printQueue)}>Cancel</MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};
export default PrintQueuesTable;
