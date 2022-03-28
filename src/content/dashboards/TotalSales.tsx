import { Card, Box, Typography, Avatar, Grid } from '@mui/material';

import { styled } from '@mui/material/styles';
import TotalSalesChart from './TotalSalesChart';

const TotalSalesChartWrapper = styled(TotalSalesChart)(
  ({ theme }) => `
    padding: 8px;
    height: 300px;
`
);

function TotalSales() {
  const dailySales = {
    labels: [
      '11 am',
      '11:15 am',
      '11:30 am',
      '11:45 am',
      '12:00 pm',
      '12:15 pm',
      '12:30 pm'
    ],
    data: [557, 575, 486, 464, 585, 369, 586]
  };

  return (
    <Card>
      <Box sx={{ p: 3 }}>
        <Grid container>
          <Grid item xs={4}>
            <Typography variant="subtitle2" noWrap>
              Total Sales
            </Typography>
            <Typography variant="h5" noWrap>
              $4,200.41
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" noWrap>
              Avg. Sale
            </Typography>
            <Typography variant="h5" noWrap>
              $12.41
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="subtitle2" noWrap>
              Customers
            </Typography>
            <Typography variant="h5" noWrap>
              410
            </Typography>
          </Grid>
        </Grid>
      </Box>
      <Box height={300}>
        <TotalSalesChartWrapper
          data={dailySales.data}
          labels={dailySales.labels}
        />
      </Box>
    </Card>
  );
}

export default TotalSales;
