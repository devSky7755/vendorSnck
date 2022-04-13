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
import { VendorStand as Vendor } from 'src/models/vendorStand';
import { Venue } from 'src/models/venue';

interface VendorsTableProps {
  className?: string;
  vendors: Vendor[];
  venues: Venue[];
  onAction: Function;
  onSelectionChanged: Function;
  onVendorPatch: Function;
}

const URLTableCell = styled(TableCell)(
  ({ theme }) => `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
);

const VendorsTable: FC<VendorsTableProps> = ({ vendors, venues, onAction, onSelectionChanged, onVendorPatch }) => {
  const [actionID, setActionID] = useState<string>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVendors, setSelectedVendors] = useState<string[]>(
    []
  );

  useEffect(() => {
    onSelectionChanged(selectedVendors);
  }, [selectedVendors])

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>, vendorId: string) => {
    setActionID(vendorId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, vendor: Vendor) => {
    setAnchorEl(null);
    if (action === 'Edit') {
      onAction('Edit', vendor);
    } else if (action === 'Delete') {
      onAction('Delete', vendor);
    }
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    if (!selectedVendors.includes(id)) {
      setSelectedVendors((prevSelected) => [
        ...prevSelected,
        id
      ]);
    } else {
      setSelectedVendors((prevSelected) =>
        prevSelected.filter((x) => x !== id)
      );
    }
  };

  const handleVendorPatch = (vendor, key, value) => {
    onVendorPatch(vendor, key, value);
  }

  return (
    <Card>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ height: 52 }}>
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Venue</TableCell>
              <TableCell>Cover Image</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Pickup</TableCell>
              <TableCell>Vendor Manager</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vendors.map((vendor, index) => {
              const isSelected = selectedVendors.includes(vendor.id);
              const imageName = vendor.coverImageUrl?.replace(/^.*[\\\/]/, '');
              const venue = venues.find(x => x.id === vendor.venueId);

              return (
                <TableRow
                  hover
                  key={vendor.id}
                >
                  <TableCell padding="checkbox" style={{ height: 52 }}>
                    <Checkbox
                      size='small'
                      color="primary"
                      checked={isSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOne(event, vendor.id)
                      }
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {vendor.name}
                  </TableCell>
                  <TableCell>
                    {venue && venue.name}
                  </TableCell>
                  <URLTableCell style={{ maxWidth: 250 }}>
                    {imageName}
                  </URLTableCell>
                  <TableCell>
                    <Switch checked={vendor.available} onChange={e => {
                      handleVendorPatch(vendor, 'available', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={vendor.deliveryAvailable} onChange={e => {
                      handleVendorPatch(vendor, 'deliveryAvailable', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={vendor.pickupAvailable} onChange={e => {
                      handleVendorPatch(vendor, 'pickupAvailable', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell>
                    {vendor.manager || ''}
                  </TableCell>
                  <TableCell align="right" padding="checkbox">
                    <IconButton size='small' onClick={(event) => {
                      handleClickAction(event, vendor.id);
                    }}>
                      <MoreVertTwoToneIcon fontSize='small' />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={anchorEl !== null && actionID === vendor.id}
                      onClose={() => {
                        handleCloseAction('None', vendor);
                      }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleCloseAction('Edit', vendor)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleCloseAction('Delete', vendor)}>Delete</MenuItem>
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

export default VendorsTable;
