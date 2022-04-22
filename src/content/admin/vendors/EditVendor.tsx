import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { VendorStand as Vendor } from 'src/models/vendorStand';
import { styled, Box, Button, DialogActions, Grid, IconButton, Switch, TextField, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { Venue } from 'src/models/venue';

const DialogSubtitle = styled(Typography)(
    ({ theme }) => `
          color: #00000099;
  `
);

interface EditVendorInterface {
    onAction: Function;
    open: boolean;
    venues: Venue[];
    vendor?: Vendor;
};

const EditVendorDialog: React.FC<EditVendorInterface> = (props) => {
    const { onAction, venues, vendor, open } = props;
    const [editing, setEditingVendor] = useState(vendor);
    const [showError, setShowError] = useState(false);

    const isNew = !vendor.name

    const validateInput = () => {
        if (!editing.name || editing.name.trim().length === 0) return false;
        if (!editing.venueId || editing.venueId.trim().length === 0) return false;
        return true;
    }

    const handleSave = () => {
        if (validateInput()) {
            onAction('Save', editing);
        } else {
            setShowError(true);
        }
    }


    return (
        <Dialog onClose={() => {
            onAction('Close');
        }} open={open} PaperProps={{ style: { width: 1280, maxWidth: 640 } }}>
            <DialogTitle className='border-bottom d-flex' sx={{ px: 2, py: 1 }}>
                <Typography component='span' variant='h6'>Edit Vendor</Typography>
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onAction('Close');
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ p: 1 }} style={{ background: '#0000000A' }}>
                    <Switch checked={editing.available} onChange={e => {
                        setEditingVendor({
                            ...editing,
                            available: e.target.checked
                        })
                    }} ></Switch> <Typography component='span' variant='subtitle1'>Active</Typography>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Vendor Details</DialogSubtitle>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="Vendor Name"
                                size='small'
                                required
                                error={showError && (!editing.name || editing.name.trim().length === 0)}
                                fullWidth
                                value={editing.name || ''}
                                onChange={(e) => {
                                    setEditingVendor({
                                        ...editing,
                                        name: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                required
                                label="Venue"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                error={showError && (!editing.venueId || editing.venueId.trim().length === 0)}
                                value={editing.venueId || ''}
                                onChange={(e) => {
                                    setEditingVendor({
                                        ...editing,
                                        venueId: e.target.value
                                    });
                                }}
                            >
                                {venues.map((venue) => (
                                    <MenuItem key={venue.id} value={venue.id}>
                                        {venue.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Vendor Image"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                InputProps={{
                                    endAdornment: <Button size='small' style={{ whiteSpace: 'nowrap' }}>UPDATE IMAGE</Button>,
                                }}
                                value={editing.coverImageUrl || ''}
                                onChange={(e) => {
                                    setEditingVendor({
                                        ...editing,
                                        coverImageUrl: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <Box>
                        <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Other Settings</DialogSubtitle>
                    </Box>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3}>
                            <Switch checked={editing.pickupAvailable} onChange={e => {
                                setEditingVendor({
                                    ...editing,
                                    pickupAvailable: e.target.checked
                                })
                            }}></Switch>Pickup
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Switch checked={editing.deliveryAvailable} onChange={e => {
                                setEditingVendor({
                                    ...editing,
                                    deliveryAvailable: e.target.checked
                                })
                            }}></Switch>
                            Delivery
                        </Grid>
                    </Grid>
                </Box>
                {
                    editing.id &&
                    <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                        <Grid item xs={6} md={3}>
                            <Button color='primary' size='small' onClick={e => {
                                onAction('Manage Staff', editing);
                            }}>Manage Staff</Button>
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Button color='primary' size='small' onClick={e => {
                                onAction('Manage Menu', editing);
                            }}>Manage Menu Items</Button>
                        </Grid>
                    </Box>
                }
            </Box>
            <DialogActions sx={{ py: 2 }}>
                {
                    !isNew &&
                    <Button color='primary' size='small' variant='outlined' style={{ width: 200, height: 40 }} onClick={() => {
                        onAction('Delete', vendor);
                    }}>
                        <InfoOutlinedIcon sx={{ mr: 2 }} fontSize='small'></InfoOutlinedIcon>
                        Delete
                    </Button>
                }
                <Button color='primary' variant='contained' style={{ width: 200, height: 40 }} onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog >
    );
}

export default EditVendorDialog;
