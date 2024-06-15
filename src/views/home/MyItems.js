/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authentication } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { deleteDocument, getProductByUserId } from 'config/firebaseEvents';
import {
  Typography,
  Box,
  Grid,
  OutlinedInput,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  ButtonGroup,
  Button,
  Modal,
  Tooltip,
  IconButton
} from '@mui/material';
import * as Msg from 'store/message';
import { uiStyles } from './styles';
import CircularProgress from '@mui/material/CircularProgress';
import { searchingProductsByNameOrCategory } from 'utils/search';
import { IconCircleX, IconEdit, IconEye, IconTrash } from '@tabler/icons';
import MessageDark from 'components/message/MessageDark';
import { collProducts } from 'store/collections';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { titles } from './titles';
import { genConst } from 'store/constant';

export default function MyItems() {
  let navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  const [search, setSearch] = useState('');
  const [openLoader, setOpenLoader] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [id, setId] = useState(null);
  const [name, setName] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        getProductByUserId(user.uid).then((data) => {
          setDataList(data);
        });
      } else {
        navigate('/market/main');
      }
    });
  }, []);

  const handleOpenDelete = () => {
    setOpenDelete(true);
  };
  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const reloadData = () => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        getProductByUserId(user.uid).then((data) => {
          setDataList(data);
        });
      } else {
        navigate('/market/main');
      }
    });
  };

  const handleDelete = () => {
    setOpenLoader(true);
    deleteDocument(collProducts, id);
    setTimeout(() => {
      setOpenLoader(false);
      setOpenDelete(false);
      reloadData();
      toast.success(Msg.prodelsucc, { position: toast.POSITION.TOP_RIGHT });
    }, 2000);
  };

  return (
    <Box>
      <ToastContainer />
      {dataList.length > 0 ? (
        <Box sx={{ flexGrow: 0, mt: 1 }}>
          <OutlinedInput
            id={'search'}
            type="text"
            name={'search'}
            onChange={(ev) => setSearch(ev.target.value)}
            placeholder={'Buscar por nombre o categoría'}
            style={{ width: '100%' }}
          />
        </Box>
      ) : (
        <></>
      )}
      {dataList.length > 0 ? (
        <Grid container spacing={0} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Grid container spacing={0.5}>
              {dataList.filter(searchingProductsByNameOrCategory(search)).map((item) => {
                return (
                  <Grid key={item.id} item xs={6} sm={6} md={3} lg={3}>
                    <Card sx={{ maxWidth: '100%', height: 320, borderRadius: 3, backgroundColor: '#FFF', cursor: 'pointer' }}>
                      <CardMedia
                        sx={{ borderRadius: 3, padding: 0.5 }}
                        component="img"
                        height={194}
                        image={item.picture1}
                        alt="Portada img"
                      />
                      <CardContent sx={{ backgroundColor: '#FFF', marginTop: -2, paddingLeft: 1, paddingRight: 1 }}>
                        <Typography variant="h4" color="#000" align="center">
                          ${item.price}
                        </Typography>
                        <p
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            color: '#000',
                            fontSize: 13,
                            textOverflow: 'ellipsis',
                            maxWidth: '100%'
                          }}
                        >
                          {item.name}
                        </p>
                      </CardContent>
                      <CardActionArea style={{ marginTop: -20 }}>
                        <center>
                          <Tooltip title="Ver Item">
                            <IconButton
                              onClick={() => {
                                navigate({
                                  pathname: '/market/item/',
                                  search: `?id=${item.id}`
                                });
                              }}
                            >
                              <IconEye color={genConst.CONST_APPBAR} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Editar">
                            <IconButton
                              onClick={() => {
                                navigate({
                                  pathname: '/market/item/edit',
                                  search: `?id=${item.id}`
                                });
                              }}
                            >
                              <IconEdit color={genConst.CONST_APPBAR} />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Eliminar">
                            <IconButton
                              onClick={() => {
                                setId(item.id);
                                setName(item.name);
                                handleOpenDelete();
                              }}
                            >
                              <IconTrash color={genConst.CONST_APPBAR} />
                            </IconButton>
                          </Tooltip>
                        </center>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <MessageDark message={'No existen productos publicados por ti!'} submessage="" />
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <center>
                <Button
                  disableElevation
                  size="large"
                  type="submit"
                  variant="outlined"
                  color="primary"
                  style={{ borderRadius: 10, height: 40, marginTop: 10, fontSize: 12, color: '#3a3b3c' }}
                  onClick={() => navigate('/market/create')}
                >
                  Crear Producto
                </Button>
              </center>
            </Grid>
          </Grid>
        </Grid>
      )}
      <Modal open={openDelete} onClose={handleCloseDelete} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.styleDelete}>
          <Typography id="modal-modal-title" variant="h2" component="h2" align="center">
            {titles.modalDelete}
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" align="center" style={uiStyles.modalDeleteTitle}>
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
                  </center>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal open={openLoader} aria-labelledby="modal-loader" aria-describedby="modal-loader">
        <center>
          <Box sx={uiStyles.modalLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </Box>
  );
}
