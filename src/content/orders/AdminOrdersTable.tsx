import { FC, ChangeEvent, useState, useEffect } from 'react';
import {
    Checkbox, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TableContainer,
    Typography, Menu, MenuItem
} from '@mui/material';
import { GetOrderDistributionLabel, GetOrderIDLabel, GetOrderInVenueLocation, GetOrderItemCount, Order } from 'src/models/order';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ErrorIcon from '@mui/icons-material/Error';
import { Staff } from 'src/models/staff';

interface OrdersTableProps {
    type: string;
    orders: Order[];
    selected: Order[];
    onSelectionChanged: Function;
    onAction: Function;
    staffs: Staff[];
}

const AdminOrdersTable: FC<OrdersTableProps> = ({ type, orders, selected, onSelectionChanged, onAction, staffs }) => {
    const [selectedOrders, setSelectedOrders] = useState<Order[]>([]);
    const [actionID, setActionID] = useState<string>(null);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    useEffect(() => {
        setSelectedOrders([]);
    }, [orders]);

    useEffect(() => {
        if (!selected) {
            setSelectedOrders([]);
        }
    }, [selected]);

    useEffect(() => {
        onSelectionChanged(selectedOrders);
    }, [selectedOrders]);

    const handleSelectAllOrders = (
        event: ChangeEvent<HTMLInputElement>
    ): void => {
        setSelectedOrders(
            event.target.checked ? [...orders] : []
        );
    };

    const handleSelectOneOrder = (
        event: ChangeEvent<HTMLInputElement>,
        order: Order
    ): void => {
        if (!selectedOrders.find(x => x.id === order.id)) {
            setSelectedOrders((prevSelected) => [...prevSelected, order]);
        } else {
            setSelectedOrders((prevSelected) =>
                prevSelected.filter((x) => x.id !== order.id)
            );
        }
    };

    const handleClickAction = (
        event: React.MouseEvent<HTMLButtonElement>,
        id: string
    ) => {
        setActionID(id);
        setAnchorEl(event.currentTarget);
    };

    const handleCloseAction = (action: string, order: Order) => {
        setActionID(null);
        setAnchorEl(null);

        switch (action) {
            case 'View':
                onAction('Edit', order);
                break;
            case 'Print':
                onAction('Print', order);
                break;
            case 'Issue':
                onAction('Issue', order);
                break;
            default:
                break;
        }
    };

    const selectedSomeOrders =
        selectedOrders.length > 0 && selectedOrders.length < orders.length;
    const selectedAllOrders = selectedOrders.length === orders.length;

    const current_time = Date.now();

    const OrderTableRow = (order: Order, index: number) => {
        const duetime = order.dueTimestamp;
        let waiting = current_time - order.created;
        const isOrderSelected = selectedOrders.findIndex(x => x.id === order.id) >= 0;
        const hasAlchol = order.cartItems && order.cartItems.find((x) => x.isAlcohol);
        const prepare_delayed = order.status === 'preparing' && duetime < Date.now();
        const delivery_delayed = order.status === 'ready' && order.distributionMethod === 'delivery' && duetime < Date.now();
        const deliverying_delayed = order.status === 'delivering' && order.distributionMethod === 'delivery' && order.dispatch_time < Date.now() - 10 * 60 * 1000;
        const pickup_delayed = order.status === 'ready' && order.distributionMethod === 'pickup' && duetime < Date.now();
        const no_item = order.cartItems.find(x => x.currentAvailable === 0);
        const runnerStaff = staffs.find(x => x.id === order.runnerStaffId);

        if (type === 'delivery' && order.status === 'ready') {
            waiting = duetime - current_time;
        } else if (type === 'delivery' && order.status === 'delivering') {
            waiting = 10 * 60 * 1000 - current_time + order.dispatch_time;
        } else if (type === 'pickup') {
            waiting = duetime - current_time;
        }

        return (
            <TableRow
                key={index}
                className={
                    prepare_delayed || delivery_delayed || deliverying_delayed || pickup_delayed ? 'bg-warning' : no_item ? 'bg-error' : ''
                }
                hover
            >
                <TableCell padding="checkbox" style={{ height: 52 }}>
                    <Checkbox
                        size="small"
                        color="primary"
                        checked={isOrderSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                            handleSelectOneOrder(event, order)
                        }
                    />
                </TableCell>
                <TableCell>{GetOrderIDLabel(order.id)}</TableCell>
                <TableCell>
                    <Typography variant="body2" color="text.primary" gutterBottom sx={{ mb: 0, pt: 0.5 }} noWrap>
                        {order.customer.firstName} {order.customer.lastName}
                    </Typography>
                    {order.inVenueLocation && (
                        <Typography variant="body2" color={'#00000099'} gutterBottom fontSize={10} noWrap sx={{ mb: 0 }}>
                            {GetOrderInVenueLocation(order)}
                        </Typography>
                    )}
                </TableCell>
                <TableCell>
                    <div className="d-inline-flex">
                        <Typography variant="body2" component="span">
                            {GetOrderDistributionLabel(order.distributionMethod)}
                        </Typography>
                        {order.distributionMethod === 'delivery' && (
                            <DirectionsRunIcon sx={{ ml: 1 }} color="disabled" fontSize="small" />
                        )}
                    </div>
                </TableCell>
                <TableCell>
                    {order.dueAt ? new Date(order.dueAt).toLocaleString() : ''}
                </TableCell>
                <TableCell>
                    <Typography variant="body2" component="span">
                        {runnerStaff && (runnerStaff.firstName + ' ' + runnerStaff.lastName)}
                    </Typography>
                </TableCell>
                <TableCell>
                    ${order.totalPrice.toFixed(2)} ({GetOrderItemCount(order)} items)
                    {hasAlchol && (
                        <Typography variant="caption" className="border-warning alchol-label" color="#FF864E"
                            sx={{ ml: 2, px: 1 }} gutterBottom noWrap>
                            ALCHOL
                        </Typography>
                    )}
                    {no_item && (
                        <Typography
                            variant="caption" className="border-error alchol-label" color="#B00020" sx={{ ml: 2, px: 1 }}
                            gutterBottom noWrap>
                            NO ITEM
                        </Typography>
                    )}
                </TableCell>
                <TableCell>
                    {order.vendorStand && order.vendorStand.name}
                </TableCell>
                <TableCell align="right">
                    {!no_item && (prepare_delayed || delivery_delayed || deliverying_delayed || pickup_delayed) && (
                        <ErrorIcon color="warning" fontSize="small" sx={{ mt: 0.5 }} />
                    )}
                    {no_item && (<ErrorIcon color="error" fontSize="small" sx={{ mt: 0.5 }} />)}
                </TableCell>
                <TableCell align="right" padding="checkbox">
                    <IconButton size="small"
                        onClick={(event) => {
                            handleClickAction(event, order.id);
                        }}
                    >
                        <MoreVertTwoToneIcon fontSize="small" />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={anchorEl !== null && actionID === order.id}
                        onClose={() => {
                            handleCloseAction('None', order);
                        }}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button'
                        }}
                    >
                        <MenuItem onClick={() => handleCloseAction('View', order)}>View</MenuItem>
                        <MenuItem onClick={() => handleCloseAction('Print', order)}>Print</MenuItem>
                        <MenuItem onClick={() => handleCloseAction('Issue', order)}>Issue with Order</MenuItem>
                    </Menu>
                </TableCell>
            </TableRow>
        );
    }

    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell padding="checkbox" style={{ height: 52 }}>
                            <Checkbox size="small" color="primary"
                                checked={selectedAllOrders}
                                indeterminate={selectedSomeOrders}
                                onChange={handleSelectAllOrders}
                            />
                        </TableCell>
                        <TableCell>Order No.</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Due time</TableCell>
                        <TableCell>Delivery Person</TableCell>
                        <TableCell>Total Price</TableCell>
                        <TableCell>Vendor</TableCell>
                        <TableCell align="right">
                            <IconButton size="small" sx={{ ml: 2 }} onClick={() => {
                                onAction('Filter');
                            }}>
                                <FilterListIcon />
                            </IconButton>
                        </TableCell>
                        <TableCell align="right">
                            <IconButton size="small">
                                <MoreVertTwoToneIcon />
                            </IconButton>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        orders.map((order, index) => {
                            return OrderTableRow(order, index);
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default AdminOrdersTable;
