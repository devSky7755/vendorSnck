import { FC, ChangeEvent, useState, useEffect, Fragment } from 'react';
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
  CardHeader,
  Menu
} from '@mui/material';

import Label from 'src/components/Label';
import { MenuItemV1 as MenuItemModel, MenuItemStatus } from 'src/models/menu_item';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';

interface MenusTableProps {
  className?: string;
  menus: MenuItemModel[];
  onEditingMenu: Function;
  search?: string;
}

interface Filters {
  status?: MenuItemStatus;
  search?: string;
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

    if (matches && filters.search && filters.search.length > 0) {
      if ((menu.name && menu.name.includes(filters.search)) || (menu.category && menu.category.includes(filters.search)) ||
        (menu.tags && menu.tags.join(' ').includes(filters.search))) {
        matches = true;
      } else {
        matches = false;
      }
    }

    return matches;
  });
};

interface GroupedMenu {
  category: string;
  menus: MenuItemModel[];
}

const MenusTable: FC<MenusTableProps> = ({ menus, onEditingMenu, search }) => {
  const [selectedMenus, setSelectedMenus] = useState<number[]>([]);
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [filters, setFilters] = useState<Filters>({
    status: null,
    search: search
  });
  const [actionID, setActionID] = useState<number>(-1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [collapsed, setCollapsed] = useState<string[]>([]);

  useEffect(() => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      search: search
    }));
  }, [search])

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
    event: ChangeEvent<HTMLInputElement>,
    menus: MenuItemModel[]
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

  const handleSelectOneGroup = (
    event: ChangeEvent<HTMLInputElement>,
    filtered: MenuItemModel[]
  ): void => {
    if (event.target.checked) {
      const menu_ids = filtered.map(x => x.id);
      setSelectedMenus((prevSelected) => [
        ...prevSelected,
        ...menu_ids
      ]);
    } else {
      setSelectedMenus((prevSelected) =>
        prevSelected.filter((id) => (filtered.findIndex(o => o.id === id) === -1))
      );
    }
  };

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>, menuid: number) => {
    setActionID(menuid);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, menu: MenuItemModel) => {
    setAnchorEl(null);
    if (action === 'Edit') {
      onEditingMenu(menu);
    }
  };

  const groupMenus = (menus: MenuItemModel[]) => {
    let grouped: GroupedMenu[] = [];

    menus.forEach(element => {
      let exist = grouped.find(x => x.category === element.category);
      if (exist) {
        exist.menus.push(element);
      } else {
        grouped.push({
          category: element.category,
          menus: [element]
        })
      }
    });

    return grouped;
  }

  const filteredMenus = applyFilters(menus, filters);
  const groupedMenus: GroupedMenu[] = groupMenus(filteredMenus);

  const selectedSomeMenus =
    selectedMenus.length > 0 &&
    selectedMenus.length < menus.length;
  const selectedAllMenus =
    selectedMenus.length === menus.length;

  return (
    <Card>
      {showFilter && (
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
                  onChange={(e) => {
                    handleSelectAllMenus(e, filteredMenus);
                  }}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Price</TableCell>
              <TableCell align="right">
                <Tooltip title={showFilter ? 'Hide Filter' : 'Show Filter'} arrow>
                  <IconButton size='small' onClick={() => {
                    setShowFilter(x => !x);
                  }}>
                    <FilterListIcon fontSize='small' />
                  </IconButton>
                </Tooltip>
              </TableCell>
              <TableCell align="right" padding="checkbox">
                <IconButton size='small' onClick={() => {
                }}>
                  <MoreVertTwoToneIcon fontSize='small' />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedMenus.map((group) => {
              let group_selected = 0;
              group.menus.forEach(x => {
                if (selectedMenus.includes(x.id)) group_selected++;
              });
              const isGroupSelected = group_selected === group.menus.length;
              const isPartSelected = group_selected > 0 && group_selected < group.menus.length;

              const isExpanded = collapsed.includes(group.category) === false;

              return (
                <Fragment key={group.category}>
                  <TableRow
                    className='group-header-row'
                  >
                    <TableCell padding="checkbox" style={{ height: 52 }}>
                      <Checkbox
                        size='small'
                        color="primary"
                        checked={isGroupSelected}
                        indeterminate={isPartSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleSelectOneGroup(event, group.menus)
                        }
                      />
                    </TableCell>
                    <TableCell colSpan={3}>
                      <Typography
                        variant="subtitle2"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {group.category}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" component='span'>{group.menus.length} </Typography>
                      <Typography variant="subtitle2" component='span' color='GrayText'>items</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size='small' onClick={() => {
                        if (isExpanded) {
                          setCollapsed([...collapsed, group.category]);
                        } else {
                          setCollapsed(collapsed.filter(x => x !== group.category));
                        }
                      }}>
                        {
                          isExpanded ? <ExpandLessIcon fontSize='small' /> : <ExpandMoreIcon fontSize='small' />
                        }
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {
                    isExpanded && group.menus.map(menu => {
                      const isMenuSelected = selectedMenus.includes(menu.id);
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
                          <TableCell align="right" padding="checkbox">
                            <IconButton size='small' onClick={(event) => {
                              handleClickAction(event, menu.id);
                            }}>
                              <MoreVertTwoToneIcon fontSize='small' />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={anchorEl !== null && actionID === menu.id}
                              onClose={() => {
                                handleCloseAction('None', menu);
                              }}
                              MenuListProps={{
                                'aria-labelledby': 'basic-button',
                              }}
                            >
                              <MenuItem onClick={() => handleCloseAction('Edit', menu)}>Edit</MenuItem>
                              <MenuItem onClick={() => handleCloseAction('Delete', menu)}>Delete</MenuItem>
                            </Menu>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card >
  );
};

MenusTable.propTypes = {
  menus: PropTypes.array.isRequired
};

MenusTable.defaultProps = {
  menus: []
};

export default MenusTable;
