import { Typography, Grid, Button, Pagination, PaginationItem } from '@mui/material';
import { useState } from 'react';

function PageFooter() {
  const [index, setIndex] = useState(1);

  return (
    <Grid container alignItems="center" spacing={2}>
      <Grid item width={150}>
        <div className='d-inline-flex'>
          <Pagination count={5} page={index} size='small' onChange={(e, value) => {
            setIndex(value);
          }}
            renderItem={(item) => {
              if (item.type === 'page') {
                return (<></>);
              } else {
                return (
                  <PaginationItem sx={{ mr: 1 }} {...item} />
                )
              }
            }}
          ></Pagination>
          <Typography className='my-auto'>{index} of 5</Typography>
        </div>
      </Grid>
      <Grid item flex={1}>
        <Typography>
          Preparing order #545 close to due time
        </Typography>
      </Grid>
      <Grid item className='float-right'>
        <Button color='primary' >View Order</Button>
      </Grid>
    </Grid>
  );
}

export default PageFooter;
