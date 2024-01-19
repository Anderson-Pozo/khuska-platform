/* eslint-disable react-hooks/exhaustive-deps */
import * as React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import {
  Button,
  Box,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  InputLabel,
  OutlinedInput,
  FormControl,
  AppBar,
  Container,
  Toolbar,
  Typography,
  Modal
} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import MenuIcon from '@mui/icons-material/Menu';
import { uiStyles } from './Courses.styles';

import { IconBook, IconApps, IconDeviceFloppy } from '@tabler/icons';

//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

//Collections
import * as Msg from 'store/message';
import { titles, inputLabels } from './Courses.texts';
import { fullDate } from 'utils/validations';
import { collCourses } from 'store/collections';

import { db, storage } from 'config/firebase';
import { updateDocument } from 'config/firebaseEvents';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function EditCourse() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const [openLoader, setOpenLoader] = React.useState(false);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [owner, setOwner] = React.useState(null);
  const [duration, setDuration] = React.useState(0);
  const [number, setNumber] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [language, setLanguage] = React.useState(null);
  const [banner, setBanner] = React.useState({ preview: '', raw: '' });
  const [isChangeUrl, setIsChangeUrl] = React.useState(false);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const q = query(collection(db, collCourses), where('id', '==', id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setName(doc.data().name);
      setDescription(doc.data().description);
      setOwner(doc.data().owner);
      setDuration(doc.data().duration);
      setNumber(doc.data().number);
      setPrice(doc.data().price);
      setLanguage(doc.data().language);
      setBanner(doc.data().banner);
    });
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleUpdate = () => {
    if (!name || !description || !owner || !number || !duration || !price || !language) {
      toast.info(Msg.requiered, { position: toast.POSITION.TOP_RIGHT });
    } else {
      setOpenLoader(true);
      const obj = {
        name: name,
        description: description,
        owner: owner,
        number: number,
        duration: duration,
        price: price,
        language: language,
        updateAt: fullDate()
      };
      setTimeout(() => {
        updateDocument(collCourses, id, obj);
        if (isChangeUrl) {
          if (banner.raw !== null) {
            const imageName = id + genConst.CONST_EXT_IMAGE;
            const imageRef = ref(storage, `courses/${imageName}`);
            uploadBytes(imageRef, banner.raw).then((snap) => {
              getDownloadURL(snap.ref).then((url) => {
                const obj = {
                  banner: url
                };
                updateDocument(collCourses, id, obj);
              });
            });
          }
        }
        setOpenLoader(false);
        setIsChangeUrl(false);
        toast.success(Msg.couupdsucc, { position: toast.POSITION.TOP_RIGHT });
        clearData();
        navigate('/app/courses');
      }, 3000);
    }
  };

  const clearData = () => {
    setName('');
    setDescription('');
    setOwner('');
    setNumber('');
    setDuration('');
    setPrice('');
    setBanner({
      preview: '',
      raw: ''
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setBanner({
          preview: img.src,
          raw: raw
        });
        setIsChangeUrl(true);
      };
    }
  };

  return (
    <div>
      <ToastContainer />
      <AppBar position="static" style={uiStyles.appbar}>
        <Container maxWidth="xl" style={uiStyles.containerAdd}>
          <Toolbar disableGutters>
            <IconBook />
            <Box sx={uiStyles.box}>
              <IconButton
                size="medium"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left'
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left'
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={uiStyles.menu}
              >
                <MenuItem
                  key="id-1"
                  onClick={() => {
                    navigate('/app/courses');
                  }}
                >
                  <IconBook style={{ marginRight: 4 }} />
                  <Typography textAlign="center">{titles.viewMenu}</Typography>
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={uiStyles.box2}>
              <Button
                variant="primary"
                startIcon={<IconApps />}
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
              >
                {titles.actions}
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  'aria-labelledby': 'basic-button'
                }}
              >
                <MenuItem
                  onClick={() => {
                    navigate('/app/courses');
                  }}
                >
                  <IconBook style={{ marginRight: 10 }} />
                  {titles.viewMenu}
                </MenuItem>
              </Menu>
            </Box>
            <Box sx={{ flexGrow: 0 }}>
              <Button variant="primary" endIcon={<IconDeviceFloppy />} onClick={handleUpdate}>
                {titles.buttonEdit}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Grid container spacing={1} style={{ marginTop: 5 }}>
        <Grid item lg={6} xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <InputLabel htmlFor="name">{inputLabels.name + ' *'}</InputLabel>
                  <OutlinedInput id="name" type="text" name="name" value={name || ''} onChange={(ev) => setName(ev.target.value)} />
                </FormControl>
              </Grid>
              <Grid container spacing={1}>
                <Grid item xs={12}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="description">{inputLabels.description + ' *'}</InputLabel>
                    <OutlinedInput
                      id="description"
                      type="text"
                      multiline
                      rows={4}
                      name="description"
                      value={description || ''}
                      style={{ paddingTop: 18 }}
                      onChange={(ev) => setDescription(ev.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="owner">{inputLabels.owner + ' *'}</InputLabel>
                    <OutlinedInput id="owner" type="text" name="owner" value={owner || ''} onChange={(ev) => setOwner(ev.target.value)} />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="number">{inputLabels.number + ' *'}</InputLabel>
                    <OutlinedInput
                      id="number"
                      type="number"
                      name="number"
                      value={number || ''}
                      onChange={(ev) => setNumber(ev.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="duration">{inputLabels.duration + ' *'}</InputLabel>
                    <OutlinedInput
                      id="duration"
                      type="number"
                      name="duration"
                      value={duration || ''}
                      onChange={(ev) => setDuration(ev.target.value)}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                    <InputLabel htmlFor="price">{'$ ' + inputLabels.price + ' *'}</InputLabel>
                    <OutlinedInput id="price" type="number" name="price" value={price || ''} onChange={(ev) => setPrice(ev.target.value)} />
                  </FormControl>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Grid item lg={6} xs={12}>
          <Grid item xs={12} style={{ marginTop: 20 }}>
            <center>
              <input type="file" id="banner" style={{ display: 'none' }} onChange={handleImageChange} accept="image/*" />
              <div htmlFor="banner" id="banner">
                <label htmlFor="banner">
                  <img src={banner.preview || banner} alt="Banner" width="100%" height={350} style={{ borderRadius: 15 }} />
                  <p style={{ fontSize: 12 }}>{titles.instructionsImg}</p>
                </label>
              </div>
            </center>
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