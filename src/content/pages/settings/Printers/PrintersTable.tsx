import { FC, useState } from 'react';
import {
  Divider,
  Card,
  IconButton,
  Table, Menu, MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
} from '@mui/material';

import Label from 'src/components/Label';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
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
  const [actionID, setActionID] = useState<number>(-1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>, printerId: number) => {
    setActionID(printerId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, printer: Printer) => {
    setAnchorEl(null);
    if (action === 'Edit') {
      onEditingPrinter(printer);
    }
  };

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
              <TableCell align="right" sx={{ px: 3 }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {printers.map((printer) => {
              return (
                <TableRow
                  hover
                  key={printer.id}
                >
                  <TableCell sx={{ px: 2 }} style={{ height: 52 }}>
                    {printer.name}
                  </TableCell>
                  <TableCell>
                    {getStatusLabel(printer.status)}
                  </TableCell>
                  <TableCell>
                    {printer.model}
                  </TableCell>
                  <TableCell align="right" padding="checkbox">
                    <IconButton size='small' onClick={(event) => {
                      handleClickAction(event, printer.id);
                    }}>
                      <MoreVertTwoToneIcon fontSize='small' />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={anchorEl !== null && actionID === printer.id}
                      onClose={() => {
                        handleCloseAction('None', printer);
                      }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleCloseAction('Edit', printer)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleCloseAction('Delete', printer)}>Delete</MenuItem>
                    </Menu>
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

export default PrintersTable;
