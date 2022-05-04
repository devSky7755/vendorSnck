import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  VenueDistributionArea,
  VenueInLocation as VenueLocation
} from 'src/models/venue';
import VenueLocationsTable from './VenueLocationTable';
import EditVenueLocationDialog from './EditVenueLocation';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
import { Venue } from 'src/models/venue';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import { useParams } from 'react-router';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import {
  deleteVenueInLocation,
  getVenueDistributionAreas,
  getVenueVenueInLocations,
  patchVenueInLocation,
  patchVenueInLocations,
  postVenueInLocation,
  deleteVenueInLocations
} from 'src/Api/apiClient';
import { ACTIONS } from 'src/components/BulkAction';

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
  const [deleteBulkOpen, setDeleteBulkOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [venueLocations, setVenueLocations] = useState<VenueLocation[]>([]);
  const [venue, setVenue] = useState<Venue>(null);
  const [distributionAreas, setDistributionAreas] = useState<
    VenueDistributionArea[]
  >([]);

  const [selectedVenueLocations, setSelectedVenueLocations] = useState<
    VenueLocation[]
  >([]);

  useEffect(() => {
    if (!venueId || !venues) setVenue(null);
    else {
      const v = venues.find((x) => x.id === venueId);
      setVenue(v);
      getVenueDistributionAreas(token, venueId).then((res) => {
        if (res) {
          setDistributionAreas(res);
        }
      });
      getVenueVenueInLocations(token, venueId).then((res) => {
        if (res) {
          setVenueLocations(res);
        }
      });
    }
  }, [venueId, venues]);

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
      setEditing({ active: true, pickupEnabled: true, deliveryEnabled: true });
      setEditOpen(true);
    } else if (action === 'Cancel Remove') {
      setDeleteOpen(false);
      setEditing(null);
    } else if (action === 'Remove') {
      setDeleteOpen(false);
      handleDelete(editing);
      setEditing(null);
    } else if (action === 'Bulk Action') {
      handleBulkAction(data);
    } else if (action === 'Bulk Remove') {
      setDeleteBulkOpen(false);
      handleBulkRemove();
    } else if (action === 'Cancel Bulk Remove') {
      setDeleteBulkOpen(false);
    }
  };
  const handleBulkAction = (action) => {
    const ids = selectedVenueLocations.map((venueLocation) => venueLocation.id);
    switch (action) {
      case ACTIONS.MARK_ALL_ACTIVE.action:
        patchVenueInLocations(token, ids, {
          active: true
        }).then((updatedVenueLocations) => {
          let newVenueLocations = [...venueLocations].map((venueLocation) => {
            const findVenueLocation = updatedVenueLocations.find(
              (uVenueLocation) => uVenueLocation.id === venueLocation.id
            );
            return findVenueLocation ? findVenueLocation : venueLocation;
          });
          setVenueLocations(newVenueLocations);
          setSelectedVenueLocations([]);
        });
        break;
      case ACTIONS.MARK_ALL_INACTIVE.action:
        patchVenueInLocations(token, ids, {
          active: false
        }).then((updatedVenueLocations) => {
          let newVenueLocations = [...venueLocations].map((venueLocation) => {
            const findVenueLocation = updatedVenueLocations.find(
              (uVenueLocation) => uVenueLocation.id === venueLocation.id
            );
            return findVenueLocation ? findVenueLocation : venueLocation;
          });
          setVenueLocations(newVenueLocations);
          setSelectedVenueLocations([]);
        });
        break;
      case ACTIONS.ENABLE_DELIVERY.action:
        patchVenueInLocations(token, ids, {
          deliveryEnabled: true
        }).then((updatedVenueLocations) => {
          let newVenueLocations = [...venueLocations].map((venueLocation) => {
            const findVenueLocation = updatedVenueLocations.find(
              (uVenueLocation) => uVenueLocation.id === venueLocation.id
            );
            return findVenueLocation ? findVenueLocation : venueLocation;
          });
          setVenueLocations(newVenueLocations);
          setSelectedVenueLocations([]);
        });
        break;
      case ACTIONS.DISABLE_DELIVERY.action:
        patchVenueInLocations(token, ids, {
          deliveryEnabled: false
        }).then((updatedVenueLocations) => {
          let newVenueLocations = [...venueLocations].map((venueLocation) => {
            const findVenueLocation = updatedVenueLocations.find(
              (uVenueLocation) => uVenueLocation.id === venueLocation.id
            );
            return findVenueLocation ? findVenueLocation : venueLocation;
          });
          setVenueLocations(newVenueLocations);
          setSelectedVenueLocations([]);
        });
        break;
      case ACTIONS.ENABLE_PICKUP.action:
        patchVenueInLocations(token, ids, {
          pickupEnabled: true
        }).then((updatedVenueLocations) => {
          let newVenueLocations = [...venueLocations].map((venueLocation) => {
            const findVenueLocation = updatedVenueLocations.find(
              (uVenueLocation) => uVenueLocation.id === venueLocation.id
            );
            return findVenueLocation ? findVenueLocation : venueLocation;
          });
          setVenueLocations(newVenueLocations);
          setSelectedVenueLocations([]);
        });
        break;
      case ACTIONS.DISABLE_PICKUP.action:
        patchVenueInLocations(token, ids, {
          pickupEnabled: false
        }).then((updatedVenueLocations) => {
          let newVenueLocations = [...venueLocations].map((venueLocation) => {
            const findVenueLocation = updatedVenueLocations.find(
              (uVenueLocation) => uVenueLocation.id === venueLocation.id
            );
            return findVenueLocation ? findVenueLocation : venueLocation;
          });
          setVenueLocations(newVenueLocations);
          setSelectedVenueLocations([]);
        });
        break;
      case ACTIONS.DELETE_CUSTOMERS.action:
        setDeleteBulkOpen(true);
        break;
      default:
        break;
    }
  };

  const handleBulkRemove = () => {
    const ids = selectedVenueLocations.map((venueLocation) => venueLocation.id);
    deleteVenueInLocations(token, ids).then((res) => {
      if (!res) return;
      let newVenueLocations = [...venueLocations].filter((venueLocation) => {
        const findVenueLocation = selectedVenueLocations.find(
          (sVenueLocation) => sVenueLocation.id === venueLocation.id
        );
        return findVenueLocation ? false : true;
      });
      setVenueLocations(newVenueLocations);
      setSelectedVenueLocations([]);
    });
  };

  const handleSave = (item) => {
    let patch: VenueLocation = { ...item };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.deletedAt;
    delete patch.distribution_area;

    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (item.id) {
      patch.hierarchy1 = item.hierarchy1;
      patch.hierarchy2 = item.hierarchy2;
      patch.hierarchy3 = item.hierarchy3;

      patchVenueInLocation(token, venueId, item, patch)
        .then((res) => {
          let newLocations = [...venueLocations];
          let index = newLocations.findIndex((x) => x.id === item.id);
          if (index >= 0) {
            newLocations[index] = res;
            setVenueLocations(newLocations);
          }
        })
        .catch((ex) => {
          console.log(ex.message);
        });
    } else {
      postVenueInLocation(token, venueId, patch)
        .then((res) => {
          if (res) {
            const distributionArea = distributionAreas.find(
              (x) => x.id === res.distributionAreaId
            );
            if (distributionArea) {
              res.distribution_area = {
                id: distributionArea.id,
                name: distributionArea.name
              };
            }
            setVenueLocations((prev) => [...prev, res]);
          }
        })
        .catch((ex) => {
          console.log(ex.message);
        });
    }
  };

  const handleDelete = (item) => {
    deleteVenueInLocation(token, venueId, item).then((res) => {
      if (res) {
        let filtered = venueLocations.filter((x) => x.id !== item.id);
        setVenueLocations(filtered);
      }
    });
  };

  const handleVenueLocationPatch = (item, key, value) => {
    let patch = {};
    patch[key] = value;

    patchVenueInLocation(token, venueId, item, patch).then((res) => {
      let newLocations = [...venueLocations];
      let index = newLocations.findIndex((x) => x.id === item.id);
      if (index >= 0) {
        newLocations[index] = res;
        setVenueLocations(newLocations);
      }
    });
  };

  const handleSelectionChanged = (selectedIDs) => {
    const selected = venueLocations.filter((x) => selectedIDs.includes(x.id));
    setSelectedVenueLocations(selected);
  };

  return (
    <>
      <Helmet>
        <title>In Venue Locations</title>
      </Helmet>
      {editOpen && editing && (
        <EditVenueLocationDialog
          areas={distributionAreas}
          venueLocation={editing}
          open={editOpen}
          venue={venue}
          onAction={onAction}
        />
      )}
      {deleteOpen && editing && (
        <ConfirmDialog
          success="Remove"
          cancel="Cancel Remove"
          successLabel="REMOVE"
          cancelLabel="RETURN"
          text="It cannot be recovered"
          header="Are you sure you want to delete this location?"
          open={deleteOpen}
          onAction={onAction}
        />
      )}
      {deleteBulkOpen && (
        <ConfirmDialog
          success="Bulk Remove"
          successLabel="DELETE"
          cancelLabel="RETURN"
          cancel="Cancel Bulk Remove"
          header="Are you sure you want to delete these locations?"
          text="Deleted Locations cannot be recovered"
          open={deleteBulkOpen}
          onAction={onAction}
        />
      )}
      {venue && (
        <PageTitleWrapper>
          <PageHeader venue={venue} />
        </PageTitleWrapper>
      )}
      <Box style={{ height: venue ? 'calc(100% - 56px)' : '100%' }}>
        <ContainerWrapper>
          <TableWrapper>
            <VenueLocationsTable
              areas={distributionAreas}
              venueLocations={venueLocations}
              venue={venue}
              onAction={onAction}
              onSelectionChanged={handleSelectionChanged}
              onVenueLocationPatch={handleVenueLocationPatch}
            />
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
  };
}
export default connect(reduxState)(VenueLocationsPage);
