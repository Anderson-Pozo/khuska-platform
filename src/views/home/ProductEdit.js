/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, Modal, Button, TextField, Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './styles';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Collections
import * as Msg from 'store/message';
import { fullDate } from 'utils/validations';
import { collProducts } from 'store/collections';
import { storage } from 'config/firebase';
import { getProductById, updateDocument } from 'config/firebaseEvents';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiInputBase-root': {
      color: '#FFF'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#242526',
      borderRadius: 10,
      marginBottom: 15,
      color: '#FFF'
    },
    '& .MuiFilledInput-root:hover': {
      backgroundColor: '#242526',
      color: '#FFF',
      '@media (hover: none)': {
        backgroundColor: '#242526'
      }
    },
    '& .MuiFilledInput-root.Mui-focused': {
      backgroundColor: '#242526',
      color: '#FFF',
      border: '1px solid #242526'
    },
    '& .MuiInputLabel-outlined': {
      color: '#FFF'
    }
  }
}));

export default function ProductEdit() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('id');
  const classes = useStyles();
  const [openLoader, setOpenLoader] = useState(false);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);

  const [picture1, setPicture1] = useState({ preview: '', raw: '' });
  const [picture2, setPicture2] = useState({ preview: '', raw: '' });
  const [picture3, setPicture3] = useState({ preview: '', raw: '' });
  const [picture4, setPicture4] = useState({ preview: '', raw: '' });
  const [url0, setUrl0] = useState(null);
  const [url1, setUrl1] = useState(null);
  const [url2, setUrl2] = useState(null);
  const [url3, setUrl3] = useState(null);
  const [change1, setChange1] = useState(false);
  const [change2, setChange2] = useState(false);
  const [change3, setChange3] = useState(false);
  const [change4, setChange4] = useState(false);

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
        setOpenLoader(false);
        navigate('/main/products');
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

  return (
    <div>
      <ToastContainer />
      <Grid container style={{ marginTop: 10, paddingLeft: 0 }}>
        <Grid item lg={12} xs={12}>
          <Grid container spacing={0.4}>
            <Grid item xs={12} sx={{ mb: 2, mt: 2 }}>
              <Typography component={Link} to="/market/my-items" variant="h5" sx={{ textDecoration: 'none', color: '#FFF' }}>
                Regresar
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                type="text"
                className={classes.root}
                fullWidth
                label="Título"
                color="info"
                value={name || ''}
                onChange={(ev) => setName(ev.target.value)}
                sx={{ input: { color: '#FFF' } }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                className={classes.root}
                fullWidth
                label="Descripción"
                color="info"
                value={description || ''}
                multiline
                rows={5}
                rowsMax={10}
                inputProps={{ style: { color: '#FFF' } }}
                onChange={(ev) => setDescription(ev.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="filled"
                type="text"
                className={classes.root}
                fullWidth
                value={category || ''}
                label="Categoría"
                color="info"
                onChange={(ev) => setCategory(ev.target.value)}
                sx={{ input: { color: '#FFF' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="filled"
                type="number"
                className={classes.root}
                fullWidth
                label="Precio"
                color="info"
                value={price || ''}
                onChange={(ev) => setPrice(ev.target.value)}
                sx={{ input: { color: '#FFF' } }}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="filled"
                type="number"
                className={classes.root}
                fullWidth
                label="Cantidad"
                color="info"
                value={quantity || ''}
                onChange={(ev) => setQuantity(ev.target.value)}
                sx={{ input: { color: '#FFF' } }}
              />
            </Grid>
            <Grid item xs={6} lg={3} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 210, cursor: 'pointer' }}>
                <center>
                  <input type="file" id="picture1" style={{ display: 'none' }} onChange={handlePicture1Change} accept="image/*" />
                  <div htmlFor="picture1" id="picture1">
                    <label htmlFor="picture1">
                      <img src={picture1.preview || url0} alt="picture1" height={140} style={{ borderRadius: 15, paddingTop: 5 }} />
                      <p style={{ fontSize: 12, color: '#FFF' }}>{'Click para agregar imagen'}</p>
                      <p style={{ fontSize: 11, color: '#FFF' }}>{'400x400'}</p>
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
            <Grid item xs={6} lg={3} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 210, cursor: 'pointer' }}>
                <center>
                  <input type="file" id="picture2" style={{ display: 'none' }} onChange={handlePicture2Change} accept="image/*" />
                  <div htmlFor="picture2" id="picture2">
                    <label htmlFor="picture2">
                      <img src={picture2.preview || url1} alt="picture2" height={140} style={{ borderRadius: 15, paddingTop: 5 }} />
                      <p style={{ fontSize: 12, color: '#FFF' }}>{'Click para agregar imagen'}</p>
                      <p style={{ fontSize: 11, color: '#FFF' }}>{'400x400'}</p>
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
            <Grid item xs={6} lg={3} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 210, cursor: 'pointer' }}>
                <center>
                  <input type="file" id="picture3" style={{ display: 'none' }} onChange={handlePicture3Change} accept="image/*" />
                  <div htmlFor="picture3" id="picture3">
                    <label htmlFor="picture3">
                      <img src={picture3.preview || url2} alt="picture3" height={140} style={{ borderRadius: 15, paddingTop: 5 }} />
                      <p style={{ fontSize: 12, color: '#FFF' }}>{'Click para agregar imagen'}</p>
                      <p style={{ fontSize: 11, color: '#FFF' }}>{'400x400'}</p>
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
            <Grid item xs={6} lg={3} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 210, cursor: 'pointer' }}>
                <center>
                  <input type="file" id="picture4" style={{ display: 'none' }} onChange={handlePicture4Change} accept="image/*" />
                  <div htmlFor="picture4" id="picture4">
                    <label htmlFor="picture4">
                      <img src={picture4.preview || url3} alt="picture4" height={140} style={{ borderRadius: 15, paddingTop: 5 }} />
                      <p style={{ fontSize: 12, color: '#FFF' }}>{'Click para agregar imagen'}</p>
                      <p style={{ fontSize: 11, color: '#FFF' }}>{'400x400'}</p>
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
    </div>
  );
}
