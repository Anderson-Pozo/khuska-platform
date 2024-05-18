import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  Tab
} from '@mui/material';
import CreditCard from 'components/creditCard/CreditCard';
// project imports
import { genConst } from 'store/constant';
import { endDateWithParam, fullDate, fullDateFormat, initDate, shortDateFormat } from 'utils/validations';
import Deposit from './Deposit';
import { IconBrandPaypal, IconCreditCard } from '@tabler/icons';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { getDad, getUserReferalDad } from 'config/firebaseEvents';

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
  const [type, setType] = useState(null);
  const [method, setMethod] = useState(null);
  const [isType, setIsType] = useState(false);
  //TOTAL PARAMS
  const [total, setTotal] = useState(null);
  const [iva, setIva] = useState(null);
  const [subtotal, setSubtotal] = useState(null);

  //DATE PARAMS
  const [startDate] = useState(initDate());
  const [endDate, setEndDate] = useState(null);

  const [activeStep, setActiveStep] = useState(0);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleRadioChange = (event) => {
    setType(event.target.value);
    if (event.target.value == 1) {
      setIsType(true);
      setType(1);
      let subtotal = Math.round((genConst.CONST_MONTH_VALUE / genConst.CONST_IVA) * 10 ** 2) / 10 ** 2;
      let ivaValue = genConst.CONST_MONTH_VALUE - subtotal;
      let ivaRound = Math.round(ivaValue * 10 ** 2) / 10 ** 2;
      setIva(ivaRound);
      setSubtotal(subtotal);
      setTotal(genConst.CONST_MONTH_VALUE);
      setEndDate(endDateWithParam(genConst.CONST_MONTH_DAYS));
    } else if (event.target.value == 2) {
      setIsType(true);
      setType(2);
      let subtotal = Math.round((genConst.CONST_YEAR_VALUE / genConst.CONST_IVA) * 10 ** 2) / 10 ** 2;
      let ivaValue = genConst.CONST_YEAR_VALUE - subtotal;
      let ivaRound = Math.round(ivaValue * 10 ** 2) / 10 ** 2;
      setIva(ivaRound);
      setSubtotal(subtotal);
      setTotal(genConst.CONST_YEAR_VALUE);
      setEndDate(endDateWithParam(genConst.CONST_YEAR_DAYS));
    }
  };

  const handleMethodChange = (event) => {
    setMethod(event.target.value);
  };

  const handlePayPal = () => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        getUserReferalDad(user.uid).then((code) => {
          if (code !== null) {
            subscribeUser(user.uid, code, type, 200);
          } else {
            subscribeUser(user.uid, code, type, 200);
          }
        });
      }
    });
  };

  const subscribeUser = (id, ref, type, result) => {
    const subObject = {
      idUser: id,
      refCode: ref ? ref : null,
      state: result == 200 ? genConst.CONST_STATE_AC : genConst.CONST_STATE_IN,
      startDate: shortDateFormat(),
      endDate: type == 1 ? endDateWithParam(genConst.CONST_MONTH_DAYS) : endDateWithParam(genConst.CONST_YEAR_DAYS),
      date: fullDate(),
      dateFormat: fullDateFormat(),
      price: type == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE,
      description: type == 1 ? 'Estandar (30 días)' : 'Plus (365 días)',
      totalDays: type == 1 ? genConst.CONST_MONTH_DAYS : genConst.CONST_YEAR_DAYS
    };
    const usrObject = {
      subState: result == 200 ? genConst.CONST_STATE_AC : genConst.CONST_STATE_IN,
      state: result == 200 ? genConst.CONST_STATE_AC : genConst.CONST_STATE_IN
    };
    console.log(subObject);
    console.log(usrObject);
    if (result === 200) {
      //createDocuments
      paymentDistribution(ref, result);
    } else {
      console.log('Algo salio mal!');
    }
  };

  const paymentDistribution = async (ref) => {
    let total = type == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE;
    let IVA = Number.parseFloat(total).toFixed(2) * Number.parseFloat(genConst.CONST_IVA_VAL).toFixed(2);
    let SUB = Number.parseFloat(total).toFixed(2) - Number.parseFloat(IVA).toFixed(2);
    console.log('SUBTOTAL: ', SUB);
    console.log('IVA: ', IVA);
    console.log('TOTAL: ', total);
    for (let i = 0; i < 4; i++) {
      //PAGAR BENEFICIOS
      await getDad(ref).then((res) => {
        console.log(i, res.refer);
        //generatePaymentDistribution(total, i, res.id, res.email);
        if (res.refer === null) {
          i = 4;
        }
      });
    }
  };

  return (
    <center>
      <Grid container justifyContent="center" alignItems="center">
        <Grid item lg={12}>
          <Box sx={{ maxWidth: '100%' }}>
            <Stepper activeStep={activeStep} orientation="vertical">
              <Step key={1}>
                <StepLabel>{'Selecciona tu Suscripción'}</StepLabel>
                <StepContent>
                  <Card>
                    <CardContent>
                      <Typography variant={'h4'}>{'Si realizas el pago anual, recibes un descuento de dos meses.'}</Typography>
                      <center>
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
                      </center>
                      {isType ? (
                        <center>
                          <Grid container style={{ marginTop: 20 }}>
                            <Grid xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Fecha Inicio:
                              </Typography>
                            </Grid>
                            <Grid xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'left', marginLeft: 20 }}>
                                {startDate}
                              </Typography>
                            </Grid>
                            <Grid xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Fecha Fin:
                              </Typography>
                            </Grid>
                            <Grid xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'left', marginLeft: 20 }}>
                                {endDate}
                              </Typography>
                            </Grid>
                            <Grid xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Subtotal:
                              </Typography>
                            </Grid>
                            <Grid xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'left', marginLeft: 20 }}>
                                $ {Number.parseFloat(subtotal).toFixed(2)}
                              </Typography>
                            </Grid>
                            <Grid xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                IVA:
                              </Typography>
                            </Grid>
                            <Grid xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'left', marginLeft: 20 }}>
                                $ {Number.parseFloat(iva).toFixed(2)}
                              </Typography>
                            </Grid>
                            <Grid xs={6}>
                              <Typography variant={'h5'} style={{ textAlign: 'right', fontWeight: 'bold' }}>
                                Total:
                              </Typography>
                            </Grid>
                            <Grid xs={6}>
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
                            <Button disabled={0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
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
                            <center>
                              <Typography variant="h4" sx={{ mt: 2 }}>
                                {'Suscripción: '}
                                {type == 1 ? (
                                  <span style={{ fontWeight: 'normal' }}>Mensual</span>
                                ) : (
                                  <span style={{ fontWeight: 'normal' }}>Anual</span>
                                )}
                              </Typography>
                              <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>
                                {'Total a Pagar: '}
                                <span style={{ fontWeight: 'normal' }}>$ {total}</span>
                              </Typography>
                            </center>
                            <Button
                              variant="contained"
                              sx={{ mt: 1, mr: 1 }}
                              startIcon={<IconBrandPaypal />}
                              style={{ color: '#FFF', height: 60, borderRadius: 10, width: 280, backgroundColor: '#FFC439' }}
                              onClick={handlePayPal}
                            >
                              <span style={{ color: '#003087', fontWeight: 'bold', fontSize: 15 }}>Pay</span>
                              <span style={{ color: '#009CDE', fontWeight: 'bold', fontSize: 15 }}>Pal</span>
                            </Button>
                          </TabPanel>
                          <TabPanel value={value} index={1}>
                            <CreditCard total={total} type={type} />
                          </TabPanel>
                        </Box>
                      ) : method == 2 ? (
                        <Deposit total={total} type={type} />
                      ) : (
                        <></>
                      )}
                      <Box sx={{ mb: 2, mt: 3 }}>
                        <center>
                          <Typography variant={'h5'}>{'La activación puede tomar hasta 24 horas.'}</Typography>
                          <Button disabled={0} onClick={handleBack} sx={{ mt: 1, mr: 1 }}>
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
    </center>
  );
};

export default Subscription;
