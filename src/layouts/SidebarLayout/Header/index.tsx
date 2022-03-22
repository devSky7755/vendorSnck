import { FC } from 'react';

import { Box, Hidden, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import MenuTwoToneIcon from '@mui/icons-material/MenuTwoTone';
import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';

import HeaderMenu from './Menu';
import HeaderButtons from './Buttons';
import Logo from 'src/components/Logo';
import { connect } from 'react-redux';
import { toggleSidebar } from 'src/reducers/setting/action'

interface HeaderProps {
  isBasic?: boolean;
  showSidebar: boolean;
  toggleSidebar: Function;
}

const HeaderWrapper = styled(Box)(
  ({ theme }) => `
        height: ${theme.header.height};
        color: ${theme.header.textColor};
        padding: ${theme.spacing(0, 2)};
        right: 0;
        z-index: 5;
        background-color: ${theme.header.background};
        box-shadow: ${theme.header.boxShadow};
        position: fixed;
        justify-content: space-between;
        width: 100%;
`
);


const Header: FC<HeaderProps> = ({ isBasic, showSidebar, toggleSidebar }) => {
  if (isBasic) {
    return (
      <HeaderWrapper display="flex" alignItems="center">
        <Box display="flex" alignItems="center">
          <Logo />
        </Box>
      </HeaderWrapper>
    );
  } else {
    return (
      <HeaderWrapper display="flex" alignItems="center">
        <Box display="flex" alignItems="center">
          <Tooltip arrow title="Toggle Menu">
            <IconButton onClick={() => {
              toggleSidebar();
            }} style={{ marginRight: '12px', color: 'white' }}>
              {!showSidebar ? <MenuTwoToneIcon /> : <CloseTwoToneIcon />}
            </IconButton>
          </Tooltip>
          <Logo />
          <Hidden mdDown>
            <HeaderMenu />
          </Hidden>
        </Box>
        <Box display="flex" alignItems="center">
          <HeaderButtons />
        </Box>
      </HeaderWrapper>
    );
  }
}

function reduxState(state) {
  return {
    showSidebar: (state.setting && state.setting.showSidebar) || false
  }
}
export default connect(reduxState, { toggleSidebar })(Header);

