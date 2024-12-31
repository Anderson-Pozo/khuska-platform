/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from 'react';
import {
  Paper,
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
  Button,
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Tabs,
  Tab
} from '@mui/material';
import { uiStyles } from './Benefits.styles';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Collections
import { inputLabels, titles } from './Benefits.texts';
//Utils
import {
  createDocument,
  getOrdersByUserId,
  getTotalPaidBenefitByUserId,
  getTotalPendinBenefitByUserId,
  getUserBenefits
} from 'config/firebaseEvents';
import SubscriptionState from 'components/message/SubscriptionState';
//types array
import MessageDark from 'components/message/MessageDark';
import { ACCOUNT_TYPES, genConst } from 'store/constant';
import EarningBlueCard from 'components/cards/EarningBlueCard';
import EarningYellowCard from 'components/cards/EaringYellowCard';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { msgSubState } from 'store/message';
import { useGetSubscriptionState } from 'hooks/useGetSubscriptionState';
import { IconCheck, IconCircleX, IconFileDollar, IconPlus, IconSearch } from '@tabler/icons';
import { generateId } from 'utils/idGenerator';
import { fullDate } from 'utils/validations';
import { collOrders } from 'store/collections';
import { FINANCIAL_INSTITUTIONS } from 'store/institutions';
import { CustomTabPanel } from 'components/shared/CustomTabPanel';
import { OrdersTable } from './OrdersTable';
import { UserBenefitsTable } from './UserBenefitsTable';

