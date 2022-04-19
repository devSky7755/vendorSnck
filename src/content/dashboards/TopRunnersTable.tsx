import { FC } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableContainer,
    Typography,
} from '@mui/material';

import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CloseIcon from '@mui/icons-material/Close';
import { Staff } from 'src/models/staff';

interface TopRunnersTableProps {
    className?: string;
    runners: Staff[];
}

const TopRunnersTable: FC<TopRunnersTableProps> = ({ runners }) => {
    return (
        <TableContainer>
            <Table >
                <TableBody>
                    {runners.slice(0, 4).map((runner) => {
                        const average_change = Math.abs(runner.average_change);
                        const change_color = runner.average_change < 0 ? '#48AA2F' : '#FF5625';
                        return (
                            <TableRow
                                hover
                                key={runner.id}
                            >
                                <TableCell sx={{ px: 0 }} align='left' height={48}>
                                    <Typography
                                        variant="body1"
                                        fontWeight="400"
                                        color="text.primary"
                                        noWrap
                                    >
                                        {runner.firstName[0]}. {runner.lastName}
                                    </Typography>
                                </TableCell>
                                <TableCell sx={{ p: 1 }}>
                                    {Math.floor(runner.average / 60)}:{(runner.average % 60).toString().padStart(2, '0')} min
                                </TableCell>
                                <TableCell sx={{ p: 1 }}>
                                    <div className='d-inline-flex' style={{ color: change_color }}>
                                        {
                                            runner.average_change > 0 ? (
                                                <ArrowDropUpIcon fontSize='small' style={{ width: '1rem', height: '1rem' }} />
                                            ) : (
                                                <ArrowDropDownIcon fontSize='small' style={{ width: '1rem', height: '1rem' }} />
                                            )
                                        }
                                        {Math.floor(average_change / 60)}:{(average_change % 60).toString().padStart(2, '0')}
                                    </div>
                                </TableCell>
                                <TableCell sx={{ px: 0 }} align='right'>
                                    <Typography
                                        variant="body1"
                                        fontWeight="bold"
                                        color="text.primary"
                                        noWrap
                                    >
                                        {runner.daily_count}
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

export default TopRunnersTable;
