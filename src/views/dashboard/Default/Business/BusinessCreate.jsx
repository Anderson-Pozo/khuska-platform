/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, IconButton, InputLabel, OutlinedInput, FormControl, AppBar, Toolbar, Typography, Modal, Tooltip } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './Business.styles';

import {
  IconDeviceFloppy,
  IconArrowBack,
  IconUser,
  IconDeviceMobile,
  IconMail,
  IconWorld,
  IconLocation,
  IconAddressBook,
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandYoutube,
  IconBuilding
} from '@tabler/icons';

//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Collections
import * as Msg from 'store/message';
import { generateId } from 'utils/idGenerator';
import { titles, inputLabels } from './Business.texts';
import defaultImageCourse from 'assets/images/addImg.png';
import { fullDate } from 'utils/validations';
import { collBusiness } from 'store/collections';

import { authentication, storage } from 'config/firebase';
import { createDocument, updateDocument } from 'config/firebaseEvents';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';

export default function BusinessCreate() {
  let navigate = useNavigate();
  const theme = useTheme();
  const [userId, setUserId] = React.useState(null);
  const [openLoader, setOpenLoader] = useState(false);
  const [name, setName] = useState(null);
  const [owner, setOwner] = useState(null);
  const [description, setDescription] = useState(null);
  const [webPage, setWebPage] = useState(null);
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [province, setProvince] = useState(null);
  const [city, setCity] = useState(null);
  const [address, setAddress] = useState(null);

  const [facebook, setFacebook] = useState(null);
  const [youtube, setYoutube] = useState(null);
  const [instagram, setInstagram] = useState(null);
  //const [telegram, setTelegram] = useState(null);
  const [logo, setLogo] = useState({ preview: '', raw: '' });
  const [picture1, setPicture1] = useState({ preview: '', raw: '' });
  const [picture2, setPicture2] = useState({ preview: '', raw: '' });
  const [picture3, setPicture3] = useState({ preview: '', raw: '' });
  const [picture4, setPicture4] = useState({ preview: '', raw: '' });

  useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        setUserId(user.uid);
        console.log(user.uid);
      }
    });
  }, []);

  const handleCreate = () => {
    if (!name || !owner || !description || !phone || !province || !address || !city || !email) {
      toast.info(Msg.requiered, { position: toast.POSITION.TOP_RIGHT });
    } else if (!logo.preview) {
      toast.info(Msg.imgreq, { position: toast.POSITION.TOP_RIGHT });
    } else if (!picture1.preview) {
      toast.info(Msg.imgreq, { position: toast.POSITION.TOP_RIGHT });
    } else if (!picture2.preview) {
      toast.info(Msg.imgreq, { position: toast.POSITION.TOP_RIGHT });
    } else if (!picture3.preview) {
      toast.info(Msg.imgreq, { position: toast.POSITION.TOP_RIGHT });
    } else if (!picture4.preview) {
      toast.info(Msg.imgreq, { position: toast.POSITION.TOP_RIGHT });
    } else {
      setOpenLoader(true);
      const ide = generateId(10);
      const object = {
        id: ide,
        userId: userId,
        name: name,
        owner: owner,
        description: description,
        phone: phone,
        webPage: webPage,
        email: email,
        province: province,
        city: city,
        address: address,
        logo: null,
        picture1: null,
        picture2: null,
        picture3: null,
        picture4: null,
        facebook: facebook,
        instagram: instagram,
        youtube: youtube,
        createAt: fullDate(),
        updateAt: null,
        deleteAt: null,
        state: 1
      };
      //console.log(Intl.DateTimeFormat().resolvedOptions().timeZone);
      //console.log(Intl.DateTimeFormat().resolvedOptions().locale);
      setTimeout(() => {
        createDocument(collBusiness, ide, object);
        //Logo
        if (logo.raw !== null) {
          const imageName = ide + 'logo.jpg';
          const imageRef = ref(storage, `business/${imageName}`);
          uploadBytes(imageRef, logo.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                logo: url
              };
              updateDocument(collBusiness, ide, obj);
            });
          });
        }
        //Picture1
        if (picture1.raw !== null) {
          const imageName = ide + 'p1.jpg';
          const imageRef = ref(storage, `business/${imageName}`);
          uploadBytes(imageRef, picture1.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture1: url
              };
              updateDocument(collBusiness, ide, obj);
            });
          });
        }
        //Picture2
        if (picture2.raw !== null) {
          const imageName = ide + 'p2.jpg';
          const imageRef = ref(storage, `business/${imageName}`);
          uploadBytes(imageRef, picture2.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture2: url
              };
              updateDocument(collBusiness, ide, obj);
            });
          });
        }
        //Picture3
        if (picture3.raw !== null) {
          const imageName = ide + 'p3.jpg';
          const imageRef = ref(storage, `business/${imageName}`);
          uploadBytes(imageRef, picture3.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture3: url
              };
              updateDocument(collBusiness, ide, obj);
            });
          });
        }
        //Picture4
        if (picture4.raw !== null) {
          const imageName = ide + 'p4.jpg';
          const imageRef = ref(storage, `business/${imageName}`);
          uploadBytes(imageRef, picture4.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture4: url
              };
              updateDocument(collBusiness, ide, obj);
            });
          });
        }
        setOpenLoader(false);
        clearData();
        navigate('/app/business');
      }, 3000);
    }
  };

  const clearData = () => {
    setName('');
    setOwner('');
    setDescription('');
    setPhone('');
    setWebPage('');
    setEmail('');
    setProvince('');
    setCity('');
    setAddress('');
    setFacebook('');
    setInstagram('');
    setYoutube('');
    setLogo({
      preview: '',
      raw: ''
    });
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

  const handleLogoChange = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setLogo({
          preview: img.src,
          raw: raw
        });
      };
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

  return (
    <div>
      <ToastContainer />
      <AppBar position="static" style={uiStyles.appbar}>
        <Toolbar>
          <IconButton color="inherit">
            <IconBuilding color="#FFF" />
          </IconButton>
          <Tooltip title="Regresar">
            <IconButton
              color="inherit"
              onClick={() => {
                navigate('/app/business');
              }}
            >
              <IconArrowBack />
            </IconButton>
          </Tooltip>
          <Typography variant="h5" component="div" sx={{ flexGrow: 1, color: '#FFF' }} align="center">
            Crear Negocio
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
      <Grid container spacing={0.5} style={{ marginTop: 5 }}>
        <Grid item lg={12} xs={12}>
          <Grid container spacing={0.5}>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="name">{inputLabels.name + ' *'}</InputLabel>
                <OutlinedInput
                  id="name"
                  type="text"
                  name="name"
                  value={name || ''}
                  inputProps={{}}
                  onChange={(ev) => setName(ev.target.value)}
                  endAdornment={<IconUser />}
                />
              </FormControl>
            </Grid>
            <Grid item lg={6} md={6} sm={12} xs={12}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="owner">{inputLabels.owner + ' *'}</InputLabel>
                <OutlinedInput
                  id="owner"
                  type="text"
                  name="owner"
                  value={owner || ''}
                  inputProps={{}}
                  onChange={(ev) => setOwner(ev.target.value)}
                  endAdornment={<IconUser />}
                />
              </FormControl>
            </Grid>
            <Grid container spacing={1}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="description">{inputLabels.description + ' *'}</InputLabel>
                  <OutlinedInput
                    id="description"
                    type="text"
                    multiline
                    rows={3}
                    name="description"
                    value={description || ''}
                    inputProps={{}}
                    onChange={(ev) => setDescription(ev.target.value)}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="phone">{inputLabels.phone + ' *'}</InputLabel>
                  <OutlinedInput
                    id="phone"
                    type="number"
                    name="phone"
                    value={phone || ''}
                    inputProps={{}}
                    onChange={(ev) => setPhone(ev.target.value)}
                    endAdornment={<IconDeviceMobile />}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="email">{inputLabels.email + ' *'}</InputLabel>
                  <OutlinedInput
                    id="email"
                    type="email"
                    name="email"
                    value={email || ''}
                    inputProps={{}}
                    onChange={(ev) => setEmail(ev.target.value)}
                    endAdornment={<IconMail />}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="webPage">{inputLabels.webPage}</InputLabel>
                  <OutlinedInput
                    id="webPage"
                    type="text"
                    name="webPage"
                    value={webPage || ''}
                    inputProps={{}}
                    onChange={(ev) => setWebPage(ev.target.value)}
                    endAdornment={<IconWorld />}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="province">{inputLabels.province + ' *'}</InputLabel>
                  <OutlinedInput
                    id="province"
                    type="text"
                    name="province"
                    value={province || ''}
                    inputProps={{}}
                    onChange={(ev) => setProvince(ev.target.value)}
                    endAdornment={<IconLocation />}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="city">{inputLabels.city + ' *'}</InputLabel>
                  <OutlinedInput
                    id="city"
                    type="text"
                    name="city"
                    value={city || ''}
                    inputProps={{}}
                    onChange={(ev) => setCity(ev.target.value)}
                    endAdornment={<IconLocation />}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="address">{inputLabels.address + ' *'}</InputLabel>
                  <OutlinedInput
                    id="address"
                    type="text"
                    name="address"
                    value={address || ''}
                    inputProps={{}}
                    onChange={(ev) => setAddress(ev.target.value)}
                    endAdornment={<IconAddressBook />}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="facebook">{inputLabels.facebook}</InputLabel>
                  <OutlinedInput
                    id="facebook"
                    type="text"
                    name="facebook"
                    value={facebook || ''}
                    inputProps={{}}
                    onChange={(ev) => setFacebook(ev.target.value)}
                    endAdornment={<IconBrandFacebook />}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="instagram">{inputLabels.instagram}</InputLabel>
                  <OutlinedInput
                    id="instagram"
                    type="text"
                    name="instagram"
                    value={instagram || ''}
                    inputProps={{}}
                    onChange={(ev) => setInstagram(ev.target.value)}
                    endAdornment={<IconBrandInstagram />}
                  />
                </FormControl>
              </Grid>
              <Grid item lg={4} md={4} sm={6} xs={6}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="youtube">{inputLabels.youtube}</InputLabel>
                  <OutlinedInput
                    id="youtube"
                    type="text"
                    name="youtube"
                    value={youtube || ''}
                    inputProps={{}}
                    onChange={(ev) => setYoutube(ev.target.value)}
                    endAdornment={<IconBrandYoutube />}
                  />
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid item lg={12} xs={12}>
          <center>
            <Grid container spacing={1}>
              <Grid item lg={12} md={12} sm={12} xs={12} style={{ marginTop: 20 }}>
                <div
                  style={{
                    border: 'dashed gray',
                    borderRadius: 10,
                    borderWidth: 0.2,
                    height: '100%',
                    padding: 10,
                    cursor: 'pointer'
                  }}
                >
                  <center>
                    <input type="file" id="logo" style={{ display: 'none' }} onChange={handleLogoChange} accept="image/*" />
                    <div htmlFor="logo" id="logo">
                      <label htmlFor="logo">
                        <img
                          src={logo.preview || defaultImageCourse}
                          alt="Logo"
                          height={150}
                          style={{ borderRadius: 15, cursor: 'pointer' }}
                        />
                        <p style={{ fontSize: 14 }}>{titles.logoImg}</p>
                      </label>
                    </div>
                  </center>
                </div>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} style={{ marginTop: 20 }}>
                <div
                  style={{
                    border: 'dashed gray',
                    borderRadius: 10,
                    borderWidth: 0.2,
                    height: '100%',
                    padding: 10,
                    cursor: 'pointer'
                  }}
                >
                  <center>
                    <input type="file" id="picture1" style={{ display: 'none' }} onChange={handlePicture1Change} accept="image/*" />
                    <div htmlFor="picture1" id="picture1">
                      <label htmlFor="picture1">
                        <img
                          src={picture1.preview || defaultImageCourse}
                          alt="picture1"
                          height={150}
                          style={{ borderRadius: 15, cursor: 'pointer' }}
                        />
                        <p style={{ fontSize: 14 }}>{titles.instructionsImg}</p>
                      </label>
                    </div>
                  </center>
                </div>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} style={{ marginTop: 20 }}>
                <div
                  style={{
                    border: 'dashed gray',
                    borderRadius: 10,
                    borderWidth: 0.2,
                    height: '100%',
                    padding: 10,
                    cursor: 'pointer'
                  }}
                >
                  <center>
                    <input type="file" id="picture2" style={{ display: 'none' }} onChange={handlePicture2Change} accept="image/*" />
                    <div htmlFor="picture2" id="picture2">
                      <label htmlFor="picture2">
                        <img
                          src={picture2.preview || defaultImageCourse}
                          alt="picture2"
                          height={150}
                          style={{ borderRadius: 15, cursor: 'pointer' }}
                        />
                        <p style={{ fontSize: 14 }}>{titles.instructionsImg}</p>
                      </label>
                    </div>
                  </center>
                </div>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} style={{ marginTop: 20 }}>
                <div
                  style={{
                    border: 'dashed gray',
                    borderRadius: 10,
                    borderWidth: 0.2,
                    height: '100%',
                    padding: 10,
                    cursor: 'pointer'
                  }}
                >
                  <center>
                    <input type="file" id="picture3" style={{ display: 'none' }} onChange={handlePicture3Change} accept="image/*" />
                    <div htmlFor="picture3" id="picture3" style={{ cursor: 'pointer' }}>
                      <label htmlFor="picture3">
                        <img
                          src={picture3.preview || defaultImageCourse}
                          alt="picture3"
                          height={150}
                          style={{ borderRadius: 15, cursor: 'pointer' }}
                        />
                        <p style={{ fontSize: 14 }}>{titles.instructionsImg}</p>
                      </label>
                    </div>
                  </center>
                </div>
              </Grid>
              <Grid item lg={6} md={6} sm={12} xs={12} style={{ marginTop: 20 }}>
                <div
                  style={{
                    border: 'dashed gray',
                    borderRadius: 10,
                    borderWidth: 0.2,
                    height: '100%',
                    padding: 10,
                    cursor: 'pointer'
                  }}
                >
                  <center>
                    <input type="file" id="picture4" style={{ display: 'none' }} onChange={handlePicture4Change} accept="image/*" />
                    <div htmlFor="picture4" id="picture4">
                      <label htmlFor="picture4">
                        <img
                          src={picture4.preview || defaultImageCourse}
                          alt="picture4"
                          height={150}
                          style={{ borderRadius: 15, cursor: 'pointer' }}
                        />
                        <p style={{ fontSize: 14 }}>{titles.instructionsImg}</p>
                      </label>
                    </div>
                  </center>
                </div>
              </Grid>
            </Grid>
          </center>
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
