import { Typography, Grid } from '@mui/material';
import { Venue } from 'src/models/venue';

interface PageHeaderProps {
  onToggleSearch?: Function,
  venue?: Venue
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  const { venue } = props;
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography sx={{ mt: 1 }} variant="h5" gutterBottom>
          Vendor Stands - {venue.name}
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
