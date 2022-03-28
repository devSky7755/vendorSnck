import { Box, Button, IconButton } from '@mui/material';
import HeaderSearch from './Search';
import HeaderNotifications from './Notifications';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { useNavigate } from 'react-router';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { connect } from 'react-redux';
import { refreshPause } from 'src/reducers/setting/action';
import { useEffect, useState } from 'react';
import PauseCircleFilledOutlinedIcon from '@mui/icons-material/PauseCircleFilledOutlined';

function HeaderButtons({ pauseUntil, refreshPause }) {
  const navigate = useNavigate();
  const [render, setRender] = useState(false);

  let current = Date.now();
  let seconds = 0;
  if (pauseUntil) {
    seconds = Math.floor((pauseUntil - current) / 1000);
  }

  const refresh_pause = () => {
    refreshPause();
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setRender(x => !x);
    }, 250);

    return function () {
      clearInterval(intervalId);
    }
  }, []);


  return (
    <Box sx={{ mr: 1 }}>
      <Box component="span" sx={{ mr: 2 }}>
        <Button variant='outlined' size='small' style={{ fontWeight: 'normal', textTransform: 'none', borderColor: '#FFFFFFBD', color: 'white', width: 160, height: 40 }}
          onClick={() => {
            refresh_pause();
          }}
        >
          {
            seconds > 0 ? <PauseCircleFilledOutlinedIcon color='warning' sx={{ mr: 1 }} /> : <PlayCircleIcon color='success' sx={{ mr: 1 }} />
          }
          {
            seconds > 0 ? `Paused ${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}` : 'Available'
          }
        </Button>
      </Box>
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

function reduxState(state) {
  return {
    pauseUntil: state.setting && state.setting.pauseUntil
  }
}

export default connect(reduxState, { refreshPause })(HeaderButtons);
