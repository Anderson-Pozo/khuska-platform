import React, { useState } from 'react';
import { useTheme } from '@mui/material/styles';
// material-ui
import {
  Button,
  Menu,
  MenuItem,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Container,
  Modal,
  Grid,
  FormControl,
  InputLabel,
  OutlinedInput,
  Select,
  ButtonGroup,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { IconApps, IconPlus, IconSettings2, IconDeviceFloppy, IconCircleX, IconEdit, IconTrash } from '@tabler/icons';
import { inputLabels, titles } from './Settings.texts';
import { uiStyles } from './Settings.styles';
import { genConst } from 'store/constant';
import defImage from 'assets/images/defaultCourse.jpg';
import { fullDate } from 'utils/validations';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { createDocument } from 'config/firebaseEvents';
import { collPaymentMtd } from 'store/collections';

//Firebase
import { db } from 'config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import MessageDark from 'components/message/MessageDark';

const PaymentSettings = () => {
  const theme = useTheme();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [openCreate, setOpenCreate] = useState(false);
  const [openLoader, setOpenLoader] = React.useState(false);
  const [methodType, setMethodType] = useState(null);
  const [ctaType, setCtaType] = useState(null);
  const [cta, setCta] = useState(null);
  const [ctaOwner, setCtaOwner] = useState(null);
  const [ctaEmail, setCtaEmail] = useState(null);
  const [ctaCi, setCtaCi] = useState(null);
  const [brandImg, setBrandImg] = React.useState({ preview: '', raw: '' });
  const [qrImg, setQrImg] = React.useState({ preview: '', raw: '' });
  const [methodsList, setMethodsLists] = useState([]);

  const getData = async () => {
    const list = [];
    const querySnapshot = await getDocs(collection(db, collPaymentMtd));
    querySnapshot.forEach((doc) => {
      list.push(doc.data());
    });
    setMethodsLists(list);
  };

  React.useEffect(() => {
    getData();
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleUsrck = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOpenCreate = () => {
    setOpenCreate(true);
  };
  const handleCloseCreate = () => {
    setOpenCreate(false);
    clearData();
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setBrandImg({
          preview: img.src,
          raw: raw
        });
      };
    }
  };

  const handleLogoChange = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setQrImg({
          preview: img.src,
          raw: raw
        });
      };
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const clearData = () => {
    setBrandImg({
      preview: '',
      raw: ''
    });
    setQrImg({
      preview: '',
      raw: ''
    });
    setCtaType(null);
    setCta(null);
    setCtaOwner(null);
    setCtaType(null);
    setCtaCi(null);
    setCtaEmail(null);
  };

  const handleCreate = () => {
    let id = null;
    let object = null;
    if (methodType === genConst.CONST_MTD_1_VAL) {
      id = '2023000001';
      object = {
        id: id,
        type: methodType,
        createAt: fullDate(),
        state: 1
      };
      createMethod(object, id);
    } else if (methodType === genConst.CONST_MTD_2_VAL) {
      id = '2023000002';
      object = {
        id: id,
        type: methodType,
        createAt: fullDate(),
        cta: cta,
        ctaOwner: ctaOwner,
        ctaType: ctaType,
        ctaCi: ctaCi,
        ctaEmail: ctaEmail,
        brandImg: null,
        state: 1
      };
      createMethod(object, id);
    } else if (methodType === genConst.CONST_MTD_3_VAL) {
      id = '2023000003';
      object = {
        id: id,
        type: methodType,
        createAt: fullDate(),
        brandImg: null,
        qrImage: null,
        state: 1
      };
      createMethod(object, id);
    } else if (methodType === genConst.CONST_MTD_4_VAL) {
      id = '2023000004';
      object = {
        id: id,
        type: methodType,
        createAt: fullDate(),
        brandImg: null,
        state: 1
      };
      createMethod(object, id);
    } else {
      console.log('MP');
    }
  };

  const createMethod = (object, id) => {
    console.log('create', object);
    setOpenLoader(true);
    setTimeout(() => {
      createDocument(collPaymentMtd, id, object);
      setOpenLoader(false);
      setOpenCreate(false);
      getData();
      toast.success(titles.successDelete, { position: toast.POSITION.TOP_RIGHT });
      clearData();
    }, 2000);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <ToastContainer />
      <AppBar position="static" style={uiStyles.appbar}>
        <Container maxWidth="xl" style={{ marginTop: -6 }}>
          <Toolbar disableGutters>
            <IconSettings2 />
            <Box sx={uiStyles.box}>
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' }
                }}
              >
                <MenuItem key="id-1" onClick={handleOpenCreate}>
                  <IconPlus style={{ marginRight: 4 }} />
                  <Typography textAlign="center">{titles.addConfig}</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={uiStyles.boxMenuActions}>
              <Button
                variant="primary"
                startIcon={<IconApps />}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleUsrck}
              >
                {titles.generalAction}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem onClick={handleOpenCreate}>
                  <IconPlus style={{ marginRight: 10 }} />
                  {titles.addConfig}
                </MenuItem>
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0 }}></Box>
          </Toolbar>
        </Container>
      </AppBar>
      {methodsList.length > 0 ? (
        <Paper sx={uiStyles.paper}>
          <TableContainer sx={{ maxHeight: 350 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell key="id-name" align="left" style={{ minWidth: 170, fontWeight: 'bold' }}>
                    {titles.tableCell1}
                  </TableCell>
                  <TableCell key="id-email" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {titles.tableCell2}
                  </TableCell>
                  <TableCell key="id-state" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {titles.tableCell3}
                  </TableCell>
                  <TableCell key="id-actions" align="center" style={{ minWidth: 75, fontWeight: 'bold' }}>
                    {titles.tableCellActions}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {methodsList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r) => (
                  <TableRow hover key={r.id}>
                    <TableCell align="left">
                      {r.type === genConst.CONST_MTD_1_VAL
                        ? genConst.CONST_MTD_1_LBL
                        : r.type === genConst.CONST_MTD_2_VAL
                        ? genConst.CONST_MTD_2_LBL
                        : r.type === genConst.CONST_MTD_3_VAL
                        ? genConst.CONST_MTD_3_LBL
                        : r.type === genConst.CONST_MTD_4_VAL
                        ? genConst.CONST_MTD_4_LBL
                        : genConst.CONST_MTD_5_LBL}
                    </TableCell>
                    <TableCell align="left">{r.createAt}</TableCell>
                    <TableCell align="left">
                      {r.state === genConst.CONST_STA_ACT ? genConst.CONST_STA_ACT_TXT : genConst.CONST_STA_INACT_TXT}
                    </TableCell>
                    <TableCell align="center">
                      <ButtonGroup variant="contained">
                        <Button style={{ backgroundColor: genConst.CONST_UPDATE_COLOR }}>
                          <IconEdit />
                        </Button>
                        <Button style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}>
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
            count={methodsList.length}
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
            {titles.titleCreate}
          </Typography>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <FormControl fullWidth>
                    <InputLabel id={inputLabels.type}>* {inputLabels.type}</InputLabel>
                    <Select
                      labelId={inputLabels.type}
                      id={inputLabels.type}
                      value={methodType}
                      label={inputLabels.type}
                      onChange={(ev) => {
                        setMethodType(ev.target.value);
                        clearData();
                      }}
                    >
                      <MenuItem value={genConst.CONST_MTD_1_VAL}>{genConst.CONST_MTD_1_LBL}</MenuItem>
                      <MenuItem value={genConst.CONST_MTD_2_VAL}>{genConst.CONST_MTD_2_LBL}</MenuItem>
                      <MenuItem value={genConst.CONST_MTD_3_VAL}>{genConst.CONST_MTD_3_LBL}</MenuItem>
                      <MenuItem value={genConst.CONST_MTD_4_VAL}>{genConst.CONST_MTD_4_LBL}</MenuItem>
                      <MenuItem value={genConst.CONST_MTD_5_VAL}>{genConst.CONST_MTD_5_LBL}</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                {methodType === genConst.CONST_MTD_1_VAL ? <></> : <></>}
                {methodType === genConst.CONST_MTD_2_VAL ? (
                  <>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="ctaNumber">
                          <span>*</span> {inputLabels.ctaNumber}
                        </InputLabel>
                        <OutlinedInput
                          id={inputLabels.ctaNumber}
                          type="number"
                          name={inputLabels.ctaNumber}
                          value={cta || ''}
                          onChange={(ev) => setCta(ev.target.value)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor="ctaOwner">
                          <span>*</span> {inputLabels.ctaOwner}
                        </InputLabel>
                        <OutlinedInput
                          id={inputLabels.ctaOwner}
                          type="text"
                          name={inputLabels.ctaOwner}
                          value={ctaOwner || ''}
                          onChange={(ev) => setCtaOwner(ev.target.value)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={6}>
                      <FormControl fullWidth>
                        <InputLabel id={inputLabels.ctaType}>* {inputLabels.ctaType}</InputLabel>
                        <Select
                          labelId={inputLabels.ctaType}
                          id={inputLabels.ctaType}
                          value={ctaType}
                          label={inputLabels.ctaType}
                          onChange={(ev) => setCtaType(ev.target.value)}
                        >
                          <MenuItem value={genConst.CONST_CTA_AHO_VAL}>{genConst.CONST_CTA_AHO_DES}</MenuItem>
                          <MenuItem value={genConst.CONST_CTA_COR_VAL}>{genConst.CONST_CTA_COR_DES}</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="ctaCi">
                          <span>*</span> {inputLabels.ctaCi}
                        </InputLabel>
                        <OutlinedInput
                          id={inputLabels.ctaCi}
                          type="number"
                          name={inputLabels.ctaCi}
                          value={ctaCi || ''}
                          onChange={(ev) => setCtaCi(ev.target.value)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={6}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="ctaEmail">
                          <span>*</span> {inputLabels.ctaEmail}
                        </InputLabel>
                        <OutlinedInput
                          id={inputLabels.ctaEmail}
                          type="email"
                          name={inputLabels.ctaEmail}
                          value={ctaEmail || ''}
                          onChange={(ev) => setCtaEmail(ev.target.value)}
                        />
                      </FormControl>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                {methodType === genConst.CONST_MTD_3_VAL ? (
                  <>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <center>
                        <input type="file" id="qr" style={{ display: 'none' }} onChange={handleLogoChange} accept="image/*" />
                        <div htmlFor="qr" id="qr">
                          <label htmlFor="qr">
                            <img src={qrImg.preview || defImage} alt="Qr" width={150} height={150} style={{ borderRadius: 15 }} />
                            <p style={{ fontSize: 12 }}>{titles.imageIndications}</p>
                          </label>
                        </div>
                      </center>
                    </Grid>
                    <Grid item lg={6} md={6} sm={6} xs={6}>
                      <center>
                        <input type="file" id="banner" style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
                        <div htmlFor="banner" id="banner">
                          <label htmlFor="banner">
                            <img src={brandImg.preview || defImage} alt="Banner" width={150} height={150} style={{ borderRadius: 15 }} />
                            <p style={{ fontSize: 12 }}>{titles.logoIndications}</p>
                          </label>
                        </div>
                      </center>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <center>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        startIcon={<IconDeviceFloppy />}
                        size="large"
                        style={{ margin: 5, borderRadius: 10, backgroundColor: genConst.CONST_CREATE_COLOR }}
                        onClick={handleCreate}
                      >
                        {titles.buttonCreate}
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<IconCircleX />}
                        size="large"
                        style={{ margin: 5, borderRadius: 10, backgroundColor: genConst.CONST_CANCEL_COLOR }}
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
        </Box>
      </Modal>
      <Modal open={openLoader} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.styleLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </Box>
  );
};

export default PaymentSettings;
