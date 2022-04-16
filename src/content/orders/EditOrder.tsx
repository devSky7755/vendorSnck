import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Order } from 'src/models/order';
import { Box, Button, Table, DialogActions, Grid, IconButton, TableContainer, TableRow, TableCell, TableBody } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import HistoryIcon from '@mui/icons-material/History';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import ErrorIcon from '@mui/icons-material/Error';

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

    const handleAction = (action) => {
        switch (action) {
            case 'Print':
                handleClose();
                break;
            case 'Ready':
                setEditingOrder({
                    ...editing,
                    status: 'Ready'
                });
                break;
            case 'Dispatch':
                handleClose();
                break;
            default:
                break;
        }
    }

    const unavailable = editing.items.filter(x => x.currentAvailable === 0);
    const unavailable_items = unavailable.map(x => x.name).join(',');
    const duetime = order.duetime - Date.now();

    const buttonDisabled = editing.status === 'Preparing' && unavailable.length > 0;
    let actionName = 'Print';
    if (editing.status === 'Preparing') actionName = 'Ready';
    else if (editing.status === 'Ready' && editing.order_type === 'Delivery') actionName = 'Dispatch';
    else if (editing.status === 'Delivering' && editing.order_type === 'Delivery') actionName = 'Delivered';
    else if (editing.status === 'Ready' && editing.order_type === 'Pickup') actionName = 'Picked up';
    else if (editing.status === 'Waitlist' && editing.order_type === 'Pickup') actionName = 'Picked up';



    return (
        <Dialog onClose={() => {
            onClose(null);
        }} open={open} PaperProps={{ style: { width: 480 } }}>
            <DialogTitle className='border-bottom d-flex font-bold' sx={{ px: 2, py: 1 }}>
                <Typography variant='h6' component={'span'}>Order #{order.id}</Typography>
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
                            <Typography variant='body1'>{order.order_type}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className='color-60-grey' variant='subtitle2'>Status</Typography>
                            <Typography variant='body1'>{order.status}</Typography>
                        </Grid>
                        <Grid item>
                            <Typography className='color-60-grey' variant='subtitle2'>Items</Typography>
                            <Typography variant='body1'>{order.item_count}</Typography>
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
                            <Typography variant='subtitle1'>{order.customer.name}</Typography>
                            {
                                order.customer.seat &&
                                <Typography variant='body1'>{order.customer.seat}</Typography>
                            }
                        </Grid>
                    </Grid>
                </Box>
                {
                    editing.order_type === 'Delivery' &&
                    <Box sx={{ px: 2, pb: 1, pt: 2 }} className='border-bottom'>
                        <Grid container justifyContent='space-between'>
                            <Grid item>
                                <Typography className='color-60-grey' variant='subtitle1'>Delivery Person</Typography>
                            </Grid>
                            <Grid item className='ml-auto' sx={{ mt: -0.5 }}>
                                <Button size='small'>{editing.delivery_person ? 'Re-Assign' : 'Assign'}</Button>
                            </Grid>
                            {
                                editing.delivery_person &&
                                <Grid item xs={12}>
                                    <Typography variant='subtitle1'>
                                        {editing.delivery_person.name} {editing.delivery_person.surname}
                                    </Typography>
                                    <Typography variant='body1'>
                                        #{editing.delivery_person.id}
                                    </Typography>
                                </Grid>
                            }

                        </Grid>
                    </Box>
                }
                <Box sx={{ px: 2, py: 1 }}>
                    <Box sx={{ pb: 1 }} className='border-bottom'>
                        <Typography sx={{ pb: 1 }} className='color-60-grey' variant='subtitle1'>Order</Typography>
                        <Typography variant='body1'>12:00 PM @ Snackr Hot Dog Stand</Typography>
                    </Box>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {order.items.map((menu, index) => {
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
                        <Button color='primary' fullWidth onClick={handleClose}>
                            Issue with Order
                        </Button>
                    </Grid>
                </Grid>

            </DialogActions>
        </Dialog >
    );
}

export default EditOrderDialog;
