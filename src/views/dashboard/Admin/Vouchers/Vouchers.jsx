import React, { useEffect, useState } from 'react';
import { AppBar, Box, OutlinedInput, Toolbar, Typography, IconButton, Tooltip } from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IconReload, IconSearch, IconTicket } from '@tabler/icons';
import { uiStyles } from './Voucher.styles';
import { inputLabels } from './Vouchers.texts';
import { getVouchers } from 'config/firebaseEvents';
import { VoucherViewTabs } from 'views/dashboard/Admin/Vouchers/components/VoucherViewTabs';

const Vouchers = () => {
  const [vouchers, setVouchers] = useState([]);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    fetchVouchers();
  }, []);

  const fetchVouchers = async () => {
    getVouchers().then((vou) => {
      setVouchers(vou);
    });
  };

  return (
    <Box>
      <ToastContainer />
      <AppBar position="static" style={uiStyles.appbar}>
        <Toolbar>
          <IconButton color="inherit">
            <IconTicket color="#FFF" />
          </IconButton>
          <Tooltip title="Recargar comprobantes">
            <IconButton
              color="inherit"
              onClick={() => {
                fetchVouchers();
              }}
            >
              <IconReload />
            </IconButton>
          </Tooltip>
          {/* <Tooltip title="Agregar Voucher">
            <IconButton
              color="inherit"
              onClick={() => {
                console.log('Add');
              }}
            >
              <IconPlus />
            </IconButton>
          </Tooltip> */}
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#FFF' }} align="center">
            Comprobantes
          </Typography>
          <Tooltip title="Buscar">
            <IconButton
              color="inherit"
              onClick={() => {
                setShowSearch(!showSearch);
              }}
            >
              <IconSearch />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      {showSearch && (
        <Box sx={{ flexGrow: 0 }}>
          {vouchers.length > 0 ? (
            <OutlinedInput
              id={inputLabels.search}
              type="text"
              name={inputLabels.search}
              onChange={(ev) => setSearch(ev.target.value)}
              placeholder={inputLabels.placeHolderSearch}
              style={{ width: '100%', marginTop: 10 }}
            />
          ) : (
            <></>
          )}
        </Box>
      )}
      <VoucherViewTabs vouchers={vouchers} fetchVouchers={fetchVouchers} search={search} />
    </Box>
  );
};

export default Vouchers;
