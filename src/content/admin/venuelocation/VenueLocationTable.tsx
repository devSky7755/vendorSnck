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
  styled,
  TextField
} from '@mui/material';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { VenueDistributionArea, VenueInLocation as VenueLocation } from 'src/models/venue';
import { Venue } from 'src/models/venue';
import venuelocation from '.';

interface VenueLocationsTableProps {
  className?: string;
  venueLocations: VenueLocation[];
  venue: Venue;
  areas: VenueDistributionArea[];
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

const VenueLocationsTable: FC<VenueLocationsTableProps> = ({ venueLocations, areas, venue, onAction, onSelectionChanged, onVenueLocationPatch }) => {
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
              {
                venue && venue.inVenueLocationHierarchy1 && venue.inVenueLocationHierarchy1.length > 0 &&
                <TableCell>{venue.inVenueLocationHierarchy1}</TableCell>
              }
              {
                venue && venue.inVenueLocationHierarchy2 && venue.inVenueLocationHierarchy2.length > 0 &&
                <TableCell>{venue.inVenueLocationHierarchy2}</TableCell>
              }
              {
                venue && venue.inVenueLocationHierarchy3 && venue.inVenueLocationHierarchy3.length > 0 &&
                <TableCell>{venue.inVenueLocationHierarchy3}</TableCell>
              }
              <TableCell>Distribution Area</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Pickup</TableCell>
              <TableCell>QR Code</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venueLocations.map((venueLocation, index) => {
              const isSelected = selectedVenueLocations.includes(venueLocation.id);
              const area = areas.find(x => x.id === venueLocation.distributionAreaId);
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
                  {
                    venue && venue.inVenueLocationHierarchy1 && venue.inVenueLocationHierarchy1.length > 0 &&
                    <TableCell>{venueLocation.hierarchy1}</TableCell>
                  }
                  {
                    venue && venue.inVenueLocationHierarchy2 && venue.inVenueLocationHierarchy2.length > 0 &&
                    <TableCell>{venueLocation.hierarchy2}</TableCell>
                  }
                  {
                    venue && venue.inVenueLocationHierarchy3 && venue.inVenueLocationHierarchy3.length > 0 &&
                    <TableCell>{venueLocation.hierarchy3}</TableCell>
                  }
                  <TableCell>
                    <TextField
                      select
                      InputProps={{ disableUnderline: true }}
                      fullWidth
                      value={venueLocation.distributionAreaId}
                      onChange={e => {
                        handleVenueLocationPatch(venueLocation, 'distributionAreaId', e.target.value);
                      }}
                      variant="standard"
                    >
                      {areas.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                          {option.name}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                  <TableCell>
                    <Switch checked={venueLocation.active || false} onChange={e => {
                      handleVenueLocationPatch(venueLocation, 'active', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={venueLocation.deliveryEnabled || false} onChange={e => {
                      handleVenueLocationPatch(venueLocation, 'deliveryEnabled', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={venueLocation.pickupEnabled || false} onChange={e => {
                      handleVenueLocationPatch(venueLocation, 'pickupEnabled', e.target.checked);
                    }} />
                  </TableCell>
                  <URLTableCell style={{ maxWidth: 250 }}>
                    {venueLocation.qrCode}
                  </URLTableCell>
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
