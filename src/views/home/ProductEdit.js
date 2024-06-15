/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  Modal,
  Button,
  Typography,
  Menu,
  MenuItem,
  Paper,
  AppBar,
  Toolbar,
  Tooltip,
  IconButton,
  FormControl,
  InputLabel,
  OutlinedInput
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './styles';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Collections
import * as Msg from 'store/message';
import { fullDate } from 'utils/validations';
import { collProducts } from 'store/collections';
import { authentication, storage } from 'config/firebase';
import { getCategories, getProductById, updateDocument } from 'config/firebaseEvents';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { IconArrowLeft, IconCurrencyDollar, IconId, IconSquareRoundedLetterC } from '@tabler/icons';
import { genConst } from 'store/constant';
import { onAuthStateChanged } from 'firebase/auth';

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

export default function ProductEdit() {
  let navigate = useNavigate();
  const theme = useTheme();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('id');
  const [openLoader, setOpenLoader] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [categoryValue, setCategoryValue] = useState('');
  const [categories, setCategories] = useState([]);

  const [picture1, setPicture1] = useState({ preview: '', raw: '' });
  const [picture2, setPicture2] = useState({ preview: '', raw: '' });
  const [picture3, setPicture3] = useState({ preview: '', raw: '' });
  const [picture4, setPicture4] = useState({ preview: '', raw: '' });
  const [picture5, setPicture5] = useState({ preview: '', raw: '' });
  const [picture6, setPicture6] = useState({ preview: '', raw: '' });
  const [url0, setUrl0] = useState(null);
  const [url1, setUrl1] = useState(null);
  const [url2, setUrl2] = useState(null);
  const [url3, setUrl3] = useState(null);
  const [url4, setUrl4] = useState(null);
  const [url5, setUrl5] = useState(null);
  const [change1, setChange1] = useState(false);
  const [change2, setChange2] = useState(false);
  const [change3, setChange3] = useState(false);
  const [change4, setChange4] = useState(false);
  const [change5, setChange5] = useState(false);
  const [change6, setChange6] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
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
        console.log('User');
      } else {
        navigate('/market/main');
      }
    });
    getProductById(idProduct).then((data) => {
      setName(data[0].name);
      setDescription(data[0].description);
      setPrice(data[0].price);
      setQuantity(data[0].quantity);
      setCategory(data[0].category);
      setUrl0(data[0].picture1);
      setUrl1(data[0].picture2);
      setUrl2(data[0].picture3);
      setUrl3(data[0].picture4);
      setUrl4(data[0].picture5);
      setUrl5(data[0].picture6);
    });
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleEdit = () => {
    if (!name || !description || !price || !quantity || !category) {
      toast.info(Msg.requiered, { position: toast.POSITION.TOP_RIGHT });
    } else {
      setOpenLoader(true);
      const object = {
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        category: categoryValue,
        categoryDesc: category,
        picture1: url0,
        picture2: url1,
        picture3: url2,
        picture4: url3,
        picture5: url4,
        picture6: url5,
        updateAt: fullDate(),
        deleteAt: null,
        state: 1
      };
      setTimeout(() => {
        updateDocument(collProducts, idProduct, object);
        //Picture1
        if (change1) {
          if (picture1.raw !== null) {
            const imageName = idProduct + 'p1.jpg';
            const imageRef = ref(storage, `business/products/${imageName}`);
            uploadBytes(imageRef, picture1.raw).then((snap) => {
              getDownloadURL(snap.ref).then((url) => {
                const obj = {
                  picture1: url
                };
                updateDocument(collProducts, idProduct, obj);
              });
            });
          }
        }
        //Picture2
        if (change2) {
          if (picture2.raw !== null) {
            const imageName = idProduct + 'p2.jpg';
            const imageRef = ref(storage, `business/products/${imageName}`);
            uploadBytes(imageRef, picture2.raw).then((snap) => {
              getDownloadURL(snap.ref).then((url) => {
                const obj = {
                  picture2: url
                };
                updateDocument(collProducts, idProduct, obj);
              });
            });
          }
        }
        //Picture3
        if (change3) {
          if (picture3.raw !== null) {
            const imageName = idProduct + 'p3.jpg';
            const imageRef = ref(storage, `business/products/${imageName}`);
            uploadBytes(imageRef, picture3.raw).then((snap) => {
              getDownloadURL(snap.ref).then((url) => {
                const obj = {
                  picture3: url
                };
                updateDocument(collProducts, idProduct, obj);
              });
            });
          }
        }
        //Picture4
        if (change4) {
          if (picture4.raw !== null) {
            const imageName = ide + 'p4.jpg';
            const imageRef = ref(storage, `business/products/${imageName}`);
            uploadBytes(imageRef, picture4.raw).then((snap) => {
              getDownloadURL(snap.ref).then((url) => {
                const obj = {
                  picture4: url
                };
                updateDocument(collProducts, ide, obj);
              });
            });
          }
        }
        //Picture5
        if (change5) {
          if (picture5.raw !== null) {
            const imageName = ide + 'p5.jpg';
            const imageRef = ref(storage, `business/products/${imageName}`);
            uploadBytes(imageRef, picture5.raw).then((snap) => {
              getDownloadURL(snap.ref).then((url) => {
                const obj = {
                  picture5: url
                };
                updateDocument(collProducts, ide, obj);
              });
            });
          }
        }
        //Picture6
        if (change6) {
          if (picture6.raw !== null) {
            const imageName = ide + 'p6.jpg';
            const imageRef = ref(storage, `business/products/${imageName}`);
            uploadBytes(imageRef, picture6.raw).then((snap) => {
              getDownloadURL(snap.ref).then((url) => {
                const obj = {
                  picture6: url
                };
                updateDocument(collProducts, ide, obj);
              });
            });
          }
        }
        setOpenLoader(false);
        navigate('/market/my-items');
        clearData();
      }, 3000);
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
        setChange1(true);
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
        setChange2(true);
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
        setChange3(true);
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
        setChange4(true);
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
        setChange5(true);
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
        setChange6(true);
      };
    }
  };

  return (
    <Paper>
      <ToastContainer />
      <Grid container spacing={0}>
        <Grid item lg={12} xs={12}>
          <Grid container spacing={1} style={{ padding: 10 }}>
            <Grid item xs={12} lg={12}>
              <AppBar position="static" style={uiStyles.appbar}>
                <Toolbar>
                  <Tooltip title="Regresar">
                    <IconButton
                      onClick={() => {
                        navigate('/market/my-items');
                      }}
                    >
                      <IconArrowLeft color={genConst.CONST_APPBAR} />
                    </IconButton>
                  </Tooltip>
                  <Typography variant="h4" component="div" sx={{ flexGrow: 1, color: genConst.CONST_APPBAR }} align="center">
                    {name}
                  </Typography>
                  <Tooltip title={idProduct}>
                    <IconButton>
                      <IconId color={genConst.CONST_APPBAR} />
                    </IconButton>
                  </Tooltip>
                </Toolbar>
              </AppBar>
            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} sx={{ mt: 2 }}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-title">Título</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-title"
                  type="text"
                  name="title"
                  value={name}
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
                  value={description}
                  inputProps={{ style: { color: '#000' } }}
                  onChange={(ev) => setDescription(ev.target.value)}
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
                    <p style={{ color: '#000', fontSize: 14, marginLeft: 5 }}>{category}</p>
                  </>
                ) : (
                  <span style={{ color: '#000', fontSize: 14 }}>Seleccione Categoría</span>
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
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="outlined-adornment-price">Precio</InputLabel>
                <OutlinedInput
                  id="outlined-adornment-price"
                  type="number"
                  name="price"
                  value={price}
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
                  value={quantity}
                  onChange={(ev) => setQuantity(ev.target.value)}
                  endAdornment={<IconSquareRoundedLetterC />}
                />
              </FormControl>
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
                        src={picture1.preview || url0}
                        alt="picture1"
                        height={picture1.preview ? 170 : 100}
                        style={{ borderRadius: 15, paddingTop: 5 }}
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
                        src={picture2.preview || url1}
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
                        src={picture3.preview || url2}
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
                        src={picture4.preview || url3}
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
                        src={picture5.preview || url4}
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
                        src={picture6.preview || url5}
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
            <Grid item xs={12} lg={12} style={{ marginTop: 20 }}>
              <center>
                <Button
                  disableElevation
                  fullWidth
                  size="large"
                  type="submit"
                  variant="contained"
                  color="primary"
                  style={{ borderRadius: 10, height: 45 }}
                  onClick={handleEdit}
                >
                  Guardar
                </Button>
              </center>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={openLoader} aria-labelledby="modal-loader" aria-describedby="modal-loader">
        <center>
          <Box sx={uiStyles.styleLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </Paper>
  );
}
