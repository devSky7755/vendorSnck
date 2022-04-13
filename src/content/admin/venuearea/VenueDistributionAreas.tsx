import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Venue, VenueDistributionArea } from 'src/models/venue';
import VenuesTable from '../venues/VenuesTable';
import EditVenueDialog from '../venues/EditVenue';
import { connect } from 'react-redux';
import { deleteVenue, patchVenue, updateVenue } from 'src/reducers/venues/action';
import BulkActions from '../venues/BulkActions';
import { patchVenue as patchVenueAPI, postVenue, deleteVenue as deleteVenueAPI } from 'src/Api/apiClient';
import DeleteVenueDialog from '../venues/DeleteVenue';

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

interface VenueDistributionProps {
    venue: Venue;
    onAction: Function;
    open: boolean;
}

function VenueDistribution(props: VenueDistributionProps) {
    const { onAction, venue, open } = props;

    const [editOpen, setEditOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [editing, setEditing] = useState<VenueDistributionArea>(null);
    const [distributions, setDistrbutions] = useState<VenueDistributionArea[]>([]);
    const [selectedVenues, setSelectedVenues] = useState<VenueDistributionArea[]>([]);

    useEffect(() => {
        if (props.open) {
            //setVenues(props.venues || []);
        }
    }, [venue, open]);

    const onSelfAction = (action, data) => {
        if (action === 'Edit') {
            setEditing(data);
            setEditOpen(true);
        } else if (action === 'Close') {
            setEditOpen(false);
            setEditing(null);
        } else if (action === 'Save') {
            setEditOpen(false);
            //handleSave(data);
        } else if (action === 'Delete') {
            setEditOpen(false);
            setEditing(data);
            setDeleteOpen(true);
        } else if (action === 'Add New') {
            setEditing({ active: false, delivery: false, pickup: false });
            setEditOpen(true);
        } else if (action === 'Cancel Remove') {
            setDeleteOpen(false);
            setEditing(null);
        } else if (action === 'Remove') {
            setDeleteOpen(false);
            //handleDelete(editing);
            setEditing(null);
        }
    }

    const handleSelectionChanged = (selectedIDs) => {
        const selected = distributions.filter(x => selectedIDs.includes(x.id));
        setSelectedVenues(selected);
    }

    const handlePatch = (venue, key, value) => {
        
    }

    return (
        <>
            <Helmet>
                <title>Venues</title>
            </Helmet>
            
            <Box style={{ height: '100%' }}>
                <ContainerWrapper>
                    <TableWrapper>
                        <VenuesTable venues={venues} onAction={onAction} onSelectionChanged={handleSelectionChanged} onVenuePatch={handleVenuePatch} />
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
        token: state.auth && state.auth.token,
        venues: state.venues && state.venues.venues
    }
}
export default connect(reduxState, { patchVenue, deleteVenue, updateVenue })(VenueDistribution);
