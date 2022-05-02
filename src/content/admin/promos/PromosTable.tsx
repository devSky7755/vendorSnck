import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Card,
  IconButton,
  Table,
  Menu,
  MenuItem,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableContainer,
  Checkbox,
  Switch,
  styled
} from '@mui/material';

import MoreVertTwoToneIcon from '@mui/icons-material/MoreVertTwoTone';
import { Promo } from 'src/models/promo';

interface PromosTableProps {
  className?: string;
  promos: Promo[];
  onAction: Function;
  onSelectionChanged: Function;
  onPromoPatch: Function;
}

const URLTableCell = styled(TableCell)(
  ({ theme }) => `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
);

const PromosTable: FC<PromosTableProps> = ({
  promos,
  onAction,
  onSelectionChanged,
  onPromoPatch
}) => {
  const [actionID, setActionID] = useState<string>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedPromos, setSelectedPromos] = useState<string[]>([]);

  useEffect(() => {
    setSelectedPromos([]);
  }, [promos]);

  useEffect(() => {
    onSelectionChanged(selectedPromos);
  }, [selectedPromos]);

  const handleClickAction = (
    event: React.MouseEvent<HTMLButtonElement>,
    promoId: string
  ) => {
    setActionID(promoId);
    setAnchorEl(event.currentTarget);
  };

  const handleCloseAction = (action: string, promo: Promo) => {
    setAnchorEl(null);
    onAction(action, promo);
  };

  const handleSelectOne = (
    event: ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    if (!selectedPromos.includes(id)) {
      setSelectedPromos((prevSelected) => [...prevSelected, id]);
    } else {
      setSelectedPromos((prevSelected) => prevSelected.filter((x) => x !== id));
    }
  };

  const handlePromoPatch = (promo, key, value) => {
    onPromoPatch(promo, key, value);
  };

  return (
    <Card>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox" style={{ height: 52 }}></TableCell>
              <TableCell>Code</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Value</TableCell>
              <TableCell>Usage</TableCell>
              <TableCell>Commences</TableCell>
              <TableCell>Expires</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {promos.map((promo, index) => {
              const isSelected = selectedPromos.includes(promo.id);
              const value = promo.value || 0;
              const commences = promo.commences
                ? new Date(promo.commences).toLocaleString()
                : '';
              const expires = promo.expires
                ? new Date(promo.expires).toLocaleString()
                : '';
              return (
                <TableRow hover key={promo.id}>
                  <TableCell padding="checkbox" style={{ height: 52 }}>
                    <Checkbox
                      size="small"
                      color="primary"
                      checked={isSelected}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleSelectOne(event, promo.id)
                      }
                    />
                  </TableCell>
                  <TableCell>{promo.code}</TableCell>
                  <TableCell>{promo.type}</TableCell>
                  <TableCell>
                    {promo.type === 'percentage'
                      ? value.toFixed(2) + '%'
                      : '$' + value.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    {promo.multipleUse ? 'Multiple use' : 'One time use'}
                  </TableCell>
                  <TableCell>{commences}</TableCell>
                  <TableCell>{expires}</TableCell>
                  <TableCell align="right" padding="checkbox">
                    <IconButton
                      size="small"
                      onClick={(event) => {
                        handleClickAction(event, promo.id);
                      }}
                    >
                      <MoreVertTwoToneIcon fontSize="small" />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      open={anchorEl !== null && actionID === promo.id}
                      onClose={() => {
                        handleCloseAction('None', promo);
                      }}
                      MenuListProps={{
                        'aria-labelledby': 'basic-button'
                      }}
                    >
                      <MenuItem
                        onClick={() => handleCloseAction('Edit', promo)}
                      >
                        Edit
                      </MenuItem>
                      <MenuItem
                        onClick={() => handleCloseAction('Delete', promo)}
                      >
                        Delete
                      </MenuItem>
                    </Menu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
};

export default PromosTable;
