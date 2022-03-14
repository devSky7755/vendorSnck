import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, styled, TextField, InputAdornment, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { useState } from 'react';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { TeamUser } from 'src/models/team_user';
import UsersTable from './UsersTable';
import EditUserDialog from './EditUser';

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

const tempUsers: TeamUser[] = [
  {
    id: 52,
    role: 'Runner',
    name: 'Jack',
    surname: 'Jackson',
    status: 'Active',
    lastSeen: '15 min ago',
    lastSeenTimeStamp: 0,
  },
  {
    id: 51,
    role: 'Runner',
    name: 'Dave',
    surname: 'Davidson',
    status: 'Not Active',
    lastSeen: '5 days ago',
    lastSeenTimeStamp: 0
  },
  {
    id: 31,
    role: 'Packer',
    name: 'Frank',
    surname: 'Frankson',
    status: 'Active',
    lastSeen: '5 min ago',
    lastSeenTimeStamp: 0
  },
];

function UsersSetting() {
  const [showSearch, setShowSearch] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [users, setUsers] = useState(tempUsers);

  const onToggleSearch = () => {
    setShowSearch(!showSearch);
  }

  const onAddUser = () => {
    setEditing({
      role: 'Admin'
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
              type='search' variant='standard' fullWidth placeholder='Search by email, name, surname, phone number'></TextField>
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
            <UsersTable users={users} onEditingUser={(user) => onEditing(user)} />
          </Card>
        </TableWrapper>
      </Box>
      <Footer />
    </>
  );
}

export default UsersSetting;
