import { Helmet } from 'react-helmet-async';
import { Box, styled, Card, Drawer } from '@mui/material';
import { useEffect, useState } from 'react';
import OrdersTable from './OrdersTable';
import EditOrderDialog from './EditOrder';
import BulkActions from './BulkActions';
import { temp_orders } from 'src/models/order';

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

function OrdersPage({ type }) {
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [orders, setOrders] = useState([]);
  const [selected, setSelectedOrders] = useState([]);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  useEffect(() => {
    let filtered = [];
    switch (type) {
      case 'New':
        filtered = temp_orders.filter(x => x.status == 'Ready' || x.status === 'Preparing');
        break;
      case 'Preparing':
        filtered = temp_orders.filter(x => x.status === 'Preparing');
        break;
      case 'Delivery':
        filtered = temp_orders.filter(x => x.order_type === 'Delivery');
        break;
      case 'Pickup':
        filtered = temp_orders.filter(x => x.order_type === 'Pickup');
        break;
      default:
        filtered = temp_orders.filter(x => true);
        break;
    }
    setOrders(filtered);
    setSelectedOrders([]);
    setShowOrderDetail(false);
    setEditOpen(false);
    setEditing(null);
  }, [type])

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
              <OrdersTable orders={orders} selected={selected} type={type} onSelectionChanged={onSelectionChanged} />
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

export default OrdersPage;
