import { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import { titles } from './Benefits.texts';
import { searchingBenefit } from 'utils/search';
import { genConst } from 'store/constant';

export const UserBenefitsTable = ({ dataList, search }) => {
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
                {'De'}
              </TableCell>
              <TableCell key="id-to" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                {'Para'}
              </TableCell>
              <TableCell key="id-level" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                {'Level'}
              </TableCell>
              <TableCell key="id-createAt" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                {'Fecha'}
              </TableCell>
              <TableCell key="id-state" align="left" style={{ minWidth: 100, fontWeight: 'bold', display: 'none' }}>
                {'Estado'}
              </TableCell>
              <TableCell key="id-total" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                {'Total'}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataList
              .filter(searchingBenefit(search))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((r) => (
                <TableRow hover key={r.id}>
                  <TableCell align="left">{r.nameUser}</TableCell>
                  <TableCell align="left">{r.nameRefer}</TableCell>
                  <TableCell align="left">{r.level}</TableCell>
                  <TableCell align="left">{r.createAt}</TableCell>
                  <TableCell align="left" style={{ display: 'none' }}>
                    {r.state == genConst.CONST_BEN_CAN ? 'Cancelado' : r.state == genConst.CONST_BEN_PAI ? 'Pagado' : 'Pendiente'}
                  </TableCell>
                  <TableCell align="left">{Number.parseFloat(r.total).toFixed(2)}</TableCell>
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

UserBenefitsTable.propTypes = {
  dataList: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired
};
