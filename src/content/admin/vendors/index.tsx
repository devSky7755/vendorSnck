import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { VendorStand as Vendor } from 'src/models/vendorStand';
import VendorsTable from './VendorsTable';
import EditVendorDialog from './EditVendor';
import { connect } from 'react-redux';
//import { deleteVendor, patchVendor, updateVendor } from 'src/reducers/venues/action';
import BulkActions from './BulkActions';
//import { patchVendor as patchVendorAPI, postVendor, deleteVendor as deleteVendorAPI } from 'src/Api/apiClient';
import DeleteVendorDialog from './DeleteVendor';

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
  vendors: Vendor[];
  token: string;
  patchVendor: Function;
  updateVendor: Function;
  deleteVendor: Function;
}

function VendorsPage(props: VendorsPageProps) {
  const token = props.token;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [vendors, setVendors] = useState<Vendor[]>(props.vendors || []);

  const [selectedVendors, setSelectedVendors] = useState<Vendor[]>([]);

  useEffect(() => {
    setVendors(props.vendors || []);
  }, [props.vendors]);

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

  
  const handleSave = (vendor) => {
    let patch: Vendor = { ...vendor };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    /*
    if (vendor.id) {
      patchVendorAPI(token, vendor, patch).then(res => {
        props.updateVendor(res);
      }).catch(ex => {
        console.log(ex.message);
      })
    } else {
      postVendor(token, patch).then(res => {
        props.updateVendor(res);
      }).catch(ex => {
        console.log(ex.message);
      })
    }
    */
  }

  const handleDelete = (vendor) => {
    props.deleteVendor(vendor);
    /*
    deleteVendorAPI(token, vendor.id).then(success => {
      if (success) {
        
      }
    })
    */
  }

  const handleSelectionChanged = (selectedIDs) => {
    const selected = vendors.filter(x => selectedIDs.includes(x.id));
    setSelectedVendors(selected);
  }

  const handleVendorPatch = (vendor, key, value) => {
    let patch = {};
    patch[key] = value;

    /*
    patchVendorAPI(token, vendor, patch).then(res => {
      props.patchVendor(vendor, key, value);
    });
    */
  }

  return (
    <>
      <Helmet>
        <title>Vendors</title>
      </Helmet>
      {
        editOpen && editing &&
        <EditVendorDialog
          vendor={editing}
          open={editOpen}
          onAction={onAction}
        />
      }
      {
        deleteOpen && editing &&
        <DeleteVendorDialog
          success='Remove'
          cancel='Cancel Remove'
          open={deleteOpen}
          onAction={onAction}
        />
      }
      <Box style={{ height: '100%' }}>
        <ContainerWrapper>
          <TableWrapper>
            <VendorsTable vendors={vendors} onAction={onAction} onSelectionChanged={handleSelectionChanged} onVendorPatch={handleVendorPatch} />
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
    vendors: state.vendors && state.vendors.vendors
  }
}
export default connect(reduxState, { /*patchVendor, deleteVendor, updateVendor*/ })(VendorsPage);
