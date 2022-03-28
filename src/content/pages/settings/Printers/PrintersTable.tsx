import { FC, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Card,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  useTheme,
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import { Printer, PrinterStatus } from 'src/models/printer';

interface PrintersTableProps {
  className?: string;
  printers: Printer[];
  onEditingPrinter: Function
}

const getStatusLabel = (printerStatus: PrinterStatus): JSX.Element => {
  const color = printerStatus === 'Connected' ? 'success' : 'warning';
  return <Label color={color}>{printerStatus}</Label>;
};

const PrintersTable: FC<PrintersTableProps> = ({ printers, onEditingPrinter }) => {
  const theme = useTheme();

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ px: 2 }}>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Printer Model</TableCell>
              <TableCell align="right" sx={{ px: 3 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {printers.map((printer) => {
              return (
                <TableRow
                  hover
                  key={printer.id}
                >
                  <TableCell sx={{ px: 2 }}>
                    {printer.name}
                  </TableCell>
                  <TableCell>
                    {getStatusLabel(printer.status)}
                  </TableCell>
                  <TableCell>
                    {printer.model}
                  </TableCell>
                  <TableCell align="right" sx={{ pr: 2 }}>
                    <Tooltip title="Edit Printer" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        onClick={() => {
                          onEditingPrinter(printer);
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Printer" arrow > 
                      <IconButton
                        sx={{
                          '&:hover': { background: theme.colors.error.lighter },
                          color: theme.palette.error.main
                        }}
                        color="inherit"
                        size="small"
                      >
                        <DeleteTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

PrintersTable.propTypes = {
  printers: PropTypes.array.isRequired
};

PrintersTable.defaultProps = {
  printers: []
};

export default PrintersTable;
