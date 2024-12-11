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
import { IconCheck, IconCircleX, IconDownload, IconEdit, IconFile, IconPlus, IconSearch, IconTicket, IconTrash } from '@tabler/icons';
import { uiStyles } from './Voucher.styles';
import { inputLabels, titles } from './Vouchers.texts';
import { getVouchers } from 'config/firebaseEvents';
import MessageDark from 'components/message/MessageDark';
import { searchingVoucher } from 'utils/search';
import { genConst } from 'store/constant';
import { saveAs } from 'file-saver';

const Vouchers = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [openView, setOpenView] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [openActivation, setOpenActivation] = useState(false);
  const [openLoader, setOpenLoader] = useState(false);
  const [vouchers, setVouchers] = useState([]);
  const [search, setSearch] = useState('');
  const [title, setTitle] = useState(null);
  const [id, setId] = useState(null);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [total, setTotal] = useState(null);
  const [type, setType] = useState(null);
  const [createAt, setCreateAt] = useState(null);
  const [image, setImage] = useState(null);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    getVouchers().then((vou) => {
      setVouchers(vou);
    });
  }, []);

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

  const handleOpenActivation = () => {
    setOpenActivation(true);
  };

  const handleCloseActivation = () => {
    setOpenActivation(false);
  };

  const handleOpenView = () => {
    setOpenView(true);
  };

  const handleCloseView = () => {
    setOpenView(false);
  };

  const handleDownload = () => {
    saveAs(image, createAt + 'voucher.jpg');
  };

  const handleActivation = () => {
    if (type == 1) {
      console.log('Activación Mes');
    } else if (type == 2) {
      console.log('Activación Año');
    } else {
      console.log('No valid value');
    }
  };

  const handleDelete = () => {
    setOpenLoader(true);
  };

  return (
    <Box>
      <ToastContainer />
      <AppBar position="static" style={uiStyles.appbar}>
        <Toolbar>
          <IconButton color="inherit">
            <IconTicket color="#FFF" />
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
            Comprobantes
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
          {vouchers.length > 0 ? (
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
      {vouchers.length > 0 ? (
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
                  <TableCell key="id-email" align="left" style={{ minWidth: 150, fontWeight: 'bold' }}>
                    {titles.tableCell3}
                  </TableCell>
                  <TableCell key="id-date" align="left" style={{ minWidth: 75, fontWeight: 'bold' }}>
                    {titles.tableCell4}
                  </TableCell>
                  <TableCell key="id-actions" align="center" style={{ minWidth: 125, fontWeight: 'bold' }}>
                    {titles.tableCellActions}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vouchers
                  .filter(searchingVoucher(search))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((r) => (
                    <TableRow hover key={r.id}>
                      <TableCell align="left">{r.id}</TableCell>
                      <TableCell align="left">{r.userName}</TableCell>
                      <TableCell align="left">{r.userEmail}</TableCell>
                      <TableCell align="left">{r.createAt}</TableCell>
                      <TableCell align="center">
                        <ButtonGroup variant="contained">
                          <Button
                            style={{ backgroundColor: genConst.CONST_INFO_COLOR }}
                            onClick={() => {
                              setTitle(titles.titleVoucher);
                              setId(r.id);
                              setUserId(r.userId);
                              setUserName(r.userName);
                              setUserEmail(r.userEmail);
                              setTotal(r.total);
                              setType(r.type);
                              setCreateAt(r.createAt);
                              setImage(r.picture);
                              handleOpenView();
                            }}
                          >
                            <IconFile />
                          </Button>
                          <Button
                            style={{ backgroundColor: genConst.CONST_UPDATE_COLOR }}
                            onClick={() => {
                              setId(r.id);
                              setTitle(titles.titleUpdate);
                            }}
                          >
                            <IconEdit />
                          </Button>
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
            count={vouchers.length}
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

      <Modal open={openView} onClose={handleCloseView} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.modalStylesView}>
          <Typography id="modal-modal-title" variant="h2" component="h2" align="center">
            {title}
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" align="center" style={{ marginTop: 20, fontSize: 16 }}>
            {'Comprobante: '} <strong>{id}</strong>
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" align="center" style={{ marginTop: 20, fontSize: 16 }}>
            <p style={{ fontSize: 13 }}>ID Usuario: {userId}</p>
            <p style={{ fontSize: 13 }}>Usuario: {userName}</p>
            <p style={{ fontSize: 13 }}>Email: {userEmail}</p>
            <p style={{ fontSize: 13 }}>Total: ${Number.parseFloat(total).toFixed(2)}</p>
            <p style={{ fontSize: 13 }}>Tipo: {type == 1 ? genConst.CONST_MONTH_TXT : genConst.CONST_YEAR_TXT}</p>
            <p style={{ fontSize: 13 }}>Fecha: {createAt}</p>
          </Typography>
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <center>
                <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: '100%', cursor: 'pointer' }}>
                  <img src={image} alt="Voucher Img" width={100} />
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
                    style={{ backgroundColor: genConst.CONST_SUCCESS_COLOR }}
                    onClick={handleOpenActivation}
                  >
                    {titles.buttonActive}
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<IconDownload />}
                    size="large"
                    style={{ backgroundColor: genConst.CONST_CREATE_COLOR }}
                    onClick={handleDownload}
                  >
                    {titles.buttonDownload}
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<IconCircleX />}
                    size="large"
                    style={{ backgroundColor: genConst.CONST_CANCEL_COLOR }}
                    onClick={handleCloseView}
                  >
                    {titles.buttonCancel}
                  </Button>
                </ButtonGroup>
              </center>
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
            <Typography id="modal-modal-title" variant="p" component="p">
              <p style={{ fontSize: 13 }}>Usuario: {userName}</p>
              <p style={{ fontSize: 13 }}>Email: {userEmail}</p>
              <p style={{ fontSize: 13 }}>Total: ${Number.parseFloat(total).toFixed(2)}</p>
              <p style={{ fontSize: 13 }}>Tipo: {type == 1 ? genConst.CONST_MONTH_TXT : genConst.CONST_YEAR_TXT}</p>
            </Typography>
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
                          onClick={handleActivation}
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

export default Vouchers;
