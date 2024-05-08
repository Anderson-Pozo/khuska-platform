/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { createDocument, getBusinessById, getProductById, getUserById } from 'config/firebaseEvents';
import { Avatar, Box, Divider, Grid, Typography, TextField, Button, ButtonGroup, Modal } from '@mui/material';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { uiStyles } from './styles';
import { generateId } from 'utils/idGenerator';
import { fullDate } from 'utils/validations';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { collMessage } from 'store/collections';

export default function ViewItem() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const classes = useStyles();
  const [openLoader, setOpenLoader] = useState(false);
  const [fromId, setFromId] = useState(null);
  const [fromName, setFromName] = useState(null);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);
  const [url0, setUrl0] = useState(null);

  const [userIdd, setUserIdd] = useState(null);
  const [userName, setUserName] = useState(null);
  const [userLogo, setUserLogo] = useState(null);
  const [userCreateAt, setUserCreateAt] = useState(null);

  const [images, setImages] = useState([]);
  const [businessId, setBusinessId] = useState(null);
  const [businessName, setBusinessName] = useState(null);
  const [businessLogo, setBusinessLogo] = useState(null);
  const [businessCreateAt, setBusinessCreateAt] = useState(null);
  const [businessCity, setBusinessCity] = useState(null);
  const [businessUserId, setBusinessUserId] = useState(null);
  const [message, setMessage] = useState('Hola. ¿Sigue estando disponible? ');

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        setFromId(user.uid);
        setFromName(user.displayName);
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
      setUrl0(data[0].picture1);
      setImages([
        {
          original: data[0].picture1,
          thumbnail: data[0].picture1,
          originalHeight: 500,
          thumbnailWidth: 40,
          thumbnailHeight: 50
        },
        {
          original: data[0].picture2,
          thumbnail: data[0].picture2,
          originalHeight: 500,
          thumbnailWidth: 40,
          thumbnailHeight: 50
        },
        {
          original: data[0].picture3,
          thumbnail: data[0].picture3,
          originalHeight: 500,
          thumbnailWidth: 40,
          thumbnailHeight: 50
        },
        {
          original: data[0].picture4,
          thumbnail: data[0].picture4,
          originalHeight: 500,
          thumbnailWidth: 40,
          thumbnailHeight: 50
        }
      ]);
      setBusinessId(data[0].idBusiness);
      if (data[0].type !== 0) {
        getUserById(data[0].userId).then((dat) => {
          setUserIdd(dat[0].id);
          setUserName(dat[0].fullName);
          setUserLogo(dat[0].avatar);
          setUserCreateAt(dat[0].createAt);
        });
      } else {
        getBusinessById(data[0].idBusiness).then((dataa) => {
          setBusinessName(dataa[0].name);
          setBusinessLogo(dataa[0].logo);
          setBusinessCreateAt(dataa[0].createAt);
          setBusinessCity(dataa[0].city);
          setBusinessUserId(dataa[0].userId);
        });
      }
    });
    document.getElementsByClassName('image-gallery-thumbnail-image').style = 'width: 30';
  }, []);

  const handleSendMessage = () => {
    setOpenLoader(true);
    const msnId = generateId(10);
    const obj = {
      id: msnId,
      to: userId,
      from: fromId,
      fromName: fromName,
      businessId: businessId || userIdd,
      businessName: businessName || userName,
      businessUserId: businessUserId || '',
      message: message,
      idProduct: id,
      nameProduct: name,
      createAt: fullDate(),
      preview: url0
    };
    createDocument(collMessage, msnId, obj);
    setTimeout(() => {
      setOpenLoader(false);
      toast.success('Mensaje enviado correctamente!', { position: toast.POSITION.TOP_RIGHT });
      setMessage('Hola. ¿Sigue estando disponible? ');
    }, 2000);
  };

  return (
    <Box>
      <ToastContainer />
      <Grid container spacing={1} style={{ marginTop: 5 }}>
        <Grid item lg={12} xs={12}>
          <Grid container spacing={0} style={{ paddingLeft: 20 }}>
            <Grid item lg={8} xs={12} sx={{ mt: 4 }}>
              <center>
                <ImageGallery
                  items={images}
                  autoPlay={false}
                  showPlayButton={false}
                  showNav={true}
                  showFullscreenButton={false}
                  slideInterval={8000}
                />
              </center>
            </Grid>
            <Grid item lg={4} xs={12} sx={uiStyles.layoutItem}>
              <div style={uiStyles.main}>
                <Typography component={Link} to="/market/main" variant="h6" sx={{ textDecoration: 'none', color: '#FFF', pb: 2 }}>
                  Regresar
                </Typography>
                <Typography variant="h3" textAlign="left" sx={{ color: '#FFF' }}>
                  {name}
                </Typography>
                <Typography variant="h5" textAlign="left" sx={{ color: '#FFF', pt: 1, fontSize: 16 }}>
                  $ {price} - {quantity} Disponibles
                </Typography>
                <Typography variant="h5" textAlign="left" sx={{ color: '#E4E6EB', pt: 1, pb: 2, fontSize: 14 }}>
                  Publicado en: {businessCity || ' sin información'}
                </Typography>
                <Divider sx={{ borderColor: '#3E4042' }} />
                <Typography variant="h2" textAlign="left" sx={{ color: '#FFF', pt: 2, fontSize: 18 }}>
                  Detalles
                </Typography>
                <Typography variant="h5" textAlign="justify" sx={{ color: '#E4E6EB', pt: 2, pb: 2, fontSize: 12 }}>
                  {description}
                </Typography>
                <Typography variant="h5" textAlign="left" sx={{ color: '#FFF', pt: 2, pb: 2, fontSize: 16 }}>
                  <strong>Categoría: </strong>
                  {category}
                </Typography>
                <Divider sx={{ borderColor: '#3E4042' }} />
                <Typography variant="h2" textAlign="left" sx={{ color: '#FFF', pt: 2, fontSize: 18 }}>
                  Información del vendedor
                </Typography>
                <ButtonGroup sx={{ mt: 2 }}>
                  <Avatar src={businessLogo || userLogo} color="inherit" style={{ width: 32, height: 32 }} />
                  <span style={{ margin: 6, color: '#E4E6EB', fontSize: 16 }}>{businessName || userName}</span>
                </ButtonGroup>
                <Typography variant="h5" textAlign="left" sx={{ color: '#FFF', pt: 2, pb: 2, fontSize: 12 }}>
                  <strong>Se unió a Khuska Market en </strong>
                  <p>{businessCreateAt || userCreateAt}</p>
                </Typography>
                <Divider sx={{ borderColor: '#3E4042' }} />
                <Typography variant="h2" textAlign="left" sx={{ color: '#FFF', pt: 2, pb: 2, fontSize: 18 }}>
                  Envía un mensaje al vendedor
                </Typography>
                {fromId ? (
                  <>
                    <TextField
                      variant="filled"
                      type="text"
                      className={classes.root}
                      fullWidth
                      color="info"
                      value={message}
                      sx={{ input: { color: '#FFF' } }}
                      onChange={(ev) => setMessage(ev.target.value)}
                    />
                    <Button
                      disableElevation
                      fullWidth
                      size="large"
                      type="submit"
                      variant="contained"
                      color="primary"
                      style={{ borderRadius: 10, height: 50, marginTop: 5, marginBottom: 10 }}
                      onClick={handleSendMessage}
                    >
                      Enviar
                    </Button>
                  </>
                ) : (
                  <>
                    <Typography
                      component={Link}
                      to="/market/login"
                      variant="h6"
                      sx={{ textDecoration: 'none', color: '#FFF', pb: 2, textAlign: 'left' }}
                    >
                      Inicia sesión para escribir al vendedor del producto! Clic aquí
                    </Typography>
                  </>
                )}
              </div>
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
    </Box>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiInputBase-root': {
      color: '#FFF'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#242526',
      borderRadius: 10,
      marginBottom: 10,
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
