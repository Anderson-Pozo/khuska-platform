import React, { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  MenuItem,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Modal,
  Grid,
  InputLabel,
  OutlinedInput,
  FormControl,
  ButtonGroup,
  Select,
  IconButton,
  Tooltip
} from '@mui/material';
import { styled } from '@mui/material/styles';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import CircularProgress from '@mui/material/CircularProgress';
import User1 from 'assets/images/profile/profile-picture-6.jpg';
import MessageDark from 'components/message/MessageDark';
import {
  IconPlus,
  IconDeviceFloppy,
  IconTrash,
  IconEdit,
  IconCircleX,
  IconPencil,
  IconNetwork,
  IconUserCircle,
  IconCheck,
  IconCalendar,
  IconSearch
} from '@tabler/icons';
//Firebase Events
import {
  //createDocument,
  createLogRecord,
  deleteDocument,
  getDad,
  getUserDataSubscription,
  getUserReferalDad,
  getUsersList,
  //saveKhuskaBenefit,
  //savePaymentRecord,
  //saveUserBenefit,
  updateDocument
} from 'config/firebaseEvents';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { genConst, process } from 'store/constant';
import { collLog, collSubscription, collUsers } from 'store/collections';
import { inputLabels, titles } from './Users.texts';
import { uiStyles } from './Users.styles';
//Utils
import { endDateFormatWithParam, endDateWithParam, fullDate, fullDateFormat, initDate, shortDateFormat } from 'utils/validations';
import { generateId } from 'utils/idGenerator';
import { searchingData } from 'utils/search';
import defaultImage from 'assets/images/addImgB.png';

let globalTotal = 0;

const Accordion = styled((props) => <MuiAccordion disableGutters elevation={0} square {...props} />)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&::before': {
    display: 'none'
  }
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />} {...props} />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, .05)' : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}));

