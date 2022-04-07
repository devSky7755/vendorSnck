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
import { Venue } from 'src/models/venue';

interface VenuesTableProps {
  className?: string;
  venues: Venue[];
  onAction: Function;
  onSelectionChanged: Function;
  onVenuePatch: Function;
}

const URLTableCell = styled(TableCell)(
  ({ theme }) => `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
);

const VenuesTable: FC<VenuesTableProps> = ({ venues, onAction, onSelectionChanged, onVenuePatch }) => {
  const [actionID, setActionID] = useState<string>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVenues, setSelectedVenues] = useState<string[]>(
    []
  );

  useEffect(() => {
    onSelectionChanged(selectedVenues);
  }, [selectedVenues])

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>, venueId: string) => {
    setActionID(venueId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, venue: Venue) => {
    setAnchorEl(null);
    if (action === 'Edit') {
      onAction('Edit', venue);
    }
  };

  const handleSelectAll = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedVenues(
      event.target.checked
        ? venues.map((order) => order.id)
        : []
    );
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    if (!selectedVenues.includes(id)) {
      setSelectedVenues((prevSelected) => [
        ...prevSelected,
        id
      ]);
    } else {
      setSelectedVenues((prevSelected) =>
        prevSelected.filter((x) => x !== id)
      );
    }
  };

  const handleVenuePatch = (venue, key, value) => {
    onVenuePatch(venue, key, value);
  }

  const selectedSome =
    selectedVenues.length > 0 &&
    selectedVenues.length < venues.length;
  const selectedAll =
    selectedVenues.length === venues.length;

  return (
    <Card>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ height: 52 }}>
                <Checkbox
                  size='small'
                  color="primary"
                  checked={selectedAll}
                  indeterminate={selectedSome}
                  onChange={handleSelectAll}
                />
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Address</TableCell>
              <TableCell>Seat Fields</TableCell>
              <TableCell style={{ width: 150 }}>Maps URL</TableCell>
              <TableCell>Venue Image</TableCell>
              <TableCell>Active</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venues.map((venue, index) => {
              const isSelected = selectedVenues.includes(venue.id);
              const imageName = venue.imageUrl?.replace(/^.*[\\\/]/, '');

              return (
                <TableRow
                  hover
                  key={venue.id}
                >
                  <TableCell padding="checkbox" style={{ height: 52 }}>
                    <Checkbox
                      size='small'
                      color="primary"
                      checked={isSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOne(event, venue.id)
                      }
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {venue.name}
                  </TableCell>
                  <TableCell>
                    {venue.address && venue.address}
                  </TableCell>
                  <TableCell>
                    [{venue.seatFields && venue.seatFields.join(',')}]
                  </TableCell>
                  <URLTableCell style={{ maxWidth: 250 }}>
                    {
                      venue.mapsUrl &&
                      <a href={venue.mapsUrl} target='__blank'>
                        {venue.mapsUrl}
                      </a>
                    }
                  </URLTableCell>
                  <TableCell>
                    {
                      venue.imageUrl &&
                      <a href={venue.imageUrl} target='__blank'>
                        {imageName}
                      </a>
                    }
                  </TableCell>
                  <TableCell>
                    <Switch checked={venue.active} onChange={e => {
                      handleVenuePatch(venue, 'active', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell align="right" padding="checkbox">
                    <IconButton size='small' onClick={(event) => {
                      handleClickAction(event, venue.id);
                    }}>
                      <MoreVertTwoToneIcon fontSize='small' />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={anchorEl !== null && actionID === venue.id}
                      onClose={() => {
                        handleCloseAction('None', venue);
                      }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleCloseAction('Edit', venue)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleCloseAction('Delete', venue)}>Delete</MenuItem>
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

export default VenuesTable;
