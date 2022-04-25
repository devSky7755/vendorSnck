import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Venue, VenueDistributionArea, VenueInLocation as VenueLocation } from 'src/models/venue';
import { styled, Box, Button, DialogActions, Grid, IconButton, Switch, TextField, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const DialogSubtitle = styled(Typography)(
    ({ theme }) => `
          color: #00000099;
  `
);

interface EditVenueLocationInterface {
    onAction: Function;
    open: boolean;
    venue: Venue;
    areas: VenueDistributionArea[];
    venueLocation?: VenueLocation;
};

const EditVenueLocationDialog: React.FC<EditVenueLocationInterface> = (props) => {
    const { onAction, venue, venueLocation, open, areas } = props;
    const [editing, setEditingVenueLocation] = useState(venueLocation);
    const [showError, setShowError] = useState(false);

    const isNew = !venueLocation.id

    const validateInput = () => {
        if (!editing.hierarchy1 || editing.hierarchy1.trim().length === 0) return false;
        if (!editing.distributionAreaId || editing.distributionAreaId.trim().length === 0) return false;
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
        }} open={open} PaperProps={{ style: { width: 640, maxWidth: 640 } }}>
            <DialogTitle className='border-bottom d-flex' sx={{ px: 2, py: 1 }}>
                <Typography component='span' variant='h6'>Edit VenueLocation</Typography>
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onAction('Close');
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ p: 1 }} style={{ background: '#0000000A' }}>
                    <Switch checked={editing.active || false} onChange={e => {
                        setEditingVenueLocation({
                            ...editing,
                            active: e.target.checked
                        })
                    }} ></Switch> <Typography component='span' variant='subtitle1'>Active</Typography>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>VenueLocation Details</DialogSubtitle>
                    <Grid container spacing={3}>
                        {
                            venue && venue.inVenueLocationHierarchy1 &&
                            <Grid item xs={12}>
                                <TextField
                                    label={venue.inVenueLocationHierarchy1}
                                    size='small'
                                    required
                                    error={showError && !editing.hierarchy1}
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    value={editing.hierarchy1}
                                    onChange={(e) => {
                                        setEditingVenueLocation({
                                            ...editing,
                                            hierarchy1: e.target.value
                                        });
                                    }}
                                >
                                </TextField>
                            </Grid>
                        }
                        {
                            venue && venue.inVenueLocationHierarchy2 &&
                            <Grid item xs={12}>
                                <TextField
                                    label={venue.inVenueLocationHierarchy2}
                                    size='small'
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    value={editing.hierarchy2}
                                    onChange={(e) => {
                                        setEditingVenueLocation({
                                            ...editing,
                                            hierarchy2: e.target.value
                                        });
                                    }}
                                >
                                </TextField>
                            </Grid>
                        }
                        {
                            venue && venue.inVenueLocationHierarchy3 &&
                            <Grid item xs={12}>
                                <TextField
                                    label={venue.inVenueLocationHierarchy3}
                                    size='small'
                                    InputLabelProps={{ shrink: true }}
                                    fullWidth
                                    value={editing.hierarchy3}
                                    onChange={(e) => {
                                        setEditingVenueLocation({
                                            ...editing,
                                            hierarchy3: e.target.value
                                        });
                                    }}
                                >
                                </TextField>
                            </Grid>
                        }
                        <Grid item xs={12}>
                            <TextField
                                select
                                InputLabelProps={{ shrink: true }}
                                label="Distribution Area"
                                size='small'
                                fullWidth
                                error={showError && !editing.distributionAreaId}
                                required
                                value={editing.distributionAreaId}
                                onChange={(e) => {
                                    setEditingVenueLocation({
                                        ...editing,
                                        distributionAreaId: e.target.value
                                    })
                                }}
                            >
                                {areas.map((option) => (
                                    <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="QR Code"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                InputProps={{
                                    endAdornment: <Button size='small' style={{ whiteSpace: 'nowrap' }}>UPDATE QR</Button>,
                                }}
                                value={editing.qrCode || ''}
                                onChange={(e) => {
                                    setEditingVenueLocation({
                                        ...editing,
                                        qrCode: e.target.value
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
                            <Switch checked={editing.pickupEnabled || false} onChange={e => {
                                setEditingVenueLocation({
                                    ...editing,
                                    pickupEnabled: e.target.checked
                                })
                            }}></Switch>Pickup
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Switch checked={editing.deliveryEnabled || false} onChange={e => {
                                setEditingVenueLocation({
                                    ...editing,
                                    deliveryEnabled: e.target.checked
                                })
                            }}></Switch>
                            Delivery
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <DialogActions sx={{ py: 2 }}>
                {
                    !isNew &&
                    <Button color='primary' size='small' variant='outlined' style={{ width: 200, height: 40 }} onClick={() => {
                        onAction('Delete', venueLocation);
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

export default EditVenueLocationDialog;
