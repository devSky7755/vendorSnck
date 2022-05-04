import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { GetOrderDistributionLabel, GetOrderIDLabel, GetOrderInVenueLocation, GetOrderItemCount, GetOrderStatusLabel, Order } from 'src/models/order';
import { Box, Button, Table, DialogActions, Grid, IconButton, TableContainer, TableRow, TableCell, TableBody, TextField, MenuItem } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import ErrorIcon from '@mui/icons-material/Error';
import { Staff } from 'src/models/staff';

interface EditOrderInterface {
    onClose: Function,
    open: boolean,
    staffs: Staff[];
    order?: Order,
};

const EditOrderDialog: React.FC<EditOrderInterface> = (props) => {
    const { onClose, order, open, staffs } = props;
    const [editing, setEditingOrder] = useState(order)

    const handleClose = () => {
        onClose(editing);
    };

    const handleAction = (action) => {
        switch (action) {
            case 'Print':
                handleClose();
                break;
            case 'Ready':
                setEditingOrder({
                    ...editing,
                    status: 'ready'
                });
                break;
            case 'Dispatch':
                setEditingOrder({
                    ...editing,
                    status: 'delivering'
                });
                break;
            case 'Delivered':
                setEditingOrder({
                    ...editing,
                    status: 'completed'
                });
                break;
            case 'Picked up':
                setEditingOrder({
                    ...editing,
                    status: 'waitlist'
                });
                break;
            default:
                break;
        }
    }

    const unavailable = editing.cartItems.filter(x => x.currentAvailable === 0);
    const unavailable_items = unavailable.map(x => x.name).join(',');
    const duetime = editing.dueTimestamp - Date.now();

    const buttonDisabled = editing.status === 'preparing' && unavailable.length > 0;
    let actionName = 'Print';
    if (editing.status === 'preparing') actionName = 'Ready';
    else if (editing.status === 'ready' && editing.distributionMethod === 'delivery') actionName = 'Dispatch';
    else if (editing.status === 'delivering' && editing.distributionMethod === 'delivery') actionName = 'Delivered';
    else if (editing.status === 'ready' && editing.distributionMethod === 'pickup') actionName = 'Picked up';
    else if (editing.status === 'waitlist' && editing.distributionMethod === 'pickup') actionName = 'Delivered';

    return (
        <Dialog onClose={() => {
            //onClose(null);
        }} open={open} PaperProps={{ style: { width: 480 } }}>
            <DialogTitle className='border-bottom d-flex font-bold' sx={{ px: 2, py: 1 }}>
                <Typography variant='h6' component={'span'}>Order #{GetOrderIDLabel(order.id)}</Typography>
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onClose(null);
                }}>
                    <CloseIcon />
                </IconButton>
                <IconButton className='float-right' sx={{ p: 0, mx: 2 }} size='small' onClick={() => {
                }}>
                    <PrintOutlinedIcon />
                </IconButton>
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                }}>
                    <HistoryIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                {
                    unavailable.length > 0 ? (
                        <Box sx={{ p: 1, px: 3 }} className='bg-error-row d-inline-flex w-100'>
                            <ErrorIcon fontSize='small'></ErrorIcon>&nbsp;
                            <Typography variant='subtitle2' component='span'>
                                {unavailable.length} item(s) is unavailable: {unavailable_items}
                            </Typography>
                        </Box>
                    ) : (
                        duetime < 0 ? (
                            <Box sx={{ p: 1, px: 3 }} className='bg-warning d-inline-flex w-100'>
                                <ErrorIcon fontSize='small' color='warning'></ErrorIcon>&nbsp;
                                <Typography variant='subtitle2' component='span'>
                                    Order late to prepare (due time {Math.floor(duetime / 60000)} min)
                                </Typography>
                            </Box>
                        ) : (
                            <></>
                        )
                    )
                }
                <Box sx={{ p: 1, px: 3 }} style={{ background: '#0000000A' }}>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Typography className='color-60-grey' variant='subtitle2'>Order</Typography>
                            <Typography variant='body1'>{GetOrderDistributionLabel(editing.distributionMethod)}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className='color-60-grey' variant='subtitle2'>Status</Typography>
                            <Typography variant='body1'>{GetOrderStatusLabel(editing.status)}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className='color-60-grey' variant='subtitle2'>Items</Typography>
                            <Typography variant='body1'>{GetOrderItemCount(editing)}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className='color-60-grey' variant='subtitle2'>Due Time</Typography>
                            <Typography variant='body1'>{Math.floor(duetime / 60000)} min</Typography>
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ p: 2 }} className='border-bottom'>
                    <Grid container justifyContent='space-between'>
                        <Grid item>
                            <Typography className='color-60-grey' variant='subtitle1'>Customer</Typography>
                        </Grid>
                        <Grid item className='ml-auto' sx={{ mt: -0.5 }}>
                            <Button size='small'>Contact</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant='subtitle1'>{order.customer.firstName} {order.customer.lastName}</Typography>
                            {
                                order.inVenueLocation &&
                                <Typography variant='body1'>{GetOrderInVenueLocation(order)}</Typography>
                            }
                        </Grid>
                    </Grid>
                </Box>
                {
                    <Box sx={{ px: 2, pb: 1, pt: 2 }} className='border-bottom'>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography className='color-60-grey' variant='subtitle1'>Delivery Person</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    select
                                    size='small'
                                    fullWidth
                                    variant='standard'
                                    value={editing.runnerStaffId}
                                    onChange={(e) => {
                                        setEditingOrder({
                                            ...editing,
                                            runnerStaffId: e.target.value
                                        });
                                    }}
                                >
                                    {staffs.map((staff) => {
                                        if (staff.vendorStand.id === editing.vendorStand.id && staff.role === 'runner') {
                                            return (
                                                <MenuItem key={staff.id} value={staff.id}>
                                                    {staff.firstName} {staff.lastName}
                                                </MenuItem>
                                            )
                                        }
                                    })}
                                </TextField>
                            </Grid>
                        </Grid>
                    </Box>
                }
                <Box sx={{ px: 2, py: 1 }}>
                    <Box sx={{ pb: 1 }} className='border-bottom'>
                        <Typography sx={{ pb: 1 }} className='color-60-grey' variant='subtitle1'>Order</Typography>
                        <Typography variant='body1'>{new Date(editing.createdAt).toLocaleString()} @ {editing.vendorStand.name}</Typography>
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {order.cartItems.map((menu, index) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            className={menu.currentAvailable === 0 ? 'unavailble-item' : ''}
                                        >
                                            <TableCell align='right' padding='checkbox'>
                                                <Typography
                                                    variant="subtitle1"
                                                    noWrap
                                                >
                                                    {menu.count} x
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography
                                                    variant="body1"
                                                    component='span'
                                                    noWrap
                                                >
                                                    {menu.name}
                                                </Typography>
                                                {
                                                    menu.isAlcohol &&
                                                    <Typography variant='caption' className='float-right border-warning alcohol-label' color='#FF864E' sx={{ px: 1 }} gutterBottom
                                                        noWrap>
                                                        ALCOHOL
                                                    </Typography>
                                                }
                                                {
                                                    menu.addons && menu.addons.length > 0 &&
                                                    <Typography
                                                        variant="body2"
                                                        component='div'
                                                        noWrap
                                                    >
                                                        Extras: {menu.addons.join(',')}
                                                    </Typography>
                                                }
                                                {
                                                    menu.currentAvailable === 0 &&
                                                    <Typography
                                                        variant="body2"
                                                        component='div'
                                                        noWrap
                                                    >
                                                        This item is marked as unavailable
                                                    </Typography>
                                                }
                                            </TableCell>
                                            <TableCell align="right" padding='checkbox'>
                                                <IconButton size='small' onClick={() => {
                                                }}>
                                                    <MoreVertTwoToneIcon fontSize='small' style={{ color: '#00000099' }} />
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </Box>
            <DialogActions sx={{ py: 2 }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Button color='primary' variant='contained' disabled={buttonDisabled} fullWidth onClick={() => {
                            handleAction(actionName);
                        }}>
                            {
                                actionName
                            }
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button color='primary' fullWidth onClick={() => handleAction('Issue')}>
                            Issue with Order
                        </Button>
                    </Grid>
                </Grid>

            </DialogActions>
        </Dialog >
    );
}

export default EditOrderDialog;
