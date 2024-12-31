import { useState } from 'react';
import PropTypes from 'prop-types';
import { Badge, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { titles } from './Benefits.texts';
import { genConst } from 'store/constant';

export const OrdersTable = ({ dataList }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <TableContainer sx={{ maxHeight: 400 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell key="id-from" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                {'Id'}
              </TableCell>
              <TableCell key="id-to" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                {'Fecha'}
              </TableCell>
              <TableCell key="id-level" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                {'Monto'}
              </TableCell>
              <TableCell key="id-createAt" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                {'Estado'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList
              // .filter(searchingBenefit(search))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((orderItem) => (
                <TableRow hover key={orderItem.id}>
                  <TableCell align="left">{orderItem.id}</TableCell>
                  <TableCell align="left">{orderItem.createAt}</TableCell>
                  <TableCell align="left">{Number.parseFloat(orderItem.amount).toFixed(2)}</TableCell>
                  <TableCell align="left">
                    {orderItem.state === genConst.CONST_ORDER_PENDING ? (
                      <Badge color="info" sx={{ '& .MuiBadge-badge': { color: '#fff' } }} badgeContent={'PENDIENTE'} />
                    ) : orderItem.state === genConst.CONST_ORDER_APPROVED ? (
                      <Badge color="success" sx={{ '& .MuiBadge-badge': { color: '#fff' } }} badgeContent={'APROBADO'} />
                    ) : (
                      <Badge color="error" sx={{ '& .MuiBadge-badge': { color: '#fff' } }} badgeContent={'RECHAZADO'} />
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50, 100]}
        labelRowsPerPage={titles.rowsPerPage}
        component="div"
        count={dataList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
};

OrdersTable.propTypes = {
  dataList: PropTypes.array.isRequired
};
