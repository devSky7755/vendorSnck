import { Helmet } from 'react-helmet-async';
import { Box, styled, Card, Drawer } from '@mui/material';
import { useState } from 'react';
import OrdersNewTable from './OrdersNewTable';
import EditOrderDialog from './EditOrder';
import BulkActions from './BulkActions';
import { temp_orders_new } from 'src/models/order';

const TableWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        margin-top: auto;
        box-shadow: 0px -1px 16px rgba(159, 162, 191, 0.18), 0px -2px 2px rgba(159, 162, 191, 0.32);
`
);

function OrdersNew() {
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [orders, setOrders] = useState(temp_orders_new);
  const [selected, setSelectedOrders] = useState([]);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  const onAddOrder = () => {
    setEditing({
      role: 'Admin'
    });
    setEditOpen(true);
  }

  const onEditing = (order) => {
    setEditing(order);
    setEditOpen(true);
  }

  const onEdit = (order) => {
    setEditOpen(false);
  }

  const onSelectionChanged = (selected) => {
    setSelectedOrders(selected);
  }

  const onView = () => {

  }
  const onReset = () => {
    setSelectedOrders(null);
  }
  const onPrint = () => {

  }
  const onIssue = () => {

  }

  return (
    <>
      <Helmet>
        <title>New Orders</title>
      </Helmet>
      {
        editOpen && editing &&
        <EditOrderDialog
          order={editing}
          open={editOpen}
          onClose={onEdit}
        />
      }
      <Box style={{ height: '100%', display: 'flex', flexDirection: 'column' }} >
        <Box >
          <TableWrapper>
            <Card>
              <OrdersNewTable orders={orders} selected={selected} onSelectionChanged={onSelectionChanged} />
            </Card>
          </TableWrapper>
          <Drawer anchor='right' variant='persistent'>

          </Drawer>
        </Box>
        <FooterWrapper>
          <Card sx={{ p: 1 }}>
            <BulkActions selected={selected} onView={onView} onPrint={onPrint} onIssue={onIssue} onReset={onReset} />
          </Card>
        </FooterWrapper>
      </Box>
    </>
  );
}

export default OrdersNew;
