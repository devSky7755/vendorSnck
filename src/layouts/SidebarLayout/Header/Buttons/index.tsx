import { Box, IconButton } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router';

function HeaderButtons() {
  const navigate = useNavigate();

  return (
    <Box sx={{ mr: 1 }}>
      <Box sx={{ mx: .5 }} component="span">
        <HeaderNotifications />
      </Box>
      <Box sx={{ mx: .5 }} component="span">
        <IconButton style={{ color: '#FFFFFFBD' }} onClick={() => {
          navigate('/help', {
            state: { showSkip: false },
            replace: true
          });
        }}>
          <HelpOutlineIcon />
        </IconButton>
      </Box>
      <HeaderSearch />
    </Box >
  );
}

export default HeaderButtons;
