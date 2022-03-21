import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, styled, TextField, InputAdornment, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { useState } from 'react';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { MenuItem, tempMenus } from 'src/models/menu_item';
import MenusTable from './MenusTable';
import EditMenuDialog from './EditMenu';

const SearchWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(1)} ${theme.spacing(2)};
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
