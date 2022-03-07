import { Typography, Button, Grid, IconButton } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { SearchOutlined } from '@mui/icons-material';

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Users
        </Typography>
      </Grid>
      <Grid item>
        <IconButton color='primary'>
          <SearchOutlined />
        </IconButton>
        <Button
          color='primary'
          sx={{ mt: { xs: 2, md: 0 } }}
          startIcon={<AddTwoToneIcon fontSize="small" />}
        >
          Add User
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
