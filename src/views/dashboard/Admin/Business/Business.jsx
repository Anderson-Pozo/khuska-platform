/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Button,
  AppBar,
  Box,
  Toolbar,
  Typography,
  Modal,
  Grid,
  OutlinedInput,
  ButtonGroup,
  IconButton,
  Tooltip,
  Badge,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './Business.styles';
import { IconPlus, IconTrash, IconEdit, IconCircleX, IconBuilding, IconEye, IconArchive, IconSearch, IconBan } from '@tabler/icons';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Collections
import * as Msg from 'store/message';
import { titles, inputLabels } from './Business.texts';
//Utils
import { createLogRecord, deleteDocument, getBusinessList, updateDocument } from 'config/firebaseEvents';
//types array
import MessageDark from 'components/message/MessageDark';
import { genConst, process } from 'store/constant';
import { collBusiness, collLog } from 'store/collections';
import { fullDate } from 'utils/validations';

function searchingData(search) {
  return function (x) {
    return x.name.toLowerCase().includes(search) || x.name.toUpperCase().includes(search) || !search;
  };
}

export default function Business() {
  let navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActive, setOpenActive] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);
  const [search, setSearch] = useState('');
  const [openLoader, setOpenLoader] = useState(false);
  const [dataList, setDataList] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  const getData = () => {
    getBusinessList().then((data) => {
      setDataList(data);
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDelete = () => {
    setOpenLoader(true);
    const object = {
      id: id,
      name: name,
      deleteAt: fullDate()
    };
    deleteDocument(collBusiness, id);
    createLogRecord(collLog, process.LOG_DELETE_BUSINESS, object);
    setTimeout(() => {
      setOpenLoader(false);
      setOpenDelete(false);
      // reloadCoursesData();
      getData();
      toast.success(Msg.coudelsucc, { position: toast.POSITION.TOP_RIGHT });
    }, 2000);
  };

  const handleChangeState = () => {
    setOpenLoader(true);
    const object = {
      id: id,
      isActive: false
    };
    updateDocument(collBusiness, id, object);
    createLogRecord(collLog, process.LOG_INACTIVATE_BUSINESS, object);
    setTimeout(() => {
      setOpenLoader(false);
      setOpenActive(false);
      getData();
      toast.success(Msg.coudelsucc);
    }, 2000);
  };

  return (
    <div>
      <ToastContainer />
      <AppBar position="static" style={uiStyles.appbar}>
        <Toolbar>
          <IconButton color="inherit">
            <IconBuilding color="#FFF" />
          </IconButton>
          <Tooltip title="Agregar Negocio">
            <IconButton
              color="inherit"
              onClick={() => {
                navigate('/main/add-business');
              }}
            >
              <IconPlus />
            </IconButton>
          </Tooltip>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#FFF' }} align="center">
            Negocios
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
          <TableContainer sx={{ maxHeight: 400 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell key="id-name" align="left" style={{ minWidth: 170, fontWeight: 'bold' }}>
                    {inputLabels.name}
                  </TableCell>
                  <TableCell key="id-owner" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {inputLabels.owner}
                  </TableCell>
                  <TableCell key="id-phone" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {inputLabels.phone}
                  </TableCell>
                  <TableCell key="id-city" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {inputLabels.city}
                  </TableCell>
                  {/* <TableCell key="id-address" align="left" style={{ minWidth: 170, fontWeight: 'bold' }}>
                    {inputLabels.address}
                  </TableCell> */}
                  <TableCell key="id-isActive" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {inputLabels.isActive}
                  </TableCell>
                  <TableCell key="id-actions" align="center" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    {titles.actions}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataList
                  .filter(searchingData(search))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((r) => (
                    <TableRow hover key={r.id}>
                      <TableCell align="left">{r.name}</TableCell>
                      <TableCell align="left">{r.owner}</TableCell>
                      <TableCell align="left">{r.phone}</TableCell>
                      <TableCell align="left">{r.city}</TableCell>
                      {/* <TableCell align="left">{r.address}</TableCell> */}
                      <TableCell align="center">
                        {r.isActive ? (
                          <Badge color="success" sx={{ '& .MuiBadge-badge': { color: '#fff' } }} badgeContent="ACTIVO" />
                        ) : (
                          <Badge color="error" sx={{ '& .MuiBadge-badge': { color: '#fff' } }} badgeContent="INACTIVO" />
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <ButtonGroup variant="contained">
                          <Button
                            style={{ backgroundColor: genConst.CONST_UPDATE_COLOR }}
                            onClick={() => {
                              navigate({
                                pathname: '/main/products',
                                search: `?id=${r.id}`
                              });
                            }}
                          >
                            <IconArchive />
                          </Button>
                          <Button
                            style={{ backgroundColor: genConst.CONST_VIEW_COLOR }}
                            onClick={() => {
                              navigate({
                                pathname: '/main/info-business',
                                search: `?id=${r.id}`
                              });
                            }}
                          >
                            <IconEye />
                          </Button>
                          <Button
                            style={{ backgroundColor: genConst.CONST_UPDATE_COLOR }}
                            onClick={() => {
                              navigate({
                                pathname: '/main/edit-business',
                                search: `?id=${r.id}`
                              });
                            }}
                          >
                            <IconEdit />
                          </Button>
                          <Button
                            style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                            onClick={() => {
                              setId(r.id);
                              setName(r.name);
                              setOpenActive(true);
                            }}
                          >
                            <IconBan />
                          </Button>
                          {/* <Button
                            style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                            onClick={() => {
                              setId(r.id);
                              setName(r.name);
                              handleOpenDelete();
                            }}
                          >
                            <IconTrash />
                          </Button> */}
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
              <MessageDark message={titles.noRecordsYet} submessage="" />
            </Grid>
          </Grid>
        </Grid>
      )}
      <Modal open={openDelete} onClose={handleCloseDelete} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.styleDelete}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            {titles.modalDelete}
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" style={uiStyles.modalDeleteTitle}>
            {titles.modaleDeleteDetail} <strong>{name}</strong>
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
                        style={{ margin: 5, borderRadius: 10, backgroundColor: genConst.CONST_DELETE_COLOR }}
                        onClick={handleDelete}
                      >
                        {titles.buttonDelete}
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<IconCircleX />}
                        size="large"
                        style={{ margin: 5, borderRadius: 10, backgroundColor: genConst.CONST_CANCEL_COLOR }}
                        onClick={handleCloseDelete}
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
      <Dialog
        open={openActive}
        onClose={() => setOpenActive(false)}
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
            ¿Estás seguro de que deseas desactivar el negocio {name}? Al hacerlo, sus productos perderán visibilidad y no estarán
            disponibles para los clientes
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenActive(false)} color="secondary">
            Cancelar
          </Button>
          <Button
            variant="contained"
            size="large"
            style={{ margin: 5, borderRadius: 10, backgroundColor: genConst.CONST_DELETE_COLOR }}
            onClick={handleChangeState}
          >
            Desactivar
          </Button>
        </DialogActions>
      </Dialog>
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
