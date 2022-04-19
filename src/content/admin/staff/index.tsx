import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Staff } from 'src/models/staff';
import StaffsTable from './StaffsTable';
import EditStaffDialog from './EditStaff';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
//import { patchStaff, postStaff, deleteStaff } from 'src/Api/apiClient';
import { getVendorStand } from 'src/Api/apiClient';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import { useNavigate, useParams } from 'react-router';
import Status404 from 'src/content/pages/Status/Status404';
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

interface StaffsPageProps {
  token: string;
}

function StaffsPage(props: StaffsPageProps) {
  const { vendorId } = useParams();
  const { token } = props;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [vendor, setVendor] = useState(null);
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
          setStaffs(res.staffs || []);
        }
      }).catch(ex => {
        setNotFound(true);
      })
    } else {

    }
  }, []);

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
      setEditing({ available: false });
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
    if (!staff.id) {
      staff.id = Date.now().toString();
      setStaffs(prev => [...prev, staff]);
    } else {
      let newStaffs = [...staffs];
      let index = newStaffs.findIndex(x => x.id === staff.id);
      if (index >= 0) {
        newStaffs[index] = staff;
        setStaffs(newStaffs);
      }
    }

    /*
    let patch: Staff = { ...staff };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.deletedAt;
    delete patch.vendorStandId;
    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (staff.id) {
      patchStaff(token, vendorId, staff, patch).then(res => {
        let newStaffs = [...staffs];
        let index = newStaffs.findIndex(x => x.id === staff.id);
        if (index >= 0) {
          newStaffs[index] = res;
          setStaffs(newStaffs);
        }
      }).catch(ex => {
        console.log(ex.message);
      })
    } else {
      postStaff(token, vendorId, patch).then(res => {
        setStaffs(prev => [...prev, res]);
      }).catch(ex => {
        console.log(ex.message);
      })
    }
    */
  }

  const handleDelete = (staff) => {
    let filtered = staffs.filter(x => x.id !== staff.id);
    setStaffs(filtered);
    /*
    deleteStaff(token, staff).then(success => {
      if (success) {
        let filtered = staffs.filter(x => x.id !== staff.id);
        setStaffs(filtered);
      }
    })
    */
  }

  const handleSelectionChanged = (selectedIDs) => {
    const selected = staffs.filter(x => selectedIDs.includes(x.id));
    setSelectedStaffs(selected);
  }

  const handleStaffPatch = (staff, key, value) => {
    /*
    let patch = {};
    patch[key] = value;
    */

    let newStaffs = [...staffs];
    let index = newStaffs.findIndex(x => x.id === staff.id);
    if (index >= 0) {
      newStaffs[index][key] = value
      setStaffs(newStaffs);
    }

    /*
    patchStaff(token, staff, patch).then(res => {
      let newStaffs = [...staffs];
      let index = newStaffs.findIndex(x => x.id === staff.id);
      if (index >= 0) {
        newStaffs[index] = res
        setStaffs(newStaffs);
      }
    });
    */
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
        editOpen && editing &&
        <EditStaffDialog
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
  }
}
export default connect(reduxState)(StaffsPage);
