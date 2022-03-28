import { FC, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Typography,
    Box
} from '@mui/material';

import { Order } from 'src/models/order';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { MenuItem } from 'src/models/menu_item';
import CloseIcon from '@mui/icons-material/Close';

interface OrdersDetailProps {
    type: string;
    className?: string;
    orders: Order[];
    selected: number[];
    onHide: Function;
}


const OrdersDetail: FC<OrdersDetailProps> = ({ type, orders, selected, onHide }) => {
    const [selectedOrders, setSelectedOrders] = useState<number[]>(selected);
    const [itemlist, setItemList] = useState<MenuItem[]>([]);

    useEffect(() => {
        if (!selected) {
            setSelectedOrders([]);
        } else {
            setSelectedOrders(selected);
        }
    }, [selected])

    useEffect(() => {
        let new_list: MenuItem[] = [];
        orders.forEach(order => {
            if (selectedOrders.includes(order.id) === false) return;
            order.items.forEach(item => {
                let exist = new_list.find(x => x.name === item.name);
                if (exist) {
                    exist.currentAvailable++;
                } else {
                    new_list.push({
                        ...item,
                        currentAvailable: 1
                    })
                }
            });
        });

        new_list.sort((x, y) => {
            return y.currentAvailable - x.currentAvailable;
        })

        setItemList(new_list);
    }, [selectedOrders])

    return (
        <Box>
            <Box sx={{ pb: 2 }}>
                <Typography variant='subtitle1' component='span'>Items in orders</Typography>
                <IconButton size='small' className='float-right' onClick={() => {
                    onHide();
                }}>
                    <CloseIcon fontSize='small' />
                </IconButton>
            </Box>
            <TableContainer>
                <Table>
                    <TableBody>
                        {itemlist.map((menu, index) => {
                            return (
                                <TableRow
                                    key={index}
                                >
                                    <TableCell>
                                        <Typography
                                            variant="body2"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {menu.name}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography
                                            variant="body2"
                                            color="text.primary"
                                            gutterBottom
                                            noWrap
                                        >
                                            {menu.currentAvailable}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
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
        </Box >
    );
};

OrdersDetail.propTypes = {
    orders: PropTypes.array.isRequired
};

OrdersDetail.defaultProps = {
    orders: []
};

export default OrdersDetail;
