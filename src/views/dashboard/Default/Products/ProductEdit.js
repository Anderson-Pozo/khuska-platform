/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  InputLabel,
  OutlinedInput,
  FormControl,
  AppBar,
  Toolbar,
  Modal,
  Select,
  MenuItem,
  IconButton,
  Tooltip,
  Typography
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './Products.styles';

import { IconDeviceFloppy, IconArrowBack, IconBox, IconBrandProducthunt, IconCurrencyDollar, IconCheck } from '@tabler/icons';

//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Collections
import * as Msg from 'store/message';
import { titles, inputLabels } from './Products.texts';
import { fullDate } from 'utils/validations';
import { collProducts } from 'store/collections';

import { storage } from 'config/firebase';
import { getCategories, getProductById, updateDocument } from 'config/firebaseEvents';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export default function ProductEdit() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('id');
  const idBusiness = searchParams.get('idBusiness');
  const nameProduct = searchParams.get('name');
  const nameBusiness = searchParams.get('nameBusiness');
  const theme = useTheme();
  const [openLoader, setOpenLoader] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);
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

  useEffect(() => {
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
        category: category,
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
        navigate('/app/products');
        toast.success(Msg.coucresucc, { position: toast.POSITION.TOP_RIGHT });
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

  function handleChangeCategory(e) {
    setCategory(e.target.value);
  }

  return (
    <div>
      <ToastContainer />
      <AppBar position="static" style={uiStyles.appbar}>
        <Toolbar>
          <IconButton color="inherit">
            <IconBox color="#FFF" />
          </IconButton>
          <Tooltip title="Regresar">
            <IconButton
              color="inherit"
              onClick={() => {
                navigate({
                  pathname: '/app/products',
                  search: `?id=${idBusiness}&name=${nameBusiness}`
                });
              }}
            >
              <IconArrowBack />
            </IconButton>
          </Tooltip>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#FFF' }} align="center">
            Editar {nameProduct} en {nameBusiness}
          </Typography>
          <Tooltip title="Guardar">
            <IconButton
              color="inherit"
              onClick={() => {
                handleEdit();
              }}
            >
              <IconDeviceFloppy />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Grid container style={{ marginTop: 10, paddingLeft: 0 }}>
        <Grid item lg={12} xs={12}>
          <Grid container spacing={0.4}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="name">{inputLabels.name + ' *'}</InputLabel>
                <OutlinedInput
                  id="name"
                  type="text"
                  name="name"
                  value={name || ''}
                  inputProps={{}}
                  onChange={(ev) => setName(ev.target.value)}
                  endAdornment={<IconBrandProducthunt />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="description">{inputLabels.description + ' *'}</InputLabel>
                <OutlinedInput
                  id="description"
                  type="text"
                  multiline
                  rows={6}
                  name="description"
                  value={description || ''}
                  inputProps={{}}
                  onChange={(ev) => setDescription(ev.target.value)}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="category">{inputLabels.category + ' *'}</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category"
                  value={category || ''}
                  label="Categoría"
                  onChange={handleChangeCategory}
                  fullWidth
                  defaultValue={'CLA'}
                >
                  {categories.map((p) => (
                    <MenuItem key={p.id} value={p.value} style={{ textAlign: 'left' }}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="price">{inputLabels.price + ' *'}</InputLabel>
                <OutlinedInput
                  id="price"
                  type="number"
                  name="price"
                  value={price || ''}
                  inputProps={{}}
                  onChange={(ev) => setPrice(ev.target.value)}
                  endAdornment={<IconCurrencyDollar />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={6} md={4} lg={4}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="quantity">{inputLabels.quantity + ' *'}</InputLabel>
                <OutlinedInput
                  id="quantity"
                  type="number"
                  name="quantity"
                  value={quantity || ''}
                  inputProps={{}}
                  onChange={(ev) => setQuantity(ev.target.value)}
                  endAdornment={<IconCheck />}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 250, cursor: 'pointer' }}>
                <center>
                  <input type="file" id="picture1" style={{ display: 'none' }} onChange={handlePicture1Change} accept="image/*" />
                  <div htmlFor="picture1" id="picture1">
                    <label htmlFor="picture1">
                      <img src={picture1.preview || url0} alt="picture1" height={160} style={{ borderRadius: 15, paddingTop: 5 }} />
                      <p style={{ fontSize: 12 }}>{titles.instructionsImg}</p>
                      <p style={{ fontSize: 11 }}>{titles.sizeImg}</p>
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 250, cursor: 'pointer' }}>
                <center>
                  <input type="file" id="picture2" style={{ display: 'none' }} onChange={handlePicture2Change} accept="image/*" />
                  <div htmlFor="picture2" id="picture2">
                    <label htmlFor="picture2">
                      <img src={picture2.preview || url1} alt="picture2" height={160} style={{ borderRadius: 15, paddingTop: 5 }} />
                      <p style={{ fontSize: 12 }}>{titles.instructionsImg}</p>
                      <p style={{ fontSize: 11 }}>{titles.sizeImg}</p>
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 250, cursor: 'pointer' }}>
                <center>
                  <input type="file" id="picture3" style={{ display: 'none' }} onChange={handlePicture3Change} accept="image/*" />
                  <div htmlFor="picture3" id="picture3">
                    <label htmlFor="picture3">
                      <img src={picture3.preview || url2} alt="picture3" height={160} style={{ borderRadius: 15, paddingTop: 5 }} />
                      <p style={{ fontSize: 12 }}>{titles.instructionsImg}</p>
                      <p style={{ fontSize: 11 }}>{titles.sizeImg}</p>
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 250, cursor: 'pointer' }}>
                <center>
                  <input type="file" id="picture4" style={{ display: 'none' }} onChange={handlePicture4Change} accept="image/*" />
                  <div htmlFor="picture4" id="picture4">
                    <label htmlFor="picture4">
                      <img src={picture4.preview || url3} alt="picture4" height={160} style={{ borderRadius: 15, paddingTop: 5 }} />
                      <p style={{ fontSize: 12 }}>{titles.logoImg}</p>
                      <p style={{ fontSize: 11 }}>{titles.sizeImg}</p>
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 250, cursor: 'pointer' }}>
                <center>
                  <input type="file" id="picture5" style={{ display: 'none' }} onChange={handlePicture5Change} accept="image/*" />
                  <div htmlFor="picture5" id="picture5">
                    <label htmlFor="picture5">
                      <img src={picture5.preview || url4} alt="picture5" height={160} style={{ borderRadius: 15, paddingTop: 5 }} />
                      <p style={{ fontSize: 12 }}>{titles.logoImg}</p>
                      <p style={{ fontSize: 11 }}>{titles.sizeImg}</p>
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
            <Grid item xs={12} sm={12} md={6} lg={6} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 250, cursor: 'pointer' }}>
                <center>
                  <input type="file" id="picture6" style={{ display: 'none' }} onChange={handlePicture6Change} accept="image/*" />
                  <div htmlFor="picture6" id="picture6">
                    <label htmlFor="picture6">
                      <img src={picture6.preview || url5} alt="picture6" height={160} style={{ borderRadius: 15, paddingTop: 5 }} />
                      <p style={{ fontSize: 12 }}>{titles.logoImg}</p>
                      <p style={{ fontSize: 11 }}>{titles.sizeImg}</p>
                    </label>
                  </div>
                </center>
              </div>
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
    </div>
  );
}
