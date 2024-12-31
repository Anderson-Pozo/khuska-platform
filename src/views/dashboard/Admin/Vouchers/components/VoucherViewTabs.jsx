import { useState } from 'react';
import { Box, Tab, Tabs } from '@mui/material';
import PropTypes from 'prop-types';
import { CustomTabPanel } from 'components/shared/CustomTabPanel';
import { VOUCHER_STATUS } from 'store/constant';
import { VoucherTable } from './VoucherTable';
import { VoucherDetailModal } from './VoucherDetailModal';

export const VoucherViewTabs = ({ vouchers, fetchVouchers, search }) => {
  const [value, setValue] = useState(0);
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleVoucherSelect = (voucher) => {
    setSelectedVoucher(voucher);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedVoucher(null);
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Pendientes" />
          <Tab label="Aprobados" />
          <Tab label="Rechazados" />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <VoucherTable
          vouchers={vouchers.filter((voucher) => voucher.status === VOUCHER_STATUS.PENDIENTE)}
          setSelectedVoucher={handleVoucherSelect}
          search={search}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <VoucherTable
          vouchers={vouchers.filter((voucher) => voucher.status === VOUCHER_STATUS.APROBADO)}
          setSelectedVoucher={handleVoucherSelect}
          search={search}
        />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <VoucherTable
          vouchers={vouchers.filter((voucher) => voucher.status === VOUCHER_STATUS.RECHAZADO)}
          setSelectedVoucher={handleVoucherSelect}
          search={search}
        />
      </CustomTabPanel>

      {selectedVoucher && (
        <VoucherDetailModal
          voucher={selectedVoucher}
          openView={openModal}
          handleCloseView={handleCloseModal}
          fetchVouchers={fetchVouchers}
        />
      )}
    </Box>
  );
};

VoucherViewTabs.propTypes = {
  vouchers: PropTypes.array.isRequired,
  fetchVouchers: PropTypes.func.isRequired,
  search: PropTypes.string
};
