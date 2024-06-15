/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  createDocument,
  deleteDocument,
  getBusinessById,
  getFavoritesByProductIdAndUserId,
  getProductById,
  getUserById
} from 'config/firebaseEvents';
import {
  Avatar,
  Box,
  Divider,
  Grid,
  Typography,
  Button,
  ButtonGroup,
  Modal,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import Gallery from 'react-amazon-gallery';
import { uiStyles } from './styles';
import { generateId } from 'utils/idGenerator';
import { fullDate } from 'utils/validations';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { collChat, collFav, collMessage } from 'store/collections';
import { serverTimestamp } from 'firebase/firestore';
import { genConst } from 'store/constant';
import { IconArrowLeft, IconBrandWhatsapp, IconHeart, IconId, IconMessage } from '@tabler/icons';

let images = [];

export default function ViewItem() {
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const id = searchParams.get('id');
  const theme = useTheme();
  const [openLoader, setOpenLoader] = useState(false);
  const [fromId, setFromId] = useState(null);
  const [fromName, setFromName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryDesc, setCategoryDesc] = useState(null);
  const [url0, setUrl0] = useState(null);

  const [userIdd, setUserIdd] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userLogo, setUserLogo] = useState(null);
  const [userCreateAt, setUserCreateAt] = useState(null);
  const [businessId, setBusinessId] = useState(null);
  const [businessName, setBusinessName] = useState(null);
  const [businessLogo, setBusinessLogo] = useState(null);
  const [businessCreateAt, setBusinessCreateAt] = useState(null);
  const [businessCity, setBusinessCity] = useState(null);
  const [businessPhone, setBusinessPhone] = useState(null);
  const [businessUserId, setBusinessUserId] = useState(null);
  const [favorite, setFavorite] = useState(false);
  const [favoriteId, setFavoriteId] = useState('');
  const [message, setMessage] = useState('Hola. ¿Sigue estando disponible? ');

  useEffect(() => {
    images = [];
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        setFromId(user.uid);
        setFromName(user.displayName);
        getFavoritesByProductIdAndUserId(id, user.uid).then((fav) => {
          console.log(fav.length);
          if (fav.length > 0) {
            setFavorite(true);
            setFavoriteId(fav[0].id);
          } else {
            setFavorite(false);
          }
        });
      }
      setOpenLoader(true);
      setTimeout(() => {
        setOpenLoader(false);
      }, 2000);
    });
    getProductById(id).then((data) => {
      setUserId(data[0].userId);
      setName(data[0].name);
      setDescription(data[0].description);
      setPrice(data[0].price);
      setQuantity(data[0].quantity);
      setCategory(data[0].category);
      setCategoryDesc(data[0].categoryDesc);
      setUrl0(data[0].picture1);
      let img1 = data[0].picture1;
      let img2 = data[0].picture2;
      let img3 = data[0].picture3;
      let img4 = data[0].picture4;
      let img5 = data[0].picture5;
      let img6 = data[0].picture6;
      images.push(img1, img2, img3, img4, img5, img6);
      setBusinessId(data[0].idBusiness);
      getUserById(data[0].userId).then((dat) => {
        setUserIdd(dat[0].id);
        setUserName(dat[0].name + '' + dat[0].lastName);
        setUserLogo(dat[0].avatar);
        setUserCreateAt(dat[0].createAt);
        getBusinessById(data[0].idBusiness).then((dataa) => {
          if (dataa.length > 0) {
            setBusinessName(dataa[0].name);
            setBusinessLogo(dataa[0].logo);
            setBusinessCreateAt(dataa[0].createAt);
            setBusinessCity(dataa[0].city);
            setBusinessUserId(dataa[0].userId);
            setBusinessPhone(dataa[0].phone);
          }
        });
      });
    });
  }, []);

  const handleSendMessage = () => {
    setOpenLoader(true);
    const msnId = id + userId;
    const msnChat = generateId(10);
    const objMsn = {
      id: msnId,
      to: userId,
      from: fromId,
      fromName: fromName,
      businessId: businessId || userIdd,
      businessName: businessName || userName,
      businessUserId: businessUserId || '',
      idProduct: id,
      nameProduct: name,
      createAt: fullDate(),
      preview: url0
    };
    const objChat = {
      id: msnChat,
      idMsn: msnId,
      message: message,
      createAt: serverTimestamp()
    };
    createDocument(collMessage, msnId, objMsn);
    createDocument(collChat, msnChat, objChat);
    setTimeout(() => {
      setOpenLoader(false);
      toast.success('Mensaje enviado correctamente!', { position: toast.POSITION.TOP_RIGHT });
      setMessage('');
    }, 200);
  };

  const handleBuyNow = () => {
    if (fromId) {
      console.log('Comprar');
    } else {
      toast.error('Debes iniciar sesión para poder comprar el producto!', { position: toast.POSITION.TOP_RIGHT });
    }
  };

  const handleAddFavorites = () => {
    const idFav = generateId(10);
    const object = {
      id: idFav,
      productId: id,
      nameProduct: name,
      userId: userId,
      createAt: fullDate(),
      preview: url0
    };
    createDocument(collFav, idFav, object);
    setFavorite(true);
    toast.success('Agregado a favoritos correctamente!', { position: toast.POSITION.TOP_RIGHT });
  };

  const handleDeleteFavorites = () => {
    deleteDocument(collFav, favoriteId);
    setFavorite(false);
    toast.success('Agregado a favoritos correctamente!', { position: toast.POSITION.TOP_RIGHT });
  };

  return (
    <Paper>
      <ToastContainer />
      <Grid container spacing={0}>
        <Grid item lg={12} xs={12}>
          <Grid container spacing={0} style={{ padding: 10 }}>
            <Grid item lg={12} xs={12}>
              <AppBar position="static" style={uiStyles.appbar}>
                <Toolbar>
                  <Tooltip title="Regresar">
                    <IconButton
                      onClick={() => {
                        navigate('/market/main');
                      }}
                    >
                      <IconArrowLeft color={genConst.CONST_APPBAR} />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: genConst.CONST_APPBAR }} align="center">
                    {name}
                  </Typography>
                  <Tooltip title={id}>
                    <IconButton>
                      <IconId color={genConst.CONST_APPBAR} />
                    </IconButton>
                  </Tooltip>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item lg={8} xs={12} sx={{ mt: 1 }}>
              <div style={{ background: '#FFF', marginTop: 20, height: 400, marginRight: 10 }}>
                <center>{images.length > 0 ? <Gallery images={images} width={'100%'} /> : <span>...Cargando</span>}</center>
              </div>
              <div style={{ padding: 10 }}>
                <Typography variant="h2" textAlign="left" sx={{ color: '#3a3b3c', pt: 2, fontSize: 16 }}>
                  Detalles
                </Typography>
                <Typography variant="h5" textAlign="justify" sx={{ color: '#3a3b3c', pt: 2, pb: 2, fontSize: 14 }}>
                  {description}
                </Typography>
                <Typography variant="h5" textAlign="left" sx={{ color: '#3a3b3c', pt: 2, pb: 2, fontSize: 14 }}>
                  <strong>Categoría: </strong>
                  {categoryDesc || category}
                </Typography>
                <Divider sx={{ borderColor: '#ededed' }} />
                <Typography variant="h2" textAlign="left" sx={{ color: '#3a3b3c', pt: 2, fontSize: 16 }}>
                  Información del vendedor
                </Typography>
                {businessName ? (
                  <ButtonGroup sx={{ mt: 1 }}>
                    <Avatar src={businessLogo} color="inherit" style={{ width: 60, height: 60 }} />
                    <span style={{ margin: 20, color: '#3a3b3c', fontSize: 14 }}>{businessName}</span>
                  </ButtonGroup>
                ) : (
                  <ButtonGroup sx={{ mt: 1 }}>
                    <Avatar src={userLogo} color="inherit" style={{ width: 60, height: 60 }} />
                    <span style={{ margin: 20, color: '#3a3b3c', fontSize: 14 }}>{userName}</span>
                  </ButtonGroup>
                )}
                <br />
                {businessPhone ? (
                  <ButtonGroup sx={{ mt: 1 }}>
                    <IconBrandWhatsapp size={50} color={genConst.CONST_SUCCESS_COLOR} />
                    <span style={{ margin: 15, color: '#3a3b3c', fontSize: 14 }}>{businessPhone}</span>
                  </ButtonGroup>
                ) : (
                  <></>
                )}
                <Typography variant="h5" textAlign="left" sx={{ color: '#3a3b3c', pt: 2, pb: 2, fontSize: 14 }}>
                  <strong>Se unió a Khuska Market en </strong>
                  {businessCreateAt || userCreateAt}
                </Typography>
                <Divider sx={{ borderColor: '#ededed' }} />
              </div>
            </Grid>
            <Grid item lg={4} xs={12} style={{ marginTop: 30 }}>
              <Paper sx={{ p: 3, backgroundColor: '#FFF', height: 400, border: '1px solid rgba(0,0,0,.1)', borderWidth: 0.2 }}>
                <Typography variant="h5" sx={{ color: genConst.CONST_APPBAR, fontSize: 14 }} textAlign="justify">
                  {name}
                </Typography>
                <br />
                <Typography variant="span" sx={{ color: genConst.CONST_APPBAR, fontSize: 26 }} textAlign="center">
                  $ {Number.parseFloat(price).toFixed(2)}
                </Typography>
                <br />
                <Typography variant="h5" textAlign="left" sx={{ color: '#3a3b3c', pt: 1 }}>
                  {quantity} Disponibles
                </Typography>
                <Typography variant="h5" textAlign="left" sx={{ color: '#3a3b3c', pt: 1, pb: 2, fontSize: 12 }}>
                  Entrega a acordar con el vendedor
                </Typography>
                {businessCity ? (
                  <Typography variant="h5" textAlign="left" sx={{ color: '#3a3b3c', pt: 1, pb: 2, fontSize: 12 }}>
                    Publicado en: {businessCity || ' sin información'}
                  </Typography>
                ) : (
                  <></>
                )}
                <Typography variant="h5" textAlign="left" sx={{ color: '#000', pt: 0 }}>
                  Agregar a Favoritos
                </Typography>
                {fromId ? (
                  favorite ? (
                    <Tooltip title="Eliminar de Favoritos">
                      <IconButton
                        onClick={() => {
                          handleDeleteFavorites();
                        }}
                      >
                        <IconHeart size={30} color={genConst.CONST_DELETE_COLOR} />
                      </IconButton>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Agregar a Favoritos">
                      <IconButton
                        onClick={() => {
                          handleAddFavorites();
                        }}
                      >
                        <IconHeart size={30} color={genConst.CONST_APPBAR} />
                      </IconButton>
                    </Tooltip>
                  )
                ) : (
                  <></>
                )}
                <Button
                  fullWidth
                  size="large"
                  type="submit"
                  variant="outlined"
                  color="primary"
                  style={{ borderRadius: 10, height: 50, marginTop: 5, marginBottom: 10 }}
                  onClick={handleBuyNow}
                >
                  Comprar ahora
                </Button>
                <Typography variant="h5" textAlign="justify" sx={{ color: '#3a3b3c', pt: 1, pb: 2, fontSize: 11 }}>
                  Compra Protegida. Se abrirá en una nueva ventana, recibe el producto que esperabas o te devolvemos tu dinero.
                </Typography>
              </Paper>
              <Paper sx={{ p: 3, mt: 2, backgroundColor: '#FFF', height: 400, border: '1px solid rgba(0,0,0,.1)', borderWidth: 0.2 }}>
                <Typography variant="h2" textAlign="left" sx={{ color: '#3a3b3c', pt: 2, pb: 2, fontSize: 16 }}>
                  Medios de pago
                </Typography>
              </Paper>
            </Grid>
            <Grid item lg={12} xs={12} style={{ marginTop: 30 }}>
              <div>
                <Typography variant="h2" textAlign="left" sx={{ color: '#3a3b3c', pt: 2, pb: 2, fontSize: 16 }}>
                  Pregunta tus dudas al vendedor
                </Typography>
              </div>
            </Grid>
            <Grid item lg={8} xs={12}>
              {fromId ? (
                <Grid container spacing={1}>
                  <Grid item xs={8}>
                    <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                      <InputLabel htmlFor="outlined-adornment-msg">Mensaje</InputLabel>
                      <OutlinedInput
                        id="outlined-adornment-msg"
                        type="text"
                        name="msg"
                        value={message}
                        onChange={(ev) => setMessage(ev.target.value)}
                        endAdornment={<IconMessage />}
                      />
                    </FormControl>
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: 10, height: 50, marginTop: 10 }}
                      onClick={handleSendMessage}
                    >
                      Preguntar
                    </Button>
                  </Grid>
                </Grid>
              ) : (
                <Typography
                  component={Link}
                  to="/market/login"
                  variant="h5"
                  sx={{ textDecoration: 'none', color: genConst.CONST_APPBAR, pb: 2, textAlign: 'left' }}
                >
                  Inicia sesión para escribir al vendedor del producto! Clic aquí
                </Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={openLoader} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.modalLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </Paper>
  );
}
