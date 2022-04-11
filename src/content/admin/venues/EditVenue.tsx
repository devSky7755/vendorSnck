import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { getVenueSeatField, Venue } from 'src/models/venue';
import { styled, Box, Button, InputAdornment, DialogActions, Grid, IconButton, Switch, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const DialogSubtitle = styled(Typography)(
    ({ theme }) => `
          color: #00000099;
  `
);

interface EditVenueInterface {
    onAction: Function,
    open: boolean,
    venue?: Venue,
};

const EditVenueDialog: React.FC<EditVenueInterface> = (props) => {
    const { onAction, venue, open } = props;
    const [editing, setEditingVenue] = useState(venue);
    const [fields, setFields] = useState(getVenueSeatField(venue));
    const [showError, setShowError] = useState(false);

    const isNew = !venue.name

    const validateInput = () => {
        if (!editing.name || editing.name.trim().length === 0) return false;
        return true;
    }

    const handleSave = () => {
        if (validateInput()) {
            let index = 1;
            while (true) {
                if (editing['inVenueLocationHierarchy' + index]) {
                    delete editing['inVenueLocationHierarchy' + index];
                    index++;
                } else {
                    break;
                }
            }
            fields.forEach((field, index) => {
                editing['inVenueLocationHierarchy' + (index + 1)] = field;
            });
            onAction('Save', editing);
        } else {
            setShowError(true);
        }
    }


    return (
        <Dialog onClose={() => {
            onAction('Close');
        }} open={open} PaperProps={{ style: { width: 1280, maxWidth: 1280 } }}>
            <DialogTitle className='border-bottom d-flex' sx={{ px: 2, py: 1 }}>
                <Typography component='span' variant='h6'>Edit Venue</Typography>
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onAction('Close');
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ p: 1 }} style={{ background: '#0000000A' }}>
                    <Switch checked={editing.active} onChange={e => {
                        setEditingVenue({
                            ...editing,
                            active: e.target.checked
                        })
                    }} ></Switch> <Typography component='span' variant='subtitle1'>Active</Typography>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Venue Details</DialogSubtitle>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="Venue Name"
                                size='small'
                                required
                                error={showError && (!editing.name || editing.name.trim().length === 0)}
                                fullWidth
                                value={editing.name || ''}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        name: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Address"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={editing.address || ''}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        address: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Maps URL"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                helperText='This informs the location settings for users trying to find the venue via ‘current location’'
                                value={editing.mapsUrl || ''}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        mapsUrl: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Seating Map"
                                size='small'
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={editing.seatingMapImageUrl || ''}
                                InputProps={{
                                    endAdornment: <Button size='small' style={{ whiteSpace: 'nowrap' }}>UPLOAD SEATING MAP</Button>,
                                }}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        seatingMapImageUrl: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Venue Image"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                InputProps={{
                                    endAdornment: <Button size='small' style={{ whiteSpace: 'nowrap' }}>UPDATE IMAGE</Button>,
                                }}
                                value={editing.imageUrl || ''}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        imageUrl: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Primary Venue Contact"
                                size='small'
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={editing.primaryContactName || ''}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        primaryContactName: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Primary Venue Contact Number"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={editing.primaryContactPhone || ''}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        primaryContactPhone: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Primary Contact Email Address"
                                size='small'
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={editing.primaryContactEmail || ''}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        primaryContactEmail: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Snackr Commission"
                                size='small'
                                type='number'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">%</InputAdornment>,
                                    inputProps: { min: 0, max: 100, step: 0.01 }
                                }}
                                value={editing.commission || 0}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        commission: Number(e.target.value)
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <Box>
                        <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>In Venue Locations</DialogSubtitle>
                    </Box>
                    <Grid container spacing={2}>
                        {
                            fields.map((field, index) => {
                                return (
                                    <Grid item xs={12} md={3} key={index}>
                                        <TextField
                                            label={"In Venue Location Heirarchy " + (index + 1)}
                                            size='small'
                                            fullWidth
                                            InputLabelProps={{ shrink: true }}
                                            InputProps={
                                                index === fields.length - 1 ? (
                                                    {
                                                        endAdornment: <IconButton onClick={e => {
                                                            let newFields = [...fields];
                                                            newFields.pop();
                                                            setFields(newFields);
                                                        }} size='small' style={{ whiteSpace: 'nowrap' }}>
                                                            <DeleteForeverOutlinedIcon fontSize='small' htmlColor='black' />
                                                        </IconButton>,
                                                    }
                                                ) : ({})
                                            }
                                            value={field}
                                            onChange={(e) => {
                                                let newFields = [...fields];
                                                newFields[index] = e.target.value;
                                                setFields(newFields);
                                            }}
                                        >
                                        </TextField>
                                    </Grid>
                                )
                            })
                        }
                        <Grid item xs={12}>
                            <Button color='primary' size='small' onClick={e => {
                                setFields([...fields, ''])
                            }}>+ Add Heirarchy</Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 1 }}>Delivery / Pickup Toggles</DialogSubtitle>
                    <Grid container spacing={3}>
                        <Grid item xs={6} md={3}>
                            <Switch checked={editing.pickupEnabled} onChange={e => {
                                setEditingVenue({
                                    ...editing,
                                    pickupEnabled: e.target.checked
                                })
                            }}></Switch>Pickup
                        </Grid>
                        <Grid item xs={6} md={3}>
                            <Switch checked={editing.deliveryEnabled} onChange={e => {
                                setEditingVenue({
                                    ...editing,
                                    deliveryEnabled: e.target.checked
                                })
                            }}></Switch>
                            Delivery
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Fees</DialogSubtitle>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Delivery Fee"
                                size='small'
                                type='number'
                                fullWidth
                                InputLabelProps={{ shrink: true }}
                                value={editing.deliveryFee || 0}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    inputProps: { min: 0, max: 1000, step: 0.01 }
                                }}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        deliveryFee: Number(e.target.value)
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Pickup Fee"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                type='number'
                                fullWidth
                                value={editing.pickupFee || 0}
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    inputProps: { min: 0, max: 1000, step: 0.01 }
                                }}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        pickupFee: Number(e.target.value)
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <TextField
                                label="Service Fee"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                type='number'
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">$</InputAdornment>,
                                    inputProps: { min: 0, max: 1000, step: 0.01 }
                                }}
                                value={editing.serviceFee || 0}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        serviceFee: Number(e.target.value)
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Liquor Licence Inputs</DialogSubtitle>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Liquor Licence Message"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={editing.liquorLicenseMessage || ''}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        liquorLicenseMessage: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Alcohol Limit - per order"
                                size='small'
                                type='number'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={editing.alcoholLimitPerOrder || 0}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        alcoholLimitPerOrder: Number(e.target.value)
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={3}>
                            <TextField
                                label="Alcohol Limit - per user per day"
                                size='small'
                                fullWidth
                                type='number'
                                InputLabelProps={{ shrink: true }}
                                helperText='This will reset for each user at 3am'
                                value={editing.alcoholLimitPerDay || 0}
                                onChange={(e) => {
                                    setEditingVenue({
                                        ...editing,
                                        alcoholLimitPerDay: Number(e.target.value)
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <DialogActions sx={{ py: 2 }}>
                {
                    !isNew &&
                    <Button color='primary' size='small' variant='outlined' style={{ width: 200, height: 40 }} onClick={() => {
                        onAction('Delete', venue);
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

export default EditVenueDialog;
