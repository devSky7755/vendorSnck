import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Staff } from 'src/models/staff';
import StaffsTable from './StaffsTable';
import EditStaffDialog from './EditStaff';
import { connect } from 'react-redux';
import {
  deleteStaff,
  getAllStaffs,
  patchStaff,
  postStaff
} from 'src/Api/apiClient';
import { VendorStand } from 'src/models/vendorStand';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import BulkActions from './BulkActions';

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

const TableWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

interface StaffsSettingProps {
  token: string;
  vendorStand: VendorStand;
}

function StaffsSetting(props: StaffsSettingProps) {
  const { token, vendorStand } = props;

  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const [vendor, setVendor] = useState<VendorStand>();
  const [staffs, setStaffs] = useState<Staff[]>([]);

  const [selectedStaffs, setSelectedStaffs] = useState<Staff[]>([]);

  useEffect(() => {
    getAllStaffs(token).then((res) => {
      setStaffs(res);
    });
  }, []);

  useEffect(() => {
    setVendor(vendorStand);
  }, [vendorStand]);

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
      setEditing({ active: false, vendorStandId: vendor?.id });
      setEditOpen(true);
    } else if (action === 'Cancel Remove') {
      setDeleteOpen(false);
      setEditing(null);
    } else if (action === 'Remove') {
      setDeleteOpen(false);
      handleDelete(editing);
      setEditing(null);
    }
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
            setStaffs((prev) => [...prev, res]);
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

  return (
    <>
      <Helmet>
        <title>Staffs</title>
      </Helmet>
      {editOpen && editing && vendor && (
        <EditStaffDialog
          vendor={vendor}
          staff={editing}
          open={editOpen}
          onAction={onAction}
        />
      )}
      {deleteOpen && editing && vendor && (
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
                staffs={staffs}
                onAction={onAction}
                onSelectionChanged={handleSelectionChanged}
                onStaffPatch={handleStaffPatch}
              />
            </TableWrapper>
          </ContainerWrapper>
          {vendor && (
            <FooterWrapper>
              <BulkActions selected={selectedStaffs} onAction={onAction} />
            </FooterWrapper>
          )}
        </Box>
      </Box>
    </>
  );
}

function reduxState(state) {
  return {
    token: state.auth && state.auth.token,
    vendorStand: state.venues && state.venues.vendorStand
  };
}
export default connect(reduxState)(StaffsSetting);
