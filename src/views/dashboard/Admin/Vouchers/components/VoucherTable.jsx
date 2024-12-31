import { useState } from 'react';
import {
  Badge,
  Button,
  ButtonGroup,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow
} from '@mui/material';
import PropTypes from 'prop-types';
import { IconEdit, IconFile } from '@tabler/icons';
import { uiStyles } from '../Voucher.styles';
import { titles } from '../Vouchers.texts';
import { genConst, VOUCHER_STATUS } from 'store/constant';
import { searchingVoucher } from 'utils/search';

export const VoucherTable = ({ vouchers, setSelectedVoucher, search }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const statusColor = (status) => {
    return status === VOUCHER_STATUS.APROBADO ? 'success' : status === VOUCHER_STATUS.RECHAZADO ? 'error' : 'info';
  };

  return (
    <Paper sx={uiStyles.paper}>
      <TableContainer sx={{ maxHeight: 500 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key="id-id" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                {titles.tableCell1}
              </TableCell>
              <TableCell key="id-user" align="left" style={{ minWidth: 150, fontWeight: 'bold' }}>
                {titles.tableCell2}
              </TableCell>
              <TableCell key="id-email" align="left" style={{ minWidth: 150, fontWeight: 'bold' }}>
                {titles.tableCell3}
              </TableCell>
              <TableCell key="id-date" align="left" style={{ minWidth: 75, fontWeight: 'bold' }}>
                {titles.tableCell4}
              </TableCell>
              <TableCell key="id-status" align="left" style={{ minWidth: 75, fontWeight: 'bold' }}>
                {titles.tableCell5}
              </TableCell>
              <TableCell key="id-actions" align="center" style={{ minWidth: 125, fontWeight: 'bold' }}>
                {titles.tableCellActions}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {vouchers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No hay datos disponibles
                </TableCell>
              </TableRow>
            ) : (
              vouchers
                .filter(searchingVoucher(search))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((voucherItem) => (
                  <TableRow hover key={voucherItem.id}>
                    <TableCell align="left">{voucherItem.id}</TableCell>
                    <TableCell align="left">{voucherItem.userName}</TableCell>
                    <TableCell align="left">{voucherItem.userEmail}</TableCell>
                    <TableCell align="left">{voucherItem.createAt}</TableCell>
                    <TableCell align="center">
                      <Badge
                        color={statusColor(voucherItem.status)}
                        sx={{
                          '& .MuiBadge-badge': {
                            color: '#fff'
                          }
                        }}
                        badgeContent={voucherItem.status}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup variant="contained">
                        <Button
                          style={{ backgroundColor: genConst.CONST_INFO_COLOR }}
                          onClick={() => {
                            setSelectedVoucher({
                              ...voucherItem,
                              title: titles.titleVoucher
                            });
                          }}
                        >
                          <IconFile />
                        </Button>
                        {/* <Button
                          style={{ backgroundColor: genConst.CONST_UPDATE_COLOR }}
                          onClick={() => {
                            // setId(voucherItem.id);
                            // setTitle(titles.titleUpdate);
                          }}
                        >
                          <IconEdit />
                        </Button> */}
                        {/* <Button
                            style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                            onClick={() => {
                              setTitle(titles.titleDelete);
                              setId(r.id);
                              handleOpenDelete();
                            }}
                          >
                            <IconTrash />
                          </Button> */}
                      </ButtonGroup>
                    </TableCell>
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        labelRowsPerPage={titles.maxRecords}
        component="div"
        count={vouchers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

VoucherTable.propTypes = {
  vouchers: PropTypes.array.isRequired,
  setSelectedVoucher: PropTypes.func.isRequired
};
