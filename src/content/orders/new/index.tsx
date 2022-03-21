import { Helmet } from 'react-helmet-async';
import { Box, styled, Card } from '@mui/material';
import { useState } from 'react';
import OrdersNewTable from './OrdersNewTable';
import EditOrderDialog from './EditOrder';
import BulkActions from './BulkActions';
import { temp_orders_new } from 'src/models/order';

const TableWrapper = styled(Box)(
  ({ theme }) => `
        max-height: calc(100% - 100px);
        padding: ${theme.spacing(0)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        bottom: 0;
        position: absolute;
        width: 100%;
`
);

function OrdersNew() {
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [orders, setOrders] = useState(temp_orders_new);
  const [selected, setSelectedOrders] = useState([]);

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

  return (
    <>
      <Helmet>
        <title>New Orders</title>
      </Helmet>
      <Box sx={{ mb: 7 }}>
        {
          editOpen && editing &&
          <EditOrderDialog
            order={editing}
            open={editOpen}
            onClose={onEdit}
          />
        }
        <TableWrapper>
          <Card>
            <OrdersNewTable orders={orders} onSelectionChanged={onSelectionChanged} />
          </Card>
        </TableWrapper>
      </Box>
      <FooterWrapper>
        <Card sx={{ p: 1 }}>
          <BulkActions selected={selected} />
        </Card>
      </FooterWrapper>
    </>
  );
}

export default OrdersNew;
