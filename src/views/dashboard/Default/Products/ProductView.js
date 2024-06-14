/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, FormControl, AppBar, Toolbar, IconButton, Tooltip, Typography, Paper } from '@mui/material';
import { uiStyles } from './Products.styles';
import { IconArrowBack, IconBox, IconEye } from '@tabler/icons';
//Notifications
import 'react-toastify/dist/ReactToastify.css';
//Collections
import { getProductById } from 'config/firebaseEvents';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import { genConst } from 'store/constant';

export default function ProductView() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('id');
  const idBusiness = searchParams.get('idBusiness');
  const nameBusiness = searchParams.get('nameBusiness');
  const theme = useTheme();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getProductById(idProduct).then((data) => {
      setName(data[0].name);
      setDescription(data[0].description);
      setPrice(data[0].price);
      setQuantity(data[0].quantity);
      setCategory(data[0].category);
      setImages([
        {
          original: data[0].picture1,
          thumbnail: data[0].picture1,
          originalHeight: 400,
          thumbnailWidth: 60,
          thumbnailHeight: 50
        },
        {
          original: data[0].picture2,
          thumbnail: data[0].picture2,
          originalHeight: 400,
          thumbnailWidth: 60,
          thumbnailHeight: 50
        },
        {
          original: data[0].picture3,
          thumbnail: data[0].picture3,
          originalHeight: 400,
          thumbnailWidth: 60,
          thumbnailHeight: 50
        },
        {
          original: data[0].picture4,
          thumbnail: data[0].picture4,
          originalHeight: 400,
          thumbnailWidth: 60,
          thumbnailHeight: 50
        },
        {
          original: data[0].picture5,
          thumbnail: data[0].picture5,
          originalHeight: 400,
          thumbnailWidth: 60,
          thumbnailHeight: 50
        },
        {
          original: data[0].picture6,
          thumbnail: data[0].picture6,
          originalHeight: 400,
          thumbnailWidth: 60,
          thumbnailHeight: 50
        }
      ]);
    });
  }, []);

  return (
    <div>
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
            Información del Producto
          </Typography>
          <Tooltip title="">
            <IconButton color="inherit">
              <IconEye />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      <Paper sx={uiStyles.paper}>
        <Grid container spacing={1} style={{ marginTop: 5 }}>
          <Grid item lg={6} xs={12}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <h1 style={{ color: genConst.CONST_APPBAR }}>{name}</h1>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <strong>Descripción:</strong>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <span>{description}</span>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <strong>Categoría:</strong>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <span>{category}</span>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <strong>Precio:</strong>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <span>$ {price}</span>
                </FormControl>
              </Grid>
              <Grid item xs={4}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <strong>Disponibilidad:</strong>
                </FormControl>
              </Grid>
              <Grid item xs={8}>
                <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                  <span>{quantity}</span>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={6} xs={12}>
            <center>
              <ImageGallery
                items={images}
                autoPlay
                showPlayButton={false}
                showNav={false}
                showFullscreenButton={false}
                slideInterval={5000}
              />
            </center>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
