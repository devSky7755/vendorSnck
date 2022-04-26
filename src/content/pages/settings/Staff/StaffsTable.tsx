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
import { GetStaffRoleLabel, Staff, StaffRole } from 'src/models/staff';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';

interface StaffsTableProps {
  className?: string;
  staffs: Staff[];
  onEditingStaff: Function;
  staff_role?: StaffRole;
  search?: string;
}

interface Filters {
  role?: StaffRole;
  search?: string;
}

const getStatusLabel = (staffStatus: boolean): JSX.Element => {
  const color = staffStatus ? 'success' : 'warning';
  return <Label color={color}>{staffStatus ? 'Active' : 'Not Active'}</Label>;
};

const applyFilters = (staffs: Staff[], filters: Filters): Staff[] => {
  return staffs.filter((staff) => {
    let matches = true;

    if (filters.role && staff.role !== filters.role) {
      matches = false;
    }
    if (matches && filters.search && filters.search.length > 0) {
      if (
        (staff.firstName && staff.firstName.includes(filters.search)) ||
        (staff.lastName && staff.lastName.includes(filters.search)) ||
        (staff.email && staff.email.includes(filters.search)) ||
        (staff.mobileNo && staff.mobileNo.includes(filters.search))
      ) {
        matches = true;
      } else {
        matches = false;
      }
    }

    return matches;
  });
};

