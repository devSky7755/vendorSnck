import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, styled, TextField, InputAdornment, Card } from '@mui/material';
import Footer from 'src/components/Footer';
import { useEffect, useState } from 'react';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Staff, tempStaffs } from 'src/models/staff';
import StaffsTable from './StaffsTable';
import EditStaffDialog from './EditStaff';
import { useLocation } from 'react-router';
import { parseQuery } from 'src/utils/functions';
import { connect } from 'react-redux';
import { getAllStaffs } from 'src/Api/apiClient';

const SearchWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(1)} ${theme.spacing(2)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

const ContainerWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    height: calc(100% - 56px);
  `
);

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        position: relative;
        bottom: 0;
        height: 56px;
        background: white;
        box-shadow: 0px -1px 16px rgba(159, 162, 191, 0.18), 0px -2px 2px rgba(159, 162, 191, 0.32);
`
);

const TableWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

interface StaffsPageQueryParams {
  role?: string;
}

interface StaffsSettingProps {
  token: string;
}

function StaffsSetting(props: StaffsSettingProps) {
  const { token } = props;
  const { search } = useLocation();
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const [searchStr, setSearchString] = useState(null);
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [editing, setEditing] = useState(null);
  const [staffs, setStaffs] = useState<Staff[]>([]);
  const [staffRole, setStaffRole] = useState(null);

  useEffect(() => {
    if (search) {
      const params: StaffsPageQueryParams = parseQuery(search);
      if (params.role && params.role.toLowerCase() === 'runner') {
        setStaffRole('runner');
      }
    }

    getAllStaffs(token).then((res) => {
      setStaffs(res);
    });
  }, []);

  const onToggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const onAddStaff = () => {
    setEditing({
      role: 'admin'
    });
    setEditOpen(true);
  };

  const onEditing = (staff) => {
    setEditing(staff);
    setEditOpen(true);
  };

  const onEdit = (staff) => {
    setEditOpen(false);
  };

  return (
    <>
      <Helmet>
        <title>Staffs</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader onAddStaff={onAddStaff} onToggleSearch={onToggleSearch} />
      </PageTitleWrapper>
      <Box>
        {showSearch && (
          <SearchWrapper>
            <TextField
              InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoTone />
                  </InputAdornment>
                )
              }}
              type="search"
              variant="standard"
              fullWidth
              placeholder="Search by email, name, surname, phone number"
              value={searchStr}
              onChange={(e) => {
                setSearchString(e.target.value);
              }}
            ></TextField>
          </SearchWrapper>
        )}
        {editOpen && editing && (
          <EditStaffDialog staff={editing} open={editOpen} onClose={onEdit} />
        )}
        <TableWrapper>
          <Card>
            <StaffsTable
              staffs={staffs}
              onEditingStaff={(staff) => onEditing(staff)}
              search={searchStr}
              staff_role={staffRole}
            />
          </Card>
        </TableWrapper>
      </Box>
      <Footer />
    </>
  );
}

function reduxState(state) {
  return {
    token: state.auth && state.auth.token
  };
}
export default connect(reduxState)(StaffsSetting);
