import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Order } from 'src/models/order';
import { Box, Button, Checkbox, DialogActions, Grid, IconButton, Switch } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


interface EditOrderInterface {
    onClose: Function,
    open: boolean,
    order?: Order,
};

const EditOrderDialog: React.FC<EditOrderInterface> = (props) => {
    const { onClose, order, open } = props;
    const [editing, setEditingOrder] = useState(order)

    const handleClose = () => {
        onClose(editing);
    };

    return (
        <Dialog onClose={() => {
            onClose(null);
        }} open={open} PaperProps={{ style: { maxWidth: 400 } }}>
            <DialogTitle className='border-bottom d-flex font-bold' sx={{ px: 2, py: 1 }}>
                Edit Order
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onClose(null);
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ p: 1 }} style={{ background: '#0000000A' }}>
                    <Switch ></Switch> <b>Active</b>
                </Box>
                <Box sx={{ p: 2 }} className='border-bottom'>
                    
                </Box>
                <Box sx={{ px: 2, py: 1 }} className='border-bottom'>
                    <Typography variant='h5' sx={{ pb: 2 }}>Order Details</Typography>
                    <Grid container spacing={2}>

                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 1 }} className='border-bottom'>
                    <Typography variant='h5' sx={{ pb: 1 }}>Locations</Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Checkbox size='small'></Checkbox>HotDog Stand
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox size='small'></Checkbox>Snackr Kiosk
                        </Grid>

                    </Grid>
                </Box>
            </Box>
            <DialogActions sx={{ py: 2 }}>
                <Button color='primary' variant='contained' fullWidth onClick={handleClose}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditOrderDialog;
