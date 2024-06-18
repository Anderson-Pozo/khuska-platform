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
  AppBar,
  Box,
  Toolbar,
  Grid,
  OutlinedInput,
  ButtonGroup,
  Button,
  Modal,
  Typography,
  IconButton,
  Tooltip
} from '@mui/material';
//Notifications
import 'react-toastify/dist/ReactToastify.css';
//Firebase Events
import { getDocuments } from 'config/firebaseEvents';
import MessageDark from 'components/message/MessageDark';
import { genConst } from 'store/constant';
import { IconCircleX, IconEye, IconHistory, IconSearch } from '@tabler/icons';
import ReactJson from 'react-json-view';

function searchingData(search) {
  return function (x) {
    return x.process.toLowerCase().includes(search) || x.process.toUpperCase().includes(search) || !search;
  };
}

export default function Logs() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [search, setSearch] = useState('');
  const [object, setObject] = useState(null);
  const [openJSON, setOpenJSON] = useState(false);
  const [logList, setLogList] = useState([]);
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const list = [];
      const querySnapshot = await getDocuments('Logs');
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setLogList(list);
    }
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenJSON = () => {
    setOpenJSON(true);
  };
  const handleCloseJSON = () => {
    setOpenJSON(false);
  };

  return (
    <div>
      <AppBar position="static" style={uiStyles.appbar}>
        <Toolbar>
          <IconButton color="inherit">
            <IconHistory color="#FFF" />
          </IconButton>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#FFF' }} align="center">
            Logs Plataforma
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
          {logList.length > 0 ? (
            <OutlinedInput
              id="searchField"
              type="text"
              name="searchField"
              fullWidth
              onChange={(ev) => setSearch(ev.target.value)}
              placeholder="Buscar por detalle"
              style={{ width: '100%', marginTop: 10 }}
            />
          ) : (
            <></>
          )}
        </Box>
      )}
      {logList.length > 0 ? (
        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: 2 }}>
          <TableContainer sx={{ maxHeight: 600 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell key="id-log-details" align="left" style={{ minWidth: 220, fontWeight: 'bold' }}>
                    Proceso
                  </TableCell>
                  <TableCell key="id-log-date" align="left" style={{ minWidth: 200, fontWeight: 'bold' }}>
                    Fecha Proceso
                  </TableCell>
                  <TableCell key="id-log-obj" align="left" style={{ minWidth: 100, fontWeight: 'bold' }}>
                    Objeto
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logList
                  .filter(searchingData(search))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((r, id) => (
                    <TableRow hover key={id}>
                      <TableCell align="left">{r.process}</TableCell>
                      <TableCell align="left">{r.createAt}</TableCell>
                      <TableCell align="left">
                        <ButtonGroup variant="contained">
                          <Button
                            style={{ backgroundColor: genConst.CONST_INFO_COLOR }}
                            onClick={() => {
                              setObject(r.object);
                              handleOpenJSON();
                            }}
                          >
                            <IconEye />
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
            labelRowsPerPage={'Registros máximos'}
            component="div"
            count={logList.length}
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
              <MessageDark message={'No existen registros aún!'} submessage="" />
            </Grid>
          </Grid>
        </Grid>
      )}
      <Modal open={openJSON} onClose={handleCloseJSON} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.modalStylesDelete}>
          <Typography id="modal-modal-title" variant="h2" component="h2">
            Visualización de Objeto
          </Typography>
          <ReactJson src={object} />
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item lg={6} md={6} sm={6} xs={6}>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      startIcon={<IconCircleX />}
                      size="large"
                      style={{ margin: 5, backgroundColor: genConst.CONST_CANCEL_COLOR }}
                      onClick={handleCloseJSON}
                    >
                      Cancelar
                    </Button>
                  </ButtonGroup>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

const uiStyles = {
  modalStylesDelete: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '@media (min-width: 718px)': {
      width: 450
    },
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 6,
    boxShadow: 24,
    p: 4
  },
  appbar: { borderRadius: 15, height: 60, backgroundColor: genConst.CONST_APPBAR }
};
