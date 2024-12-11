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
import { generateId } from 'utils/idGenerator';
import { titles, inputLabels } from './Products.texts';
import defaultImageCourse from 'assets/images/addImg.png';
import { fullDate } from 'utils/validations';
import { collProducts } from 'store/collections';

import { authentication, storage } from 'config/firebase';
import { createDocument, getCategories, updateDocument } from 'config/firebaseEvents';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

export default function ProductAdd() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idBusiness = searchParams.get('id');
  const nameBusiness = searchParams.get('name');
  const theme = useTheme();
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState(null);
  const [openLoader, setOpenLoader] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  //const [telegram, setTelegram] = useState(null);
  const [picture1, setPicture1] = useState({ preview: '', raw: '' });
  const [picture2, setPicture2] = useState({ preview: '', raw: '' });
  const [picture3, setPicture3] = useState({ preview: '', raw: '' });
  const [picture4, setPicture4] = useState({ preview: '', raw: '' });
  const [picture5, setPicture5] = useState({ preview: '', raw: '' });
  const [picture6, setPicture6] = useState({ preview: '', raw: '' });

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
      }
    });
    getCategories().then((data) => {
      setCategories(data);
    });
  }, []);

  const handleCreate = () => {
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
        idBusiness: idBusiness,
        nameBusiness: nameBusiness,
        userId: userId,
        userName: userName,
        name: name,
        description: description,
        price: price,
        quantity: quantity,
        category: category,
        picture1: null,
        picture2: null,
        picture3: null,
        picture4: null,
        picture5: null,
        picture6: null,
        createAt: fullDate(),
        updateAt: null,
        deleteAt: null,
        state: 1,
        type: 1
      };
      setTimeout(() => {
        createDocument(collProducts, ide, object);
        //Picture1
        if (picture1.raw !== null) {
          const imageName = ide + 'p1.jpg';
          const imageRef = ref(storage, `business/products/${imageName}`);
          uploadBytes(imageRef, picture1.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture1: url
              };
              updateDocument(collProducts, ide, obj);
            });
          });
        }
        //Picture2
        if (picture2.raw !== null) {
          const imageName = ide + 'p2.jpg';
          const imageRef = ref(storage, `business/products/${imageName}`);
          uploadBytes(imageRef, picture2.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture2: url
              };
              updateDocument(collProducts, ide, obj);
            });
          });
        }
        //Picture3
        if (picture3.raw !== null) {
          const imageName = ide + 'p3.jpg';
          const imageRef = ref(storage, `business/products/${imageName}`);
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
        //Picture5
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
        //Picture6
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
        setOpenLoader(false);
        navigate({
          pathname: '/app/products',
          search: `?id=${idBusiness}&name=${nameBusiness}`
        });
        clearData();
      }, 3000);
    }
  };

  const clearData = () => {
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
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
            Crear Producto en {nameBusiness}
          </Typography>
          <Tooltip title="Guardar">
            <IconButton
              color="inherit"
              onClick={() => {
                handleCreate();
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
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="category">{inputLabels.category + ' *'}</InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category"
                  value={category || ''}
                  label="Categoría"
                  onChange={handleChangeCategory}
                  fullWidth
                  defaultValue={'COMP'}
                >
                  {categories.map((p) => (
                    <MenuItem key={p.id} value={p.value} style={{ textAlign: 'left' }}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={4}>
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
            <Grid item xs={4}>
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
                  <div htmlFor="picture1" id="picture1" style={{ marginTop: 10 }}>
                    <label htmlFor="picture1">
                      <img
                        src={picture1.preview || defaultImageCourse}
                        alt="picture1"
                        height={160}
                        style={{ borderRadius: 15, cursor: 'pointer' }}
                      />
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
                  <div htmlFor="picture2" id="picture2" style={{ marginTop: 10 }}>
                    <label htmlFor="picture2">
                      <img
                        src={picture2.preview || defaultImageCourse}
                        alt="picture2"
                        height={160}
                        style={{ borderRadius: 15, cursor: 'pointer' }}
                      />
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
                  <div htmlFor="picture3" id="picture3" style={{ marginTop: 10 }}>
                    <label htmlFor="picture3">
                      <img
                        src={picture3.preview || defaultImageCourse}
                        alt="picture3"
                        height={160}
                        style={{ borderRadius: 15, cursor: 'pointer' }}
                      />
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
                  <div htmlFor="picture4" id="picture4" style={{ marginTop: 10 }}>
                    <label htmlFor="picture4">
                      <img
                        src={picture4.preview || defaultImageCourse}
                        alt="picture4"
                        height={160}
                        style={{ borderRadius: 15, cursor: 'pointer' }}
                      />
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
                  <div htmlFor="picture5" id="picture5" style={{ marginTop: 10 }}>
                    <label htmlFor="picture5">
                      <img
                        src={picture5.preview || defaultImageCourse}
                        alt="picture5"
                        height={160}
                        style={{ borderRadius: 15, cursor: 'pointer' }}
                      />
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
                  <div htmlFor="picture6" id="picture6" style={{ marginTop: 10 }}>
                    <label htmlFor="picture6">
                      <img
                        src={picture6.preview || defaultImageCourse}
                        alt="picture6"
                        height={160}
                        style={{ borderRadius: 15, cursor: 'pointer' }}
                      />
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
