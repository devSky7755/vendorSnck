import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Card,
  IconButton,
  Table, Menu, MenuItem,
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
import { MenuItem as MenuItemModel } from 'src/models/menu_item';

interface MenuItemsTableProps {
  className?: string;
  menuItems: MenuItemModel[];
  onAction: Function;
  onSelectionChanged: Function;
  onMenuItemPatch: Function;
}

const URLTableCell = styled(TableCell)(
  ({ theme }) => `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
);

const MenuItemsTable: FC<MenuItemsTableProps> = ({ menuItems, onAction, onSelectionChanged, onMenuItemPatch }) => {
  const [actionID, setActionID] = useState<string>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedMenuItems, setSelectedMenuItems] = useState<string[]>(
    []
  );

  useEffect(() => {
    onSelectionChanged(selectedMenuItems);
  }, [selectedMenuItems])

  const handleClickAction = (event: React.MouseEvent<HTMLButtonElement>, menuItemId: string) => {
    setActionID(menuItemId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, menuItem: MenuItemModel) => {
    setAnchorEl(null);
    if (action === 'Edit') {
      onAction('Edit', menuItem);
    } else if (action === 'Delete') {
      onAction('Delete', menuItem);
    }
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    if (!selectedMenuItems.includes(id)) {
      setSelectedMenuItems((prevSelected) => [
        ...prevSelected,
        id
      ]);
    } else {
      setSelectedMenuItems((prevSelected) =>
        prevSelected.filter((x) => x !== id)
      );
    }
  };

  const handleMenuItemPatch = (menuItem, key, value) => {
    onMenuItemPatch(menuItem, key, value);
  }

  return (
    <Card>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ height: 52 }}>
              </TableCell>
              <TableCell>ID</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image URL</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Category</TableCell>
              {
                /*
                <TableCell>Tags</TableCell>
                */
              }
              <TableCell>Active</TableCell>
              <TableCell>Alcohol</TableCell>
              <TableCell>Featured</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {menuItems.map((menuItem, index) => {
              const isSelected = selectedMenuItems.includes(menuItem.id);
              const imageName = menuItem.imageUrl?.replace(/^.*[\\\/]/, '');

              return (
                <TableRow
                  hover
                  key={menuItem.id}
                >
                  <TableCell padding="checkbox" style={{ height: 52 }}>
                    <Checkbox
                      size='small'
                      color="primary"
                      checked={isSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOne(event, menuItem.id)
                      }
                    />
                  </TableCell>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    {menuItem.name}
                  </TableCell>
                  <URLTableCell style={{ maxWidth: 250 }}>
                    {menuItem.description}
                  </URLTableCell>
                  <URLTableCell style={{ maxWidth: 250 }}>
                    {imageName}
                  </URLTableCell>
                  <TableCell>
                    {menuItem.price}
                  </TableCell>
                  <TableCell>
                    { }
                  </TableCell>
                  {
                    /*
                    <TableCell>
                      {menuItem.tags && menuItem.tags.join(',')}
                    </TableCell>
                    */
                  }
                  <TableCell>
                    <Switch checked={menuItem.available} onChange={e => {
                      handleMenuItemPatch(menuItem, 'available', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={menuItem.containsAlcohol} onChange={e => {
                      handleMenuItemPatch(menuItem, 'containsAlcohol', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell>
                    <Switch checked={menuItem.mostPopular} onChange={e => {
                      handleMenuItemPatch(menuItem, 'mostPopular', e.target.checked);
                    }} />
                  </TableCell>
                  <TableCell align="right" padding="checkbox">
                    <IconButton size='small' onClick={(event) => {
                      handleClickAction(event, menuItem.id);
                    }}>
                      <MoreVertTwoToneIcon fontSize='small' />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={anchorEl !== null && actionID === menuItem.id}
                      onClose={() => {
                        handleCloseAction('None', menuItem);
                      }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button',
                      }}
                    >
                      <MenuItem onClick={() => handleCloseAction('Edit', menuItem)}>Edit</MenuItem>
                      <MenuItem onClick={() => handleCloseAction('Delete', menuItem)}>Delete</MenuItem>
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

export default MenuItemsTable;
