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
        width: 36px;
        height: 36px;
        margin-top: 4px;
        transform: scale(.8);
`
);

const LogoTextWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: 10px;
`
);

const LogoText = styled(Box)(
  ({ theme }) => `
        font-size: 24px;
        font-weight: ${theme.typography.fontWeightBold};
`
);

function Logo() {
  return (
    <LogoWrapper to="/dashboards">
      <LogoSignWrapper>
        <img src='/icon_512.png' alt="logo" width='100%' height='100%'></img>
      </LogoSignWrapper>
      <LogoTextWrapper>
        <LogoText>Snackr</LogoText>
      </LogoTextWrapper>
    </LogoWrapper>
  );
}

export default Logo;
