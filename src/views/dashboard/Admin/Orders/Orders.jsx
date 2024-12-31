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
  Tooltip,
  Tabs,
  Tab,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { IconCash, IconCheck, IconCircleX, IconPlus, IconReload, IconSearch, IconTrash } from '@tabler/icons';
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
import { CustomTabPanel } from 'components/shared/CustomTabPanel';

const Orders = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActivation, setOpenActivation] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState(null);
  const [rejectOpen, setRejectOpen] = useState(false);

  // const [id, setId] = useState(null);
  // const [userId, setUserId] = useState(null);
  // const [userName, setUserName] = useState(null);
  // const [userEmail, setUserEmail] = useState(null);
  // const [total, setTotal] = useState(0);
  // const [ctaAmount, setCtaAmount] = useState(0);
  // const [createAt, setCreateAt] = useState(null);

  const [walletAmount, setWalletAmount] = useState(0);
  const [showSearch, setShowSearch] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [currentOrder, setCurrentOrder] = useState(null);

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

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
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

  const handleAprobeAmount = async () => {
    try {
      const { id, amount, userId, userEmail, userName } = currentOrder;
      setOpenLoader(true);
      //Generar acreditación
      let COMISION = 1.25;
      let TOTAL = Number.parseFloat(amount) - Number.parseFloat(COMISION);
      let IVA = Number.parseFloat(TOTAL).toFixed(2) * Number.parseFloat(genConst.CONST_IVA_VAL).toFixed(2);
      let SUB = Number.parseFloat(TOTAL).toFixed(2) - Number.parseFloat(IVA).toFixed(2);
      savePaymentRecord(userId, userName, userEmail, TOTAL, IVA, SUB, genConst.CONST_STA_DEB, null, null, null);
      //Generar comisión por transacción
      //Actualizar saldos Usuario
      let NEWAMOUNT = Number.parseFloat(walletAmount) + TOTAL;
      // updateDocument(collWallet, userId, { amount: NEWAMOUNT, updateAt: fullDate() });

      //Actualizar estado de orden
      updateDocument(collOrders, id, { state: genConst.CONST_ORDER_APPROVED });
      toast.success('Orden aprobada con éxito');

      // await saveUserBenefit(userId, userName, userEmail, 0, null, null, null, NEWAMOUNT);
      handleCloseActivation();
      setCurrentOrder(null);
    } catch (error) {
      toast.error('Error al procesar la orden');
    } finally {
      setOpenLoader(false);
      getData();
    }
  };

  const handleRejectOrder = async () => {
    try {
      const { id } = currentOrder;
      setOpenLoader(true);
      //Actualizar estado de orden
      updateDocument(collOrders, id, { state: genConst.CONST_ORDER_REJECTED });
      toast.success('Orden rechazada');
      setRejectOpen(false);
      handleCloseActivation();
      setCurrentOrder(null);
    } catch (error) {
      toast.error('Error al procesar la orden');
    } finally {
      setOpenLoader(false);
      getData();
    }
  };

  return (
    <Box>
      <ToastContainer />
      <AppBar position="static" style={uiStyles.appbar}>
        <Toolbar>
          <IconButton color="inherit">
            <IconCash color="#FFF" />
          </IconButton>
          <Tooltip title="Recargar ordenes">
            <IconButton
              color="inherit"
              onClick={() => {
                getData();
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
                  .map((orderRecord) => (
                    <TableRow hover key={orderRecord.id}>
                      <TableCell align="left">{orderRecord.id}</TableCell>
                      <TableCell align="left">{orderRecord.userName}</TableCell>
                      <TableCell align="left">$ {Number.parseFloat(orderRecord.amount).toFixed(2)}</TableCell>
                      <TableCell align="left">{orderRecord.createAt}</TableCell>
                      <TableCell align="left">
                        {orderRecord.state === genConst.CONST_ORDER_PENDING ? (
                          <Badge color="info" sx={{ '& .MuiBadge-badge': { color: '#fff' } }} badgeContent={'PENDIENTE'} />
                        ) : orderRecord.state === genConst.CONST_ORDER_APPROVED ? (
                          <Badge color="success" sx={{ '& .MuiBadge-badge': { color: '#fff' } }} badgeContent={'APROBADO'} />
                        ) : (
                          <Badge color="error" sx={{ '& .MuiBadge-badge': { color: '#fff' } }} badgeContent={'RECHAZADO'} />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <ButtonGroup variant="contained">
                          <Tooltip title="Aprobar">
                            <Button
                              style={{ backgroundColor: genConst.CONST_UPDATE_COLOR }}
                              onClick={() => {
                                setCurrentOrder(orderRecord);
                                setOpenActivation(true);
                              }}
                            >
                              <IconCheck />
                            </Button>
                          </Tooltip>
                          {/* <Tooltip title="Eliminar">
                            <Button
                              style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                              onClick={() => {
                                setTitle(titles.titleDelete);
                                // setId(orderRecord.id);
                                setCurrentOrder(orderRecord);
                                handleOpenDelete();
                              }}
                            >
                              <IconTrash />
                            </Button>
                          </Tooltip> */}
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
            {titles.titleDeleteModal} <strong>{currentOrder?.id}</strong>
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
      <Dialog
        open={rejectOpen}
        onClose={() => setRejectOpen(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle
          style={{
            fontWeight: 'bold',
            fontSize: 18,
            textAlign: 'center'
          }}
        >
          {'Confirmar acción'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-description"
            style={{
              fontWeight: 'normal',
              fontSize: 15,
              textAlign: 'center'
            }}
          >
            ¿Está seguro de rechazar la orden de pago?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRejectOpen(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            variant="contained"
            size="large"
            style={{ margin: 5, borderRadius: 10, backgroundColor: genConst.CONST_DELETE_COLOR }}
            onClick={handleRejectOrder}
          >
            Rechazar
          </Button>
        </DialogActions>
      </Dialog>
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
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab label="Usuario" />
                <Tab label="Cuenta bancaria" />
              </Tabs>
            </Box>
            <CustomTabPanel value={currentTab} index={0}>
              <p style={{ fontSize: 13 }}>Usuario: {currentOrder?.userId}</p>
              <p style={{ fontSize: 13 }}>Usuario: {currentOrder?.userName}</p>
              <p style={{ fontSize: 13 }}>Email: {currentOrder?.userEmail}</p>
              <p style={{ fontSize: 13 }}>Fecha: {currentOrder?.createAt}</p>
              <p style={{ fontSize: 13 }}>Saldo Usuario: ${Number.parseFloat(currentOrder?.ctaAmount).toFixed(2)}</p>
              <p style={{ fontSize: 13 }}>Total: ${Number.parseFloat(currentOrder?.amount).toFixed(2)}</p>
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={1}>
              <p style={{ fontSize: 13 }}>N° cuenta: {currentOrder?.accountNumber}</p>
              <p style={{ fontSize: 13 }}>Tipo: {currentOrder?.accountType}</p>
              <p style={{ fontSize: 13 }}>N° cédula: {currentOrder?.beneficiaryDni}</p>
              <p style={{ fontSize: 13 }}>Beneficiario: {currentOrder?.beneficiaryName}</p>
              <p style={{ fontSize: 13 }}>Institución: {currentOrder?.bankName}</p>
            </CustomTabPanel>
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
                          style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                          onClick={() => setRejectOpen(true)}
                        >
                          {titles.buttonReject}
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
