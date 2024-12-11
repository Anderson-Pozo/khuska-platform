/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, Modal, Box, Menu, MenuItem, Paper, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import { uiStyles } from './styles';
import { styled, useTheme } from '@mui/material/styles';
import CircularProgress from '@mui/material/CircularProgress';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import avatarImg from 'assets/images/profile/profile-picture-6.jpg';
import defaultImage from 'assets/images/addImgB.png';
import { generateId } from 'utils/idGenerator';
import { fullDate } from 'utils/validations';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication, storage } from 'config/firebase';
import * as Msg from 'store/message';
import { collProducts } from 'store/collections';
import { createDocument, getCategories, updateDocument } from 'config/firebaseEvents';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { IconCurrencyDollar, IconId, IconSquareRoundedLetterC } from '@tabler/icons';
import { genConst } from 'store/constant';

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'right'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'right'
    }}
    {...props}
  />
))(({ theme }) => ({
  '& .MuiPaper-root': {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: '30%',
    backgroundColor: '#d3d3d3',
    border: 0.5,
    borderColor: '#d3d3d3',
    color: '#000',
    '& .MuiMenu-list': {
      padding: '4px 0'
    },
    '& .MuiMenuItem-root': {
      '& .MuiSvgIcon-root': {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5)
      },
      '&:active': {
        backgroundColor: '#000'
      }
    }
  }
}));

