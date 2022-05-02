import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Card,
  IconButton,
  Table,
  Menu,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Checkbox,
  Switch,
  styled
} from '@mui/material';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { Customer } from 'src/models/customer';

interface CustomersTableProps {
  className?: string;
  customers: Customer[];
  onAction: Function;
  onSelectionChanged: Function;
  onCustomerPatch: Function;
}

const URLTableCell = styled(TableCell)(
  ({ theme }) => `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
);

const CustomersTable: FC<CustomersTableProps> = ({
  customers,
  onAction,
  onSelectionChanged,
  onCustomerPatch
}) => {
  const [actionID, setActionID] = useState<string>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  useEffect(() => {
    setSelectedCustomers([]);
  }, [customers]);

  useEffect(() => {
    onSelectionChanged(selectedCustomers);
  }, [selectedCustomers]);

  const handleClickAction = (
    event: React.MouseEvent<HTMLButtonElement>,
    customerId: string
  ) => {
    setActionID(customerId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, customer: Customer) => {
    setAnchorEl(null);
    onAction(action, customer);
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    if (!selectedCustomers.includes(id)) {
      setSelectedCustomers((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedCustomers((prevSelected) =>
        prevSelected.filter((x) => x !== id)
      );
    }
  };

  const handleCustomerPatch = (customer, key, value) => {
    onCustomerPatch(customer, key, value);
  };

  return (
    <Card>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ height: 52 }}></TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Mobile No.</TableCell>
              <TableCell>Temp. Blocked</TableCell>
              <TableCell>Perm. Blocked</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {customers.map((customer, index) => {
              const isSelected = selectedCustomers.includes(customer.id);
              return (
                <TableRow hover key={customer.id}>
                  <TableCell padding="checkbox" style={{ height: 52 }}>
                    <Checkbox
                      size="small"
                      color="primary"
                      checked={isSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOne(event, customer.id)
                      }
                    />
                  </TableCell>
                  <TableCell>{customer.firstName}</TableCell>
                  <TableCell>{customer.lastName}</TableCell>
                  <TableCell>{customer.mobileNo}</TableCell>
                  <TableCell>
                    <Switch
                      checked={customer.tempBlocked || false}
                      onChange={(e) => {
                        handleCustomerPatch(
                          customer,
                          'tempBlocked',
                          e.target.checked
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Switch
                      checked={customer.permBlocked || false}
                      onChange={(e) => {
                        handleCustomerPatch(
                          customer,
                          'permBlocked',
                          e.target.checked
                        );
                      }}
                    />
                  </TableCell>
                  <TableCell align="right" padding="checkbox">
                    <IconButton
                      size="small"
                      onClick={(event) => {
                        handleClickAction(event, customer.id);
                      }}
                    >
                      <MoreVertTwoToneIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={anchorEl !== null && actionID === customer.id}
                      onClose={() => {
                        handleCloseAction('None', customer);
                      }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button'
                      }}
                    >
                      <MenuItem
                        onClick={() => handleCloseAction('Edit', customer)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleCloseAction('Delete', customer)}
                      >
                        Delete
                      </MenuItem>
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

export default CustomersTable;
