import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Venue } from 'src/models/venue';
import VenuesTable from './VenuesTable';
import EditVenueDialog from './EditVenue';
import { connect } from 'react-redux';
import { deleteVenue, patchVenue, updateVenue } from 'src/reducers/venues/action';
import BulkActions from './BulkActions';
import { patchVenue as patchVenueAPI, postVenue, deleteVenue as deleteVenueAPI, patchBulkVenueAPI, deleteBulkVenuesAPI } from 'src/Api/apiClient';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import { useNavigate } from 'react-router';

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

  const navigate = useNavigate();

  useEffect(() => {
    setVenues(props.venues || []);
  }, [props.venues]);

  const onAction = (action, data) => {
    if (action === 'Edit') {
      setEditing(data);
      setEditOpen(true);
    } else if (action === 'Close') {
      setEditOpen(false);
      setEditing(null);
    } else if (action === 'Save') {
      setEditOpen(false);
      handleSave(data);
    } else if (action === 'Delete') {
      setEditOpen(false);
      setEditing(data);
      setDeleteOpen(true);
    } else if (action === 'Add New') {
      setEditing({ active: false, deliveryEnabled: false, pickupEnabled: false, inVenueLocationHierarchy1: '' });
      setEditOpen(true);
    } else if (action === 'Cancel Remove') {
      setDeleteOpen(false);
      setEditing(null);
    } else if (action === 'Remove') {
      setDeleteOpen(false);
      handleDelete(editing);
      setEditing(null);
    } else if (action === 'Bulk Delete') {
      handleBulkDelete(selectedVenues);
    } else if (action === 'Bulk Active') {
      handleBulkVenuePatch(selectedVenues, 'active', true);
    } else if (action === 'Bulk Inactive') {
      handleBulkVenuePatch(selectedVenues, 'active', false);
    } else if (action === 'Distribution Area') {
      navigate('/venueareas/' + data.id);
    } else if (action === 'In Location') {
      navigate('/venuelocations/' + data.id);
    } else if (action === 'Vendor Stands') {
      navigate('/vendorstands/' + data.id);
    }
  }

  const handleSave = (venue) => {
    let patch: Venue = { ...venue };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.deletedAt;
    delete patch.seatFields;
    delete patch.coordinates;
    delete patch.vendorStands;
    delete patch.vendorStandsCount;

    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (venue.id) {
      if (!patch.inVenueLocationHierarchy1) patch.inVenueLocationHierarchy1 = null;
      if (!patch.inVenueLocationHierarchy2) patch.inVenueLocationHierarchy2 = null;
      if (!patch.inVenueLocationHierarchy3) patch.inVenueLocationHierarchy3 = null;

      patchVenueAPI(token, venue, patch).then(res => {
        props.updateVenue(res);
      }).catch(ex => {
        console.log(ex.message);
      })
    } else {
      postVenue(token, patch).then(res => {
        if (res) {
          props.updateVenue(res);
        }
      }).catch(ex => {
        console.log(ex.message);
      })
    }
  }

  const handleDelete = (venue) => {
    deleteVenueAPI(token, venue.id).then(success => {
      if (success) {
        props.deleteVenue(venue);
      }
    })
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

  const handleBulkVenuePatch = (svenues, key, value) => {
    let update = {};
    update[key] = value;
    let data = {
      ids: svenues.map(v => v.id),
      data: update
    }
    patchBulkVenueAPI(token, data).then(res => {
      res.forEach(v => {
        props.patchVenue(v, key, value);
      })
    });
  }

  const handleBulkDelete = (svenues: Venue[]) => {
    let data = {
      ids: svenues.map(v => v.id)
    }
    deleteBulkVenuesAPI(token, data).then(success => {
      if (success) {
        svenues.forEach(venue => {
          props.deleteVenue(venue);
        })
      }
    })
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
        <ConfirmDialog
          successLabel='DELETE'
          cancelLabel='RETURN'
          text='It cannot be recovered'
          header='Are you sure you want to delete this venue?'
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