export default function Item() {
  const [searchParams] = useSearchParams();
  let navigate = useNavigate();
  const theme = useTheme();
  const id = searchParams.get('idType');
  const [openLoader, setOpenLoader] = useState(false);
  //Variables
  const [user, setUser] = useState('');
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [category, setCategory] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [categories, setCategories] = useState([]);
  const [picture1, setPicture1] = useState({ preview: '', raw: '' });
  const [picture2, setPicture2] = useState({ preview: '', raw: '' });
  const [picture3, setPicture3] = useState({ preview: '', raw: '' });
  const [picture4, setPicture4] = useState({ preview: '', raw: '' });
  const [picture5, setPicture5] = useState({ preview: '', raw: '' });
  const [picture6, setPicture6] = useState({ preview: '', raw: '' });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        setUser(user.displayName);
        setUserId(user.uid);
      } else {
        navigate('/market/main');
      }
    });
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleSaveProduct = () => {
    if (!name || !description || !price || !quantity || !category) {
      toast.info(Msg.requiered, { position: toast.POSITION.TOP_RIGHT });
    } else if (!picture1.preview) {
      toast.info(Msg.imgreq, { position: toast.POSITION.TOP_RIGHT });
    } else if (!picture2.preview) {
      toast.info(Msg.imgreq, { position: toast.POSITION.TOP_RIGHT });
    } else if (!picture3.preview) {
      toast.info(Msg.imgreq, { position: toast.POSITION.TOP_RIGHT });
    } else if (!picture4.preview) {
      toast.info(Msg.imgreq, { position: toast.POSITION.TOP_RIGHT });
    } else if (!picture5.preview) {
      toast.info(Msg.imgreq, { position: toast.POSITION.TOP_RIGHT });
    } else if (!picture6.preview) {
      toast.info(Msg.imgreq, { position: toast.POSITION.TOP_RIGHT });
    } else {
      setOpenLoader(true);
      const ide = generateId(10);
      const object = {
        id: ide,
        type: parseInt(id),
        idBusiness: null,
        nameBusiness: null,
        userId: userId,
        userName: user,
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        category: categoryValue,
        categoryDesc: category,
        picture1: null,
        picture2: null,
        picture3: null,
        picture4: null,
        picture5: null,
        picture6: null,
        createAt: fullDate(),
        updateAt: null,
        deleteAt: null,
        state: 1
      };
      setTimeout(() => {
        createDocument(collProducts, ide, object);
        //picture1
        if (picture1.raw !== null) {
          const imageName = ide + 'p1.jpg';
          const imageRef = ref(storage, `business/products/${ide}/${imageName}`);
          uploadBytes(imageRef, picture1.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture1: url
              };
              updateDocument(collProducts, ide, obj);
            });
          });
        }
        //picture2
        if (picture2.raw !== null) {
          const imageName = ide + 'p2.jpg';
          const imageRef = ref(storage, `business/products/${ide}/${imageName}`);
          uploadBytes(imageRef, picture2.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture2: url
              };
              updateDocument(collProducts, ide, obj);
            });
          });
        }
        //picture3
        if (picture3.raw !== null) {
          const imageName = ide + 'p3.jpg';
          const imageRef = ref(storage, `business/products/${ide}/${imageName}`);
          uploadBytes(imageRef, picture3.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture3: url
              };
              updateDocument(collProducts, ide, obj);
            });
          });
        }
        //Picture4
        if (picture4.raw !== null) {
          const imageName = ide + 'p4.jpg';
          const imageRef = ref(storage, `business/products/${ide}/${imageName}`);
          uploadBytes(imageRef, picture4.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture4: url
              };
              updateDocument(collProducts, ide, obj);
            });
          });
        }
        //Picture5
        if (picture5.raw !== null) {
          const imageName = ide + 'p5.jpg';
          const imageRef = ref(storage, `business/products/${ide}/${imageName}`);
          uploadBytes(imageRef, picture5.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture5: url
              };
              updateDocument(collProducts, ide, obj);
            });
          });
        }
        //Picture6
        if (picture6.raw !== null) {
          const imageName = ide + 'p6.jpg';
          const imageRef = ref(storage, `business/products/${ide}/${imageName}`);
          uploadBytes(imageRef, picture6.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture6: url
              };
              updateDocument(collProducts, ide, obj);
            });
          });
        }
        setOpenLoader(false);
        toast.success(Msg.procresucc, { position: toast.POSITION.TOP_RIGHT });
        navigate('/market/main');
        clearData();
      }, 3000);
    }
  };

  const handlePicture1Change = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setPicture1({
          preview: img.src,
          raw: raw
        });
      };
    }
  };

  const handlePicture2Change = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setPicture2({
          preview: img.src,
          raw: raw
        });
      };
    }
  };

  const handlePicture3Change = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setPicture3({
          preview: img.src,
          raw: raw
        });
      };
    }
  };

  const handlePicture4Change = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setPicture4({
          preview: img.src,
          raw: raw
        });
      };
    }
  };

  const handlePicture5Change = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setPicture5({
          preview: img.src,
          raw: raw
        });
      };
    }
  };

  const handlePicture6Change = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setPicture6({
          preview: img.src,
          raw: raw
        });
      };
    }
  };

  const clearData = () => {
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setCategory('');
    setPicture1({
      preview: '',
      raw: ''
    });
    setPicture2({
      preview: '',
      raw: ''
    });
    setPicture3({
      preview: '',
      raw: ''
    });
    setPicture4({
      preview: '',
      raw: ''
    });
    setPicture5({
      preview: '',
      raw: ''
    });
    setPicture6({
      preview: '',
      raw: ''
    });
  };

  return (
    <>
      <ToastContainer />
      <Paper sx={uiStyles.paper}>
        <Grid container spacing={1}>
          <Grid item sm={12} xs={12} md={12} lg={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <Typography
                  variant="h3"
                  textAlign="center"
                  component="div"
                  style={{ color: genConst.CONST_APPBAR, paddingBottom: 0, paddingTop: 10, paddingLeft: 0, fontWeight: 'bold' }}
                >
                  Artículo en Venta
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <span style={{ color: '#3a3b3c' }}>Proporciona una descripción que sea lo más detallada posible.</span>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-title">Título</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-title"
                    type="text"
                    name="title"
                    onChange={(ev) => setName(ev.target.value)}
                    endAdornment={<IconId />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-description">Descripción</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-description"
                    type="text"
                    name="description"
                    multiline
                    rows={5}
                    rowsMax={10}
                    inputProps={{ style: { color: '#000' } }}
                    onChange={(ev) => setDescription(ev.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-price">Precio</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-price"
                    type="number"
                    name="price"
                    onChange={(ev) => setPrice(ev.target.value)}
                    endAdornment={<IconCurrencyDollar />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="outlined-adornment-quantity">Cantidad</InputLabel>
                  <OutlinedInput
                    id="outlined-adornment-quantity"
                    type="number"
                    name="quantity"
                    onChange={(ev) => setQuantity(ev.target.value)}
                    endAdornment={<IconSquareRoundedLetterC />}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Button
                  id="demo-customized-button"
                  fullWidth
                  variant="outlined"
                  onClick={handleClick}
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    color: '#000',
                    marginTop: 8,
                    borderRadius: 14,
                    height: 55
                  }}
                >
                  {category ? (
                    <>
                      <p style={{ color: '#d3d3d3', fontSize: 14, marginLeft: 5 }}>{category}</p>
                    </>
                  ) : (
                    <span style={{ color: '#d3d3d3', fontSize: 14 }}>Seleccione Categoría</span>
                  )}
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  MenuListProps={{
                    'aria-labelledby': 'demo-customized-button'
                  }}
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  {categories.map((p) => (
                    <MenuItem
                      key={p.id}
                      value={p.id}
                      style={{ textAlign: 'left' }}
                      onClick={() => {
                        setCategory(p.name);
                        setCategoryValue(p.value);
                        handleClose();
                      }}
                    >
                      {p.name}
                    </MenuItem>
                  ))}
                </StyledMenu>
              </Grid>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Typography
                  variant="h5"
                  component="h5"
                  style={{
                    color: genConst.CONST_APPBAR,
                    paddingTop: 20
                  }}
                  textAlign="center"
                >
                  Puedes agregar un máximo de 6 imagenes.
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div
                  style={{
                    border: 'dashed gray',
                    borderRadius: 10,
                    borderWidth: 0.2,
                    width: '100%',
                    height: 190,
                    cursor: 'pointer'
                  }}
                >
                  <center>
                    <input type="file" id="picture1" style={{ display: 'none' }} onChange={handlePicture1Change} accept="image/*" />
                    <div htmlFor="picture1" id="picture1">
                      <label htmlFor="picture1">
                        <img
                          src={picture1.preview || defaultImage}
                          alt="Picture1"
                          height={picture1.preview ? 170 : 100}
                          style={{ borderRadius: 15, paddingTop: 5, cursor: 'pointer' }}
                        />
                        {picture1.preview ? (
                          ''
                        ) : (
                          <>
                            <p style={{ fontSize: 10, color: '#3a3b3c', marginTop: 20 }}>Imagen de Portada</p>
                            <p style={{ fontSize: 10, color: '#3a3b3c', marginTop: 10 }}>Imagen 300 x 500</p>
                          </>
                        )}
                      </label>
                    </div>
                  </center>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div
                  style={{
                    border: 'dashed gray',
                    borderRadius: 10,
                    borderWidth: 0.2,
                    width: '100%',
                    height: 190,
                    cursor: 'pointer'
                  }}
                >
                  <center>
                    <input type="file" id="picture2" style={{ display: 'none' }} onChange={handlePicture2Change} accept="image/*" />
                    <div htmlFor="picture2" id="picture2">
                      <label htmlFor="picture2">
                        <img
                          src={picture2.preview || defaultImage}
                          alt="Picture2"
                          height={picture2.preview ? 170 : 100}
                          style={{ borderRadius: 15, paddingTop: 5, cursor: 'pointer' }}
                        />
                        {picture2.preview ? '' : <p style={{ fontSize: 10, color: '#3a3b3c', marginTop: 30 }}>Imagen 300 x 500</p>}
                      </label>
                    </div>
                  </center>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div
                  style={{
                    border: 'dashed gray',
                    borderRadius: 10,
                    borderWidth: 0.2,
                    width: '100%',
                    height: 190,
                    cursor: 'pointer'
                  }}
                >
                  <center>
                    <input type="file" id="picture3" style={{ display: 'none' }} onChange={handlePicture3Change} accept="image/*" />
                    <div htmlFor="picture3" id="picture3">
                      <label htmlFor="picture3">
                        <img
                          src={picture3.preview || defaultImage}
                          alt="Picture3"
                          height={picture3.preview ? 170 : 100}
                          style={{ borderRadius: 15, paddingTop: 5, cursor: 'pointer' }}
                        />
                        {picture3.preview ? '' : <p style={{ fontSize: 10, color: '#3a3b3c', marginTop: 30 }}>Imagen 300 x 500</p>}
                      </label>
                    </div>
                  </center>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div
                  style={{
                    border: 'dashed gray',
                    borderRadius: 10,
                    borderWidth: 0.2,
                    width: '100%',
                    height: 190,
                    cursor: 'pointer'
                  }}
                >
                  <center>
                    <input type="file" id="picture4" style={{ display: 'none' }} onChange={handlePicture4Change} accept="image/*" />
                    <div htmlFor="picture4" id="picture4">
                      <label htmlFor="picture4">
                        <img
                          src={picture4.preview || defaultImage}
                          alt="Picture4"
                          height={picture4.preview ? 170 : 100}
                          style={{ borderRadius: 15, paddingTop: 5, cursor: 'pointer' }}
                        />
                        {picture4.preview ? '' : <p style={{ fontSize: 10, color: '#3a3b3c', marginTop: 30 }}>Imagen 300 x 500</p>}
                      </label>
                    </div>
                  </center>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div
                  style={{
                    border: 'dashed gray',
                    borderRadius: 10,
                    borderWidth: 0.2,
                    width: '100%',
                    height: 190,
                    cursor: 'pointer'
                  }}
                >
                  <center>
                    <input type="file" id="picture5" style={{ display: 'none' }} onChange={handlePicture5Change} accept="image/*" />
                    <div htmlFor="picture5" id="picture5">
                      <label htmlFor="picture5">
                        <img
                          src={picture5.preview || defaultImage}
                          alt="Picture5"
                          height={picture5.preview ? 170 : 100}
                          style={{ borderRadius: 15, paddingTop: 5, cursor: 'pointer' }}
                        />
                        {picture5.preview ? '' : <p style={{ fontSize: 10, color: '#3a3b3c', marginTop: 30 }}>Imagen 300 x 500</p>}
                      </label>
                    </div>
                  </center>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div
                  style={{
                    border: 'dashed gray',
                    borderRadius: 10,
                    borderWidth: 0.2,
                    width: '100%',
                    height: 190,
                    cursor: 'pointer'
                  }}
                >
                  <center>
                    <input type="file" id="picture6" style={{ display: 'none' }} onChange={handlePicture6Change} accept="image/*" />
                    <div htmlFor="picture6" id="picture6">
                      <label htmlFor="picture6">
                        <img
                          src={picture6.preview || defaultImage}
                          alt="Picture6"
                          height={picture6.preview ? 170 : 100}
                          style={{ borderRadius: 15, paddingTop: 5, cursor: 'pointer' }}
                        />
                        {picture6.preview ? '' : <p style={{ fontSize: 10, color: '#3a3b3c', marginTop: 30 }}>Imagen 300 x 500</p>}
                      </label>
                    </div>
                  </center>
                </div>
              </Grid>
              <Grid item xs={12} sx={{ mt: 2, mb: 2 }}>
                <Typography variant="h5" style={{ color: '#3a3b3c', fontSize: 14, lineHeight: 'normal' }} textAlign="justify">
                  Los artículos de KhuskaMarket son públicos, por lo que cualquier persona dentro y fuera de KhuskaMarket puede verlos. Los
                  artículos como animales, drogas, armas, falsificaciones y otros que infringen derechos de propiedad intelectual no están
                  permitidos en KhuskaMarket. Consulta nuestras Políticas de comercio.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: 10, height: 55 }}
                  onClick={handleSaveProduct}
                >
                  Crear Publicación
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Modal open={openLoader} aria-labelledby="modal-loader" aria-describedby="modal-loader">
        <center>
          <Box sx={uiStyles.modalLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </>
  );
}
