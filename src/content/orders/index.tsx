import { Helmet } from 'react-helmet-async';
import { Box, styled, Card, Drawer, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import OrdersTable from './OrdersTable';
import EditOrderDialog from './EditOrder';
import BulkActions from './BulkActions';
import { temp_orders } from 'src/models/order';
import OrdersDetail from './OrdersDetail';

const TableWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

const FooterWrapper = styled(Box)(
  ({ theme }) => `
        position: relative;
        bottom: 0;
        padding-top: 2px;
        height: 56px;
        background: white;
        box-shadow: 0px -1px 16px rgba(159, 162, 191, 0.18), 0px -2px 2px rgba(159, 162, 191, 0.32);
`
);

const RightSidebarWrapper = styled(Box)(
  ({ theme }) => `
        height: 100%;
        padding: ${theme.spacing(2)};
        background: white;
        margin-left: auto;
        box-shadow: 1px 0px 16px rgba(159, 162, 191, 0.18), 0px -2px 2px rgba(159, 162, 191, 0.32);
`
);

const ContainerWrapper = styled(Box)(
  ({ theme }) => `
    overflow: auto;
    height: calc(100% - 56px);
    display: flex;
  `
);

function OrdersPage({ type }) {
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [orders, setOrders] = useState([]);
  const [sideVisible, setSideVisible] = useState(false);
  const [selected, setSelectedOrders] = useState([]);
  const [showOrderDetail, setShowOrderDetail] = useState(false);

  useEffect(() => {
    let filtered = [];
    switch (type) {
      case 'New':
        filtered = temp_orders.filter(x => x.status == 'New');
        break;
      case 'Preparing':
        filtered = temp_orders.filter(x => x.status === 'Preparing');
        break;
      case 'Delivery':
        filtered = temp_orders.filter(x => (x.status === 'Ready' && x.order_type === 'Delivery') || x.status === 'Delivering');
        break;
      case 'Pickup':
        filtered = temp_orders.filter(x => (x.status === 'Ready' && x.order_type === 'Pickup') || x.status === 'Waitlist');
        break;
      default:
        filtered = temp_orders.filter(x => x.status === 'New');
        break;
    }
    setOrders(filtered);
    setSelectedOrders([]);
    setShowOrderDetail(false);
    setEditOpen(false);
    setEditing(null);
  }, [type])

  const onEdited = (order) => {
    setEditOpen(false);
  }

  const onSelectionChanged = (selected) => {
    setSelectedOrders(selected);
  }

  const onAction = (action) => {
    if (action === 'View') {
      onView();
    } else if (action === 'Print') {
      onPrint();
    } else if (action === 'Reset') {
      onReset();
    } else if (action === 'Issue') {
      onIssue();
    }
  }

  const onView = () => {
    setSideVisible(true);
  }

  const onHideSidebar = () => {
    setSideVisible(false);
  }

  const onReset = () => {
    setSelectedOrders(null);
  }
  const onPrint = () => {

  }
  const onIssue = () => {

  }

  const onViewOrder = (order) => {
    setEditing(order);
    setEditOpen(true);
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
          onClose={onEdited}
        />
      }
      <Box style={{ height: '100%' }}>
        <ContainerWrapper>
          <Grid container alignItems='stretch'>
            <Grid item style={{ flex: 1 }}>
              <TableWrapper>
                <OrdersTable orders={orders} selected={selected} type={type} onSelectionChanged={onSelectionChanged}
                  onViewOrder={onViewOrder}
                />
              </TableWrapper>
            </Grid>
            {
              sideVisible &&
              <Grid item style={{ width: 240 }}>
                <RightSidebarWrapper>
                  <OrdersDetail orders={orders} selected={selected} type={type} onHide={onHideSidebar} />
                </RightSidebarWrapper>
              </Grid>
            }
          </Grid>
        </ContainerWrapper>
        <FooterWrapper>
          <BulkActions selected={selected} type={type} onAction={onAction} />
        </FooterWrapper>
      </Box>
    </>
  );
}

export default OrdersPage;
