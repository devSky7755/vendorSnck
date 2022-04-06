import { Helmet } from 'react-helmet-async';
import { Box, styled, TextField, InputAdornment, Tabs, Tab } from '@mui/material';
import Footer from 'src/components/Footer';
import { useEffect, useState } from 'react';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Venue } from 'src/models/venue';
import VenuesTable from './VenuesTable';
import EditVenueDialog from './EditVenue';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';

const TableWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

const ContainerWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    height: calc(100% - 56px);
  `
);

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        position: relative;
        bottom: 0;
        height: 56px;
        background: white;
        box-shadow: 0px -1px 16px rgba(159, 162, 191, 0.18), 0px -2px 2px rgba(159, 162, 191, 0.32);
`
);

interface VenuesPageProps {
  venues: Venue[];
}

function VenuesPage(props: VenuesPageProps) {
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [venues, setVenues] = useState<Venue[]>(props.venues || []);

  const [selectedVenues, setSelectedVenues] = useState<Venue[]>([]);

  useEffect(() => {
    setVenues(props.venues || []);
  }, [props.venues]);

  const onAction = (action, data) => {

  }

  const onEditing = (venue) => {
    setEditing(venue);
    setEditOpen(true);
  }

  const onEdit = (venue) => {
    setEditOpen(false);
  }

  const handleSelectionChanged = (selectedIDs) => {
    const selected = venues.filter(x => selectedIDs.includes(x.id));
    setSelectedVenues(selected);
  }

  return (
    <>
      <Helmet>
        <title>Venues</title>
      </Helmet>
      {
        editOpen && editing &&
        <EditVenueDialog
          venue={editing}
          open={editOpen}
          onClose={onEdit}
        />
      }
      <Box style={{ height: '100%' }}>
        <ContainerWrapper>
          <TableWrapper>
            <VenuesTable venues={venues} onAction={onAction} onSelectionChanged={handleSelectionChanged} />
          </TableWrapper>
        </ContainerWrapper>
        <FooterWrapper>
          <BulkActions selected={selectedVenues} onAction={onAction} />
        </FooterWrapper>
      </Box>
    </>
  );
}

function reduxState(state) {
  return {
    venues: state.venues && state.venues.venues
  }
}
export default connect(reduxState)(VenuesPage);
