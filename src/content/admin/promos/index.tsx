import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Promo } from 'src/models/promo';
import PromosTable from './PromosTable';
import EditPromoDialog from './EditPromo';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
//import { patchPromo, postPromo, deletePromo } from 'src/Api/apiClient';
import { Venue } from 'src/models/venue';
import { getVenue } from 'src/Api/apiClient';
import { useNavigate } from 'react-router';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';

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

interface PromosPageProps {
  token: string;
}

function PromosPage(props: PromosPageProps) {
  const { token } = props;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [promos, setPromos] = useState<Promo[]>([]);

  const [selectedPromos, setSelectedPromos] = useState<Promo[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    loadPromos();
  }, []);

  const loadPromos = () => {
    setPromos([]);
  }

  const onAction = (action, data) => {
    if (action === 'Edit') {
      setEditing(data);
      setEditOpen(true);
    } else if (action === 'Close') {
      setEditOpen(false);
      setEditing(null);
    } else if (action === 'Save') {
      setEditOpen(false);
      handleSave(data);
    } else if (action === 'Delete') {
      setEditOpen(false);
      setEditing(data);
      setDeleteOpen(true);
    } else if (action === 'Add New') {
      setEditing({ active: false, type: 'Percentage', usage: 'One time use' });
      setEditOpen(true);
    } else if (action === 'Cancel Remove') {
      setDeleteOpen(false);
      setEditing(null);
    } else if (action === 'Remove') {
      setDeleteOpen(false);
      handleDelete(editing);
      setEditing(null);
    }
  }


  const handleSave = (promo) => {
    if (!promo.id) {
      promo.id = Date.now().toString();
      setPromos(prev => [...prev, promo]);
    } else {
      let newPromos = [...promos];
      let index = newPromos.findIndex(x => x.id === promo.id);
      if (index >= 0) {
        newPromos[index] = promo;
        setPromos(newPromos);
      }
    }
  }

  const handleDelete = (promo) => {
    let filtered = promos.filter(x => x.id !== promo.id);
    setPromos(filtered);
  }

  const handleSelectionChanged = (selectedIDs) => {
    const selected = promos.filter(x => selectedIDs.includes(x.id));
    setSelectedPromos(selected);
  }

  const handlePromoPatch = (promo, key, value) => {
    let newPromos = [...promos];
    let index = newPromos.findIndex(x => x.id === promo.id);
    if (index >= 0) {
      newPromos[index][key] = value
      setPromos(newPromos);
    }
  }

  return (
    <>
      <Helmet>
        <title>Promos</title>
      </Helmet>
      {
        editOpen && editing &&
        <EditPromoDialog
          promo={editing}
          open={editOpen}
          onAction={onAction}
        />
      }
      {
        deleteOpen && editing &&
        <ConfirmDialog
          success='Remove'
          successLabel='DELETE'
          cancelLabel='RETURN'
          cancel='Cancel Remove'
          header='Are you sure you want to delete this promo?'
          text='It cannot be recovered'
          open={deleteOpen}
          onAction={onAction}
        />
      }
      <Box style={{ height: '100%' }}>
        <ContainerWrapper>
          <TableWrapper>
            <PromosTable promos={promos} onAction={onAction} onSelectionChanged={handleSelectionChanged} onPromoPatch={handlePromoPatch} />
          </TableWrapper>
        </ContainerWrapper>
        <FooterWrapper>
          <BulkActions selected={selectedPromos} onAction={onAction} />
        </FooterWrapper>
      </Box>
    </>
  );
}

function reduxState(state) {
  return {
    token: state.auth && state.auth.token,
  }
}
export default connect(reduxState)(PromosPage);
