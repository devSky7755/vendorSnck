import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { VendorStand as Vendor } from 'src/models/vendorStand';
import VendorsTable from './VendorsTable';
import EditVendorDialog from './EditVendor';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
import { patchVendorStand, postVendorStand, deleteVendorStand } from 'src/Api/apiClient';
import { Venue } from 'src/models/venue';
import { getVenue } from 'src/Api/apiClient';
import { useNavigate } from 'react-router';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';

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

interface VendorsPageProps {
  venues: Venue[];
  token: string;
}

function VendorsPage(props: VendorsPageProps) {
  const { token, venues } = props;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [vendors, setVendors] = useState<Vendor[]>([]);

  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadVendors();
  }, [venues]);

  const loadVendors = () => {
    setVendors([]);
    let promises = [];
    venues && venues.forEach(venue => {
      promises.push(getVenue(venue.id));
    });
    Promise.all(promises).then(res => {
      let all_vendors = [];
      res.forEach(x => {
        if (x.vendorStands) all_vendors = [...all_vendors, ...x.vendorStands];
      })
      setVendors(all_vendors);
    });
  }

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
      setEditing({ available: false, deliveryAvailable: false, pickupAvailable: false });
      setEditOpen(true);
    } else if (action === 'Cancel Remove') {
      setDeleteOpen(false);
      setEditing(null);
    } else if (action === 'Remove') {
      setDeleteOpen(false);
      handleDelete(editing);
      setEditing(null);
    } else if (action === 'Manage Staff') {
      navigate('/staff/' + data.id);
    } else if (action === 'Manage Menu') {
      navigate('/menuitems/' + data.id);
    }
  }


  const handleSave = (vendor) => {
    let patch: Vendor = { ...vendor };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.deletedAt;
    delete patch.manager;
    delete patch.menuItems;
    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (vendor.id) {
      patchVendorStand(token, vendor, patch).then(res => {
        let newVendors = [...vendors];
        let index = newVendors.findIndex(x => x.id === vendor.id);
        if (index >= 0) {
          newVendors[index] = res
          setVendors(newVendors);
        }
      }).catch(ex => {
        console.log(ex.message);
      })
    } else {
      postVendorStand(token, patch).then(res => {
        setVendors(prev => [...prev, res]);
      }).catch(ex => {
        console.log(ex.message);
      })
    }
  }

  const handleDelete = (vendor) => {
    deleteVendorStand(token, vendor.id).then(success => {
      if (success) {
        let filtered = vendors.filter(x => x.id !== vendor.id);
        setVendors(filtered);
      }
    })
  }

  const handleSelectionChanged = (selectedIDs) => {
    const selected = vendors.filter(x => selectedIDs.includes(x.id));
    setSelectedVendors(selected);
  }

  const handleVendorPatch = (vendor, key, value) => {
    let patch = {};
    patch[key] = value;

    patchVendorStand(token, vendor, patch).then(res => {
      let newVendors = [...vendors];
      let index = newVendors.findIndex(x => x.id === vendor.id);
      if (index >= 0) {
        newVendors[index] = res
        setVendors(newVendors);
      }
    });
  }

  return (
    <>
      <Helmet>
        <title>Vendors</title>
      </Helmet>
      {
        editOpen && editing &&
        <EditVendorDialog
          venues={venues}
          vendor={editing}
          open={editOpen}
          onAction={onAction}
        />
      }
      {
        deleteOpen && editing &&
        <ConfirmDialog
          success='Remove'
          successLabel='DELETE'
          cancelLabel='RETURN'
          cancel='Cancel Remove'
          header='Are you sure you want to delete this vendor?'
          text='It cannot be recovered'
          open={deleteOpen}
          onAction={onAction}
        />
      }
      <Box style={{ height: '100%' }}>
        <ContainerWrapper>
          <TableWrapper>
            <VendorsTable vendors={vendors} venues={venues} onAction={onAction} onSelectionChanged={handleSelectionChanged} onVendorPatch={handleVendorPatch} />
          </TableWrapper>
        </ContainerWrapper>
        <FooterWrapper>
          <BulkActions selected={selectedVendors} onAction={onAction} />
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
export default connect(reduxState)(VendorsPage);
