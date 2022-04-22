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
import { VenueDistributionArea as VenueArea } from 'src/models/venue';
import { Venue } from 'src/models/venue';

interface VenueAreasTableProps {
  className?: string;
  venueAreas: VenueArea[];
  venues: Venue[];
  onAction: Function;
  onSelectionChanged: Function;
  onVenueAreaPatch: Function;
}

const URLTableCell = styled(TableCell)(
  ({ theme }) => `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
);

const VenueAreasTable: FC<VenueAreasTableProps> = ({ venueAreas, venues, onAction, onSelectionChanged, onVenueAreaPatch }) => {
  const [actionID, setActionID] = useState<string>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedVenueAreas, setSelectedVenueAreas] = useState<string[]>(
    []
  );

  useEffect(() => {
    onSelectionChanged(selectedVenueAreas);
  }, [selectedVenueAreas])

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>, venueAreaId: string) => {
    setActionID(venueAreaId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, venueArea: VenueArea) => {
    setAnchorEl(null);
    if (action === 'Edit') {
      onAction('Edit', venueArea);
    } else if (action === 'Delete') {
      onAction('Delete', venueArea);
    }
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    if (!selectedVenueAreas.includes(id)) {
      setSelectedVenueAreas((prevSelected) => [
        ...prevSelected,
        id
      ]);
    } else {
      setSelectedVenueAreas((prevSelected) =>
        prevSelected.filter((x) => x !== id)
      );
    }
  };

  const handleVenueAreaPatch = (venueArea, key, value) => {
    onVenueAreaPatch(venueArea, key, value);
  }

  return (
    <Card>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ height: 52 }}>
              </TableCell>
              <TableCell>Distribution Area</TableCell>
              <TableCell>Active</TableCell>
              <TableCell>Delivery</TableCell>
              <TableCell>Pickup</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {venueAreas.map((venueArea, index) => {
              const isSelected = selectedVenueAreas.includes(venueArea.id);
              const venue = venues.find(x => x.id === venueArea.venueId);

              return (
                <TableRow
                  hover
                  key={venueArea.id}
                >
                  <TableCell padding="checkbox" style={{ height: 52 }}>
                    <Checkbox
                      size='small'
                      color="primary"
                      checked={isSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOne(event, venueArea.id)
                      }
                    />
                  </TableCell>
                  <TableCell>
                    {venueArea.name}
                  </TableCell>
                  <TableCell>
                    <Switch checked={venueArea.active} onChange={e => {
                      handleVenueAreaPatch(venueArea, 'active', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={venueArea.delivery} onChange={e => {
                      handleVenueAreaPatch(venueArea, 'delivery', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={venueArea.pickup} onChange={e => {
                      handleVenueAreaPatch(venueArea, 'pickup', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell align="right" padding="checkbox">
                    <IconButton size='small' onClick={(event) => {
                      handleClickAction(event, venueArea.id);
                    }}>
                      <MoreVertTwoToneIcon fontSize='small' />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={anchorEl !== null && actionID === venueArea.id}
                      onClose={() => {
                        handleCloseAction('None', venueArea);
                      }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleCloseAction('Edit', venueArea)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleCloseAction('Delete', venueArea)}>Delete</MenuItem>
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

export default VenueAreasTable;
