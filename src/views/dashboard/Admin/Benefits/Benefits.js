/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Grid,
  Box,
  Tabs,
  Tab,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { uiStyles } from './Benefits.styles';
//Notifications
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Collections
import { titles } from './Benefits.texts';
//Utils
import {
  getAllPayments,
  getAllUserBenefits,
  getBenefits,
  getTotalBenefit,
  getTotalBenefitPay,
  getTotalBenefitPending,
  getTotalPayments
} from 'config/firebaseEvents';
//types array
import MessageDark from 'components/message/MessageDark';
import EarningCard from 'components/cards/EarningCard';
import EarningBlueCard from 'components/cards/EarningBlueCard';
import { genConst } from 'store/constant';
import EarningRedCard from 'components/cards/EarningRedCard';
import EarningGreenCard from 'components/cards/EarningGreenCard';

export default function Benefits() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pagek, setPageK] = useState(0);
  const [rowsPerPageK, setRowsPerPageK] = useState(10);
  const [pageU, setPageU] = useState(0);
  const [rowsPerPageU, setRowsPerPageU] = useState(10);
  const [total, setTotal] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [dataPayments, setDataPayments] = useState([]);
  const [dataListUsr, setDataListUsr] = useState([]);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const getData = async () => {
    getBenefits().then((res) => {
      setDataList(res);
    });
    getAllUserBenefits().then((res) => {
      setDataListUsr(res);
    });
    getAllPayments().then((res) => {
      setDataPayments(res);
    });
    getTotalPayments().then((res) => {
      setTotalPayments(Number.parseFloat(res).toFixed(2));
    });
    getTotalBenefit().then((res) => {
      setTotal(Number.parseFloat(res).toFixed(2));
    });
    getTotalBenefitPending().then((res) => {
      setTotalPending(Number.parseFloat(res).toFixed(2));
    });
    getTotalBenefitPay().then((res) => {
      setTotalPay(Number.parseFloat(res).toFixed(2));
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChangePageK = (event, newPage) => {
    setPageK(newPage);
  };

  const handleChangeRowsPerPageK = (event) => {
    setRowsPerPageK(+event.target.value);
    setPageK(0);
  };

  const handleChangePageU = (event, newPage) => {
    setPageU(newPage);
  };

  const handleChangeRowsPerPageU = (event) => {
    setRowsPerPageU(+event.target.value);
    setPageU(0);
  };

  return (
    <div>
      <ToastContainer />
      {dataList.length > 0 ? (
        <Paper sx={uiStyles.paper}>
          <Grid container spacing={1} sx={{ p: 2 }}>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item lg={3} md={6} sm={6} xs={6}>
                  <EarningCard total={totalPayments} detail="Ingresos" />
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={6}>
                  <EarningBlueCard total={total} detail="Beneficio" />
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={6}>
                  <EarningGreenCard total={totalPay} detail="Pagado" />
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={6}>
                  <EarningRedCard total={totalPending} detail="Pendiente" />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Box sx={{ width: '100%', mt: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Total Ingresos" />
                <Tab label="Beneficios Khuska" />
                <Tab label="Beneficios Usuario" />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell key="id-createAt" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {'ID'}
                      </TableCell>
                      <TableCell key="id-name" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {'Usuario'}
                      </TableCell>
                      <TableCell key="id-email" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {'createAt'}
                      </TableCell>
                      <TableCell key="id-total" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {'total'}
                      </TableCell>
                      <TableCell key="id-actions" align="center" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {titles.actions}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataPayments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r) => (
                      <TableRow hover key={r.id}>
                        <TableCell align="left">{r.id}</TableCell>
                        <TableCell align="left">{r.nameUser}</TableCell>
                        <TableCell align="left">{r.createAt}</TableCell>
                        <TableCell align="left">{Number.parseFloat(r.total).toFixed(2)}</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                labelRowsPerPage={titles.rowsPerPage}
                component="div"
                count={dataPayments.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <TableContainer sx={{ maxHeight: 400 }}>
                <Table stickyHeader aria-label="sticky table">
                  <TableHead>
                    <TableRow>
                      <TableCell key="id-createAt" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {'De'}
                      </TableCell>
                      <TableCell key="id-name" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {'Email'}
                      </TableCell>
                      <TableCell key="id-email" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {'Fecha'}
                      </TableCell>
                      <TableCell key="id-total" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {'Total'}
                      </TableCell>
                      <TableCell key="id-actions" align="center" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {titles.actions}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataList.slice(pagek * rowsPerPageK, pagek * rowsPerPageK + rowsPerPageK).map((r) => (
                      <TableRow hover key={r.id}>
                        <TableCell align="left">{r.nameUser}</TableCell>
                        <TableCell align="left">{r.enailUser}</TableCell>
                        <TableCell align="left">{r.createAt}</TableCell>
                        <TableCell align="left">{Number.parseFloat(r.total).toFixed(2)}</TableCell>
                        <TableCell align="center"></TableCell>
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
                rowsPerPage={rowsPerPageK}
                page={pagek}
                onPageChange={handleChangePageK}
                onRowsPerPageChange={handleChangeRowsPerPageK}
              />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
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
                      <TableCell key="id-state" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {'Estado'}
                      </TableCell>
                      <TableCell key="id-total" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {'Total'}
                      </TableCell>
                      <TableCell key="id-actions" align="center" style={{ minWidth: 100, fontWeight: 'bold' }}>
                        {titles.actions}
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {dataListUsr.slice(pageU * rowsPerPageU, pageU * rowsPerPageU + rowsPerPageU).map((r) => (
                      <TableRow hover key={r.id}>
                        <TableCell align="left">{r.nameUser}</TableCell>
                        <TableCell align="left">{r.nameRefer}</TableCell>
                        <TableCell align="left">{r.level}</TableCell>
                        <TableCell align="left">{r.createAt}</TableCell>
                        <TableCell align="left">
                          {r.state == genConst.CONST_BEN_CAN ? 'Cancelado' : r.state == genConst.CONST_BEN_PAI ? 'Pagado' : 'Pendiente'}
                        </TableCell>
                        <TableCell align="left">{Number.parseFloat(r.total).toFixed(2)}</TableCell>
                        <TableCell align="center"></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                labelRowsPerPage={titles.rowsPerPage}
                component="div"
                count={dataListUsr.length}
                rowsPerPage={rowsPerPageU}
                page={pageU}
                onPageChange={handleChangePageU}
                onRowsPerPageChange={handleChangeRowsPerPageU}
              />
            </CustomTabPanel>
          </Box>
        </Paper>
      ) : (
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <MessageDark message={titles.noRecordsYet} submessage="" />
            </Grid>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};
