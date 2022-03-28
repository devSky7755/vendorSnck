import { FC } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Typography,
} from '@mui/material';

import { MenuItem as MenuItemModel } from 'src/models/menu_item';

import CloseIcon from '@mui/icons-material/Close';

interface TopItemsTableProps {
    className?: string;
    menus: MenuItemModel[];
}

const TopItemsTable: FC<TopItemsTableProps> = ({ menus }) => {
    return (
        <TableContainer>
            <Table size='small'>
                <TableBody>
                    {menus.map((menu) => {
                        return (
                            <TableRow
                                hover
                                key={menu.id}
                            >
                                <TableCell sx={{ px: 0 }} align='left' height={46}>
                                    <Typography
                                        variant="body1"
                                        fontWeight="400"
                                        color="text.primary"
                                        gutterBottom
                                        noWrap
                                    >
                                        {menu.name}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ p: 1 }}>
                                    <div className='d-inline-flex'>
                                        <CloseIcon fontSize='small' style={{ width: '0.8rem' }} sx={{ mr: 1 }} />
                                        <Typography
                                            variant="caption"
                                            gutterBottom
                                            className='my-auto'
                                            noWrap
                                        >
                                            {menu.currentAvailable}
                                        </Typography>
                                    </div>
                                </TableCell>
                                <TableCell sx={{ px: 0 }} align='right'>
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        color="text.primary"
                                        gutterBottom
                                        noWrap
                                    >
                                        ${(menu.price * menu.currentAvailable).toFixed(0)}
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TopItemsTable;
