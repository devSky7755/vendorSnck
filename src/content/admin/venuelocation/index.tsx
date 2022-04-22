import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { VenueInLocation as VenueLocation } from 'src/models/venue';
import VenueLocationsTable from './VenueLocationTable';
import EditVenueLocationDialog from './EditVenueLocation';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
import { Venue } from 'src/models/venue';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import { useParams } from 'react-router';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';

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

interface VenueLocationsPageProps {
  venues: Venue[];
  token: string;
}

function VenueLocationsPage(props: VenueLocationsPageProps) {
  const { token, venues } = props;
  const { venueId } = useParams();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [venueLocations, setVenueLocations] = useState<VenueLocation[]>([]);
  const [venue, setVenue] = useState<Venue>(null);

  const [selectedVenueLocations, setSelectedVenueLocations] = useState<VenueLocation[]>([]);

  useEffect(() => {
    if (!venueId || !venues) setVenue(null);
    else {
      const v = venues.find(x => x.id === venueId);
      setVenue(v);
    }
  }, [venueId, venues])

  const onAction = (action, data) => {
    if (action === 'Edit') {
      setEditing(data);
      setEditOpen(true);
    } else if (action === 'Close') {
      setEditOpen(false);
      setEditing(null);
    } else if (action === 'Save') {
      setEditOpen(false);
    } else if (action === 'Delete') {
      setEditOpen(false);
      setEditing(data);
      setDeleteOpen(true);
    } else if (action === 'Add New') {
      setEditing({ active: false, pickup: false, delivery: false, seatFields: ['', '', ''] });
      setEditOpen(true);
    } else if (action === 'Cancel Remove') {
      setDeleteOpen(false);
      setEditing(null);
    } else if (action === 'Remove') {
      setDeleteOpen(false);
      setEditing(null);
    }
  }

  const handleSelectionChanged = (selectedIDs) => {
    const selected = venueLocations.filter(x => selectedIDs.includes(x.id));
    setSelectedVenueLocations(selected);
  }

  const handleVenueLocationPatch = (venueLocation, key, value) => {
    let patch = {};
    patch[key] = value;
  }

  return (
    <>
      <Helmet>
        <title>In Venue Locations</title>
      </Helmet>
      {
        editOpen && editing &&
        <EditVenueLocationDialog
          venueLocation={editing}
          open={editOpen}
          venue={venue}
          onAction={onAction}
        />
      }
      {
        deleteOpen && editing &&
        <ConfirmDialog
          success='Remove'
          cancel='Cancel Remove'
          successLabel='REMOVE'
          cancelLabel='RETURN'
          text='It cannot be recovered'
          header='Are you sure you want to delete this location?'
          open={deleteOpen}
          onAction={onAction}
        />
      }
      {
        venue &&
        <PageTitleWrapper>
          <PageHeader venue={venue} />
        </PageTitleWrapper>
      }
      <Box style={{ height: venue ? 'calc(100% - 56px)' : '100%' }}>
        <ContainerWrapper>
          <TableWrapper>
            <VenueLocationsTable venueLocations={venueLocations} venue={venue} onAction={onAction} onSelectionChanged={handleSelectionChanged} onVenueLocationPatch={handleVenueLocationPatch} />
          </TableWrapper>
        </ContainerWrapper>
        <FooterWrapper>
          <BulkActions selected={selectedVenueLocations} onAction={onAction} />
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
export default connect(reduxState)(VenueLocationsPage);
