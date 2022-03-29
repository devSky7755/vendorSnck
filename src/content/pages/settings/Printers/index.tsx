import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import PageTitleWrapper from 'src/components/PageTitleWrapper';
import { Box, styled, TextField, InputAdornment, Tabs, Tab } from '@mui/material';
import Footer from 'src/components/Footer';
import { useState } from 'react';
import SearchTwoTone from '@mui/icons-material/SearchTwoTone';
import { Printer, PrintQueue } from 'src/models/printer';
import PrintersTable from './PrintersTable';
import EditPrinterDialog from './EditPrinter';
import PrintQueuesTable from './PrintQueueTable';

const SearchWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(1)} ${theme.spacing(2)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

const TableWrapper = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(0)};
        background: white;
        border: 1px solid ${theme.general.borderColor};
`
);

const tempPrinters: Printer[] = [
  {
    id: 0,
    name: 'Packers A',
    model: 'STAR TSP-143',
    address: '192.168.1.10',
    port: 80,
    status: 'Connected',
    usages: []
  },
  {
    id: 1,
    name: 'Delivery Dispatch Center',
    model: 'STAR TSP-143',
    address: '192.168.1.10',
    port: 80,
    status: 'Connected',
    usages: []
  }
];

const tempQueue: PrintQueue[] = [
  {
    id: '#001-1640097013258',
    printer_id: 0,
    printer_name: 'Packers A',
    status: 'Printing',
    timestamp: 1640097013258,
    time_string: '1 min ago',
  },
  {
    id: '#001-1640097013245',
    printer_id: 0,
    printer_name: 'Packers A',
    status: 'In queue',
    timestamp: 1640097013245,
    time_string: '2 min ago',
  },
]


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      {...other}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

function PrintersSetting() {
  const [tabValue, setTabValue] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [printers, setPrinters] = useState(tempPrinters);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const onToggleSearch = () => {
    setShowSearch(!showSearch);
  }

  const onAddPrinter = () => {
    setEditing({
      role: 'Admin'
    });
    setEditOpen(true);
  }

  const onEditing = (printer) => {
    setEditing(printer);
    setEditOpen(true);
  }

  const onEdit = (printer) => {
    setEditOpen(false);
  }

  return (
    <>
      <Helmet>
        <title>Printers</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader onAddPrinter={onAddPrinter} />
      </PageTitleWrapper>
      <Box>
        {
          editOpen && editing &&
          <EditPrinterDialog
            printer={editing}
            open={editOpen}
            onClose={onEdit}
          />
        }
        <Box style={{ background: 'white' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="PRINTERS" />
            <Tab label="PRINTER QUEUE" />
          </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          <TableWrapper>
            <PrintersTable printers={printers} onEditingPrinter={(printer) => onEditing(printer)} />
          </TableWrapper>
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {
            showSearch &&
            <SearchWrapper>
              <TextField InputProps={{
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchTwoTone />
                  </InputAdornment>
                )
              }}
                type='search' variant='standard' fullWidth placeholder='Search by ID, printer'></TextField>
            </SearchWrapper>
          }
          <TableWrapper>
            <PrintQueuesTable printQueues={tempQueue} />
          </TableWrapper>
        </TabPanel>

      </Box>
      <Footer />
    </>
  );
}

export default PrintersSetting;
