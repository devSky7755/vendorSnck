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
import { TeamUser, UserRole, TeamUserStatus } from 'src/models/team_user';

interface UsersTableProps {
  className?: string;
  users: TeamUser[];
  onEditingUser: Function
}

interface Filters {
  status?: TeamUserStatus;
}

const getStatusLabel = (userStatus: TeamUserStatus): JSX.Element => {
  const color = userStatus === 'Active' ? 'success' : 'warning';
  return <Label color={color}>{userStatus}</Label>;
};

const applyFilters = (
  users: TeamUser[],
  filters: Filters
): TeamUser[] => {
  return users.filter((user) => {
    let matches = true;

    if (filters.status && user.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};

const UsersTable: FC<UsersTableProps> = ({ users, onEditingUser }) => {

  const [selectedUsers, setSelectedUsers] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedUsers.length > 0;
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
      id: 'Active',
      name: 'Active'
    },
    {
      id: 'Not Active',
      name: 'Not Active'
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

  const handleSelectAllUsers = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedUsers(
      event.target.checked
        ? users.map((user) => user.id)
        : []
    );
  };

  const handleSelectOneUser = (
    event: ChangeEvent<HTMLInputElement>,
    userId: number
  ): void => {
    if (!selectedUsers.includes(userId)) {
      setSelectedUsers((prevSelected) => [
        ...prevSelected,
        userId
      ]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => id !== userId)
      );
    }
  };

  const filteredUsers = applyFilters(users, filters);
  const selectedSomeUsers =
    selectedUsers.length > 0 &&
    selectedUsers.length < users.length;
  const selectedAllUsers =
    selectedUsers.length === users.length;
  const theme = useTheme();

  return (
    <Card>
      {
        /*
        selectedBulkActions && (
          <Box flex={1} px={2} py={1} height={59}>
            <BulkActions />
          </Box>
        )
        */
      }
      {(
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
                  size='small'
                  checked={selectedAllUsers}
                  indeterminate={selectedSomeUsers}
                  onChange={handleSelectAllUsers}
                />
              </TableCell>
              <TableCell>User ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Seen</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredUsers.map((user) => {
              const isUserSelected = selectedUsers.includes(
                user.id
              );
              return (
                <TableRow
                  hover
                  key={user.id}
                  selected={isUserSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      size='small'
                      checked={isUserSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneUser(event, user.id)
                      }
                      value={isUserSelected}
                    />
                  </TableCell>
                  <TableCell>
                    {user.id}
                  </TableCell>
                  <TableCell>
                    {user.name} {user.surname}
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body1"
                      fontWeight="bold"
                      color="text.primary"
                      gutterBottom
                      noWrap
                    >
                      {getStatusLabel(user.status)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    {user.lastSeen}
                  </TableCell>
                  <TableCell align="right">

                  </TableCell>

                  <TableCell align="right">
                    <Tooltip title="Edit User" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        onClick={() => {
                          onEditingUser(user);
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete User" arrow>
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
    </Card>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  users: []
};

export default UsersTable;
