import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { VenueDistributionArea as VenueArea } from 'src/models/venue';
import VenueAreasTable from './VenueAreaTable';
import EditVenueAreaDialog from './EditVenueArea';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
import { Venue } from 'src/models/venue';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { useParams } from 'react-router';
import { deleteVenueDistributionArea, getVenueDistributionAreas, patchVenueDistributionArea, postVenueDistributionArea } from 'src/Api/apiClient';

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

interface VenueAreasPageProps {
  venues: Venue[];
  token: string;
}

function VenueAreasPage(props: VenueAreasPageProps) {
  const { token, venues } = props;
  const { venueId } = useParams();

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [venueAreas, setVenueAreas] = useState<VenueArea[]>([]);
  const [venue, setVenue] = useState<Venue>(null);

  const [selectedVenueAreas, setSelectedVenueAreas] = useState<VenueArea[]>([]);

  useEffect(() => {
    if (!venueId || !venues) setVenue(null);
    else {
      const v = venues.find(x => x.id === venueId);
      setVenue(v);
      getVenueDistributionAreas(token, venueId).then(res => {
        if (res) {
          setVenueAreas(res);
        }
      })
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
      handleSave(data);
    } else if (action === 'Delete') {
      setEditOpen(false);
      setEditing(data);
      setDeleteOpen(true);
    } else if (action === 'Add New') {
      setEditing({ venueId: venueId });
      setEditOpen(true);
    } else if (action === 'Cancel Remove') {
      setDeleteOpen(false);
      setEditing(null);
    } else if (action === 'Remove') {
      setDeleteOpen(false);
      handleDelete(editing);
      setEditing(null);
    }
  }
  const handleSave = (item) => {
    let patch: VenueArea = { ...item };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.deletedAt;
    delete patch.venueId;
    delete patch.active;
    delete patch.pickup;
    delete patch.delivery;

    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (item.id) {
      patchVenueDistributionArea(token, venueId, item, patch).then(res => {
        let newAreas = [...venueAreas];
        let index = newAreas.findIndex(x => x.id === item.id);
        if (index >= 0) {
          newAreas[index] = res;
          setVenueAreas(newAreas);
        }
      }).catch(ex => {
        console.log(ex.message);
      })
    } else {
      postVenueDistributionArea(token, venueId, patch).then(res => {
        if (res) {
          setVenueAreas(prev => [...prev, res]);
        }
      }).catch(ex => {
        console.log(ex.message);
      })
    }
  }

  const handleDelete = (item) => {
    deleteVenueDistributionArea(token, venueId, item).then(res => {
      if (res) {
        let filtered = venueAreas.filter(x => x.id !== item.id);
        setVenueAreas(filtered);
      }
    })
  }

  const handleSelectionChanged = (selectedIDs) => {
    const selected = venueAreas.filter(x => selectedIDs.includes(x.id));
    setSelectedVenueAreas(selected);
  }

  const handleVenueAreaPatch = (venueArea, key, value) => {
    let patch = {};
    patch[key] = value;

    patchVenueDistributionArea(token, venueId, venueArea, patch).then(res => {
      let newAreas = [...venueAreas];
      let index = newAreas.findIndex(x => x.id === venueArea.id);
      if (index >= 0) {
        newAreas[index] = res
        setVenueAreas(newAreas);
      }
    });
  }

  return (
    <>
      <Helmet>
        <title>Venue Distribution Areas</title>
      </Helmet>
      {
        editOpen && editing &&
        <EditVenueAreaDialog
          venueArea={editing}
          open={editOpen}
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
          header='Are you sure you want to delete this distribution area?'
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
            <VenueAreasTable venueAreas={venueAreas} venues={venues} onAction={onAction} onSelectionChanged={handleSelectionChanged} onVenueAreaPatch={handleVenueAreaPatch} />
          </TableWrapper>
        </ContainerWrapper>
        <FooterWrapper>
          <BulkActions selected={selectedVenueAreas} onAction={onAction} />
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
export default connect(reduxState)(VenueAreasPage);
