import { FC, ReactNode, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useNavigate } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';
import { connect } from 'react-redux';
import { logout } from 'src/reducers/auth/action';
import { isVendorApp } from 'src/models/constant';
import { getVenues } from 'src/Api/apiClient';
import { setVenues } from 'src/reducers/venues/action';

interface SidebarLayoutProps {
  children?: ReactNode;
  token?: string;
  logout?: Function;
  setVenues?: Function;
}

const MainWrapper = styled(Box)(
  ({ theme }) => `
        flex: 1 1 auto;
        display: flex;
        height: 100%;
  `
);

const MainContent = styled(Box)(
  ({ theme }) => `
        margin-top: ${theme.header.height};
        overflow: auto;
        width: 100%;
        display: flex;
        flex-direction: row;
`
);

const MainContainer = styled(Box)(
  ({ theme }) => `
        overflow-x: hidden;
        overflow-y: hidden;
        width: 100%;        
        display: flex;
        flex-direction: column;
        flex-wrap: nowrap;
`
);

const SidebarLayout: FC<SidebarLayoutProps> = ({ token, logout, setVenues }) => {
  const navigate = useNavigate();

  //initialize data
  useEffect(() => {
    getVenues().then(venues => {
      venues.sort((x, y) => x.name.localeCompare(y.name));
      setVenues(venues);
    })
  }, []);

  useEffect(() => {
    if (!isVendorApp) {
      if (!token) {
        navigate('/login');
      }
    }
  }, [token]);

  return (
    <>
      <MainWrapper>
        <Header />
        <MainContent>
          <Sidebar />
          <MainContainer>
            <div style={{ overflow: 'auto', height: '100%' }}>
              <Outlet />
            </div>
          </MainContainer>
        </MainContent>
      </MainWrapper>
    </>
  );
};

function reduxState(state) {
  return {
    token: state.auth && state.auth.token
  }
}

export default connect(reduxState, { logout, setVenues })(SidebarLayout);

