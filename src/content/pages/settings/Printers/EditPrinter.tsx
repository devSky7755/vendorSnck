import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Printer } from 'src/models/printer';
import { Box, Button, Checkbox, DialogActions, Grid, IconButton, MenuItem, Switch, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { NavLink } from 'react-router-dom'

interface EditPrinterInterface {
    onClose: Function,
    open: boolean,
    printer?: Printer,
};

const PrinterModels = [
    {
        value: 'STAR TSP-143',
        label: 'STAR TSP-143',
    }
];


const EditPrinterDialog: React.FC<EditPrinterInterface> = (props) => {
    const { onClose, printer, open } = props;
    const [editing, setEditingPrinter] = useState(printer)

    const handleClose = () => {
        onClose(editing);
    };

    return (
        <Dialog onClose={() => {
            onClose(null);
        }} open={open} PaperProps={{ style: { maxWidth: 400 } }}>
            <DialogTitle className='border-bottom d-flex' sx={{ px: 2, py: 1 }}>
                <Typography component='span' variant='h6'>Edit Printer</Typography>
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onClose(null);
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ p: 1 }} style={{ background: '#0000000A' }}>
                    <Switch ></Switch> <Typography component='span' variant='subtitle1'>Connected</Typography>
                </Box>
                <Box sx={{ px: 2, py: 3 }} className='border-bottom'>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                size='small'
                                fullWidth
                                value={editing.name}
                                onChange={(e) => {
                                    setEditingPrinter({
                                        ...editing,
                                        name: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Model"
                                size='small'
                                fullWidth
                                value={editing.model}
                                onChange={(e) => {
                                    setEditingPrinter({
                                        ...editing,
                                        model: e.target.value
                                    });
                                }}
                            >
                                {PrinterModels.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>
                                <NavLink to={'#'}>Instruction on how to setup TSP 143</NavLink>
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <Typography variant='subtitle1' sx={{ pb: 2 }}>Address</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="IP Address"
                                size='small'
                                fullWidth
                                value={editing.address}
                                onChange={(e) => {
                                    setEditingPrinter({
                                        ...editing,
                                        address: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Port"
                                size='small'
                                type='number'
                                fullWidth
                                value={editing.port}
                                onChange={(e) => {
                                    if (Number(e.target.value)) {
                                        setEditingPrinter({
                                            ...editing,
                                            port: Number(e.target.value)
                                        });
                                    }
                                }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 1 }} className='border-bottom'>
                    <Typography variant='subtitle1' sx={{ pb: 1 }}>Use this printer for</Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Checkbox size='small'></Checkbox>Pickup Orders
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox size='small'></Checkbox>Delivery Orders
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

export default EditPrinterDialog;
