import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Promo } from 'src/models/promo';
import PromosTable from './PromosTable';
import EditPromoDialog from './EditPromo';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import {
  deletePromo,
  deletePromos,
  getPromos,
  patchPromo,
  patchPromos,
  postPromo
} from 'src/Api/apiClient';
import { ACTIONS } from 'src/components/BulkAction';

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

  useEffect(() => {
    loadPromos();
  }, []);

  const loadPromos = () => {
    getPromos(token).then((res) => {
      if (res) {
        setPromos(res);
      }
    });
  };

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
      setEditing({ type: 'percentage' });
      setEditOpen(true);
    } else if (action === 'Cancel Remove') {
      setDeleteOpen(false);
      setEditing(null);
    } else if (action === 'Remove') {
      setDeleteOpen(false);
      handleDelete(editing);
      setEditing(null);
    } else if (action === 'Bulk Action') {
      handleBulkAction(data);
    }
  };

  const handleBulkAction = (action) => {
    const ids = selectedPromos.map((promo) => promo.id);
    switch (action) {
      case ACTIONS.COMMENCE_NOW.action:
        patchPromos(token, ids, {
          commences: new Date()
        }).then((updatedPromos) => {
          let newPromos = [...promos].map((promo) => {
            const findPromo = updatedPromos.find(
              (uPromo) => uPromo.id === promo.id
            );
            return findPromo ? findPromo : promo;
          });
          setPromos(newPromos);
          setSelectedPromos([]);
        });
        break;
      case ACTIONS.EXPIRE_NOW.action:
        patchPromos(token, ids, {
          expires: new Date()
        }).then((updatedPromos) => {
          let newPromos = [...promos].map((promo) => {
            const findPromo = updatedPromos.find(
              (uPromo) => uPromo.id === promo.id
            );
            return findPromo ? findPromo : promo;
          });
          setPromos(newPromos);
          setSelectedPromos([]);
        });
        break;
      case ACTIONS.DELETE_PROMOS.action:
        deletePromos(token, ids).then((res) => {
          if (!res) return;
          let newPromos = [...promos].filter((promo) => {
            const findPromo = selectedPromos.find(
              (sPromo) => sPromo.id === promo.id
            );
            return findPromo ? false : true;
          });
          setPromos(newPromos);
          setSelectedPromos([]);
        });
        break;
      default:
        break;
    }
  };

  const handleSave = (promo) => {
    let patch: Promo = { ...promo };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.deletedAt;

    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (promo.id) {
      patchPromo(token, promo, patch)
        .then((res) => {
          let newPromos = [...promos];
          let index = newPromos.findIndex((x) => x.id === promo.id);
          if (index >= 0) {
            newPromos[index] = res;
            setPromos(newPromos);
          }
        })
        .catch((ex) => {
          console.log(ex.message);
        });
    } else {
      postPromo(token, patch)
        .then((res) => {
          if (res) {
            setPromos((prev) => [...prev, res]);
          }
        })
        .catch((ex) => {
          console.log(ex.message);
        });
    }
  };

  const handleDelete = (item) => {
    deletePromo(token, item).then((res) => {
      if (res) {
        const filtered = promos.filter((x) => x.id !== item.id);
        setPromos(filtered);
      }
    });
  };

  const handlePromoPatch = (promo, key, value) => {
    let patch = {};
    patch[key] = value;

    patchPromo(token, promo, patch).then((res) => {
      if (res) {
        let newPromos = [...promos];
        let index = newPromos.findIndex((x) => x.id === promo.id);
        if (index >= 0) {
          newPromos[index][key] = value;
          setPromos(newPromos);
        }
      }
    });
  };

  const handleSelectionChanged = (selectedIDs) => {
    const selected = promos.filter((x) => selectedIDs.includes(x.id));
    setSelectedPromos(selected);
  };

  return (
    <>
      <Helmet>
        <title>Promos</title>
      </Helmet>
      {editOpen && editing && (
        <EditPromoDialog promo={editing} open={editOpen} onAction={onAction} />
      )}
      {deleteOpen && editing && (
        <ConfirmDialog
          success="Remove"
          successLabel="DELETE"
          cancelLabel="RETURN"
          cancel="Cancel Remove"
          header="Are you sure you want to delete this promo?"
          text="It cannot be recovered"
          open={deleteOpen}
          onAction={onAction}
        />
      )}
      <Box style={{ height: '100%' }}>
        <ContainerWrapper>
          <TableWrapper>
            <PromosTable
              promos={promos}
              onAction={onAction}
              onSelectionChanged={handleSelectionChanged}
              onPromoPatch={handlePromoPatch}
            />
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
    token: state.auth && state.auth.token
  };
}
export default connect(reduxState)(PromosPage);
