import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Staff } from 'src/models/staff';
import StaffsTable from './StaffsTable';
import EditStaffDialog from './EditStaff';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
import { getAllStaffs, patchStaff, postStaff, deleteStaff, getVendorStands } from 'src/Api/apiClient';
import { getVendorStand } from 'src/Api/apiClient';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import { useParams } from 'react-router';
import Status404 from 'src/content/pages/Status/Status404';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { Venue } from 'src/models/venue';
import { VendorStand } from 'src/models/vendorStand';

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

interface StaffsPageProps {
  token: string;
  venues: Venue[];
}

function StaffsPage(props: StaffsPageProps) {
  const { vendorId } = useParams();
  const { token, venues } = props;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [vendors, setVendors] = useState<VendorStand[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [staffs, setStaffs] = useState<Staff[]>([]);

  const [selectedStaffs, setSelectedStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    if (vendorId) {
      getVendorStand(vendorId).then(res => {
        if (!res) {
          setNotFound(true);
        } else {
          setVendor(res);
        }
      }).catch(ex => {
        setNotFound(true);
      })
    }

    getAllStaffs(token).then(res => {
      if (vendorId) {
        setStaffs(res.filter(x => x.vendorStandId === vendorId));
      } else {
        setStaffs(res);
      }
    });
  }, [vendorId]);

  useEffect(() => {
    loadVendors();
  }, [vendorId, venues])

  const loadVendors = () => {
    setVendors([]);
    getVendorStands(token).then(res => {
      if (res) {
        setVendors(res);
      }
    })
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
      if (vendorId) {
        setEditing({ active: true, vendorStandId: vendorId });
      } else {
        setEditing({ active: true });
      }
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


  const handleSave = (staff) => {
    let patch: Staff = { ...staff };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.deletedAt;
    delete patch.vendorStand;

    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (staff.id) {
      patchStaff(token, staff, patch).then(res => {
        let newStaffs = [...staffs];
        let index = newStaffs.findIndex(x => x.id === staff.id);
        if (index >= 0) {
          newStaffs[index] = res;
          if (vendorId) {
            newStaffs = newStaffs.filter(x => x.vendorStandId === vendorId);
          }
          setStaffs(newStaffs);
        }
      }).catch(ex => {
        console.log(ex.message);
      })
    } else {
      postStaff(token, patch).then(res => {
        if (res) {
          const staff_vendor = vendors.find(x => x.id === staff.vendorStandId);
          res.vendorStand = {
            id: staff_vendor.id,
            name: staff_vendor.name
          }
          if (!vendorId || (vendorId && res.vendorStandId === vendorId)) {
            setStaffs(prev => [...prev, res]);
          }
        }
      }).catch(ex => {
        console.log(ex.message);
      })
    }
  }

  const handleDelete = (staff) => {
    deleteStaff(token, staff).then(success => {
      if (success) {
        let filtered = staffs.filter(x => x.id !== staff.id);
        setStaffs(filtered);
      }
    })
  }

  const handleSelectionChanged = (selectedIDs) => {
    const selected = staffs.filter(x => selectedIDs.includes(x.id));
    setSelectedStaffs(selected);
  }

  const handleStaffPatch = (staff, key, value) => {
    let patch = {};
    patch[key] = value;

    patchStaff(token, staff, patch).then(res => {
      let newStaffs = [...staffs];
      let index = newStaffs.findIndex(x => x.id === staff.id);
      if (index >= 0) {
        newStaffs[index] = res
        setStaffs(newStaffs);
      }
    });
  }

  if (notFound) {
    return <Status404 />
  }

  return (
    <>
      <Helmet>
        <title>Staffs</title>
      </Helmet>
      {
        editOpen && editing && vendors.length > 0 &&
        <EditStaffDialog
          vendors={vendors}
          staff={editing}
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
          header='Are you sure you want to delete this staff?'
          text='It cannot be recovered'
          open={deleteOpen}
          onAction={onAction}
        />
      }
      <Box style={{ height: '100%' }}>
        {
          vendor &&
          <PageTitleWrapper>
            <PageHeader vendor={vendor} />
          </PageTitleWrapper>
        }
        <Box style={{ height: vendor ? 'calc(100% - 56px)' : '100%' }}>
          <ContainerWrapper>
            <TableWrapper>
              <StaffsTable vendor={vendor} staffs={staffs} onAction={onAction} onSelectionChanged={handleSelectionChanged} onStaffPatch={handleStaffPatch} />
            </TableWrapper>
          </ContainerWrapper>
          <FooterWrapper>
            <BulkActions selected={selectedStaffs} onAction={onAction} />
          </FooterWrapper>
        </Box>
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
export default connect(reduxState)(StaffsPage);
