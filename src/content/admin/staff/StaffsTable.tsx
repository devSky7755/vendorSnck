import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Card,
  IconButton,
  Table, Menu, MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Checkbox,
  Switch,
  styled
} from '@mui/material';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { GetStaffRoleLabel, Staff } from 'src/models/staff';
import { VendorStand } from 'src/models/vendorStand';

interface StaffsTableProps {
  className?: string;
  staffs: Staff[];
  vendor: VendorStand
  onAction: Function;
  onSelectionChanged: Function;
  onStaffPatch: Function;
}

const StaffsTable: FC<StaffsTableProps> = ({ vendor, staffs, onAction, onSelectionChanged, onStaffPatch }) => {
  const [actionID, setActionID] = useState<string>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStaffs, setSelectedStaffs] = useState<string[]>(
    []
  );

  useEffect(() => {
    onSelectionChanged(selectedStaffs);
  }, [selectedStaffs])

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>, staffId: string) => {
    setActionID(staffId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, staff: Staff) => {
    setAnchorEl(null);
    if (action === 'Edit') {
      onAction('Edit', staff);
    } else if (action === 'Delete') {
      onAction('Delete', staff);
    }
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    if (!selectedStaffs.includes(id)) {
      setSelectedStaffs((prevSelected) => [
        ...prevSelected,
        id
      ]);
    } else {
      setSelectedStaffs((prevSelected) =>
        prevSelected.filter((x) => x !== id)
      );
    }
  };

  const handleStaffPatch = (staff, key, value) => {
    onStaffPatch(staff, key, value);
  }

  return (
    <Card>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ height: 52 }}>
              </TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Mobile No</TableCell>
              <TableCell>Staff Type</TableCell>
              <TableCell>Vendor</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {staffs.map((staff, index) => {
              const isSelected = selectedStaffs.includes(staff.id);

              return (
                <TableRow
                  hover
                  key={staff.id}
                >
                  <TableCell padding="checkbox" style={{ height: 52 }}>
                    <Checkbox
                      size='small'
                      color="primary"
                      checked={isSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOne(event, staff.id)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {staff.firstName}
                  </TableCell>
                  <TableCell>
                    {staff.lastName}
                  </TableCell>
                  <TableCell>
                    {staff.mobileNo}
                  </TableCell>
                  <TableCell>
                    {GetStaffRoleLabel(staff.role)}
                  </TableCell>
                  <TableCell>
                    {staff.vendorStand && staff.vendorStand.name}
                  </TableCell>
                  <TableCell>
                    <Switch checked={staff.active || false} onChange={e => {
                      handleStaffPatch(staff, 'active', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell align="right" padding="checkbox">
                    <IconButton size='small' onClick={(event) => {
                      handleClickAction(event, staff.id);
                    }}>
                      <MoreVertTwoToneIcon fontSize='small' />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={anchorEl !== null && actionID === staff.id}
                      onClose={() => {
                        handleCloseAction('None', staff);
                      }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleCloseAction('Edit', staff)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleCloseAction('Delete', staff)}>Delete</MenuItem>
                    </Menu>
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

export default StaffsTable;
