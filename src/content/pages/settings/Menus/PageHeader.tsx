import { Typography, Button, Grid, IconButton } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';
import { SearchOutlined } from '@mui/icons-material';

interface PageHeaderProps {
  onToggleSearch?: Function,
  onAddMenu?: Function
}


const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Menu Items
        </Typography>
      </Grid>
      <Grid item>
        <IconButton color='primary' size='small' onClick={() => {
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
            if (props.onAddMenu) props.onAddMenu();
          }}
        >
          Add
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
