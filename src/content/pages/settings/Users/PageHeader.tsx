import { Typography, Button, Grid, IconButton } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { SearchOutlined } from '@mui/icons-material';

interface PageHeaderProps {
  onToggleSearch?: Function,
  onAddUser?: Function
}


const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Users
        </Typography>
      </Grid>
      <Grid item>
        <IconButton color='primary' onClick={() => {
          if (props.onToggleSearch) {
            props.onToggleSearch();
          }
        }}>
          <SearchOutlined />
        </IconButton>
        <Button
          color='primary'
          sx={{ mt: { xs: 2, md: 0 } }}
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => {
            if (props.onAddUser) props.onAddUser();
          }}
        >
          Add User
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
