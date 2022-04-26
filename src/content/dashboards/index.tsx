import { Helmet } from 'react-helmet-async';
import PageFooter from './PageFooter';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, Grid, Container, Card, CardContent, Typography } from '@mui/material';
import Footer from 'src/components/Footer';

import OrderStatuses from './OrderStatuses';
import EventSelector from './EventSelector';
import TotalSales from './TotalSales';
import { MenuItemV1 } from 'src/models/menu_item';
import TopItemsTable from './TopItemsTable';
import { Link } from 'react-router-dom';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Staff } from 'src/models/staff';
import TopRunnersTable from './TopRunnersTable';

const temp_top_items: MenuItemV1[] = [
  {
    id: 0,
    name: 'Soda',
    category: 'Soft Drinks',
    status: 'Available',
    price: 2,
    currentAvailable: 100
  },
  {
    id: 1,
    name: 'Orange Juice',
    category: 'Soft Drinks',
    status: 'Not Available',
    price: 5,
    currentAvailable: 0
  },
  {
    id: 2,
    name: 'Beef Dog',
    category: 'Hot Dogs',
    status: 'Available',
    price: 3,
    currentAvailable: 100
  },
  {
    id: 3,
    name: 'Vegan Dog',
    category: 'Hot Dogs',
    status: 'Available',
    price: 4,
    currentAvailable: 100
  },
  {
    id: 4,
    name: 'NY Style Dog',
    category: 'Hot Dogs',
    status: 'Available',
    price: 5,
    currentAvailable: 100
  },
  {
    id: 5,
    name: 'Sprite',
    category: 'Soft Drinks',
    status: 'Not Available',
    price: 5,
    currentAvailable: 12
  }
];

const temp_runners: Staff[] = [
  {
    id: '52',
    role: 'runner',
    firstName: 'Jack',
    lastName: 'Jackson',
    active: true,
    lastSeen: '15 min ago',
    lastSeenTimeStamp: 0,
    average: 105,
    average_change: -10,
    daily_count: 45
  },
  {
    id: '51',
    role: 'runner',
    firstName: 'Dave',
    lastName: 'Davidson',
    active: true,
    lastSeen: '5 days ago',
    lastSeenTimeStamp: 0,
    average: 135,
    average_change: -5,
    daily_count: 43
  },
  {
    id: '31',
    role: 'runner',
    firstName: 'Frank',
    lastName: 'Frankson',
    active: true,
    lastSeen: '5 min ago',
    lastSeenTimeStamp: 0,
    average: 175,
    average_change: 30,
    daily_count: 34
  },
  {
    id: '20',
    role: 'runner',
    firstName: 'Kris',
    lastName: 'Krison',
    active: true,
    lastSeen: '5 min ago',
    lastSeenTimeStamp: 0,
    average: 95,
    average_change: 15,
    daily_count: 23
  },
];

function Dashboard() {
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <Container maxWidth="lg" sx={{ pt: 3 }}>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="stretch"
          spacing={2}
        >
          <Grid item xs={12}>
            <EventSelector></EventSelector>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TotalSales />
              </Grid>
              <Grid item xs={12}>
                <OrderStatuses />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Card sx={{ px: 1 }}>
                  <CardContent sx={{ px: 1, py: 2 }}>
                    <Typography variant="subtitle2" noWrap className='d-inline-flex'>
                      Avg. Pickup Time
                    </Typography>
                    <Box>
                      <Typography variant="h4" gutterBottom noWrap sx={{ py: 1 }}>
                        3:45  min
                      </Typography>
                      <div className='d-inline-flex'>
                        <Typography variant='subtitle2' component={'small'} color={'#48AA2F'}>0:32</Typography>
                        <ArrowDropDownIcon style={{ color: '#48AA2F' }} fontSize='small' />
                      </div>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6}>
                <Card sx={{ px: 1 }}>
                  <CardContent sx={{ px: 1, py: 2 }}>
                    <Typography variant="subtitle2" noWrap className='d-inline-flex'>
                      Avg. Preparing Time
                    </Typography>
                    <Box>
                      <Typography variant="h4" gutterBottom noWrap sx={{ py: 1 }}>
                        1:45  min
                      </Typography>
                      <div className='d-inline-flex'>
                        <Typography variant='subtitle2' component={'small'} color={'#48AA2F'}>0:12</Typography>
                        <ArrowDropDownIcon style={{ color: '#48AA2F' }} fontSize='small' />
                      </div>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ px: 1 }}>
                  <CardContent sx={{ px: 1, py: 2 }}>
                    <Typography variant="subtitle2" noWrap className='d-inline-flex'>
                      Avg. Delivery Time
                    </Typography>
                    <Box>
                      <Typography variant="h4" gutterBottom noWrap sx={{ py: 1 }}>
                        6:45  min
                      </Typography>
                      <div className='d-inline-flex'>
                        <Typography variant='subtitle2' component={'small'} color={'#FF5625'}>0:15</Typography>
                        <ArrowDropUpIcon style={{ color: '#FF5625' }} fontSize='small' />
                      </div>
                    </Box>
                    <Box sx={{ pt: 1 }}>
                      <TopRunnersTable runners={temp_runners} />
                    </Box>
                    <Box className='d-inline-flex' sx={{ pt: 3, pb: 1 }}>
                      <Link to='/settings/staff?role=runner'>All Runners</Link>
                      <ChevronRightIcon fontSize='small' style={{ width: '1rem' }} sx={{ ml: 1 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ px: 1 }}>
                  <CardContent sx={{ py: 2, px: 1 }}>
                    <Typography variant="subtitle2" noWrap>
                      Top Items
                    </Typography>
                    <Box sx={{ pt: 1 }}>
                      <TopItemsTable menus={temp_top_items} />
                    </Box>
                    <Box className='d-inline-flex' sx={{ pt: 3, pb: 1 }}>
                      <Link to='/settings/menus'>All Items</Link>
                      <ChevronRightIcon fontSize='small' style={{ width: '1rem' }} sx={{ ml: 1 }} />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <PageTitleWrapper>
              <PageFooter />
            </PageTitleWrapper>
          </Grid>
        </Grid>
      </Container>
      <Footer />
    </>
  );
}

export default Dashboard;
