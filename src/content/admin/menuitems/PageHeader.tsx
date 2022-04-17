import { Typography, Grid, IconButton } from '@mui/material';
import { FilterList as FilterListIcon, SearchOutlined } from '@mui/icons-material';
import { VendorStand } from 'src/models/vendorStand';

interface PageHeaderProps {
  onToggleSearch?: Function,
  vendor?: VendorStand
  onAddMenu?: Function
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { vendor } = props;
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h5" gutterBottom>
          Menu Items - {vendor.name}
        </Typography>
      </Grid>
      <Grid item>
        <IconButton color='primary' size='small' sx={{ mr: 1 }}>
          <FilterListIcon />
        </IconButton>
        <IconButton color='primary' size='small' onClick={() => {
          if (props.onToggleSearch) {
            props.onToggleSearch();
          }
        }}>
          <SearchOutlined />
        </IconButton>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
