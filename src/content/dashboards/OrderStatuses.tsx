import {
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
} from '@mui/material';

import CircleIcon from '@mui/icons-material/Circle';

function OrderStatuses() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid xs={12} md={4} item>
          <Card sx={{ px: 1 }}>
            <CardContent sx={{ p: 1 }}>
              <Typography variant="subtitle2" noWrap className='d-inline-flex'>
                Completed
                <CircleIcon sx={{ ml: 1 }} className='my-auto' color='success' style={{ width: '0.8rem', height: '0.8rem' }}></CircleIcon>
              </Typography>
              <Box sx={{ pt: 2 }}>
                <Typography variant="h4" gutterBottom noWrap>
                  175
                </Typography>
                <div>
                  <Typography variant='body2' fontWeight={500} component='span'>15</Typography> <Typography variant='body2' color={'#00000099'} component='span'>in last 10 minutes</Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={12} md={4} item>
          <Card sx={{ px: 1 }} style={{ background: '#FFFAEA' }}>
            <CardContent sx={{ p: 1 }}>
              <Typography variant="subtitle2" noWrap>
                Cancelled
                <CircleIcon sx={{ ml: 1 }} className='my-auto' color='warning' style={{ width: '0.8rem', height: '0.8rem' }}></CircleIcon>
              </Typography>
              <Box sx={{ pt: 2, pb: 0 }}>
                <Typography variant="h4" gutterBottom noWrap>
                  15
                </Typography>
                <div>
                  <Typography variant='body2' fontWeight={500} component='span'>5</Typography> <Typography variant='body2' component={'span'} color={'#00000099'}>in last 10 minutes</Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12} sm={12} md={4} item>
          <Card sx={{ px: 1 }} style={{ background: '#FFF0EA' }}>
            <CardContent sx={{ p: 1 }}>
              <Typography variant="subtitle2" noWrap>
                Refunded
                <CircleIcon sx={{ ml: 1 }} className='my-auto' color='error' style={{ width: '0.8rem', height: '0.8rem' }}></CircleIcon>
              </Typography>
              <Box sx={{ pt: 2 }}>
                <Typography variant="h4" gutterBottom noWrap>
                  2
                </Typography>
                <div>
                  <Typography variant='body2' fontWeight={500} component='span'>1</Typography> <Typography variant='body2' component={'span'} color={'#00000099'}>in last 10 minutes</Typography>
                </div>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default OrderStatuses;
