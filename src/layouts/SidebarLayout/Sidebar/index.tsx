import { Scrollbars } from 'react-custom-scrollbars-2';
import { Box, Drawer, Hidden, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SidebarMenu from './SidebarMenu';
import { connect } from 'react-redux';
import { toggleSidebar } from 'src/reducers/setting/action';
import { isVendorApp } from 'src/models/constant';
import { useEffect, useState } from 'react';
import { VendorStand } from 'src/models/vendorStand';
import { getVendorStand } from 'src/Api/apiClient';

const SidebarWrapper = styled(Box)(
  ({ theme }) => `
        width: ${theme.sidebar.width};
        min-width: ${theme.sidebar.width};
        max-width: ${theme.sidebar.width};
        color: ${theme.sidebar.textColor};
        background: ${theme.sidebar.background};
        box-shadow: ${theme.sidebar.boxShadow};
        height: 100%;
        
        @media (min-width: ${theme.breakpoints.values.lg}px) {
            z-index: 10;
        }
`
);

const TopSection = styled(Box)(
  ({ theme }) => `
        height: 78px;
        align-items: center;
        padding: ${theme.spacing(2)};
        border-bottom: ${theme.sidebar.dividerBg} solid 1px;
`
);

function Sidebar({ showSidebar, toggleSidebar, token, userData }) {
  const [vendor, setVendor] = useState<VendorStand>();

  const closeSidebar = () => {
    toggleSidebar();
  };

  useEffect(() => {
    if (!userData || !userData?.vendorStandId) return;
    getVendorStand(userData?.vendorStandId).then((res) => {
      setVendor(res);
    });
  }, [userData]);

  if (showSidebar) {
    return (
      <>
        <Hidden lgDown>
          <SidebarWrapper>
            <Scrollbars autoHide>
              {isVendorApp && (
                <TopSection>
                  <Box>
                    <Typography variant="subtitle2" color={'white'}>
                      {vendor && vendor?.name}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography component="span" variant="body2">
                      {userData && userData.firstName}{' '}
                      {userData && userData.lastName}
                    </Typography>
                  </Box>
                </TopSection>
              )}
              <SidebarMenu />
            </Scrollbars>
          </SidebarWrapper>
        </Hidden>
        <Hidden lgUp>
          <Drawer
            anchor="left"
            open={showSidebar}
            onClose={closeSidebar}
            variant="temporary"
            elevation={9}
          >
            <SidebarWrapper>
              <Scrollbars autoHide>
                {isVendorApp && (
                  <TopSection>
                    <Box>
                      <Typography variant="subtitle2" color={'white'}>
                        {vendor && vendor?.name}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography component="span" variant="body2">
                        {userData && userData.firstName}{' '}
                        {userData && userData.lastName}
                      </Typography>
                    </Box>
                  </TopSection>
                )}
                <SidebarMenu />
              </Scrollbars>
            </SidebarWrapper>
          </Drawer>
        </Hidden>
      </>
    );
  } else {
    return <></>;
  }
}

function reduxState(state) {
  return {
    showSidebar: (state.setting && state.setting.showSidebar) || false,
    token: state.auth && state.auth.token,
    userData: state.auth && state.auth.data
  };
}
export default connect(reduxState, { toggleSidebar })(Sidebar);
