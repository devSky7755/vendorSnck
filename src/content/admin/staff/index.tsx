import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Staff } from 'src/models/staff';
import StaffsTable from './StaffsTable';
import EditStaffDialog from './EditStaff';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
import {
  getAllStaffs,
  patchStaff,
  postStaff,
  deleteStaff,
  getVendorStands,
  patchStaffs,
  deleteStaffs
} from 'src/Api/apiClient';
import { getVendorStand } from 'src/Api/apiClient';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import { useParams } from 'react-router';
import Status404 from 'src/content/pages/Status/Status404';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';
import { Venue } from 'src/models/venue';
import { VendorStand } from 'src/models/vendorStand';
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

interface StaffsPageProps {
  token: string;
  venues: Venue[];
}

function StaffsPage(props: StaffsPageProps) {
  const { vendorId } = useParams();
  const { token, venues } = props;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteBulkOpen, setDeleteBulkOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [vendors, setVendors] = useState<VendorStand[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [staffs, setStaffs] = useState<Staff[]>([]);

  const [selectedStaffs, setSelectedStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    if (vendorId) {
      getVendorStand(vendorId)
        .then((res) => {
          if (!res) {
            setNotFound(true);
          } else {
            setVendor(res);
          }
        })
        .catch((ex) => {
          setNotFound(true);
        });
    } else {
      setVendor(null);
    }

    getAllStaffs(token).then((res) => {
      res.forEach((x) => {
        x.vendorStandId = x.vendorStand && x.vendorStand.id;
      });
      if (vendorId) {
        setStaffs(res.filter((x) => x.vendorStandId === vendorId));
      } else {
        setStaffs(res);
      }
    });
  }, [vendorId]);

  useEffect(() => {
    loadVendors();
  }, [vendorId, venues]);

  const loadVendors = () => {
    setVendors([]);
    getVendorStands(token).then((res) => {
      if (res) {
        setVendors(res);
      }
    });
  };

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
    const ids = selectedStaffs.map((staff) => staff.id);
    switch (action) {
      case ACTIONS.SET_ACTIVE.action:
        patchStaffs(token, ids, {
          active: true
        }).then((updatedStaffs) => {
          let newStaffs = [...staffs].map((staff) => {
            const findStaff = updatedStaffs.find(
              (uStaff) => uStaff.id === staff.id
            );
            return findStaff ? findStaff : staff;
          });
          setStaffs(newStaffs);
          setSelectedStaffs([]);
        });
        break;
      case ACTIONS.SET_INACTIVE.action:
        patchStaffs(token, ids, {
          active: false
        }).then((updatedStaffs) => {
          let newStaffs = [...staffs].map((staff) => {
            const findStaff = updatedStaffs.find(
              (uStaff) => uStaff.id === staff.id
            );
            return findStaff ? findStaff : staff;
          });
          setStaffs(newStaffs);
          setSelectedStaffs([]);
        });
        break;
      case ACTIONS.SET_ROLE_AS_RUNNER.action:
        patchStaffs(token, ids, {
          role: 'runner'
        }).then((updatedStaffs) => {
          let newStaffs = [...staffs].map((staff) => {
            const findStaff = updatedStaffs.find(
              (uStaff) => uStaff.id === staff.id
            );
            return findStaff ? findStaff : staff;
          });
          setStaffs(newStaffs);
          setSelectedStaffs([]);
        });
        break;
      case ACTIONS.SET_ROLE_AS_MANAGER.action:
        patchStaffs(token, ids, {
          role: 'manager'
        }).then((updatedStaffs) => {
          let newStaffs = [...staffs].map((staff) => {
            const findStaff = updatedStaffs.find(
              (uStaff) => uStaff.id === staff.id
            );
            return findStaff ? findStaff : staff;
          });
          setStaffs(newStaffs);
          setSelectedStaffs([]);
        });
        break;
      case ACTIONS.DELETE_STAFF.action:
        setDeleteBulkOpen(true);
        break;
      default:
        break;
    }
  };

  const handleBulkRemove = () => {
    const ids = selectedStaffs.map((staff) => staff.id);
    deleteStaffs(token, ids).then((res) => {
      if (!res) return;
      let newStaffs = [...staffs].filter((staff) => {
        const findStaff = selectedStaffs.find(
          (sStaff) => sStaff.id === staff.id
        );
        return findStaff ? false : true;
      });
      setStaffs(newStaffs);
      setSelectedStaffs([]);
    });
  };

  const handleSave = (staff) => {
    let patch: Staff = { ...staff };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.deletedAt;
    delete patch.vendorStand;

    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (staff.id) {
      patchStaff(token, staff, patch)
        .then((res) => {
          let newStaffs = [...staffs];
          let index = newStaffs.findIndex((x) => x.id === staff.id);
          if (index >= 0) {
            newStaffs[index] = res;
            if (vendorId) {
              newStaffs = newStaffs.filter((x) => x.vendorStandId === vendorId);
            }
            setStaffs(newStaffs);
          }
        })
        .catch((ex) => {
          console.log(ex.message);
        });
    } else {
      postStaff(token, patch)
        .then((res) => {
          if (res) {
            const staff_vendor = vendors.find(
              (x) => x.id === staff.vendorStandId
            );
            res.vendorStand = {
              id: staff_vendor.id,
              name: staff_vendor.name
            };
            if (!vendorId || (vendorId && res.vendorStandId === vendorId)) {
              setStaffs((prev) => [...prev, res]);
            }
          }
        })
        .catch((ex) => {
          console.log(ex.message);
        });
    }
  };

  const handleDelete = (staff) => {
    deleteStaff(token, staff).then((success) => {
      if (success) {
        let filtered = staffs.filter((x) => x.id !== staff.id);
        setStaffs(filtered);
      }
    });
  };

  const handleSelectionChanged = (selectedIDs) => {
    const selected = staffs.filter((x) => selectedIDs.includes(x.id));
    setSelectedStaffs(selected);
  };

  const handleStaffPatch = (staff, key, value) => {
    let patch = {};
    patch[key] = value;

    patchStaff(token, staff, patch).then((res) => {
      let newStaffs = [...staffs];
      let index = newStaffs.findIndex((x) => x.id === staff.id);
      if (index >= 0) {
        newStaffs[index] = res;
        setStaffs(newStaffs);
      }
    });
  };

  if (notFound) {
    return <Status404 />;
  }

  return (
    <>
      <Helmet>
        <title>Staffs</title>
      </Helmet>
      {editOpen && editing && vendors.length > 0 && (
        <EditStaffDialog
          vendors={vendors}
          staff={editing}
          open={editOpen}
          onAction={onAction}
        />
      )}
      {deleteOpen && editing && (
        <ConfirmDialog
          success="Remove"
          successLabel="DELETE"
          cancelLabel="RETURN"
          cancel="Cancel Remove"
          header="Are you sure you want to delete this staff?"
          text="It cannot be recovered"
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
          header="Are you sure you want to delete these staffs?"
          text="Deleted Staffs cannot be recovered"
          open={deleteBulkOpen}
          onAction={onAction}
        />
      )}
      <Box style={{ height: '100%' }}>
        {vendor && (
          <PageTitleWrapper>
            <PageHeader vendor={vendor} />
          </PageTitleWrapper>
        )}
        <Box style={{ height: vendor ? 'calc(100% - 56px)' : '100%' }}>
          <ContainerWrapper>
            <TableWrapper>
              <StaffsTable
                vendor={vendor}
                staffs={staffs}
                onAction={onAction}
                onSelectionChanged={handleSelectionChanged}
                onStaffPatch={handleStaffPatch}
              />
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
  };
}
export default connect(reduxState)(StaffsPage);
