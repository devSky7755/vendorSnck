import { Helmet } from 'react-helmet-async';
import { Box, styled } from '@mui/material';
import { useEffect, useState } from 'react';
import { Customer } from 'src/models/customer';
import CustomersTable from './CustomersTable';
import EditCustomerDialog from './EditCustomer';
import { connect } from 'react-redux';
import BulkActions from './BulkActions';
import ConfirmDialog from 'src/components/Dialog/ConfirmDialog';
import {
  deleteCustomer,
  deleteCustomers,
  getCustomers,
  patchCustomer,
  patchCustomers
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

interface CustomersPageProps {
  token: string;
}

function CustomersPage(props: CustomersPageProps) {
  const { token } = props;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [customers, setCustomers] = useState<Customer[]>([]);

  const [selectedCustomers, setSelectedCustomers] = useState<Customer[]>([]);

  useEffect(() => {
    loadCustomers();
  }, []);

  const loadCustomers = () => {
    getCustomers(token).then((res) => {
      if (res) {
        setCustomers(res);
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
    const ids = selectedCustomers.map((customer) => customer.id);
    switch (action) {
      case ACTIONS.ENABLE_TEMPORARY_BLOCK.action:
        patchCustomers(token, ids, {
          tempBlocked: true
        }).then((updatedCustomers) => {
          let newCustomers = [...customers].map((customer) => {
            const findCustomer = updatedCustomers.find(
              (uCustomer) => uCustomer.id === customer.id
            );
            return findCustomer ? findCustomer : customer;
          });
          setCustomers(newCustomers);
          setSelectedCustomers([]);
        });
        break;
      case ACTIONS.DISABLE_TEMPORARY_BLOCK.action:
        patchCustomers(token, ids, {
          tempBlocked: false
        }).then((updatedCustomers) => {
          let newCustomers = [...customers].map((customer) => {
            const findCustomer = updatedCustomers.find(
              (uCustomer) => uCustomer.id === customer.id
            );
            return findCustomer ? findCustomer : customer;
          });
          setCustomers(newCustomers);
          setSelectedCustomers([]);
        });
        break;
      case ACTIONS.ENABLE_PERMANENT_BLOCK.action:
        patchCustomers(token, ids, {
          permBlocked: true
        }).then((updatedCustomers) => {
          let newCustomers = [...customers].map((customer) => {
            const findCustomer = updatedCustomers.find(
              (uCustomer) => uCustomer.id === customer.id
            );
            return findCustomer ? findCustomer : customer;
          });
          setCustomers(newCustomers);
          setSelectedCustomers([]);
        });
        break;
      case ACTIONS.DISABLE_PERMANENT_BLOCK.action:
        patchCustomers(token, ids, {
          permBlocked: false
        }).then((updatedCustomers) => {
          let newCustomers = [...customers].map((customer) => {
            const findCustomer = updatedCustomers.find(
              (uCustomer) => uCustomer.id === customer.id
            );
            return findCustomer ? findCustomer : customer;
          });
          setCustomers(newCustomers);
          setSelectedCustomers([]);
        });
        break;
      case ACTIONS.DELETE_CUSTOMERS.action:
        deleteCustomers(token, ids).then((res) => {
          if (!res) return;
          let newCustomers = [...customers].filter((customer) => {
            const findCustomer = selectedCustomers.find(
              (sCustomer) => sCustomer.id === customer.id
            );
            return findCustomer ? false : true;
          });
          setCustomers(newCustomers);
          setSelectedCustomers([]);
        });
        break;
      default:
        break;
    }
  };

  const handleSave = (customer) => {
    let patch: Customer = { ...customer };
    delete patch.id;
    delete patch.updatedAt;
    delete patch.createdAt;
    delete patch.deletedAt;
    delete patch.stripeId;
    delete patch.status;
    delete patch.mobileNo;
    delete patch.inVenueLocationId;
    delete patch.inVenueLocationUpdatedAt;
    delete patch.geoLocation;

    Object.keys(patch).forEach((k) => patch[k] == null && delete patch[k]);

    if (customer.id) {
      patchCustomer(token, customer, patch)
        .then((res) => {
          let newCustomers = [...customers];
          let index = newCustomers.findIndex((x) => x.id === customer.id);
          if (index >= 0) {
            newCustomers[index] = res;
            setCustomers(newCustomers);
          }
        })
        .catch((ex) => {
          console.log(ex.message);
        });
    }
  };

  const handleDelete = (item) => {
    deleteCustomer(token, item).then((res) => {
      if (res) {
        const filtered = customers.filter((x) => x.id !== item.id);
        setCustomers(filtered);
      }
    });
  };

  const handleCustomerPatch = (customer, key, value) => {
    let patch = {};
    patch[key] = value;
    patch['firstName'] = customer.firstName;
    patch['lastName'] = customer.lastName;

    patchCustomer(token, customer, patch).then((res) => {
      if (res) {
        let newCustomers = [...customers];
        let index = newCustomers.findIndex((x) => x.id === customer.id);
        if (index >= 0) {
          newCustomers[index][key] = value;
          setCustomers(newCustomers);
        }
      }
    });
  };

  const handleSelectionChanged = (selectedIDs) => {
    const selected = customers.filter((x) => selectedIDs.includes(x.id));
    setSelectedCustomers(selected);
  };

  return (
    <>
      <Helmet>
        <title>Customers</title>
      </Helmet>
      {editOpen && editing && (
        <EditCustomerDialog
          customer={editing}
          open={editOpen}
          onAction={onAction}
        />
      )}
      {deleteOpen && editing && (
        <ConfirmDialog
          success="Remove"
          successLabel="DELETE"
          cancelLabel="RETURN"
          cancel="Cancel Remove"
          header="Are you sure you want to delete this customer?"
          text="It cannot be recovered"
          open={deleteOpen}
          onAction={onAction}
        />
      )}
      <Box style={{ height: '100%' }}>
        <ContainerWrapper>
          <TableWrapper>
            <CustomersTable
              customers={customers}
              onAction={onAction}
              onSelectionChanged={handleSelectionChanged}
              onCustomerPatch={handleCustomerPatch}
            />
          </TableWrapper>
        </ContainerWrapper>
        <FooterWrapper>
          <BulkActions selected={selectedCustomers} onAction={onAction} />
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
export default connect(reduxState)(CustomersPage);
