import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Customer } from 'src/models/customer';
import { styled, Box, Button, DialogActions, Grid, IconButton, Switch, TextField, TableContainer, TableBody, TableRow, TableCell, Table } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';

const DialogSubtitle = styled(Typography)(
    ({ theme }) => `
          color: #00000099;
  `
);

interface EditCustomerInterface {
    onAction: Function;
    open: boolean;
    customer?: Customer;
};

const EditCustomerDialog: React.FC<EditCustomerInterface> = (props) => {
    const { onAction, customer, open } = props;
    const [editing, setEditingCustomer] = useState(customer);
    const [showError, setShowError] = useState(false);

    const isNew = !customer.id

    const validateInput = () => {
        if (!editing.firstName || editing.firstName.trim().length === 0) return false;
        if (!editing.lastName || editing.lastName.trim().length === 0) return false;
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
                <Typography component='span' variant='h6'>{isNew ? 'Add' : 'Edit'}&nbsp;Customer</Typography>
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onAction('Close');
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ px: 2, py: 1 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Customer Details</DialogSubtitle>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="First Name"
                                size='small'
                                required
                                error={showError && (!editing.firstName || editing.firstName.trim().length === 0)}
                                fullWidth
                                value={editing.firstName || ''}
                                onChange={(e) => {
                                    setEditingCustomer({
                                        ...editing,
                                        firstName: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="Last Name"
                                size='small'
                                required
                                error={showError && (!editing.lastName || editing.lastName.trim().length === 0)}
                                fullWidth
                                value={editing.lastName || ''}
                                onChange={(e) => {
                                    setEditingCustomer({
                                        ...editing,
                                        lastName: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Mobile No"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                contentEditable={false}
                                value={editing.mobileNo || ''}
                                onChange={(e) => {
                                    /*
                                    setEditingCustomer({
                                        ...editing,
                                        mobileNo: e.target.value
                                    });
                                    */
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 1 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Block User</DialogSubtitle>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={6}>
                            <Switch checked={editing.tempBlocked || false} onChange={e => {
                                setEditingCustomer({
                                    ...editing,
                                    tempBlocked: e.target.checked
                                })
                            }} ></Switch> <Typography component='span' variant='subtitle1'>Temporarily blocked</Typography>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Switch checked={editing.permBlocked || false} onChange={e => {
                                setEditingCustomer({
                                    ...editing,
                                    permBlocked: e.target.checked
                                })
                            }} ></Switch> <Typography component='span' variant='subtitle1'>Permanently blocked</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 1 }}>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Orders</DialogSubtitle>
                    {
                        editing.orders ? (
                            <TableContainer style={{ width: '100%' }}>
                                <Table>
                                    <TableBody>
                                        {
                                            editing.orders.map((order, id) => {
                                                return (
                                                    <TableRow>
                                                        <TableCell>
                                                            <Typography variant='subtitle1'>Order No. {order.id}</Typography>
                                                        </TableCell>
                                                        <TableCell align='right'>${(order.totalPrice || 0).toFixed(2)}</TableCell>
                                                        <TableCell padding='checkbox'>
                                                            <IconButton className='float-right' sx={{ p: 0 }} size='small'>
                                                                <MoreVertTwoToneIcon />
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                )
                                            })
                                        }
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        ) : (
                            <Box>
                                <Typography variant='body1'>No Orders</Typography>
                            </Box>
                        )
                    }
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Note</DialogSubtitle>
                    <Box>
                        <TextField
                            label="Note"
                            size='small'
                            multiline
                            style={{ fontSize: '16px', lineHeight: '24px' }}
                            InputLabelProps={{ shrink: true }}
                            fullWidth
                            defaultValue={editing.note || ''}
                            onChange={(e) => {
                                setEditingCustomer({
                                    ...editing,
                                    note: e.target.value
                                })
                            }}
                        />
                    </Box>
                </Box>
            </Box>
            <DialogActions sx={{ py: 2 }}>
                {
                    !isNew &&
                    <Button color='primary' size='small' variant='outlined' style={{ width: 200, height: 40 }} onClick={() => {
                        onAction('Delete', customer);
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

export default EditCustomerDialog;
