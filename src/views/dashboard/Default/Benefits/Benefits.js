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
  CircularProgress,
  Modal,
  AppBar,
  Toolbar,
  OutlinedInput,
  IconButton,
  Typography,
  Tooltip,
  ButtonGroup,
  Button
} from '@mui/material';
import { uiStyles } from './Benefits.styles';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Collections
import { inputLabels, titles } from './Benefits.texts';
//Utils
import { createDocument, getTotalPaidBenefitByUserId, getTotalPendinBenefitByUserId, getUserBenefits } from 'config/firebaseEvents';
import SubscriptionState from 'components/message/SubscriptionState';
//types array
import MessageDark from 'components/message/MessageDark';
import { genConst } from 'store/constant';
import EarningBlueCard from 'components/cards/EarningBlueCard';
import EarningYellowCard from 'components/cards/EaringYellowCard';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { msgSubState } from 'store/message';
import { useGetSubscriptionState } from 'hooks/useGetSubscriptionState';
import { IconCheck, IconCircleX, IconFileDollar, IconPlus, IconSearch } from '@tabler/icons';
import { searchingBenefit } from 'utils/search';
import { generateId } from 'utils/idGenerator';
import { fullDate } from 'utils/validations';
import { collOrders } from 'store/collections';

export default function Benefits() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalP, setTotalP] = useState(0);
  const [totalPN, setTotalPN] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [amount, setAmount] = useState(0);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const stateSub = useGetSubscriptionState();

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setOpen(true);
        setUserId(user.uid);
        setUserName(user.displayName);
        setUserEmail(user.email);
        getUserBenefits(user.uid).then((res) => {
          setDataList(res);
        });
        getTotalPendinBenefitByUserId(user.uid).then((res) => {
          setTotalPN(Number.parseFloat(res).toFixed(2));
        });
        getTotalPaidBenefitByUserId(user.uid).then((res) => {
          setTotalP(Number.parseFloat(res).toFixed(2));
        });
      }
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    });
  }, []);

  const handleOpenOrder = () => {
    setOpenOrder(true);
  };

  const handleCloseOrder = () => {
    setOpenOrder(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleGenerateOrder = () => {
    if (!amount) {
      toast.info('Ingrese un valor!', { position: toast.POSITION.TOP_RIGHT });
    } else if (Number.parseFloat(totalPN) <= 0) {
      toast.info('Saldo no disponible!', { position: toast.POSITION.TOP_RIGHT });
    } else if (amount < 9) {
      toast.info('El monto mínimo debe ser $9!', { position: toast.POSITION.TOP_RIGHT });
    } else {
      toast.success('Orden generada correctamente!', { position: toast.POSITION.TOP_RIGHT });
      const idOrder = generateId(10);
      const object = {
        id: idOrder,
        amount: Number.parseFloat(amount).toFixed(2),
        ctaAmount: Number.parseFloat(totalPN).toFixed(2),
        createAt: fullDate(),
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        state: 1
      };
      console.log(object);
      createDocument(collOrders, idOrder, object);
    }
  };

  const MainComponent = () => {
    return (
      <>
        <AppBar position="static" style={uiStyles.appbar}>
          <Toolbar>
            <IconButton color="inherit">
              <IconFileDollar color="#FFF" />
            </IconButton>
            <Tooltip title="Generar orden pago">
              <IconButton
                color="inherit"
                onClick={() => {
                  handleOpenOrder();
                }}
              >
                <IconPlus />
              </IconButton>
            </Tooltip>
            <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#FFF' }} align="center">
              Beneficios
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
            {dataList.length > 0 ? (
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
        {dataList.length > 0 ? (
          <Paper sx={uiStyles.paper}>
            <Grid container spacing={1} sx={{ p: 2 }}>
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <EarningBlueCard total={totalP} detail="Saldo Actual" />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <EarningYellowCard total={totalPN} detail="Pendiente" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
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
      </>
    );
  };

  return (
    <div>
      <ToastContainer />
      {stateSub == genConst.CONST_SUB_S_I ? (
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <SubscriptionState message={msgSubState} submessage={''} />
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <MainComponent />
      )}
      <Modal open={openOrder} onClose={handleCloseOrder} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.modalStyles}>
          <Typography id="modal-modal-title" variant="h3" component="h3" align="center">
            Generar orden de pago
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 20, fontSize: 16 }}>
            Recuerde que para generar una orden de pago el monto mínimo debe ser $30
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 20, fontSize: 16 }}>
            Saldo Actual: <strong>$ {totalPN}</strong>
          </Typography>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <OutlinedInput
                    id={inputLabels.orderValue}
                    type="text"
                    name="order"
                    onChange={(ev) => setAmount(ev.target.value)}
                    placeholder={inputLabels.placeHolderAmount}
                    style={{ width: '100%', marginTop: 10 }}
                  />
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <center>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        startIcon={<IconCheck />}
                        size="large"
                        style={{ backgroundColor: genConst.CONST_CREATE_COLOR }}
                        onClick={handleGenerateOrder}
                      >
                        {titles.buttonAccept}
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<IconCircleX />}
                        size="large"
                        style={{ backgroundColor: genConst.CONST_CANCEL_COLOR }}
                        onClick={handleCloseOrder}
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
      </Modal>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.modalLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </div>
  );
}
