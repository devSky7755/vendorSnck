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
import { VenueDistributionArea as VenueLocation } from 'src/models/venue';
import { Venue } from 'src/models/venue';

interface VenueLocationsTableProps {
  className?: string;
  venueLocations: VenueLocation[];
  venues: Venue[];
  onAction: Function;
  onSelectionChanged: Function;
  onVenueLocationPatch: Function;
}

const URLTableCell = styled(TableCell)(
  ({ theme }) => `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
);

const VenueLocationsTable: FC<VenueLocationsTableProps> = ({ venueLocations, venues, onAction, onSelectionChanged, onVenueLocationPatch }) => {
  const [actionID, setActionID] = useState<string>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVenueLocations, setSelectedVenueLocations] = useState<string[]>(
    []
  );

  useEffect(() => {
    onSelectionChanged(selectedVenueLocations);
  }, [selectedVenueLocations])

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>, venueLocationId: string) => {
    setActionID(venueLocationId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, venueLocation: VenueLocation) => {
    setAnchorEl(null);
    if (action === 'Edit') {
      onAction('Edit', venueLocation);
    } else if (action === 'Delete') {
      onAction('Delete', venueLocation);
    }
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    if (!selectedVenueLocations.includes(id)) {
      setSelectedVenueLocations((prevSelected) => [
        ...prevSelected,
        id
      ]);
    } else {
      setSelectedVenueLocations((prevSelected) =>
        prevSelected.filter((x) => x !== id)
      );
    }
  };

  const handleVenueLocationPatch = (venueLocation, key, value) => {
    onVenueLocationPatch(venueLocation, key, value);
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
              <TableCell>Section</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Pickup</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venueLocations.map((venueLocation, index) => {
              const isSelected = selectedVenueLocations.includes(venueLocation.id);
              const venue = venues.find(x => x.id === venueLocation.venueId);

              return (
                <TableRow
                  hover
                  key={venueLocation.id}
                >
                  <TableCell padding="checkbox" style={{ height: 52 }}>
                    <Checkbox
                      size='small'
                      color="primary"
                      checked={isSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOne(event, venueLocation.id)
                      }
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {venueLocation.name}
                  </TableCell>
                  <URLTableCell style={{ maxWidth: 250 }}>
                    {venueLocation.qr_code}
                  </URLTableCell>
                  <TableCell>
                    <Switch checked={venueLocation.active} onChange={e => {
                      handleVenueLocationPatch(venueLocation, 'active', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={venueLocation.delivery} onChange={e => {
                      handleVenueLocationPatch(venueLocation, 'delivery', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={venueLocation.pickup} onChange={e => {
                      handleVenueLocationPatch(venueLocation, 'pickup', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell align="right" padding="checkbox">
                    <IconButton size='small' onClick={(event) => {
                      handleClickAction(event, venueLocation.id);
                    }}>
                      <MoreVertTwoToneIcon fontSize='small' />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={anchorEl !== null && actionID === venueLocation.id}
                      onClose={() => {
                        handleCloseAction('None', venueLocation);
                      }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleCloseAction('Edit', venueLocation)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleCloseAction('Delete', venueLocation)}>Delete</MenuItem>
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

export default VenueLocationsTable;
