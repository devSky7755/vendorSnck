import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, styled, TextField, InputAdornment, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { useState } from 'react';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { MenuItem } from 'src/models/menu_item';
import MenusTable from './MenusTable';
import EditMenuDialog from './EditMenu';

const SearchWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(2)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

const TableWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

const tempMenus: MenuItem[] = [
  {
    id: 0,
    name: 'Soda',
    category: 'Soft Drinks',
    status: 'Available',
    price: 2,
    currentAvailable: 100
  },
  {
    id: 1,
    name: 'Orange Juice',
    category: 'Soft Drinks',
    status: 'Not Available',
    price: 5,
    currentAvailable: 0
  },
  {
    id: 2,
    name: 'Beef Dog',
    category: 'Hot Dogs',
    status: 'Available',
    price: 3,
    currentAvailable: 100
  },
  {
    id: 3,
    name: 'Vegan Dog',
    category: 'Hot Dogs',
    status: 'Available',
    price: 4,
    currentAvailable: 100
  },
  {
    id: 4,
    name: 'NY Style Dog',
    category: 'Hot Dogs',
    status: 'Available',
    price: 5,
    currentAvailable: 100
  }
];

function MenuSettings() {
  const [showSearch, setShowSearch] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [menus, setMenus] = useState(tempMenus);

  const onToggleSearch = () => {
    setShowSearch(!showSearch);
  }

  const onAddMenu = () => {
    setEditing({
      role: 'Admin'
    });
    setEditOpen(true);
  }

  const onEditing = (menu) => {
    setEditing(menu);
    setEditOpen(true);
  }

  const onEdit = (menu) => {
    setEditOpen(false);
  }

  return (
    <>
      <Helmet>
        <title>Menus</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader onAddMenu={onAddMenu} onToggleSearch={onToggleSearch} />
      </PageTitleWrapper>
      <Box>
        {
          showSearch &&
          <SearchWrapper>
            <TextField InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchTwoTone />
                </InputAdornment>
              )
            }}
              type='search' variant='standard' fullWidth placeholder='Search by name, category, tags'></TextField>
          </SearchWrapper>
        }
        {
          editOpen && editing &&
          <EditMenuDialog
            menu={editing}
            open={editOpen}
            onClose={onEdit}
          />
        }
        <TableWrapper>
          <Card>
            <MenusTable menus={menus} onEditingMenu={(menu) => onEditing(menu)} />
          </Card>
        </TableWrapper>
      </Box>
      <Footer />
    </>
  );
}

export default MenuSettings;
