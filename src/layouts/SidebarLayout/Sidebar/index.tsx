import { Scrollbars } from 'react-custom-scrollbars-2';
import { Box, Drawer, Hidden, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SidebarMenu from './SidebarMenu';
import { connect } from 'react-redux';
import { toggleSidebar } from 'src/reducers/setting/action'

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

function Sidebar({ showSidebar, toggleSidebar }) {
  const closeSidebar = () => {
    toggleSidebar();
  }

  if (showSidebar) {
    return (
      <>
        <Hidden lgDown>
          <SidebarWrapper>
            <Scrollbars autoHide>
              <TopSection>
                <Box>
                  <Typography variant='subtitle2' color={'white'}>HotDog Stand</Typography>
                </Box>
                <Box>
                  <Typography component='span' variant='body2'>Jack Jackson</Typography>
                </Box>
              </TopSection>
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
                <TopSection>
                  <Box>
                    <Typography variant='subtitle2' color={'white'}>HotDog Stand</Typography>
                  </Box>
                  <Box>
                    <Typography component='span' variant='body2'>Jack Jackson</Typography>
                  </Box>
                </TopSection>
                <SidebarMenu />
              </Scrollbars>
            </SidebarWrapper>
          </Drawer>
        </Hidden>
      </>
    );
  } else {
    return (
      <>
      </>
    )
  }
}

function reduxState(state) {
  return {
    showSidebar: (state.setting && state.setting.showSidebar) || false
  }
}
export default connect(reduxState, { toggleSidebar })(Sidebar);
