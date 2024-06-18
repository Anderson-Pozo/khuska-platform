import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  ButtonGroup,
  Grid,
  Modal,
  OutlinedInput,
  Paper,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Toolbar,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { IconCash, IconCheck, IconCircleX, IconPlus, IconSearch, IconTrash } from '@tabler/icons';
import { uiStyles } from './Orders.styles';
import { inputLabels, titles } from './Orders.texts';
import { getOrders, getUserAmountFromWallet, savePaymentRecord, updateDocument } from 'config/firebaseEvents';
import MessageDark from 'components/message/MessageDark';
import { searchingVoucher } from 'utils/search';
import { genConst } from 'store/constant';
import { collOrders, collWallet } from 'store/collections';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { fullDate } from 'utils/validations';

const Orders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActivation, setOpenActivation] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState(null);
  const [id, setId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [total, setTotal] = useState(0);
  const [ctaAmount, setCtaAmount] = useState(0);
  const [walletAmount, setWalletAmount] = useState(0);
  const [createAt, setCreateAt] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    getOrders().then((vou) => {
      setOrders(vou);
    });
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        getUserAmountFromWallet(user.uid).then((res) => {
          setWalletAmount(res);
        });
      }
    });
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleCloseActivation = () => {
    setOpenActivation(false);
  };

  const handleDelete = () => {
    setOpenLoader(true);
  };

  const handleAprobeAmount = () => {
    //Generar acreditación
    let COMISION = 1.25;
    let TOTAL = Number.parseFloat(total) - Number.parseFloat(COMISION);
    let IVA = Number.parseFloat(TOTAL).toFixed(2) * Number.parseFloat(genConst.CONST_IVA_VAL).toFixed(2);
    let SUB = Number.parseFloat(TOTAL).toFixed(2) - Number.parseFloat(IVA).toFixed(2);
    savePaymentRecord(userId, userName, userEmail, TOTAL, IVA, SUB, 'D');
    //Generar comisión por transacción
    //Actualizar saldos Usuario
    let NEWAMOUNT = Number.parseFloat(walletAmount) + TOTAL;
    updateDocument(collWallet, userId, { amount: NEWAMOUNT, updateAt: fullDate() });
    //Actualizar estado de orden
    updateDocument(collOrders, id, { state: 2 });
  };

  return (
    <Box>
      <ToastContainer />
      <AppBar position="static" style={uiStyles.appbar}>
        <Toolbar>
          <IconButton color="inherit">
            <IconCash color="#FFF" />
          </IconButton>
          <Tooltip title="Agregar Voucher">
            <IconButton
              color="inherit"
              onClick={() => {
                console.log('Add');
              }}
            >
              <IconPlus />
            </IconButton>
          </Tooltip>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#FFF' }} align="center">
            Ordenes de Pago
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
          {orders.length > 0 ? (
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
      {orders.length > 0 ? (
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
                  <TableCell key="id-amount" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {titles.tableCell5}
                  </TableCell>
                  <TableCell key="id-date" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {titles.tableCell4}
                  </TableCell>
                  <TableCell key="id-state" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {titles.tableCell6}
                  </TableCell>
                  <TableCell key="id-actions" align="center" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {titles.tableCellActions}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {orders
                  .filter(searchingVoucher(search))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((r) => (
                    <TableRow hover key={r.id}>
                      <TableCell align="left">{r.id}</TableCell>
                      <TableCell align="left">{r.userName}</TableCell>
                      <TableCell align="left">$ {r.amount}</TableCell>
                      <TableCell align="left">{r.createAt}</TableCell>
                      <TableCell align="left">{r.state == 1 ? 'Pendiente' : 'Aprobado'}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup variant="contained">
                          <Tooltip title="Aprobar">
                            <Button
                              style={{ backgroundColor: genConst.CONST_UPDATE_COLOR }}
                              onClick={() => {
                                setId(r.id);
                                setUserId(r.userId);
                                setUserName(r.userName);
                                setUserEmail(r.userEmail);
                                setTotal(r.amount);
                                setCtaAmount(r.ctaAmount);
                                setCreateAt(r.createAt);
                                setOpenActivation(true);
                              }}
                            >
                              <IconCheck />
                            </Button>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <Button
                              style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                              onClick={() => {
                                setTitle(titles.titleDelete);
                                setId(r.id);
                                handleOpenDelete();
                              }}
                            >
                              <IconTrash />
                            </Button>
                          </Tooltip>
                        </ButtonGroup>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            labelRowsPerPage={titles.maxRecords}
            component="div"
            count={orders.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <MessageDark message={titles.loading} submessage="" />
            </Grid>
          </Grid>
        </Grid>
      )}

      <Modal open={openDelete} onClose={handleCloseDelete} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.modalStylesDelete}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 20, fontSize: 16 }}>
            {titles.titleDeleteModal} <strong>{id}</strong>
          </Typography>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      startIcon={<IconCheck />}
                      size="large"
                      style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                      onClick={handleDelete}
                    >
                      {titles.buttonDelete}
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<IconCircleX />}
                      size="large"
                      style={{ backgroundColor: genConst.CONST_CANCEL_COLOR }}
                      onClick={handleCloseDelete}
                    >
                      {titles.buttonCancel}
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal
        open={openActivation}
        onClose={handleCloseActivation}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <center>
          <Box sx={uiStyles.modalStylesDelete}>
            <Typography id="modal-modal-title" variant="h2" component="h2">
              {titles.titleActivation}
            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p">
              {titles.titleActivationModal}
            </Typography>
            <p style={{ fontSize: 13 }}>Usuario: {userId}</p>
            <p style={{ fontSize: 13 }}>Usuario: {userName}</p>
            <p style={{ fontSize: 13 }}>Email: {userEmail}</p>
            <p style={{ fontSize: 13 }}>Fecha: {createAt}</p>
            <p style={{ fontSize: 13 }}>Saldo Usuario: ${Number.parseFloat(ctaAmount).toFixed(2)}</p>
            <p style={{ fontSize: 13 }}>Total: ${Number.parseFloat(total).toFixed(2)}</p>
            <Grid container style={{ marginTop: 10 }}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <center>
                      <ButtonGroup>
                        <Button
                          variant="contained"
                          startIcon={<IconCheck />}
                          size="large"
                          style={{ backgroundColor: genConst.CONST_UPDATE_COLOR }}
                          onClick={handleAprobeAmount}
                        >
                          {titles.buttonActive}
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<IconCircleX />}
                          size="large"
                          style={{ backgroundColor: genConst.CONST_CANCEL_COLOR }}
                          onClick={handleCloseActivation}
                        >
                          {titles.buttonCancel}
                        </Button>
                      </ButtonGroup>
                    </center>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </center>
      </Modal>
      <Modal open={openLoader} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.modalStylesLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </Box>
  );
};

export default Orders;
