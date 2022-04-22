import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { VenueInLocation as VenueLocation } from 'src/models/venue';
import { styled, Box, Button, DialogActions, Grid, IconButton, Switch, TextField } from '@mui/material';
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
    venueLocation?: VenueLocation;
};

const EditVenueLocationDialog: React.FC<EditVenueLocationInterface> = (props) => {
    const { onAction, venueLocation, open } = props;
    const [editing, setEditingVenueLocation] = useState(venueLocation);
    const [showError, setShowError] = useState(false);

    const isNew = !venueLocation.id

    const validateInput = () => {
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
                    <Switch checked={editing.active} onChange={e => {
                        setEditingVenueLocation({
                            ...editing,
                            active: e.target.checked
                        })
                    }} ></Switch> <Typography component='span' variant='subtitle1'>Active</Typography>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>VenueLocation Details</DialogSubtitle>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                label="QR Code"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                InputProps={{
                                    endAdornment: <Button size='small' style={{ whiteSpace: 'nowrap' }}>UPDATE QR</Button>,
                                }}
                                value={editing.qr_code || ''}
                                onChange={(e) => {
                                    setEditingVenueLocation({
                                        ...editing,
                                        qr_code: e.target.value
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
                            <Switch checked={editing.pickup} onChange={e => {
                                setEditingVenueLocation({
                                    ...editing,
                                    pickup: e.target.checked
                                })
                            }}></Switch>Pickup
                        </Grid>
                        <Grid item xs={6} md={9}>
                            <Switch checked={editing.delivery} onChange={e => {
                                setEditingVenueLocation({
                                    ...editing,
                                    delivery: e.target.checked
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
