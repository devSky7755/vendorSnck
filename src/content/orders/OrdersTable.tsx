import { FC, ChangeEvent, useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  Checkbox,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Typography,
  Switch
} from '@mui/material';

import { Order, OrderType, OrderStatus } from 'src/models/order';
import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import FilterListIcon from '@mui/icons-material/FilterList';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DirectionsRunIcon from '@mui/icons-material/DirectionsRun';
import ErrorIcon from '@mui/icons-material/Error';
import OrderStatuses from '../dashboards/OrderStatuses';

interface OrdersTableProps {
  type: string;
  className?: string;
  orders: Order[];
  selected: number[];
  onSelectionChanged: Function;
}

interface OrderFilter {
  property: string;
  is_number: boolean;
  lower: number;
  upper: number;
}

interface GroupedOrder {
  name: string;
  desc: string;
  warning?: string;
  error?: string;
  filter: OrderFilter,
  orders: Order[];
}

const formatAMPM = (date) => {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';

  hours %= 12;
  hours = hours || 12;
  minutes = minutes < 10 ? `0${minutes}` : minutes;

  const strTime = `${hours}:${minutes} ${ampm}`;

  return strTime;
};

const OrdersTable: FC<OrdersTableProps> = ({ type, orders, selected, onSelectionChanged }) => {
  const [groupedOrders, setGroupedOrders] = useState<GroupedOrder[]>([]);
  const [selectedOrders, setSelectedOrders] = useState<number[]>(
    []
  );
  const [expanded, setExpanded] = useState<string[]>([]);
  const [showPreOrders, setShowPreOrders] = useState(false);

  useEffect(() => {
    orders.sort((x, y) => {
      if (x.duetime < y.duetime) return -1;
      if (x.duetime > y.duetime) return 1;
      return 0;
    });

    let grouped: GroupedOrder[] = [];

    let last_duetime = 0;
    if (orders.length > 0) {
      last_duetime = orders[orders.length - 1].duetime;
    }
    let current_time = Date.now();
    let endtime = current_time + 5 * 60 * 1000;
    let starttime = 0;
    let index = 0;
    let group_names = [];

    while (last_duetime > starttime) {
      let filtered = orders.filter(x => x.duetime >= starttime && x.duetime < endtime);
      if (type === 'New' && showPreOrders) {
        filtered = filtered.filter(x => x.status === 'Preparing');
      }
      if (filtered.length > 0) {
        const group_time = formatAMPM(new Date(endtime));
        group_names.push(group_time);
        grouped.push({
          name: group_time,
          desc: `${Math.round(endtime - current_time) / 60000} mins`,
          filter: {
            property: 'duetime',
            is_number: true,
            lower: starttime,
            upper: endtime,
          },
          orders: filtered
        });
      }

      starttime = endtime;
      endtime += 10 * 60 * 1000;
    }
    setGroupedOrders(grouped);
    setExpanded(group_names);
    setSelectedOrders([]);
  }, [orders, showPreOrders])

  useEffect(() => {
    if (!selected) {
      setSelectedOrders([]);
    }
  }, [selected])

  useEffect(() => {
    onSelectionChanged(selectedOrders);
  }, [selectedOrders])

  const handleSelectAllOrders = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedOrders(
      event.target.checked
        ? orders.map((order) => order.id)
        : []
    );
  };

  const handleSelectOneOrder = (
    event: ChangeEvent<HTMLInputElement>,
    orderId: number
  ): void => {
    if (!selectedOrders.includes(orderId)) {
      setSelectedOrders((prevSelected) => [
        ...prevSelected,
        orderId
      ]);
    } else {
      setSelectedOrders((prevSelected) =>
        prevSelected.filter((id) => id !== orderId)
      );
    }
  };

  const handleSelectOneGroup = (
    event: ChangeEvent<HTMLInputElement>,
    group: GroupedOrder
  ): void => {
    if (event.target.checked) {
      const group_orders = group.orders.map(x => x.id);
      setSelectedOrders((prevSelected) => [
        ...prevSelected,
        ...group_orders
      ]);
    } else {
      setSelectedOrders((prevSelected) =>
        prevSelected.filter((id) => (group.orders.findIndex(o => o.id === id) === -1))
      );
    }
  };

  const handlePreOrders = (e) => {
    setShowPreOrders(e.target.checked);
  }

  const selectedSomeOrders =
    selectedOrders.length > 0 &&
    selectedOrders.length < orders.length;
  const selectedAllOrders =
    selectedOrders.length === orders.length;

  const current_time = Date.now();

  return (
    <Card>
      <TableContainer>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ height: 52 }}>
                <Checkbox
                  size='small'
                  color="primary"
                  checked={selectedAllOrders}
                  indeterminate={selectedSomeOrders}
                  onChange={handleSelectAllOrders}
                />
              </TableCell>
              <TableCell>Order</TableCell>
              <TableCell>Items</TableCell>
              {
                type === 'Delivery' &&
                <TableCell>Delivery Person</TableCell>
              }
              {
                type === 'Pickup' &&
                <TableCell>User Notified</TableCell>
              }
              {
                (type === 'New' || type === 'Preparing') &&
                < TableCell > Order Type</TableCell>
              }
              <TableCell>
                {
                  (type === 'Delivery' || type === 'Pickup') ? 'Due In' : 'Waiting'
                }
              </TableCell>
              <TableCell>Customer</TableCell>
              <TableCell align="right">
                {
                  type === 'New' &&
                  <Fragment>
                    <Switch onChange={handlePreOrders}></Switch> Pre-orders
                  </Fragment>
                }

                <IconButton size='small' sx={{ ml: 2 }}>
                  <FilterListIcon />
                </IconButton>
              </TableCell>
              <TableCell align="right">
                <IconButton size='small'>
                  <MoreVertTwoToneIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groupedOrders.map((group) => {
              let group_selected = 0;
              group.orders.forEach(x => {
                if (selectedOrders.includes(x.id)) group_selected++;
              });
              const isGroupSelected = group_selected === group.orders.length;
              const isPartSelected = group_selected > 0 && group_selected < group.orders.length;
              const isExpanded = expanded.includes(group.name);
              return (
                <Fragment key={group.name}>
                  <TableRow
                    className='group-header-row'
                  >
                    <TableCell padding="checkbox" style={{ height: 52 }}>
                      <Checkbox
                        size='small'
                        color="primary"
                        checked={isGroupSelected}
                        indeterminate={isPartSelected}
                        onChange={(event: ChangeEvent<HTMLInputElement>) =>
                          handleSelectOneGroup(event, group)
                        }
                      />
                    </TableCell>
                    <TableCell colSpan={5}>
                      <Typography
                        variant="subtitle2"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {group.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography variant="subtitle2" component='span'>{group.orders.length} </Typography>
                      <Typography variant="subtitle2" component='span' color='GrayText'>orders due in</Typography>
                      <Typography variant="subtitle2" component='span'> {group.desc}</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <IconButton size='small' onClick={() => {
                        if (isExpanded) {
                          setExpanded(expanded.filter(x => x !== group.name));
                        } else {
                          setExpanded([...expanded, group.name]);
                        }
                      }}>
                        {
                          isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />
                        }
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  {
                    group.warning &&
                    <TableRow className='bg-warning'>
                      <TableCell align='center'>
                        <ErrorIcon color='warning' fontSize='small' sx={{ mt: 0.5 }}></ErrorIcon>
                      </TableCell>
                      <TableCell colSpan={7}>
                        {group.warning}
                      </TableCell>
                    </TableRow>
                  }
                  {
                    isExpanded && group.orders.map(order => {
                      const waiting = current_time - order.created;
                      const isOrderSelected = selectedOrders.includes(order.id);
                      const hasAlchol = order.items && order.items.find(x => x.isAlchol);
                      const isdelayed = group.warning;

                      return (
                        <TableRow
                          className={isdelayed ? 'bg-warning' : ''}
                          hover
                          key={order.id}
                        >
                          <TableCell padding="checkbox" style={{ height: 52 }}>
                            <Checkbox
                              size='small'
                              color="primary"
                              checked={isOrderSelected}
                              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                                handleSelectOneOrder(event, order.id)
                              }
                            />
                          </TableCell>
                          <TableCell>
                            #{order.id}
                          </TableCell>
                          <TableCell>
                            {order.item_count}
                            {
                              hasAlchol &&
                              <Typography variant='caption' className='border-warning alchol-label' color='#FF864E' sx={{ ml: 2, px: 1 }} gutterBottom
                                noWrap>
                                ALCHOL
                              </Typography>
                            }
                          </TableCell>
                          {
                            type === 'Delivery' &&
                            <TableCell>
                              <Typography variant='body2' component='span'>
                                {order.delivery && (order.delivery.name + ' ' + order.delivery.surname)}
                              </Typography>
                            </TableCell>
                          }
                          {
                            type === 'Pickup' &&
                            <TableCell>
                              <Typography variant='body2' component='span'>
                                {
                                  order.user_notified && (
                                    Math.floor((current_time - order.user_notified) / 60000) + ' mins'
                                  )
                                }
                              </Typography>
                            </TableCell>
                          }
                          {
                            (type === 'New' || type === 'Preparing') &&
                            <TableCell>
                              <div className='d-inline-flex'>
                                <Typography variant='body2' component='span'>
                                  {order.order_type}
                                </Typography>
                                {
                                  order.order_type === 'Delivery' && <DirectionsRunIcon sx={{ ml: 1 }} color='disabled' fontSize='small' />
                                }
                              </div>
                            </TableCell>
                          }

                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {Math.floor(waiting / 60000)} mins
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body2"
                              color="text.primary"
                              gutterBottom
                              sx={{ mb: 0 }}
                              noWrap
                            >
                              {order.customer.name}
                            </Typography>
                            {
                              order.customer.seat &&
                              <Typography
                                variant='body2'
                                color={'#00000099'}
                                gutterBottom
                                fontSize={10}
                                noWrap
                              >
                                {order.customer.seat}
                              </Typography>
                            }
                          </TableCell>
                          <TableCell align="right">

                          </TableCell>
                          <TableCell align="right">
                            <IconButton size='small'>
                              <MoreVertTwoToneIcon></MoreVertTwoToneIcon>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
                </Fragment>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card >
  );
};

OrdersTable.propTypes = {
  orders: PropTypes.array.isRequired
};

OrdersTable.defaultProps = {
  orders: []
};

export default OrdersTable;
