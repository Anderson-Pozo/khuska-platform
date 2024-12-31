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
  Typography,
  ButtonGroup,
  Button,
  Modal,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import PropTypes from 'prop-types';
import { useTheme } from '@mui/material/styles';
import { uiStyles } from './Benefits.styles';
import CircularProgress from '@mui/material/CircularProgress';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Collections
import { titles } from './Benefits.texts';
//Utils
import {
  createLogRecord,
  deleteDocument,
  getAllPayments,
  getAllUserBenefits,
  getBenefits,
  getTotalApprovedOrders,
  getTotalBenefit,
  getTotalBenefitPay,
  getTotalBenefitPending,
  getTotalPayments,
  updateDocument
} from 'config/firebaseEvents';
//types array
import * as Msg from 'store/message';
import MessageDark from 'components/message/MessageDark';
import EarningCard from 'components/cards/Benefit/EarningCard';
import EarningBlueCard from 'components/cards/Benefit/EarningBlueCard';
import EarningRedCard from 'components/cards/Benefit/EarningRedCard';
import EarningGreenCard from 'components/cards/Benefit/EarningGreenCard';
import { genConst, process } from 'store/constant';
import { IconCircleX, IconDeviceFloppy, IconEdit, IconTrash } from '@tabler/icons';
import { fullDate } from 'utils/validations';
import { collKhuskaBenefit, collLog, collPayment } from 'store/collections';
import { generateId } from 'utils/idGenerator';

