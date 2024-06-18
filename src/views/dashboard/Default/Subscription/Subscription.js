import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// material-ui
import {
  Box,
  Grid,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  CardContent,
  Card,
  Tabs,
  Tab,
  Modal
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// project imports
import { API_KEYS, genConst } from 'store/constant';
import {
  calculateNewDateAddingDays,
  endDateFormatWithParam,
  endDateWithParam,
  fullDate,
  fullDateFormat,
  initDate,
  shortDateFormat
} from 'utils/validations';
import Deposit from './Deposit';
import { IconBrandPaypal, IconCreditCard } from '@tabler/icons';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import {
  createDocument,
  getDad,
  getUserReferalDad,
  saveKhuskaBenefit,
  savePaymentRecord,
  saveUserBenefit,
  updateDocument
} from 'config/firebaseEvents';
import { collSubscription, collUsers } from 'store/collections';
import { sendPaymentSubKhuskaEmail } from 'utils/sendEmail';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import PayPalButton from './PayPalButton';

let globalTotal = 0;

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`vertical-tabpanel-${index}`} aria-labelledby={`vertical-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

const Subscription = () => {
  let navigate = useNavigate();
  const [type, setType] = useState(null);
  const [method, setMethod] = useState(null);
  const [isType, setIsType] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  //TOTAL PARAMS
  const [total, setTotal] = useState(null);
  const [iva, setIva] = useState(null);
  const [subtotal, setSubtotal] = useState(null);
  //DATE PARAMS
  const [startDate] = useState(initDate());
  const [endDate, setEndDate] = useState(null);
  const [newStartDate, setNewStartDate] = useState(null);
  const [newEndDate, setNewEndDate] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [value, setValue] = useState(0);
  const [openLoader, setOpenLoader] = useState(false);
  const [object, setObject] = useState({});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
        setUserEmail(user.email);
      }
    });
  }, []);

  const handleRadioChange = (event) => {
    setType(event.target.value);
    if (event.target.value == 1) {
      setIsType(true);
      setType(1);
      const newStartDate = calculateNewDateAddingDays(23);
      const newEndDate = calculateNewDateAddingDays(23 + 30);
      setNewStartDate(newStartDate);
      setNewEndDate(newEndDate);
      let subtotal = Math.round((genConst.CONST_MONTH_VALUE / genConst.CONST_IVA) * 10 ** 2) / 10 ** 2;
      let ivaValue = genConst.CONST_MONTH_VALUE - subtotal;
      let ivaRound = Math.round(ivaValue * 10 ** 2) / 10 ** 2;
      setIva(ivaRound);
      setSubtotal(subtotal);
      setTotal(genConst.CONST_MONTH_VALUE);
      setEndDate(endDateWithParam(genConst.CONST_MONTH_DAYS));
      getUserReferalDad(userId).then((code) => {
        setObject({
          userId: userId,
          userName: userName,
          userEmail: userEmail,
          type: 1,
          code: code ? code : null,
          startDate: newStartDate,
          endDate: newEndDate,
          endDateFormat: endDateFormatWithParam(genConst.CONST_MONTH_DAYS + 23)
        });
      });
    } else if (event.target.value == 2) {
      setIsType(true);
      setType(2);
      const newStartDate = calculateNewDateAddingDays(23);
      const newEndDate = calculateNewDateAddingDays(23 + 365);
      setNewStartDate(newStartDate);
      setNewEndDate(newEndDate);
      let subtotal = Math.round((genConst.CONST_YEAR_VALUE / genConst.CONST_IVA) * 10 ** 2) / 10 ** 2;
      let ivaValue = genConst.CONST_YEAR_VALUE - subtotal;
      let ivaRound = Math.round(ivaValue * 10 ** 2) / 10 ** 2;
      setIva(ivaRound);
      setSubtotal(subtotal);
      setTotal(genConst.CONST_YEAR_VALUE);
      setEndDate(endDateWithParam(genConst.CONST_YEAR_DAYS));
      getUserReferalDad(userId).then((code) => {
        setObject({
          userId: userId,
          userName: userName,
          userEmail: userEmail,
          type: 2,
          code: code ? code : null,
          startDate: newStartDate,
          endDate: newEndDate,
          endDateFormat: endDateFormatWithParam(genConst.CONST_YEAR_DAYS + 23)
        });
      });
    }
  };

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handlePayPal = () => {
    setOpenLoader(true);
    getUserReferalDad(userId).then((code) => {
      if (code !== null) {
        subscribeUser(userId, userName, userEmail, code, type, 200);
      } else {
        subscribeUser(userId, userName, userEmail, code, type, 200);
      }
    });
  };

  const subscribeUser = (userId, userName, userEmail, ref, type, result) => {
    const subObject = {
      date: fullDate(),
      dateFormat: fullDateFormat(),
      description: type == 1 ? 'Estandar (30 días)' : 'Plus (365 días)',
      emailUser: userEmail,
      endDate: type == 1 ? endDateWithParam(genConst.CONST_MONTH_DAYS) : endDateWithParam(genConst.CONST_YEAR_DAYS),
      endDateFormat: type == 1 ? endDateFormatWithParam(genConst.CONST_MONTH_DAYS) : endDateFormatWithParam(genConst.CONST_YEAR_DAYS),
      idUser: userId,
      nameUser: userName,
      price: type == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE,
      refCode: ref ? ref : null,
      startDate: shortDateFormat(),
      state: result == 200 ? genConst.CONST_STATE_AC : genConst.CONST_STATE_IN,
      totalDays: type == 1 ? genConst.CONST_MONTH_DAYS : genConst.CONST_YEAR_DAYS
    };
    const usrObject = {
      subState: result == 200 ? genConst.CONST_STATE_AC : genConst.CONST_STATE_IN,
      state: result == 200 ? genConst.CONST_STATE_AC : genConst.CONST_STATE_IN
    };
    if (result === 200) {
      createDocument(collSubscription, userId, subObject);
      updateDocument(collUsers, userId, usrObject);
      paymentDistribution(userId, userName, userEmail, ref);
    } else {
      console.log('Algo salio mal!');
      setOpenLoader(false);
    }
  };

  const paymentDistribution = async (id, name, email, ref) => {
    globalTotal = type == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE;
    let total = type == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE;
    let IVA = Number.parseFloat(total).toFixed(2) * Number.parseFloat(genConst.CONST_IVA_VAL).toFixed(2);
    let SUB = Number.parseFloat(total).toFixed(2) - Number.parseFloat(IVA).toFixed(2);
    let referCode;
    if (ref === null) {
      savePaymentRecord(id, name, email, total, IVA, SUB, 'C');
      saveKhuskaBenefit(id, name, email, total);
    } else {
      referCode = ref;
      for (let i = 0; i < 4; i++) {
        //PAGAR BENEFICIOS
        await getDad(referCode).then((res) => {
          referCode = res.refer;
          generatePaymentDistribution(id, name, email, i, res.id, res.fullName, res.email, total);
          if (res.refer === null) {
            i = 4;
          }
        });
      }
      savePaymentRecord(id, name, email, total, IVA, SUB, 'C');
      saveKhuskaBenefit(id, name, email, globalTotal);
    }
    setTimeout(function () {
      setOpenLoader(false);
      let endD = type == 1 ? endDateWithParam(genConst.CONST_MONTH_DAYS) : endDateWithParam(genConst.CONST_YEAR_DAYS);
      let typ = type == 1 ? 'Estandar (30 días)' : 'Plus (365 días)';
      sendPaymentSubKhuskaEmail(email, name, typ, total, initDate(), endD);
      toast.success('Suscripción ha sido activada!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
      navigate('/app/dashboard');
    }, 4000);
  };

  const generatePaymentDistribution = (id, name, email, i, resid, resfullname, resemail, total) => {
    var t = 0;
    if (i === 0) {
      //LEVEL 1
      t = total * genConst.CONST_LVL1;
      globalTotal = globalTotal - t;
      saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
    } else if (i === 1) {
      //LEVEL 2
      t = total * genConst.CONST_LVL2;
      globalTotal = globalTotal - t;
      saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
    } else if (i === 2) {
      //LEVEL 3
      t = total * genConst.CONST_LVL3;
      globalTotal = globalTotal - t;
      saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
    } else if (i === 3) {
      //LEVEL 4
      t = total * genConst.CONST_LVL4;
      globalTotal = globalTotal - t;
      saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
    }
  };

  return (
    <center>
      <ToastContainer />
      <Grid container justifyContent="center" alignItems="center">
        <Grid item lg={12}>
          <Box sx={{ maxWidth: '100%' }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step key={1}>
                <StepLabel>{'Selecciona tu Suscripción'}</StepLabel>
                <StepContent>
                  <Card>
                    <CardContent>
                      <Typography variant={'h4'}>Si realizas el pago anual, recibes un descuento de dos meses.</Typography>
                      <FormControl>
                        <RadioGroup
                          row
                          aria-labelledby="demo-row-radio-buttons-group-label"
                          name="row-radio-buttons-group"
                          onChange={handleRadioChange}
                          values={type}
                        >
                          <FormControlLabel value={1} control={<Radio />} label={'Mensual $ ' + genConst.CONST_MONTH_VALUE} />
                          <FormControlLabel value={2} control={<Radio />} label={'Anual $ ' + genConst.CONST_YEAR_VALUE} />
                        </RadioGroup>
                      </FormControl>
                      {isType ? (
                        <center>
                          <Grid container style={{ marginTop: 20 }}>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Fecha Inicio:
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'left', marginLeft: 20 }}>
                                {startDate}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Fecha Fin:
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'left', marginLeft: 20 }}>
                                {endDate}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Nueva Fecha Inicio:
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'left', marginLeft: 20 }}>
                                {newStartDate}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Nueva Fecha Fin:
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'left', marginLeft: 20 }}>
                                {newEndDate}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Subtotal:
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'left', marginLeft: 20 }}>
                                $ {Number.parseFloat(subtotal).toFixed(2)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                IVA:
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'left', marginLeft: 20 }}>
                                $ {Number.parseFloat(iva).toFixed(2)}
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Total:
                              </Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'left', marginLeft: 20 }}>
                                $ {Number.parseFloat(total).toFixed(2)}
                              </Typography>
                            </Grid>
                          </Grid>
                          <Button variant="contained" onClick={handleNext} style={{ marginTop: 20 }}>
                            Continuar
                          </Button>
                        </center>
                      ) : (
                        <></>
                      )}
                    </CardContent>
                  </Card>
                </StepContent>
              </Step>
              <Step key={2}>
                <StepLabel>{'Selecciona tu Forma de Pago'}</StepLabel>
                <StepContent>
                  <Card>
                    <CardContent>
                      <center>
                        <FormControl>
                          <RadioGroup
                            aria-labelledby="demo-radio-buttons-group-label"
                            name="radio-buttons-group"
                            onChange={handleMethodChange}
                            values={type}
                          >
                            <FormControlLabel value={1} control={<Radio />} label="Pago en línea" />
                            <FormControlLabel value={2} control={<Radio />} label="Deposito o Transferencia" />
                          </RadioGroup>
                        </FormControl>
                        <Box sx={{ mb: 2 }}>
                          <center>
                            <Button variant="contained" onClick={handleNext} sx={{ mt: 1, mr: 1 }}>
                              {'Continuar'}
                            </Button>
                            <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                              Regresar
                            </Button>
                          </center>
                        </Box>
                      </center>
                    </CardContent>
                  </Card>
                </StepContent>
              </Step>
              <Step key={3}>
                <StepLabel>{'Realiza el Pago'}</StepLabel>
                <StepContent>
                  <Card>
                    <CardContent>
                      <Typography variant={'h5'} hidden>
                        {'Subtotal: ' + subtotal}
                      </Typography>
                      <Typography variant={'h5'} hidden>
                        {'IVA: ' + iva}
                      </Typography>
                      {method == 1 ? (
                        <Box>
                          <Tabs value={value} onChange={handleChange} aria-label="icon tabs example">
                            <Tab icon={<IconBrandPaypal />} aria-label="paypal" />
                            <Tab icon={<IconCreditCard />} aria-label="creditcard" />
                          </Tabs>
                          <TabPanel value={value} index={0}>
                            <strong>Suscripción: </strong>
                            {type == 1 ? (
                              <span style={{ fontWeight: 'normal' }}>Mensual</span>
                            ) : (
                              <span style={{ fontWeight: 'normal' }}>Anual</span>
                            )}
                            <br />
                            <strong>Total a Pagar: </strong>
                            <span style={{ fontWeight: 'normal' }}>$ {total}</span>
                            <br />
                            <br />
                            <PayPalScriptProvider
                              options={{
                                'client-id': API_KEYS.PAYPAL_CLIENT_ID_TEST
                              }}
                            >
                              <center>
                                <div style={{ width: '50%' }}>
                                  <PayPalButton
                                    invoice={type == 1 ? 'Suscripción mensual Khuska' : 'Suscripción anual Khuska'}
                                    totalValue={total + ''}
                                    object={object}
                                  />
                                </div>
                              </center>
                            </PayPalScriptProvider>
                            <Button
                              variant="contained"
                              sx={{ mt: 1, mr: 1 }}
                              startIcon={<IconBrandPaypal />}
                              style={{
                                color: '#FFF',
                                height: 60,
                                borderRadius: 10,
                                width: 280,
                                backgroundColor: '#FFC439',
                                display: 'none'
                              }}
                              onClick={handlePayPal}
                            >
                              <span style={{ color: '#003087', fontWeight: 'bold', fontSize: 15 }}>Pay</span>
                              <span style={{ color: '#009CDE', fontWeight: 'bold', fontSize: 15 }}>Pal</span>
                            </Button>
                          </TabPanel>
                          <TabPanel value={value} index={1}>
                            <Typography variant={'h5'}>{'Próximamente.'}</Typography>
                          </TabPanel>
                        </Box>
                      ) : method == 2 ? (
                        <Deposit total={total} type={type} />
                      ) : (
                        <></>
                      )}
                      <Box sx={{ mb: 2, mt: 0 }}>
                        <center>
                          <Typography variant={'h5'} hidden>
                            {'La activación puede tomar hasta 24 horas.'}
                          </Typography>
                          <Button onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
                            Regresar
                          </Button>
                        </center>
                      </Box>
                    </CardContent>
                  </Card>
                </StepContent>
              </Step>
            </Stepper>
          </Box>
        </Grid>
      </Grid>
      <Modal open={openLoader} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.modalStylesLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </center>
  );
};

const uiStyles = {
  modalStylesLoader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 80,
    height: 80,
    bgcolor: 'transparent',
    border: 'none',
    borderRadius: 6,
    boxShadow: 0,
    p: 4
  }
};

export default Subscription;
