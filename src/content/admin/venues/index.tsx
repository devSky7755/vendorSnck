import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Venue } from 'src/models/venue';
import VenuesTable from './VenuesTable';
import EditVenueDialog from './EditVenue';
import { connect } from 'react-redux';
import { deleteVenue, patchVenue, updateVenue } from 'src/reducers/venues/action';
import BulkActions from './BulkActions';
import { patchVenue as patchVenueAPI, postVenue, deleteVenue as deleteVenueAPI } from 'src/Api/apiClient';
import DeleteVenueDialog from './DeleteVenue';

const TableWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

const ContainerWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    height: calc(100% - 56px);
  `
);

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        position: relative;
        bottom: 0;
        height: 56px;
        background: white;
        box-shadow: 0px -1px 16px rgba(159, 162, 191, 0.18), 0px -2px 2px rgba(159, 162, 191, 0.32);
`
);

interface VenuesPageProps {
  venues: Venue[];
  token: string;
  patchVenue: Function;
  updateVenue: Function;
  deleteVenue: Function;
}

function VenuesPage(props: VenuesPageProps) {
  const token = props.token;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [venues, setVenues] = useState<Venue[]>(props.venues || []);

  const [selectedVenues, setSelectedVenues] = useState<Venue[]>([]);

  useEffect(() => {
    setVenues(props.venues || []);
  }, [props.venues]);

  const onAction = (action, data) => {
    if (action === 'Edit') {
      setEditing(data);
      setEditOpen(true);
    } else if (action === 'Close') {
      setEditOpen(false);
      setEditing(false);
    } else if (action === 'Save') {
      setEditOpen(false);
      handleSave(data);
    } else if (action === 'Delete') {
      setEditOpen(false);
      setEditing(data);
      setDeleteOpen(true);
    } else if (action === 'Add New') {
      /*
      setEditing({ active: true, deliveryEnabled: true, pickupEnabled: true });
      setEditOpen(true);
      */
    } else if (action === 'Cancel Remove') {
      setDeleteOpen(false);
      setEditing(null);
    } else if (action === 'Remove') {
      setDeleteOpen(false);
      handleDelete(editing);
      setEditing(null);
    }
  }

  const handleSave = (venue) => {
    let patch: Venue = { ...venue };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.seatFields;
    delete patch.coordinates;
    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (venue.id) {
      patchVenueAPI(token, venue, patch).then(res => {
        props.updateVenue(res);
      }).catch(ex => {
        console.log(ex.message);
      })
    } else {
      postVenue(token, patch).then(res => {
        props.updateVenue(res);
      }).catch(ex => {
        console.log(ex.message);
      })
    }
  }

  const handleDelete = (venue) => {
    props.deleteVenue(venue);
    /*
    deleteVenueAPI(token, venue.id).then(success => {
      if (success) {
        
      }
    })
    */
  }

  const handleSelectionChanged = (selectedIDs) => {
    const selected = venues.filter(x => selectedIDs.includes(x.id));
    setSelectedVenues(selected);
  }

  const handleVenuePatch = (venue, key, value) => {
    let patch = {};
    patch[key] = value;

    patchVenueAPI(token, venue, patch).then(res => {
      props.patchVenue(venue, key, value);
    });
  }

  return (
    <>
      <Helmet>
        <title>Venues</title>
      </Helmet>
      {
        editOpen && editing &&
        <EditVenueDialog
          venue={editing}
          open={editOpen}
          onAction={onAction}
        />
      }
      {
        deleteOpen && editing &&
        <DeleteVenueDialog
          success='Remove'
          cancel='Cancel Remove'
          open={deleteOpen}
          onAction={onAction}
        />
      }
      <Box style={{ height: '100%' }}>
        <ContainerWrapper>
          <TableWrapper>
            <VenuesTable venues={venues} onAction={onAction} onSelectionChanged={handleSelectionChanged} onVenuePatch={handleVenuePatch} />
          </TableWrapper>
        </ContainerWrapper>
        <FooterWrapper>
          <BulkActions selected={selectedVenues} onAction={onAction} />
        </FooterWrapper>
      </Box>
    </>
  );
}

function reduxState(state) {
  return {
    token: state.auth && state.auth.token,
    venues: state.venues && state.venues.venues
  }
}
export default connect(reduxState, { patchVenue, deleteVenue, updateVenue })(VenuesPage);