export default function Benefits() {
  const theme = useTheme();
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
  const [openEdit, setOpenEdit] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  //VALUES INCOMES
  const [tran, setTran] = useState(1);
  const [id, setId] = useState('');
  const [idUser, setIdUser] = useState('');
  const [nameUser, setNameUser] = useState('');
  const [emailUser, setEmailUser] = useState('');
  const [sub, setSub] = useState(0);
  const [iva, setIva] = useState(0);
  const [tot, setTot] = useState(0);
  const [createAt, setCreateAt] = useState('');

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
    // getTotalBenefitPay().then((res) => {
    //   setTotalPay(Number.parseFloat(res).toFixed(2));
    // });
    getTotalApprovedOrders().then((res) => {
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

  const handleOpenEdit = () => {
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setOpenEdit(false);
  };

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleSave = () => {
    setOpenLoader(true);
    const idTran = generateId(10);
    const objectLog = {
      id: idTran,
      idTran: id,
      nameUser: nameUser,
      emailUser: emailUser,
      sub: sub ? Number.parseFloat(sub).toFixed(2) : null,
      iva: iva ? Number.parseFloat(iva).toFixed(2) : null,
      total: Number.parseFloat(tot).toFixed(2),
      createAt: fullDate(),
      userDelete: genConst.CONST_ADM_NOT,
      subject: tran === 1 ? genConst.CONST_DEL_TRAN_1 : genConst.CONST_DEL_TRAN_2,
      collection: tran === 1 ? collPayment : collKhuskaBenefit
    };
    createLogRecord(collLog, process.LOG_EDIT_TRAN, objectLog);
    if (tran === 1) {
      const object = {
        nameUser: nameUser,
        emailUser: emailUser,
        sub: Number.parseFloat(sub).toFixed(2),
        iva: Number.parseFloat(iva).toFixed(2),
        total: Number.parseFloat(tot).toFixed(2),
        updateAt: fullDate()
      };
      updateDocument(collPayment, id, object);
    } else if (tran === 2) {
      const object = {
        nameUser: nameUser,
        emailUser: emailUser,
        total: Number.parseFloat(tot).toFixed(2),
        updateAt: fullDate()
      };
      updateDocument(collKhuskaBenefit, id, object);
    }
    setTimeout(() => {
      setOpenLoader(false);
      setOpenEdit(false);
      handleClean();
      getData();
      toast.success(Msg.transuccess, { position: toast.POSITION.TOP_RIGHT });
    }, 2000);
  };

  const handleCancel = () => {
    setOpenEdit(false);
    handleClean();
  };

  const handleClean = () => {
    setId('');
    setIdUser('');
    setNameUser('');
    setEmailUser('');
    setSub(0);
    setIva(0);
    setTot(0);
    setCreateAt('');
  };

  const handleDelete = () => {
    setOpenLoader(true);
    const idTran = generateId(10);
    const objectLog = {
      id: idTran,
      idTran: id,
      nameUser: nameUser,
      emailUser: emailUser,
      sub: sub ? Number.parseFloat(sub).toFixed(2) : null,
      iva: iva ? Number.parseFloat(iva).toFixed(2) : null,
      total: Number.parseFloat(tot).toFixed(2),
      createAt: fullDate(),
      userDelete: genConst.CONST_ADM_NOT,
      subject: tran === 1 ? genConst.CONST_DEL_TRAN_1 : genConst.CONST_DEL_TRAN_2,
      collection: tran === 1 ? collPayment : collKhuskaBenefit
    };
    createLogRecord(collLog, process.LOG_DELETE_TRAN, objectLog);
    if (tran === 1) {
      deleteDocument(collPayment, id);
    } else {
      deleteDocument(collKhuskaBenefit, id);
    }
    setTimeout(() => {
      setOpenLoader(false);
      setOpenDelete(false);
      handleClean();
      getData();
      toast.success(Msg.trandelete, { position: toast.POSITION.TOP_RIGHT });
    }, 2000);
  };

  const TotalIncomes = () => {
    return (
      <>
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
              {dataPayments.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((r) => (
                <TableRow hover key={r.id}>
                  <TableCell align="left">{r.id}</TableCell>
                  <TableCell align="left">{r.nameUser}</TableCell>
                  <TableCell align="left">{r.createAt}</TableCell>
                  <TableCell align="left">$ {Number.parseFloat(r.total).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button
                        style={{ backgroundColor: genConst.CONST_CREATE_COLOR }}
                        onClick={() => {
                          setTran(1);
                          setId(r.id);
                          setIdUser(r.idUser);
                          setNameUser(r.nameUser);
                          setEmailUser(r.emailUser);
                          setSub(r.sub);
                          setIva(r.iva);
                          setTot(r.total);
                          setCreateAt(r.createAt);
                          handleOpenEdit();
                        }}
                      >
                        <IconEdit color="#FFF" />
                      </Button>
                      <Button
                        style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                        onClick={() => {
                          setTran(1);
                          setId(r.id);
                          handleOpenDelete();
                        }}
                      >
                        <IconTrash color="#FFF" />
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
          labelRowsPerPage={titles.rowsPerPage}
          component="div"
          count={dataPayments.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </>
    );
  };

  const TotalBenefit = () => {
    return (
      <>
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
                  <TableCell align="left">{r.emailUser}</TableCell>
                  <TableCell align="left">{r.createAt}</TableCell>
                  <TableCell align="left">$ {Number.parseFloat(r.total).toFixed(2)}</TableCell>
                  <TableCell align="center">
                    <ButtonGroup>
                      <Button
                        style={{ backgroundColor: genConst.CONST_CREATE_COLOR }}
                        onClick={() => {
                          setTran(2);
                          setId(r.id);
                          setIdUser(r.idUser);
                          setNameUser(r.nameUser);
                          setEmailUser(r.emailUser);
                          setTot(r.total);
                          setCreateAt(r.createAt);
                          handleOpenEdit();
                        }}
                      >
                        <IconEdit color="#FFF" />
                      </Button>
                      <Button
                        style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                        onClick={() => {
                          setTran(2);
                          setId(r.id);
                          handleOpenDelete();
                        }}
                      >
                        <IconTrash color="#FFF" />
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
          labelRowsPerPage={titles.rowsPerPage}
          component="div"
          count={dataList.length}
          rowsPerPage={rowsPerPageK}
          page={pagek}
          onPageChange={handleChangePageK}
          onRowsPerPageChange={handleChangeRowsPerPageK}
        />
      </>
    );
  };

  const TotalUserBenefit = () => {
    return (
      <>
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
                {/* <TableCell key="id-state" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                  {'Estado'}
                </TableCell> */}
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
                  {/* <TableCell align="left">
                    {r.state == genConst.CONST_BEN_CAN ? 'Cancelado' : r.state == genConst.CONST_BEN_PAI ? 'Pagado' : 'Pendiente'}
                  </TableCell> */}
                  <TableCell align="left">$ {Number.parseFloat(r.total).toFixed(2)}</TableCell>
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
      </>
    );
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
                  <EarningGreenCard total={total} detail="Beneficio" />
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={6}>
                  <EarningBlueCard total={totalPay} detail="Pagado" />
                </Grid>
                <Grid item lg={3} md={6} sm={6} xs={6}>
                  <EarningRedCard total={(totalPending - totalPay).toFixed(2)} detail="Pendiente" />
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
              <TotalIncomes />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <TotalBenefit />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <TotalUserBenefit />
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
      <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.modalStyles}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            {'Editar: ' + id}
          </Typography>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor={'idUser'}>{'Id Usuario'}</InputLabel>
                    <OutlinedInput
                      id={'idUser'}
                      type="text"
                      name={'idUser'}
                      value={idUser || ''}
                      inputProps={{}}
                      onChange={(ev) => setIdUser(ev.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor={'createAt'}>{'Fecha'}</InputLabel>
                    <OutlinedInput
                      id={'createAt'}
                      type="text"
                      name={'createAt'}
                      value={createAt || ''}
                      onChange={(ev) => setCreateAt(ev.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor={'nameUser'}>{'Usuario'}</InputLabel>
                    <OutlinedInput
                      id={'nameUser'}
                      type="text"
                      name={'nameUser'}
                      value={nameUser || ''}
                      onChange={(ev) => setNameUser(ev.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor={'emailUser'}>{'Correo electrónico'}</InputLabel>
                    <OutlinedInput
                      id={'emailUser'}
                      type="email"
                      name={'emailUser'}
                      value={emailUser || ''}
                      onChange={(ev) => setEmailUser(ev.target.value)}
                    />
                  </FormControl>
                </Grid>
                {tran == 1 ? (
                  <>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor={'sub'}>{'Subtotal $'}</InputLabel>
                        <OutlinedInput
                          id={'sub'}
                          type="number"
                          name={'sub'}
                          value={sub || ''}
                          inputProps={{}}
                          onChange={(ev) => setSub(ev.target.value)}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item lg={4} md={4} sm={4} xs={4}>
                      <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                        <InputLabel htmlFor={'sub'}>{'I.V.A. $'}</InputLabel>
                        <OutlinedInput
                          id={'iva'}
                          type="number"
                          name={'iva'}
                          value={iva || ''}
                          inputProps={{}}
                          onChange={(ev) => setIva(ev.target.value)}
                        />
                      </FormControl>
                    </Grid>
                  </>
                ) : (
                  <></>
                )}
                <Grid item lg={4} md={4} sm={4} xs={4}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor={'sub'}>{'Total $'}</InputLabel>
                    <OutlinedInput
                      id={'total'}
                      type="number"
                      name={'total'}
                      value={tot || ''}
                      inputProps={{}}
                      onChange={(ev) => setTot(ev.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <center>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        startIcon={<IconDeviceFloppy />}
                        size="large"
                        style={{ backgroundColor: genConst.CONST_CREATE_COLOR }}
                        onClick={handleSave}
                      >
                        Guardar
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<IconCircleX />}
                        size="large"
                        style={{ backgroundColor: genConst.CONST_CANCEL_COLOR }}
                        onClick={handleCancel}
                      >
                        Cancelar
                      </Button>
                    </ButtonGroup>
                  </center>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal open={openDelete} onClose={handleCloseDelete} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.styleDelete}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            {'Eliminar Transacción: ' + id}
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" style={uiStyles.modalDeleteTitle}>
            Seguro que desea eliminar la transacción?
          </Typography>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <center>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        startIcon={<IconTrash />}
                        size="large"
                        style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                        onClick={handleDelete}
                      >
                        Eliminar
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<IconCircleX />}
                        size="large"
                        style={{ backgroundColor: genConst.CONST_CANCEL_COLOR }}
                        onClick={handleCloseDelete}
                      >
                        Cancelar
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
