import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, styled, TextField, InputAdornment } from '@mui/material';
import Footer from 'src/components/Footer';
import { useState } from 'react';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import UsersTableWidget from './UsersTableWidget';

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

function UsersSetting() {
  const [showSearch, setShowSearch] = useState(false);

  const onToggleSearch = () => {
    setShowSearch(!showSearch);
  }

  const onAddUser = () => {

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
        <TableWrapper>
          <UsersTableWidget />
        </TableWrapper>
      </Box>
      <Footer />
    </>
  );
}

export default UsersSetting;
