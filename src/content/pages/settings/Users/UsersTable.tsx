import { FC, ChangeEvent, useState, useEffect } from 'react';
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
  CardHeader,
  Menu
} from '@mui/material';

import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Label from 'src/components/Label';
import { Staff, UserRole, TeamUserStatus } from 'src/models/staff';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';

interface UsersTableProps {
  className?: string;
  users: Staff[];
  onEditingUser: Function;
  user_role?: UserRole;
  search?: string;
}

interface Filters {
  status?: TeamUserStatus;
  role?: UserRole;
  search?: string;
}

const getStatusLabel = (userStatus: TeamUserStatus): JSX.Element => {
  const color = userStatus === 'Active' ? 'success' : 'warning';
  return <Label color={color}>{userStatus}</Label>;
};

const applyFilters = (
  users: Staff[],
  filters: Filters
): Staff[] => {
  return users.filter((user) => {
    let matches = true;

    if (filters.status && user.status !== filters.status) {
      matches = false;
    }
    if (filters.role && user.role !== filters.role) {
      matches = false;
    }
    if (matches && filters.search && filters.search.length > 0) {
      if ((user.name && user.name.includes(filters.search)) || (user.surname && user.surname.includes(filters.search)) ||
        (user.email && user.email.includes(filters.search)) || (user.phone && user.phone.includes(filters.search))) {
        matches = true;
      } else {
        matches = false;
      }
    }

    return matches;
  });
};

const UsersTable: FC<UsersTableProps> = ({ users, onEditingUser, user_role, search }) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [actionID, setActionID] = useState<number>(-1);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [expanded, setExpanded] = useState<string[]>(['Runner', 'Packer']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [filters, setFilters] = useState<Filters>({
    status: null,
    role: user_role,
    search: search
  });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: search
    }));
  }, [search])

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      role: user_role
    }));
  }, [user_role])

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

  const roleOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'Runner',
      name: 'Runner'
    },
    {
      id: 'Packer',
      name: 'Packer'
    }
  ];

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>, userid: number) => {
    setActionID(userid);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, user: Staff) => {
    setAnchorEl(null);
    if (action === 'Edit') {
      onEditingUser(user);
    }
  };

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

  const handleRoleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;
    if (e.target.value !== 'all') {
      value = e.target.value;
    }
    setFilters((prevFilters) => ({
      ...prevFilters,
      role: value
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

  const handleSelectOneGroup = (
    event: ChangeEvent<HTMLInputElement>,
    filtered: Staff[]
  ): void => {
    if (event.target.checked) {
      const user_ids = filtered.map(x => x.id);
      setSelectedUsers((prevSelected) => [
        ...prevSelected,
        ...user_ids
      ]);
    } else {
      setSelectedUsers((prevSelected) =>
        prevSelected.filter((id) => (filtered.findIndex(o => o.id === id) === -1))
      );
    }
  };

  const filteredUsers = applyFilters(users, filters);
  const selectedSomeUsers =
    selectedUsers.length > 0 &&
    selectedUsers.length < users.length;
  const selectedAllUsers =
    selectedUsers.length === users.length;

  const renderUsers = (fusers: Staff[], role: UserRole) => {
    const filtered = fusers.filter(x => x.role === role);
    if (filtered.length === 0) {
      return (<></>);
    }

    let group_selected = 0;
    filtered.forEach(x => {
      if (selectedUsers.includes(x.id)) group_selected++;
    });
    const isGroupSelected = group_selected === filtered.length;
    const isPartSelected = group_selected > 0 && group_selected < filtered.length;

    const isExpanded = expanded.includes(role);

    return (
      <>
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
                handleSelectOneGroup(event, filtered)
              }
            />
          </TableCell>
          <TableCell colSpan={4}>
            <Typography
              variant="subtitle2"
              color="text.primary"
              gutterBottom
              noWrap
            >
              {role}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="subtitle2" component='span'>{filtered.length} </Typography>
            <Typography variant="subtitle2" component='span' color='GrayText'>users</Typography>
          </TableCell>
          <TableCell align="right">
            <IconButton size='small' onClick={() => {
              if (isExpanded) {
                setExpanded(expanded.filter(x => x !== role));
              } else {
                setExpanded([...expanded, role]);
              }
            }}>
              {
                isExpanded ? <ExpandLessIcon fontSize='small' /> : <ExpandMoreIcon fontSize='small' />
              }
            </IconButton>
          </TableCell>
        </TableRow>
        {isExpanded && filtered.map((user) => {
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
              <TableCell align="right" padding="checkbox">
                <IconButton size='small' onClick={(event) => {
                  handleClickAction(event, user.id);
                }}>
                  <MoreVertTwoToneIcon fontSize='small' />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={anchorEl !== null && actionID === user.id}
                  onClose={() => {
                    handleCloseAction('None', user);
                  }}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <MenuItem onClick={() => handleCloseAction('Edit', user)}>Edit</MenuItem>
                  <MenuItem onClick={() => handleCloseAction('Delete', user)}>Delete</MenuItem>
                  <MenuItem onClick={() => {
                    handleCloseAction(user.status === 'Active' ? 'Not Active' : 'Active', user);
                  }}>{user.status === 'Active' ? 'Not Active' : 'Active'}</MenuItem>
                </Menu>
              </TableCell>
            </TableRow>
          );
        })}
      </>
    )
  };

  return (
    <Card>
      {showFilter && (
        <CardHeader
          action={
            <Box width={320}>
              <FormControl style={{ width: 150 }} variant="outlined">
                <InputLabel>Role</InputLabel>
                <Select
                  value={filters.role || 'all'}
                  onChange={handleRoleChange}
                  size='small'
                  label="Status"
                  autoWidth
                >
                  {roleOptions.map((roleOption) => (
                    <MenuItem key={roleOption.id} value={roleOption.id}>
                      {roleOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl style={{ width: 150, marginLeft: 15 }} variant="outlined">
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
            {
              renderUsers(filteredUsers, 'Runner')
            }
            {
              renderUsers(filteredUsers, 'Packer')
            }
          </TableBody>
        </Table>
      </TableContainer>
    </Card >
  );
};

UsersTable.propTypes = {
  users: PropTypes.array.isRequired
};

UsersTable.defaultProps = {
  users: []
};

export default UsersTable;
