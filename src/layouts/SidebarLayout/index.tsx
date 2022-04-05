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

interface SidebarLayoutProps {
  children?: ReactNode;
  token?: string;
  logout?: Function;
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

const SidebarLayout: FC<SidebarLayoutProps> = ({ token, logout }) => {
  const navigate = useNavigate();

  /*
  useEffect(() => {
    if (!isVendorApp) {
      if (!token) {
        navigate('/login');
      }
    }
  }, [token])
  */

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

export default connect(reduxState, { logout })(SidebarLayout);