export default function Users() {
  let navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const theme = useTheme();
  const [openCreate, setOpenCreate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openSub, setOpenSub] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [title, setTitle] = useState(null);
  const [expanded, setExpanded] = useState('panel1');
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [email, setEMail] = useState(null);
  const [code, setCode] = useState(null);
  //const [refer, setRefer] = useState(null);
  const [profile, setProfile] = useState(null);
  const [state, setState] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [updateAt, setUpdateAt] = useState(null);
  const [type, setType] = useState(0);
  //TOTAL PARAMS
  const [total, setTotal] = useState(0);
  const [iva, setIva] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  //DATE PARAMS
  const [startDate] = useState(initDate());
  const [endDate, setEndDate] = useState(null);
  //VOUCHER
  const [picture, setPicture] = useState({ preview: '', raw: '' });
  const [showSearch, setShowSearch] = useState(false);
  const [subData, setSubData] = useState({
    cancelData: null,
    description: null,
    endDate: null,
    isUser: null,
    price: null,
    startDate: null,
    state: null,
    totalDays: null
  });

  const [search, setSearch] = useState('');
  const [openLoader, setOpenLoader] = useState(false);

  const [usersList, setUsersList] = useState([]);

  useEffect(() => {
    reloadData();
  }, []);

  const reloadData = () => {
    getUsersList().then((data) => {
      setUsersList(data);
    });
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleOpenSub = () => {
    setOpenSub(true);
  };

  const handleCloseSub = () => {
    setOpenSub(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleCreateUser = () => {
    if (!name || !email) {
      toast.info(titles.require, { position: toast.POSITION.TOP_RIGHT });
    } else {
      const idUsr = generateId(10);
      setOpenLoader(true);
      const object = {
        avatar: null,
        createAt: fullDate(),
        description: null,
        email: email,
        id: idUsr,
        name: name,
        lastName: lastName,
        fullName: name + ' ' + lastName,
        phone: null,
        profile: genConst.CONST_PRO_DEF,
        state: genConst.CONST_STA_ACT,
        updateAt: null
      };
      createLogRecord(collLog, process.LOG_CREATE_USER, object);
      setTimeout(() => {
        setOpenLoader(false);
        setOpenCreate(false);
        reloadData();
        toast.success(titles.successCreate, { position: toast.POSITION.TOP_RIGHT });
      }, 2000);
    }
  };

  const handleEditUser = () => {
    if (!name || !email || !profile || !state) {
      toast.info(titles.require, { position: toast.POSITION.TOP_RIGHT });
    } else {
      const object = {
        email: email,
        name: name,
        lastName: lastName,
        fullName: name + ' ' + lastName,
        state: state,
        profile: profile,
        updateAt: fullDate()
      };
      setOpenLoader(true);
      updateDocument(collUsers, id, object);
      createLogRecord(collLog, process.LOG_EDIT_USER, object);
      setTimeout(() => {
        setOpenLoader(false);
        setOpenCreate(false);
        reloadData();
        toast.success(titles.successUpdate, { position: toast.POSITION.TOP_RIGHT });
      }, 2000);
    }
  };

  const handleDeleteUser = () => {
    setOpenLoader(true);
    const usrHistId = generateId(10);
    const objectHist = {
      action: titles.labelDelete,
      createAt: createAt,
      deleteAt: fullDate(),
      email: email,
      id: usrHistId,
      name: name,
      lastName: lastName,
      fullName: name + ' ' + lastName,
      state: genConst.CONST_STA_INACT,
      updateAt: updateAt
    };
    deleteDocument(collUsers, id);
    createLogRecord(collLog, process.LOG_DELETE_USER, objectHist);
    setTimeout(() => {
      setOpenLoader(false);
      setOpenDelete(false);
      reloadData();
      toast.success(titles.successDelete, { position: toast.POSITION.TOP_RIGHT });
      cleanData();
    }, 2000);
  };

  const handleActiveSubscription = async () => {
    setOpenLoader(true);
    getUserReferalDad(id).then((code) => {
      console.log('getUserReferalDad', code);
      subscribeUser(id, name + ' ' + lastName, email, code, type);
    });
  };

  const subscribeUser = (id, userName, userEmail, ref, type) => {
    const subObject = {
      idUser: id,
      nameUser: userName,
      emailUser: userEmail,
      refCode: ref ? ref : null,
      state: genConst.CONST_STATE_AC,
      startDate: shortDateFormat(),
      endDate: type == 1 ? endDateWithParam(genConst.CONST_MONTH_DAYS) : endDateWithParam(genConst.CONST_YEAR_DAYS),
      endDateFormat: type == 1 ? endDateFormatWithParam(genConst.CONST_MONTH_DAYS) : endDateFormatWithParam(genConst.CONST_YEAR_DAYS),
      date: fullDate(),
      dateFormat: fullDateFormat(),
      price: type == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE,
      description: type == 1 ? 'Estandar (30 días)' : 'Plus (365 días)',
      totalDays: type == 1 ? genConst.CONST_MONTH_DAYS : genConst.CONST_YEAR_DAYS
    };
    const usrObject = {
      subState: genConst.CONST_STATE_AC,
      state: genConst.CONST_STATE_AC
    };
    console.log('createDocument', collSubscription, id, subObject);
    //createDocument(collSubscription, id, subObject);
    console.log('updateDocument', collUsers, id, usrObject);
    //updateDocument(collUsers, id, usrObject);
    paymentDistribution(id, userName, userEmail, ref);
  };

  const paymentDistribution = async (id, name, email, ref) => {
    globalTotal = type == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE;
    let total = type == 1 ? genConst.CONST_MONTH_VALUE : genConst.CONST_YEAR_VALUE;
    let IVA = Number.parseFloat(total).toFixed(2) * Number.parseFloat(genConst.CONST_IVA_VAL).toFixed(2);
    let SUB = Number.parseFloat(total).toFixed(2) - Number.parseFloat(IVA).toFixed(2);
    let referCode;
    if (ref === null) {
      console.log('savePaymentRecord', id, name, email, total, IVA, SUB);
      //savePaymentRecord(id, name, email, total, IVA, SUB);
      console.log('saveKhuskaBenefit', id, name, email, total);
      //saveKhuskaBenefit(id, name, email, total);
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
      //savePaymentRecord(id, name, email, total, IVA, SUB);
      console.log(id, name, email, total, IVA, SUB);
      //saveKhuskaBenefit(id, name, email, globalTotal);
      console.log(id, name, email, globalTotal);
    }
    setTimeout(function () {
      setOpenLoader(false);
      setOpenSub(false);
      setOpenCreate(false);
      toast.success('Suscripción ha sido activada!', { position: toast.POSITION.TOP_RIGHT, autoClose: 2000 });
      reloadData();
    }, 4000);
  };

  const generatePaymentDistribution = (id, name, email, i, resid, resfullname, resemail, total) => {
    var t = 0;
    if (i === 0) {
      //LEVEL 1
      t = total * genConst.CONST_LVL1;
      globalTotal = globalTotal - t;
      console.log(id, name, email, i, resid, resfullname, resemail, t);
      //saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
    } else if (i === 1) {
      //LEVEL 2
      t = total * genConst.CONST_LVL2;
      globalTotal = globalTotal - t;
      //saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
      console.log(id, name, email, i, resid, resfullname, resemail, t);
    } else if (i === 2) {
      //LEVEL 3
      t = total * genConst.CONST_LVL3;
      globalTotal = globalTotal - t;
      //saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
      console.log(id, name, email, i, resid, resfullname, resemail, t);
    } else if (i === 3) {
      //LEVEL 4
      t = total * genConst.CONST_LVL4;
      globalTotal = globalTotal - t;
      //saveUserBenefit(id, name, email, i, resid, resfullname, resemail, t);
      console.log(id, name, email, i, resid, resfullname, resemail, t);
    }
  };

  const cleanData = () => {
    setName('');
    setLastName('');
    setCode('');
    setEMail('');
    setProfile('');
    setState('');
    setEndDate('');
    setTotal(0);
    setIva(0);
    setSubtotal(0);
    setType(0);
    setPicture({ preview: '', raw: '' });
  };

  //console.log(refer);
  const handleChangeVoucher = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setPicture({
          preview: img.src,
          raw: raw
        });
      };
    }
  };

  return (
    <div>
      <ToastContainer />
      <AppBar position="static" style={uiStyles.appbar}>
        <Toolbar>
          <IconButton color="inherit">
            <IconUserCircle color="#FFF" />
          </IconButton>
          <Tooltip title="Agregar Usuario">
            <IconButton
              color="inherit"
              onClick={() => {
                setTitle(titles.titleCreate);
                cleanData();
                setIsEdit(false);
                handleOpenCreate();
              }}
            >
              <IconPlus />
            </IconButton>
          </Tooltip>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#FFF' }} align="center">
            Usuarios
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
          {usersList.length > 0 ? (
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
      {usersList.length > 0 ? (
        <Paper sx={uiStyles.paper}>
          <TableContainer sx={{ maxHeight: 500 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell key="id-name" align="left" style={{ minWidth: 170, fontWeight: 'bold' }}>
                    {titles.tableCell1}
                  </TableCell>
                  <TableCell key="id-email" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {titles.tableCell2}
                  </TableCell>
                  <TableCell key="id-code" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {titles.tableCellC}
                  </TableCell>
                  <TableCell key="id-profile" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {titles.tableCell3}
                  </TableCell>
                  <TableCell key="id-state" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {titles.tableCell4}
                  </TableCell>
                  <TableCell key="id-actions" align="center" style={{ minWidth: 75, fontWeight: 'bold' }}>
                    {titles.tableCellActions}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {usersList
                  .filter(searchingData(search))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((r) => (
                    <TableRow hover key={r.id}>
                      <TableCell align="left">
                        <ButtonGroup>
                          <Avatar src={r.avatar || User1} color="inherit" style={{ width: 32, height: 32 }} />
                          <span style={{ margin: 6 }}>{r.fullName}</span>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="left">{r.email}</TableCell>
                      <TableCell align="left">{r.ownReferal}</TableCell>
                      <TableCell align="left">
                        {r.profile === genConst.CONST_PRO_ADM ? genConst.CONST_PRO_ADM_TXT : genConst.CONST_PRO_STU_TXT}
                      </TableCell>
                      <TableCell align="left">
                        {r.state === genConst.CONST_STA_ACT ? (
                          <h4 style={{ color: '#36b836' }}>{genConst.CONST_STA_ACT_TXT}</h4>
                        ) : (
                          <h4 style={{ color: '#d84315' }}>{genConst.CONST_STA_INACT_TXT}</h4>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <ButtonGroup variant="contained">
                          <Button
                            style={{ backgroundColor: genConst.CONST_INFO_COLOR }}
                            onClick={() => {
                              setTitle(titles.titleNetwork);
                              setId(r.id);
                              setCode(r.ownReferal);
                              setName(r.name);
                              setLastName(r.lastName);
                              setEMail(r.email);
                              navigate({
                                pathname: '/main/network-users',
                                search: `?code=${r.ownReferal}&name=${r.name + ' ' + r.lastName}`
                              });
                            }}
                          >
                            <IconNetwork />
                          </Button>
                          <Button
                            style={{ backgroundColor: genConst.CONST_UPDATE_COLOR }}
                            onClick={() => {
                              setId(r.id);
                              setTitle(titles.titleUpdate);
                              setName(r.name);
                              setLastName(r.lastName);
                              setEMail(r.email);
                              setCode(r.ownReferal);
                              //setRefer(r.refer);
                              setProfile(r.profile);
                              setState(r.state);
                              setCreateAt(r.createAt);
                              setUpdateAt(r.updateAt);
                              handleOpenCreate();
                              getUserDataSubscription(r.id).then((datos) => {
                                setSubData(datos);
                              });
                              setIsEdit(true);
                            }}
                          >
                            <IconEdit />
                          </Button>
                          <Button
                            style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                            onClick={() => {
                              setTitle(titles.titleDelete);
                              setId(r.id);
                              setName(r.name);
                              setEMail(r.email);
                              handleOpenDelete();
                            }}
                          >
                            <IconTrash />
                          </Button>
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
            count={usersList.length}
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

      <Modal open={openCreate} onClose={handleCloseCreate} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.modalStyles}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            {title} {isEdit ? <strong style={{ fontSize: 16 }}>{id}</strong> : <></>}
          </Typography>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <div>
                  <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                      <Typography>Datos Usuario</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container style={{ marginTop: 10 }}>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="name">
                                  <span>*</span> {inputLabels.labelName}
                                </InputLabel>
                                <OutlinedInput
                                  id={inputLabels.name}
                                  type="text"
                                  name={inputLabels.name}
                                  value={name || ''}
                                  inputProps={{}}
                                  onChange={(ev) => setName(ev.target.value)}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="lastName">
                                  <span>*</span> {inputLabels.labelLastName}
                                </InputLabel>
                                <OutlinedInput
                                  id={inputLabels.lastName}
                                  type="text"
                                  name={inputLabels.lastName}
                                  value={lastName || ''}
                                  inputProps={{}}
                                  onChange={(ev) => setLastName(ev.target.value)}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="email">
                                  <span>*</span> {inputLabels.labelEmail}
                                </InputLabel>
                                <OutlinedInput
                                  id={inputLabels.email}
                                  type="email"
                                  name={inputLabels.email}
                                  value={email || ''}
                                  inputProps={{}}
                                  onChange={(ev) => setEMail(ev.target.value)}
                                  readOnly
                                />
                              </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                                <InputLabel htmlFor="code">
                                  <span>*</span> {'Código'}
                                </InputLabel>
                                <OutlinedInput
                                  id={'code'}
                                  type="number"
                                  name={'code'}
                                  value={code || ''}
                                  inputProps={{}}
                                  onChange={(ev) => setCode(ev.target.value)}
                                  readOnly
                                />
                              </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                              <FormControl fullWidth>
                                <InputLabel id={inputLabels.profile}>* {inputLabels.labelProfile}</InputLabel>
                                <Select
                                  labelId={inputLabels.profile}
                                  id={inputLabels.profile}
                                  value={profile}
                                  label={inputLabels.labelProfile}
                                  onChange={(ev) => setProfile(ev.target.value)}
                                >
                                  <MenuItem value={genConst.CONST_PRO_ADM}>{genConst.CONST_PRO_ADM_TXT}</MenuItem>
                                  <MenuItem value={genConst.CONST_PRO_DEF}>{genConst.CONST_PRO_STU_TXT}</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item lg={6} md={6} sm={6} xs={6}>
                              <FormControl fullWidth>
                                <InputLabel id={inputLabels.state}>* {inputLabels.labelState}</InputLabel>
                                <Select
                                  labelId={inputLabels.state}
                                  id={inputLabels.state}
                                  value={state}
                                  label={inputLabels.labelState}
                                  onChange={(ev) => setState(ev.target.value)}
                                >
                                  <MenuItem value={genConst.CONST_STA_ACT}>{genConst.CONST_STA_ACT_TXT}</MenuItem>
                                  <MenuItem value={genConst.CONST_STA_INACT}>{genConst.CONST_STA_INACT_TXT}</MenuItem>
                                </Select>
                              </FormControl>
                            </Grid>
                            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                              <center>
                                <ButtonGroup>
                                  {!isEdit ? (
                                    <Button
                                      variant="contained"
                                      startIcon={<IconDeviceFloppy />}
                                      size="large"
                                      style={{ backgroundColor: genConst.CONST_CREATE_COLOR }}
                                      onClick={handleCreateUser}
                                    >
                                      {titles.buttonCreate}
                                    </Button>
                                  ) : (
                                    <Button
                                      variant="contained"
                                      startIcon={<IconPencil />}
                                      size="large"
                                      style={{ backgroundColor: genConst.CONST_UPDATE_COLOR }}
                                      onClick={handleEditUser}
                                    >
                                      {titles.buttonUpdate}
                                    </Button>
                                  )}
                                  <Button
                                    variant="contained"
                                    startIcon={<IconCircleX />}
                                    size="large"
                                    style={{ backgroundColor: genConst.CONST_CANCEL_COLOR }}
                                    onClick={handleCloseCreate}
                                  >
                                    {titles.buttonCancel}
                                  </Button>
                                </ButtonGroup>
                              </center>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                    <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
                      <Typography>Suscripción</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Grid container style={{ marginTop: 10 }}>
                        <Grid item xs={12}>
                          <Grid container spacing={1}>
                            {isEdit ? (
                              <>
                                <Grid item lg={6} md={6} sm={6} xs={6} style={{ marginBottom: 30 }}>
                                  <FormControl fullWidth>
                                    <InputLabel>
                                      <strong style={{ fontSize: 16 }}>Usuario</strong>
                                    </InputLabel>
                                  </FormControl>
                                  <FormControl fullWidth>
                                    <InputLabel>
                                      <strong>Usuario desde: </strong>
                                      {createAt}
                                    </InputLabel>
                                  </FormControl>
                                  <FormControl fullWidth>
                                    <InputLabel>
                                      <strong>Código: </strong>
                                      {code}
                                    </InputLabel>
                                  </FormControl>
                                </Grid>
                                <Grid item lg={6} md={6} sm={6} xs={6} style={{ marginBottom: 30 }}>
                                  <FormControl fullWidth>
                                    <InputLabel>
                                      <strong style={{ fontSize: 16 }}>Suscripción Actual</strong>
                                    </InputLabel>
                                  </FormControl>
                                  {subData.state == genConst.CONST_STATE_AC ? (
                                    <>
                                      <FormControl fullWidth>
                                        <InputLabel>
                                          <strong>Plan Actual: </strong>
                                          {subData.description}
                                        </InputLabel>
                                      </FormControl>
                                      <FormControl fullWidth>
                                        <InputLabel>
                                          <strong>Precio: </strong>
                                          {'$ ' + subData.price}
                                        </InputLabel>
                                      </FormControl>
                                      <FormControl fullWidth>
                                        <InputLabel>
                                          <strong>Fecha hasta: </strong>
                                          {subData.endDate}
                                        </InputLabel>
                                      </FormControl>
                                    </>
                                  ) : (
                                    <FormControl fullWidth>
                                      <InputLabel>
                                        <strong>ESTADO: </strong>
                                        {subData.state == genConst.CONST_STATE_AC
                                          ? genConst.CONST_SUB_STATE_ACT_TEXT
                                          : genConst.CONST_SUB_STATE_INA_TEXT}
                                      </InputLabel>
                                    </FormControl>
                                  )}
                                </Grid>
                              </>
                            ) : (
                              <></>
                            )}
                            <Grid item lg={12} md={12} sm={12} xs={12}>
                              <center>
                                <h5>Seleccione el periodo de suscripción</h5>
                                <ButtonGroup variant="outlined" aria-label="outlined button group">
                                  <Button
                                    startIcon={<IconCalendar />}
                                    onClick={() => {
                                      setType(1);
                                      let subtotal = Math.round((genConst.CONST_MONTH_VALUE / genConst.CONST_IVA) * 10 ** 2) / 10 ** 2;
                                      let ivaValue = genConst.CONST_MONTH_VALUE - subtotal;
                                      let ivaRound = Math.round(ivaValue * 10 ** 2) / 10 ** 2;
                                      setIva(ivaRound);
                                      setSubtotal(subtotal);
                                      setTotal(genConst.CONST_MONTH_VALUE);
                                      setEndDate(endDateWithParam(genConst.CONST_MONTH_DAYS));
                                      handleOpenSub();
                                    }}
                                    variant="contained"
                                  >
                                    MES
                                  </Button>
                                  <Button
                                    endIcon={<IconCalendar />}
                                    onClick={() => {
                                      setType(2);
                                      let subtotal = Math.round((genConst.CONST_YEAR_VALUE / genConst.CONST_IVA) * 10 ** 2) / 10 ** 2;
                                      let ivaValue = genConst.CONST_YEAR_VALUE - subtotal;
                                      let ivaRound = Math.round(ivaValue * 10 ** 2) / 10 ** 2;
                                      setIva(ivaRound);
                                      setSubtotal(subtotal);
                                      setTotal(genConst.CONST_YEAR_VALUE);
                                      setEndDate(endDateWithParam(genConst.CONST_YEAR_DAYS));
                                      handleOpenSub();
                                    }}
                                    variant="outlined"
                                  >
                                    AÑO
                                  </Button>
                                </ButtonGroup>
                              </center>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>

      <Modal open={openDelete} onClose={handleCloseDelete} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.modalStylesDelete}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            {title}
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 20, fontSize: 16 }}>
            {titles.titleDeleteModal} <strong>{name}</strong>
          </Typography>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      startIcon={<IconTrash />}
                      size="large"
                      style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                      onClick={handleDeleteUser}
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

      <Modal open={openSub} onClose={handleCloseSub} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.modalStylesDelete}>
          <Typography id="modal-modal-title" variant="h2" component="h2" align="center">
            {titles.titleSub}
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 20, fontSize: 14 }}>
            {titles.titleSubModal} <strong>{type == 1 ? ' MES' : ' AÑO'}</strong> al usuario <strong>{name + ' ' + lastName}</strong>?
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 10, fontSize: 14 }}>
            Fecha Inicio: <strong>{startDate}</strong>
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 0, fontSize: 14 }}>
            Fecha Fin: <strong>{endDate}</strong>
          </Typography>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={0}>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                  <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 0, fontSize: 14 }}>
                    SUBTOTAL
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                  <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 0, fontSize: 14 }}>
                    IVA
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                  <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 0, fontSize: 14 }}>
                    TOTAL
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                  <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 0, fontSize: 14 }}>
                    $ <strong>{Number.parseFloat(subtotal).toFixed(2)}</strong>
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                  <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 0, fontSize: 14 }}>
                    $ <strong>{Number.parseFloat(iva).toFixed(2)}</strong>
                  </Typography>
                </Grid>
                <Grid item lg={4} md={4} sm={4} xs={4}>
                  <Typography id="modal-modal-title" variant="p" component="p" style={{ marginTop: 0, fontSize: 14 }}>
                    $ <strong>{Number.parseFloat(total).toFixed(2)}</strong>
                  </Typography>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 1 }}>
                  <center>
                    <div
                      style={{
                        border: 'dashed gray',
                        borderRadius: 10,
                        borderWidth: 0.2,
                        width: 300,
                        height: 160,
                        cursor: 'pointer'
                      }}
                    >
                      <center>
                        <input type="file" id="picture" style={{ display: 'none' }} onChange={handleChangeVoucher} accept="image/*" />
                        <div htmlFor="picture" id="picture">
                          <label htmlFor="picture">
                            <img
                              src={picture.preview || defaultImage}
                              alt="Comprobante"
                              width={picture.preview ? 170 : 80}
                              height={picture.preview ? 150 : 80}
                              style={{ borderRadius: 15, paddingTop: 5, cursor: 'pointer' }}
                            />
                            {picture.preview ? '' : <p style={{ fontSize: 13, color: '#3a3b3c', marginTop: 30 }}>Adjuntar comprobante</p>}
                          </label>
                        </div>
                      </center>
                    </div>
                  </center>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
                  <center>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        startIcon={<IconCheck />}
                        size="large"
                        style={{ backgroundColor: genConst.CONST_CREATE_COLOR }}
                        onClick={handleActiveSubscription}
                      >
                        {titles.buttonSub}
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<IconCircleX />}
                        size="large"
                        style={{ backgroundColor: genConst.CONST_CANCEL_COLOR }}
                        onClick={handleCloseSub}
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

      <Modal open={openLoader} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.modalStylesLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </div>
  );
}
