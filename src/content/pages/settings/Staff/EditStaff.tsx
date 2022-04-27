import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Staff } from 'src/models/staff';
import {
  styled,
  Box,
  Button,
  DialogActions,
  Grid,
  IconButton,
  Switch,
  TextField,
  MenuItem
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { VendorStand } from 'src/models/vendorStand';

const DialogSubtitle = styled(Typography)(
  ({ theme }) => `
          color: #00000099;
  `
);

interface EditStaffInterface {
  onAction: Function;
  open: boolean;
  staff?: Staff;
  vendor: VendorStand;
}

const UserRoles = [
  { label: 'Vendor Manager', value: 'manager' },
  { label: 'Runner', value: 'runner' }
];

const EditStaffDialog: React.FC<EditStaffInterface> = (props) => {
  const { onAction, staff, open, vendor } = props;
  const [editing, setEditingStaff] = useState(staff);
  const [showError, setShowError] = useState(false);

  const isNew = !staff.id;

  const validateInput = () => {
    if (!editing.firstName || editing.firstName.trim().length === 0)
      return false;
    if (!editing.lastName || editing.lastName.trim().length === 0) return false;
    if (!editing.vendorStandId) return false;
    return true;
  };

  const handleSave = () => {
    if (validateInput()) {
      onAction('Save', editing);
    } else {
      setShowError(true);
    }
  };

  return (
    <Dialog
      onClose={() => {
        onAction('Close');
      }}
      open={open}
      PaperProps={{ style: { width: 1280, maxWidth: 640 } }}
    >
      <DialogTitle className="border-bottom d-flex" sx={{ px: 2, py: 1 }}>
        <Typography component="span" variant="h6">
          Edit Staff
        </Typography>
        <IconButton
          className="float-right"
          sx={{ p: 0 }}
          size="small"
          onClick={() => {
            onAction('Close');
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <Box>
        <Box sx={{ p: 1 }} style={{ background: '#0000000A' }}>
          <Switch
            checked={editing.active || false}
            onChange={(e) => {
              setEditingStaff({
                ...editing,
                active: e.target.checked
              });
            }}
          ></Switch>{' '}
          <Typography component="span" variant="subtitle1">
            Active
          </Typography>
        </Box>
        <Box sx={{ px: 2, py: 2 }} className="border-bottom">
          <DialogSubtitle variant="subtitle1" sx={{ pb: 2 }}>
            Staff Details
          </DialogSubtitle>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="First Name"
                size="small"
                required
                error={
                  showError &&
                  (!editing.firstName || editing.firstName.trim().length === 0)
                }
                fullWidth
                value={editing.firstName || ''}
                onChange={(e) => {
                  setEditingStaff({
                    ...editing,
                    firstName: e.target.value
                  });
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                InputLabelProps={{ shrink: true }}
                label="Last Name"
                size="small"
                required
                error={
                  showError &&
                  (!editing.lastName || editing.lastName.trim().length === 0)
                }
                fullWidth
                value={editing.lastName || ''}
                onChange={(e) => {
                  setEditingStaff({
                    ...editing,
                    lastName: e.target.value
                  });
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                type="tel"
                InputLabelProps={{ shrink: true }}
                label="Mobile No"
                size="small"
                required
                error={
                  showError &&
                  (!editing.mobileNo || editing.mobileNo.trim().length === 0)
                }
                fullWidth
                value={editing.mobileNo || ''}
                onChange={(e) => {
                  setEditingStaff({
                    ...editing,
                    mobileNo: e.target.value
                  });
                }}
              ></TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                disabled
                label="Vendor"
                required
                InputLabelProps={{ shrink: true }}
                error={showError && !editing.vendorStandId}
                size="small"
                fullWidth
                value={editing.vendorStandId}
                onChange={(e) => {
                  setEditingStaff({
                    ...editing,
                    vendorStandId: e.target.value
                  });
                }}
              >
                <MenuItem key={vendor.id} value={vendor.id}>
                  {vendor.name}
                </MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                select
                InputLabelProps={{ shrink: true }}
                label="Staff Type"
                size="small"
                fullWidth
                value={editing.role}
                onChange={(e) => {
                  const role = e.target.value;
                  if (role === 'manager' || role === 'runner') {
                    setEditingStaff({
                      ...editing,
                      role: role
                    });
                  }
                }}
              >
                {UserRoles.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <DialogActions sx={{ py: 2 }}>
        {!isNew && (
          <Button
            color="primary"
            size="small"
            variant="outlined"
            style={{ width: 200, height: 40 }}
            onClick={() => {
              onAction('Delete', staff);
            }}
          >
            <InfoOutlinedIcon
              sx={{ mr: 2 }}
              fontSize="small"
            ></InfoOutlinedIcon>
            Delete
          </Button>
        )}
        <Button
          color="primary"
          variant="contained"
          style={{ width: 200, height: 40 }}
          onClick={handleSave}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStaffDialog;
