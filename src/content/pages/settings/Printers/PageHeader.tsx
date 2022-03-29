import { Typography, Button, Grid } from '@mui/material';

import AddTwoToneIcon from '@mui/icons-material/AddTwoTone';

interface PageHeaderProps {
  onAddPrinter?: Function
}

const PageHeader: React.FC<PageHeaderProps> = (props) => {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h5" gutterBottom>
          Printers
        </Typography>
      </Grid>
      <Grid item>
        <Button
          color='primary'
          sx={{ mt: { xs: 2, md: 0 } }}
          startIcon={<AddTwoToneIcon fontSize="small" />}
          onClick={() => {
            if (props.onAddPrinter) props.onAddPrinter();
          }}
        >
          Add Printer
        </Button>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
