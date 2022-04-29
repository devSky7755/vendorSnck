import { FC, useEffect, useState } from 'react';
import {
    IconButton,
    Typography,
    Box,
    Checkbox,
    Button
} from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';
import { OrderFilter } from './order_filter';
import { OrderStatus, OrderType } from 'src/models/order';

interface SidebarFilterProps {
    type: string;
    filter: OrderFilter
    onChangeFilter: Function;
    onHide: Function;
}

const OrderStatuses: OrderStatus[] = ['New', 'Preparing', 'Ready', 'Delivering', 'Waitlist', 'Completed', 'Cancelled'];
const OrderTypes: OrderType[] = ['Delivery', 'Pickup'];

const SidebarFilter: FC<SidebarFilterProps> = ({ type, onHide, filter, onChangeFilter }) => {
    const [editing, setEditing] = useState(filter);

    useEffect(() => {
        setEditing(filter);
    }, [filter])

    useEffect(() => {
        onChangeFilter(editing);
    }, [editing])

    const handleOrderType = (type, checked) => {
        let new_types = [...editing.type];
        if (checked) {
            new_types.push(type);
        } else {
            new_types = new_types.filter(x => x !== type);
        }
        setEditing({
            ...editing,
            type: new_types
        })
    }

    const handleOrderStatus = (status, checked) => {
        let new_status = [...editing.status];
        if (checked) {
            new_status.push(status);
        } else {
            new_status = new_status.filter(x => x !== status);
        }
        setEditing({
            ...editing,
            status: new_status
        })
    }

    const handleShowAll = () => {
        setEditing({
            ...editing,
            type: [...OrderTypes],
            status: [...OrderStatuses]
        })
    }
    return (
        <Box>
            <Box sx={{ pb: 2 }}>
                <Typography variant='subtitle1' component='span'>Filter</Typography>
                <IconButton size='small' className='float-right' onClick={() => {
                    onHide();
                }}>
                    <CloseIcon fontSize='small' />
                </IconButton>
            </Box>
            <Box sx={{ py: 1 }} className='border-bottom'>
                <Typography variant='subtitle2' className='color-60-grey'>Order Type</Typography>
                {
                    OrderTypes.map((type) => {
                        return (
                            <Box key={type}>
                                <Checkbox size='small' checked={editing.type && editing.type.includes(type)}
                                    onChange={e => {
                                        handleOrderType(type, e.target.checked);
                                    }}
                                />
                                {type}
                            </Box>
                        )
                    })
                }
            </Box>
            <Box sx={{ py: 1 }} className='border-bottom'>
                <Typography variant='subtitle2' className='color-60-grey'>Status</Typography>
                {
                    OrderStatuses.map((status) => {
                        return (
                            <Box key={status}>
                                <Checkbox size='small' checked={editing.status && editing.status.includes(status)}
                                    onChange={e => {
                                        handleOrderStatus(status, e.target.checked);
                                    }}
                                />
                                {status}
                            </Box>
                        )
                    })
                }
            </Box>
            <Box sx={{ py: 1 }}>
                <Button size='small' color='primary' onClick={handleShowAll}>Show All</Button>
            </Box>
        </Box >
    );
};

export default SidebarFilter;