const StaffsTable: FC<StaffsTableProps> = ({
  staffs,
  onEditingStaff,
  staff_role,
  search
}) => {
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [actionID, setActionID] = useState<string>('');
  const [selectedStaffs, setSelectedStaffs] = useState<string[]>([]);
  const [expanded, setExpanded] = useState<string[]>(['runner', 'packer']);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [filters, setFilters] = useState<Filters>({
    role: staff_role,
    search: search
  });

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: search
    }));
  }, [search]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      role: staff_role
    }));
  }, [staff_role]);

  const roleOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'runner',
      name: 'Runner'
    },
    {
      id: 'packer',
      name: 'Packer'
    }
  ];

  const handleClickAction = (
    event: React.MouseEvent<HTMLButtonElement>,
    staffid: string
  ) => {
    setActionID(staffid);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, staff: Staff) => {
    setAnchorEl(null);
    if (action === 'Edit') {
      onEditingStaff(staff);
    }
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

  const handleSelectAllStaffs = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedStaffs(event.target.checked ? staffs.map((staff) => staff.id) : []);
  };

  const handleSelectOneStaff = (
    event: ChangeEvent<HTMLInputElement>,
    staffId: string
  ): void => {
    if (!selectedStaffs.includes(staffId)) {
      setSelectedStaffs((prevSelected) => [...prevSelected, staffId]);
    } else {
      setSelectedStaffs((prevSelected) =>
        prevSelected.filter((id) => id !== staffId)
      );
    }
  };

  const handleSelectOneGroup = (
    event: ChangeEvent<HTMLInputElement>,
    filtered: Staff[]
  ): void => {
    if (event.target.checked) {
      const staff_ids = filtered.map((x) => x.id);
      setSelectedStaffs((prevSelected) => [...prevSelected, ...staff_ids]);
    } else {
      setSelectedStaffs((prevSelected) =>
        prevSelected.filter(
          (id) => filtered.findIndex((o) => o.id === id) === -1
        )
      );
    }
  };

  const filteredStaffs = applyFilters(staffs, filters);
  const selectedSomeStaffs =
    selectedStaffs.length > 0 && selectedStaffs.length < staffs.length;
  const selectedAllStaffs = selectedStaffs.length === staffs.length;

  const renderStaffs = (fstaffs: Staff[], role: StaffRole) => {
    const filtered = fstaffs.filter((x) => x.role === role);
    if (filtered.length === 0) {
      return <></>;
    }

    let group_selected = 0;
    filtered.forEach((x) => {
      if (selectedStaffs.includes(x.id)) group_selected++;
    });
    const isGroupSelected = group_selected === filtered.length;
    const isPartSelected =
      group_selected > 0 && group_selected < filtered.length;

    const isExpanded = expanded.includes(role);

    return (
      <>
        <TableRow className="group-header-row">
          <TableCell padding="checkbox" style={{ height: 52 }}>
            <Checkbox
              size="small"
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
              {GetStaffRoleLabel(role)}
            </Typography>
          </TableCell>
          <TableCell align="right">
            <Typography variant="subtitle2" component="span">
              {filtered.length}{' '}
            </Typography>
            <Typography variant="subtitle2" component="span" color="GrayText">
              staffs
            </Typography>
          </TableCell>
          <TableCell align="right">
            <IconButton
              size="small"
              onClick={() => {
                if (isExpanded) {
                  setExpanded(expanded.filter((x) => x !== role));
                } else {
                  setExpanded([...expanded, role]);
                }
              }}
            >
              {isExpanded ? (
                <ExpandLessIcon fontSize="small" />
              ) : (
                <ExpandMoreIcon fontSize="small" />
              )}
            </IconButton>
          </TableCell>
        </TableRow>
        {isExpanded &&
          filtered.map((staff) => {
            const isStaffSelected = selectedStaffs.includes(staff.id);
            return (
              <TableRow hover key={staff.id} selected={isStaffSelected}>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    size="small"
                    checked={isStaffSelected}
                    onChange={(event: ChangeEvent<HTMLInputElement>) =>
                      handleSelectOneStaff(event, staff.id)
                    }
                    value={isStaffSelected}
                  />
                </TableCell>
                <TableCell>{staff.id}</TableCell>
                <TableCell>
                  {staff.firstName} {staff.lastName}
                </TableCell>
                <TableCell>
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    color="text.primary"
                    gutterBottom
                    noWrap
                  >
                    {getStatusLabel(staff.active)}
                  </Typography>
                </TableCell>
                <TableCell>{staff.lastSeen}</TableCell>
                <TableCell align="right"></TableCell>
                <TableCell align="right" padding="checkbox">
                  <IconButton
                    size="small"
                    onClick={(event) => {
                      handleClickAction(event, staff.id);
                    }}
                  >
                    <MoreVertTwoToneIcon fontSize="small" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={anchorEl !== null && actionID === staff.id}
                    onClose={() => {
                      handleCloseAction('None', staff);
                    }}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button'
                    }}
                  >
                    <MenuItem onClick={() => handleCloseAction('Edit', staff)}>
                      Edit
                    </MenuItem>
                    <MenuItem onClick={() => handleCloseAction('Delete', staff)}>
                      Delete
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            );
          })}
      </>
    );
  };

  return (
    <Card>
      {showFilter && (
        <CardHeader
          action={
            <Box width={160}>
              <FormControl style={{ width: 150 }} variant="outlined">
                <InputLabel>Role</InputLabel>
                <Select
                  value={filters.role || 'all'}
                  onChange={handleRoleChange}
                  size="small"
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
                  size="small"
                  checked={selectedAllStaffs}
                  indeterminate={selectedSomeStaffs}
                  onChange={handleSelectAllStaffs}
                />
              </TableCell>
              <TableCell>Staff ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Last Seen</TableCell>
              <TableCell align="right">
                <Tooltip
                  title={showFilter ? 'Hide Filter' : 'Show Filter'}
                  arrow
                >
                  <IconButton
                    size="small"
                    onClick={() => {
                      setShowFilter((x) => !x);
                    }}
                  >
                    <FilterListIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align="right" padding="checkbox">
                <IconButton size="small" onClick={() => {}}>
                  <MoreVertTwoToneIcon fontSize="small" />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {renderStaffs(filteredStaffs, 'runner')}
            {renderStaffs(filteredStaffs, 'packer')}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

StaffsTable.propTypes = {
  staffs: PropTypes.array.isRequired
};

StaffsTable.defaultProps = {
  staffs: []
};

export default StaffsTable;
