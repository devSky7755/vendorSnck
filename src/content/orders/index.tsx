import { Helmet } from 'react-helmet-async';
import { Box, styled, Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import OrdersTable from './OrdersTable';
import EditOrderDialog from './EditOrder';
import BulkActions from './BulkActions';
import { Order, temp_orders } from 'src/models/order';
import OrdersDetail from './OrdersDetail';
import { useParams } from 'react-router-dom';
import { NotificationBoard } from './notification';
import { OrderIssue } from './issue';
import SidebarFilter from './SidebarFilter';
import { defaultFilter, OrderFilter } from './order_filter';

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


const filterOrders = (orders: Order[], filter: OrderFilter) => {
  var filtered = orders.filter(order => {
    if (filter.type.includes(order.order_type) === false) return false;
    if (filter.status.includes(order.status) === false) return false;
    return true;
  });

  return filtered;
}

const OrdersPage = () => {
  const { type } = useParams();

  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [issueWithOpen, setIssueWithOpen] = useState(false);
  const [issueWith, setIssueWith] = useState(null);
  const [orders, setOrders] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [selected, setSelectedOrders] = useState<Order[]>([]);
  const [showOrderDetail, setShowOrderDetail] = useState(false);
  const [showRightFilter, setShowRightFilter] = useState(false);
  const [openNotificatoin, setOpenNotification] = useState(false);
  const [filter, setFilter] = useState<OrderFilter>(defaultFilter);

  useEffect(() => {
    let filtered = [];
    switch (type.toLowerCase()) {
      case 'new':
        filtered = temp_orders.filter(x => x.status === 'New');
        break;
      case 'preparing':
        filtered = temp_orders.filter(x => x.status === 'Preparing');
        break;
      case 'delivery':
        filtered = temp_orders.filter(x => (x.status === 'Ready' && x.order_type === 'Delivery') || x.status === 'Delivering');
        break;
      case 'pickup':
        filtered = temp_orders.filter(x => (x.status === 'Ready' && x.order_type === 'Pickup') || x.status === 'Waitlist');
        break;
      default:
        filtered = [...temp_orders];
        break;
    }
    setOrders(filtered);
    setSelectedOrders([]);
    setFilter(defaultFilter);
    setShowOrderDetail(false);
    setEditOpen(false);
    setEditing(null);
  }, [type]);

  useEffect(() => {
    setFiltered(filterOrders(orders, filter));
  }, [filter, orders])

  const onEdited = (order) => {
    setEditOpen(false);
  };

  const onSelectionChanged = (selected) => {
    setSelectedOrders(selected);
  };

  const onAction = (action, data) => {
    if (action === 'View Items') {
      onViewItems();
    } else if (action === 'Print') {
      onPrint(data);
    } else if (action === 'Reset') {
      onReset();
    } else if (action === 'Issue') {
      onIssue(data);
    } else if (action === 'Edit') {
      onEdit(data);
    } else if (action === 'Filter') {
      onToggleFilter();
    }
  };

  const onViewItems = () => {
    setShowRightFilter(false);
    setShowOrderDetail(true);
  };

  const onHideSidebar = () => {
    setShowOrderDetail(false);
    setShowRightFilter(false);
  };

  const onReset = () => {
    setSelectedOrders(null);
  };

  const onPrint = (order) => { };
  const onIssue = (order) => {
    setIssueWith(order);
    setIssueWithOpen(true);
  };

  const onEdit = (order) => {
    setEditing(order);
    setEditOpen(true);
  };

  const onToggleFilter = () => {
    if (showRightFilter) {
      setShowRightFilter(false);
    } else {
      setShowRightFilter(true);
      setShowOrderDetail(false);
    }
  }

  const onChangeFilter = (f) => {
    setFilter(f);
  }

  const ordersTblProps = {
    orders: filtered,
    selected,
    type,
    filter,
    onSelectionChanged,
    onAction
  };

  return (
    <>
      <Helmet>
        <title>New Orders</title>
      </Helmet>
      {editOpen && editing && (
        <EditOrderDialog order={editing} open={editOpen} onClose={onEdited} />
      )}
      {issueWithOpen && issueWith && (
        <OrderIssue
          order={issueWith}
          open={issueWithOpen}
          setOpen={setIssueWithOpen}
        />
      )}
      <Box style={{ height: '100%' }}>
        <ContainerWrapper>
          <Grid container alignItems="stretch">
            <Grid item style={{ flex: 1 }}>
              <TableWrapper>
                <OrdersTable {...ordersTblProps} />
              </TableWrapper>
            </Grid>
            {(showOrderDetail || showRightFilter) && (
              <Grid item style={{ width: 240 }}>
                <RightSidebarWrapper>
                  {
                    showOrderDetail ?
                      (<OrdersDetail
                        selected={selected}
                        type={type}
                        onHide={onHideSidebar}
                      />) :
                      (<SidebarFilter
                        type={type}
                        filter={filter}
                        onChangeFilter={onChangeFilter}
                        onHide={onHideSidebar}
                      />)
                  }
                </RightSidebarWrapper>
              </Grid>
            )}
          </Grid>
        </ContainerWrapper>
        <FooterWrapper>
          <BulkActions selected={selected} type={type} onAction={onAction} />
        </FooterWrapper>
        <NotificationBoard
          open={openNotificatoin}
          setOpen={setOpenNotification}
        />
      </Box>
    </>
  );
}

export default OrdersPage;