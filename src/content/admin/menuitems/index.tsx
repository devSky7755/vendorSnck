import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { MenuItem } from 'src/models/menu_item';
import MenuItemsTable from './MenuItemsTable';
import EditMenuItemDialog from './EditMenuItem';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
import { patchMenuItem, postMenuItem, deleteMenuItem, getMenuItems } from 'src/Api/apiClient';
import { getVendorStand } from 'src/Api/apiClient';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import { useParams } from 'react-router';
import Status404 from 'src/content/pages/Status/Status404';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import PageHeader from './PageHeader';

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

interface MenuItemsPageProps {
  token: string;
}

function sortedMenuItems(items: MenuItem[]) {
  if (!items) return items;

  var sorted = [...items];
  sorted.sort((x, y) => {
    if (x.createdAt < y.createdAt) return -1;
    return 1;
  });
  return sorted;
}

function MenuItemsPage(props: MenuItemsPageProps) {
  const { vendorId } = useParams();
  const { token } = props;

  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [vendor, setVendor] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

  const [selectedMenuItems, setSelectedMenuItems] = useState<MenuItem[]>([]);

  useEffect(() => {
    if (vendorId) {
      getVendorStand(vendorId).then(res => {
        if (!res) {
          setNotFound(true);
        } else {
          setVendor(res);
          setMenuItems(sortedMenuItems(res.menuItems) || []);
        }
      }).catch(ex => {
        setNotFound(true);
      })
    } else {
      getMenuItems(token).then(res => {
        setMenuItems(sortedMenuItems(res));
      })
    }
  }, []);

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
      setEditing({ available: true });
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


  const handleSave = (menuItem) => {
    let patch: MenuItem = { ...menuItem };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.deletedAt;

    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (menuItem.id) {
      patch.vendorStandId = menuItem.vendorStandId;

      patchMenuItem(token, menuItem, patch).then(res => {
        let newMenuItems = [...menuItems];
        let index = newMenuItems.findIndex(x => x.id === menuItem.id);
        if (index >= 0) {
          newMenuItems[index] = res
          setMenuItems(newMenuItems);
        }
      }).catch(ex => {
        console.log(ex.message);
      })
    } else {
      postMenuItem(token, patch).then(res => {
        if (res) {
          setMenuItems(prev => [...prev, res]);
        }
      }).catch(ex => {
        console.log(ex.message);
      })
    }
  }

  const handleDelete = (menuItem) => {
    deleteMenuItem(token, menuItem).then(success => {
      if (success) {
        let filtered = menuItems.filter(x => x.id !== menuItem.id);
        setMenuItems(filtered);
      }
    })
  }

  const handleSelectionChanged = (selectedIDs) => {
    const selected = menuItems.filter(x => selectedIDs.includes(x.id));
    setSelectedMenuItems(selected);
  }

  const handleMenuItemPatch = (menuItem, key, value) => {
    let patch = {};
    patch[key] = value;
    patch['name'] = menuItem.name;

    patchMenuItem(token, menuItem, patch).then(res => {
      let newMenuItems = [...menuItems];
      let index = newMenuItems.findIndex(x => x.id === menuItem.id);
      if (index >= 0) {
        newMenuItems[index] = res
        setMenuItems(newMenuItems);
      }
    });
  }

  if (notFound) {
    return <Status404 />
  }

  return (
    <>
      <Helmet>
        <title>MenuItems</title>
      </Helmet>
      {
        editOpen && editing &&
        <EditMenuItemDialog
          vendor={vendor}
          menuItem={editing}
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
          header='Are you sure you want to delete this menu item?'
          text='It cannot be recovered'
          open={deleteOpen}
          onAction={onAction}
        />
      }
      <Box style={{ height: '100%' }}>
        {
          vendor &&
          <PageTitleWrapper>
            <PageHeader vendor={vendor} />
          </PageTitleWrapper>
        }
        <Box style={{ height: vendor ? 'calc(100% - 56px)' : '100%' }}>
          <ContainerWrapper>
            <TableWrapper>
              <MenuItemsTable vendor={vendor} menuItems={menuItems} onAction={onAction}
                onSelectionChanged={handleSelectionChanged} onMenuItemPatch={handleMenuItemPatch} />
            </TableWrapper>
          </ContainerWrapper>
          <FooterWrapper>
            <BulkActions selected={selectedMenuItems} onAction={onAction} />
          </FooterWrapper>
        </Box>
      </Box>
    </>
  );
}

function reduxState(state) {
  return {
    token: state.auth && state.auth.token,
  }
}
export default connect(reduxState)(MenuItemsPage);
