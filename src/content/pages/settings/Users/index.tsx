import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, styled, TextField, InputAdornment, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { useEffect, useState } from 'react';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Staff, tempUsers } from 'src/models/staff';
import UsersTable from './UsersTable';
import EditUserDialog from './EditUser';
import { useLocation } from 'react-router';
import { parseQuery } from 'src/utils/functions';

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

interface UsersPageQueryParams {
  role?: string;
}

function UsersSetting() {
  const { search } = useLocation();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchStr, setSearchString] = useState(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState(null);
  const [users, setUsers] = useState<Staff[]>(tempUsers);
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    if (search) {
      const params: UsersPageQueryParams = parseQuery(search);
      if (params.role && params.role.toLowerCase() === 'runner') {
        setUserRole('runner');
      }
    }
  }, []);

  const onToggleSearch = () => {
    setShowSearch(!showSearch);
  }

  const onAddUser = () => {
    setEditing({
      role: 'admin',
    });
    setEditOpen(true);
  }

  const onEditing = (user) => {
    setEditing(user);
    setEditOpen(true);
  }

  const onEdit = (user) => {
    setEditOpen(false);
  }

  return (
    <>
      <Helmet>
        <title>Users</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader onAddUser={onAddUser} onToggleSearch={onToggleSearch} />
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
              type='search' variant='standard' fullWidth placeholder='Search by email, name, surname, phone number'
              value={searchStr} onChange={(e) => {
                setSearchString(e.target.value);
              }}
            >
            </TextField>
          </SearchWrapper>
        }
        {
          editOpen && editing &&
          <EditUserDialog
            user={editing}
            open={editOpen}
            onClose={onEdit}
          />
        }
        <TableWrapper>
          <Card>
            <UsersTable users={users} onEditingUser={(user) => onEditing(user)} search={searchStr} user_role={userRole} />
          </Card>
        </TableWrapper>
      </Box>
      <Footer />
    </>
  );
}

export default UsersSetting;
