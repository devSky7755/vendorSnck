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

interface OrdersNewTableProps {
  className?: string;
  orders: Order[];
  onSelectionChanged: Function
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
  filter: OrderFilter,
  orders: Order[];
}

const OrdersNewTable: FC<OrdersNewTableProps> = ({ orders, onSelectionChanged }) => {
  const [groupedOrders, setGroupedOrders] = useState<GroupedOrder[]>([]);

  const [selectedOrders, setSelectedOrders] = useState<number[]>(
    []
  );
  const [expanded, setExpanded] = useState<string[]>([]);

  useEffect(() => {
    const steps = [0, 300, 900, 1500];
    const group_names = ['12:00 PM', '12:10 PM', '12:20PM'];
    let grouped: GroupedOrder[] = [];
    steps.forEach((due, id) => {
      if (id === steps.length - 1) return;
      const filtered = orders.filter(x => x.due_time >= due && x.due_time < steps[id + 1]);
      grouped.push({
        name: group_names[id],
        desc: `${steps[id + 1] / 60} mins`,
        filter: {
          property: 'due_time',
          is_number: true,
          lower: due,
          upper: steps[id + 1],
        },
        orders: filtered
      });
    });
    setGroupedOrders(grouped);
    setExpanded(group_names);
  }, [orders])

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

  useEffect(() => {
    onSelectionChanged(selectedOrders);
  }, [selectedOrders])

  const selectedSomeOrders =
    selectedOrders.length > 0 &&
    selectedOrders.length < orders.length;
  const selectedAllOrders =
    selectedOrders.length === orders.length;

  return (
    <Card>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
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
              <TableCell>Order Type</TableCell>
              <TableCell>Waiting</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell align="right">
                <Switch></Switch> Pre-orders
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
                    <TableCell padding="checkbox">
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
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {group.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Typography
                        variant="body1"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        <b>{group.orders.length}</b> orders due in <b>{group.desc}</b>
                      </Typography>
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
                    isExpanded && group.orders.map(order => {
                      const isOrderSelected = selectedOrders.includes(order.id);
                      const hasAlchol = order.items && order.items.find(x => x.isAlchol);
                      return (
                        <TableRow
                          hover
                          key={order.id}
                        >
                          <TableCell padding="checkbox">
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
                            <Typography
                              variant="body1"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              #{order.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <div className='d-inline-flex'>
                              <Typography
                                variant="body1"

                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                {order.item_count}
                              </Typography>
                              {
                                hasAlchol &&
                                <Typography variant='caption' className='border-warning alchol-label' color='#FF864E' sx={{ ml: 2, px: 1 }} gutterBottom
                                  noWrap>
                                  ALCHOL
                                </Typography>
                              }
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className='d-inline-flex'>
                              <Typography
                                variant="body1"
                                color="text.primary"
                                gutterBottom
                                noWrap
                              >
                                {order.order_type}
                              </Typography>
                              {
                                order.order_type === 'Delivery' && <DirectionsRunIcon sx={{ ml: 1 }} color='disabled' fontSize='small' />
                              }
                            </div>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
                              color="text.primary"
                              gutterBottom
                              noWrap
                            >
                              {Math.floor(order.waiting / 60)} mins
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography
                              variant="body1"
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

OrdersNewTable.propTypes = {
  orders: PropTypes.array.isRequired
};

OrdersNewTable.defaultProps = {
  orders: []
};

export default OrdersNewTable;
