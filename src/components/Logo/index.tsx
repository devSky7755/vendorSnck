import { Box } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const LogoWrapper = styled(Link)(
  ({ theme }) => `
        color: white;
        padding: ${theme.spacing(0, 1, 0, 0)};
        display: flex;
        text-decoration: none;
        font-weight: ${theme.typography.fontWeightBold};
`
);

const LogoSignWrapper = styled(Box)(
  () => `
        width: 169px;
        height: 36px;
        margin-top: 4px;
        transform: scale(.8);
`
);

function Logo() {
  return (
    <LogoWrapper to="/dashboards">
      <LogoSignWrapper>
        <img src='/title_logo.png' alt="logo" width='100%' height='100%'></img>
      </LogoSignWrapper>
    </LogoWrapper>
  );
}

export default Logo;