export default function Benefits() {
  // const [totalPaid, setTotalPaid] = useState(0);
  const [totalPending, setTotalPending] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [open, setOpen] = useState(false);
  const [openOrder, setOpenOrder] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const stateSub = useGetSubscriptionState();

  const [user, setUser] = useState(null);
  const [currentTab, setCurrentTab] = useState(0);
  const [orders, setOrders] = useState([]);
  const [formData, setFormData] = useState({
    amount: '',
    accountNumber: '',
    accountType: '',
    beneficiaryName: '',
    beneficiaryDni: '',
    bankName: ''
  });

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setOpen(true);
        setUser(user);
        getUserBenefits(user.uid).then((res) => {
          setDataList(res);
        });
        getTotalPendinBenefitByUserId(user.uid).then((res) => {
          setTotalPending(Number.parseFloat(res).toFixed(2));
        });
        // getTotalPaidBenefitByUserId(user.uid).then((res) => {
        //   setTotalPaid(Number.parseFloat(res).toFixed(2));
        // });
        getOrdersByUserId(user.uid).then((res) => {
          setOrders(res);
        });
      }
      setTimeout(() => {
        setOpen(false);
      }, 1000);
    });
  };

  const pendingOrders = useMemo(() => orders?.filter((item) => item.state === 1), [orders]);

  const totalOrders = useMemo(
    () =>
      orders?.reduce((acc, item) => {
        if (item.state === genConst.CONST_ORDER_PENDING || item.state === genConst.CONST_ORDER_APPROVED) {
          acc += Number(item.amount);
        }
        return acc;
      }, 0),
    [orders]
  );

  const totalAmount = useMemo(() => Number(totalPending) - totalOrders, [totalPending, totalOrders]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleOpenOrder = () => {
    setOpenOrder(true);
  };

  const handleCloseOrder = () => {
    setOpenOrder(false);
  };

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  const handleGenerateOrder = () => {
    const { amount, accountNumber, accountType, bankName, beneficiaryDni, beneficiaryName } = formData;
    if (!amount || !accountNumber || !accountType || !bankName || !beneficiaryDni || !beneficiaryName) {
      toast.info('Todos los campos son obligatorios!');
      return;
    } else if (Number(amount) > Number(totalAmount)) {
      toast.info('Saldo no disponible!');
    } else if (Number(amount) < 30) {
      toast.info('El monto mínimo debe ser $30!');
    } else {
      setOpen(true);
      const idOrder = generateId(10);
      const object = {
        id: idOrder,
        amount: Number.parseFloat(amount),
        ctaAmount: Number.parseFloat(totalAmount),
        createAt: fullDate(),
        userId: user.uid,
        userName: user.displayName,
        userEmail: user.email,
        state: genConst.CONST_ORDER_PENDING,
        accountNumber,
        accountType,
        bankName,
        beneficiaryDni,
        beneficiaryName
      };
      createDocument(collOrders, idOrder, object);
      //console.log(collOrders, idOrder, object);
      setTimeout(function () {
        setOpen(false);
        setOpenOrder(false);
        toast.success('Orden generada correctamente!');
        getData();
      }, 1000);
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
                value={search}
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
                    <EarningBlueCard total={totalAmount} detail="Saldo Disponible" />
                  </Grid>
                  <Grid item lg={6} md={6} sm={6} xs={6}>
                    <EarningYellowCard total={totalPending} detail="Total beneficios" />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={currentTab} onChange={handleTabChange}>
                <Tab label="Beneficios" />
                <Tab label="Ordenes" />
              </Tabs>
            </Box>
            <CustomTabPanel value={currentTab} index={0}>
              <UserBenefitsTable dataList={dataList} search={search} />
            </CustomTabPanel>
            <CustomTabPanel value={currentTab} index={1}>
              <OrdersTable dataList={orders} />
            </CustomTabPanel>
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
            Saldo Disponible: <strong>$ {totalAmount}</strong>
          </Typography>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                {pendingOrders?.length > 0 ? (
                  <>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 20, fontSize: 16 }}>
                        Actualmente ya tiene una orden de pago pendiente de procesar!
                      </Typography>
                    </Grid>
                    <Grid item lg={12} md={12} sm={12} xs={12}>
                      <center>
                        <ButtonGroup>
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
                  </>
                ) : (
                  <>
                    <Grid container spacing={2} style={{ marginTop: 10 }}>
                      {/* Monto */}
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <OutlinedInput
                          id="amount"
                          type="text"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          placeholder="Ingrese el monto"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <OutlinedInput
                          id="accountNumber"
                          type="text"
                          name="accountNumber"
                          value={formData.accountNumber}
                          onChange={handleChange}
                          placeholder="Número de cuenta"
                          fullWidth
                        />
                      </Grid>

                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="account-type-label">Tipo de cuenta</InputLabel>
                          <Select
                            labelId="account-type-label"
                            id="accountType"
                            name="accountType"
                            value={formData.accountType}
                            onChange={handleChange}
                            label="Tipo de cuenta"
                          >
                            {ACCOUNT_TYPES.map((type) => (
                              <MenuItem key={type.value} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <OutlinedInput
                          id="beneficiaryName"
                          type="text"
                          name="beneficiaryName"
                          value={formData.beneficiaryName}
                          onChange={handleChange}
                          placeholder="Nombre completo del beneficiario"
                          fullWidth
                        />
                      </Grid>

                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <OutlinedInput
                          id="beneficiaryDni"
                          type="text"
                          name="beneficiaryDni"
                          value={formData.beneficiaryDni}
                          onChange={handleChange}
                          placeholder="N° de identificación"
                          fullWidth
                        />
                      </Grid>
                      <Grid item lg={6} md={6} sm={12} xs={12}>
                        <FormControl fullWidth>
                          <InputLabel id="bankName-label">Institución bancaria</InputLabel>
                          <Select
                            labelId="bankName-label"
                            id="bankName"
                            name="bankName"
                            value={formData.bankName}
                            onChange={handleChange}
                            label="Institución bancaria"
                          >
                            {FINANCIAL_INSTITUTIONS.map((type) => (
                              <MenuItem key={type.value} value={type.value}>
                                {type.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                    {/* <Grid item lg={12} md={12} sm={12} xs={12}>
                      <OutlinedInput
                        id={inputLabels.orderValue}
                        type="text"
                        name="order"
                        onChange={(ev) => setAmount(ev.target.value)}
                        placeholder={inputLabels.placeHolderAmount}
                        style={{ width: '100%', marginTop: 10 }}
                      />
                    </Grid> */}
                    <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 10 }}>
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
                  </>
                )}
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
