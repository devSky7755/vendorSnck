import { FC, ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { Outlet } from 'react-router-dom';

import Sidebar from './Sidebar';
import Header from './Header';

interface SidebarLayoutProps {
  children?: ReactNode;
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

const SidebarLayout: FC<SidebarLayoutProps> = () => {
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

export default SidebarLayout;
