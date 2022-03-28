import { FC, ChangeEvent, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Tooltip,
  Divider,
  Box,
  FormControl,
  InputLabel,
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Select,
  MenuItem,
  Typography,
  useTheme,
  CardHeader
} from '@mui/material';

import Label from 'src/components/Label';
import EditTwoToneIcon from '@mui/icons-material/EditTwoTone';
import DeleteTwoToneIcon from '@mui/icons-material/DeleteTwoTone';
import BulkActions from './BulkActions';
import { MenuItem as MenuItemModel, MenuItemStatus } from 'src/models/menu_item';

interface MenusTableProps {
  className?: string;
  menus: MenuItemModel[];
  onEditingMenu: Function
}

interface Filters {
  status?: MenuItemStatus;
}

const getStatusLabel = (menuStatus: MenuItemStatus): JSX.Element => {
  const color = menuStatus === 'Available' ? 'success' : 'warning';
  return <Label color={color}>{menuStatus}</Label>;
};

const applyFilters = (
  menus: MenuItemModel[],
  filters: Filters
): MenuItemModel[] => {
  return menus.filter((menu) => {
    let matches = true;

    if (filters.status && menu.status !== filters.status) {
      matches = false;
    }

    return matches;
  });
};


const MenusTable: FC<MenusTableProps> = ({ menus, onEditingMenu }) => {

  const [selectedMenus, setSelectedMenus] = useState<number[]>(
    []
  );
  const selectedBulkActions = selectedMenus.length > 0;
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [filters, setFilters] = useState<Filters>({
    status: null
  });

  const statusOptions = [
    {
      id: 'all',
      name: 'All'
    },
    {
      id: 'Available',
      name: 'Available'
    },
    {
      id: 'Not Available',
      name: 'Not Available'
    }
  ];

  const handleStatusChange = (e: ChangeEvent<HTMLInputElement>): void => {
    let value = null;

    if (e.target.value !== 'all') {
      value = e.target.value;
    }

    setFilters((prevFilters) => ({
      ...prevFilters,
      status: value
    }));
  };

  const handleSelectAllMenus = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedMenus(
      event.target.checked
        ? menus.map((menu) => menu.id)
        : []
    );
  };

  const handleSelectOneMenu = (
    event: ChangeEvent<HTMLInputElement>,
    menuId: number
  ): void => {
    if (!selectedMenus.includes(menuId)) {
      setSelectedMenus((prevSelected) => [
        ...prevSelected,
        menuId
      ]);
    } else {
      setSelectedMenus((prevSelected) =>
        prevSelected.filter((id) => id !== menuId)
      );
    }
  };

  const filteredMenus = applyFilters(menus, filters);

  const selectedSomeMenus =
    selectedMenus.length > 0 &&
    selectedMenus.length < menus.length;
  const selectedAllMenus =
    selectedMenus.length === menus.length;
  const theme = useTheme();

  return (
    <Card>
      {(
        <CardHeader
          action={
            <Box width={150}>
              <FormControl fullWidth variant="outlined">
                <InputLabel>Status</InputLabel>
                <Select
                  value={filters.status || 'all'}
                  onChange={handleStatusChange}
                  size='small'
                  label="Status"
                  autoWidth
                >
                  {statusOptions.map((statusOption) => (
                    <MenuItem key={statusOption.id} value={statusOption.id}>
                      {statusOption.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          }
        />
      )}
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  color="primary"
                  size='small'
                  checked={selectedAllMenus}
                  indeterminate={selectedSomeMenus}
                  onChange={handleSelectAllMenus}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMenus.map((menu) => {
              const isMenuSelected = selectedMenus.includes(
                menu.id
              );
              return (
                <TableRow
                  hover
                  key={menu.id}
                  selected={isMenuSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox
                      size='small'
                      color="primary"
                      checked={isMenuSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOneMenu(event, menu.id)
                      }
                      value={isMenuSelected}
                    />
                  </TableCell>
                  <TableCell>
                    {menu.name}
                  </TableCell>
                  <TableCell>
                    {getStatusLabel(menu.status)}
                  </TableCell>
                  <TableCell>
                    ${menu.price.toFixed(2)}
                  </TableCell>
                  <TableCell align="right">

                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Edit Menu Item" arrow>
                      <IconButton
                        sx={{
                          '&:hover': {
                            background: theme.colors.primary.lighter
                          },
                          color: theme.palette.primary.main
                        }}
                        onClick={() => {
                          onEditingMenu(menu);
                        }}
                        color="inherit"
                        size="small"
                      >
                        <EditTwoToneIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Menu Item" arrow>
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

MenusTable.propTypes = {
  menus: PropTypes.array.isRequired
};

MenusTable.defaultProps = {
  menus: []
};

export default MenusTable;
