/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Grid, InputLabel, OutlinedInput, FormControl, AppBar, Container, Toolbar } from '@mui/material';
import { uiStyles } from './Products.styles';

import { IconArrowBack } from '@tabler/icons';

//Notifications
import 'react-toastify/dist/ReactToastify.css';

//Collections
import { inputLabels } from './Products.texts';

import { getProductById } from 'config/firebaseEvents';

export default function ProductView() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('id');
  const theme = useTheme();
  const [name, setName] = useState(null);
  const [description, setDescription] = useState(null);
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [category, setCategory] = useState(null);

  const [url0, setUrl0] = useState(null);
  const [url1, setUrl1] = useState(null);
  const [url2, setUrl2] = useState(null);
  const [url3, setUrl3] = useState(null);

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

  return (
    <div>
      <AppBar position="static" style={uiStyles.appbar}>
        <Container maxWidth="xl" style={uiStyles.container}>
          <Toolbar disableGutters>
            <IconArrowBack
              color="#FFF"
              style={{ marginLeft: 0, marginRight: 20, cursor: 'pointer' }}
              onClick={() => {
                navigate('/main/business');
              }}
            />
          </Toolbar>
        </Container>
      </AppBar>
      <Grid container style={{ marginTop: 10, paddingLeft: 0 }}>
        <Grid item lg={12} xs={12}>
          <Grid container spacing={0.4}>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="name">{inputLabels.name}</InputLabel>
                <OutlinedInput
                  id="name"
                  type="text"
                  name="name"
                  value={name || ''}
                  inputProps={{}}
                  onChange={(ev) => setName(ev.target.value)}
                  readOnly
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="description">{inputLabels.description}</InputLabel>
                <OutlinedInput
                  id="description"
                  type="text"
                  multiline
                  rows={6}
                  name="description"
                  value={description || ''}
                  inputProps={{}}
                  onChange={(ev) => setDescription(ev.target.value)}
                  readOnly
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="category">{inputLabels.category}</InputLabel>
                <OutlinedInput
                  id="category"
                  type="text"
                  name="category"
                  value={category || ''}
                  inputProps={{}}
                  onChange={(ev) => setCategory(ev.target.value)}
                  readOnly
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="price">{inputLabels.price}</InputLabel>
                <OutlinedInput
                  id="price"
                  type="number"
                  name="price"
                  value={price || ''}
                  inputProps={{}}
                  onChange={(ev) => setPrice(ev.target.value)}
                  readOnly
                />
              </FormControl>
            </Grid>
            <Grid item xs={4}>
              <FormControl fullWidth sx={{ ...theme.typography.customInput }}>
                <InputLabel htmlFor="quantity">{inputLabels.quantity}</InputLabel>
                <OutlinedInput
                  id="quantity"
                  type="number"
                  name="quantity"
                  value={quantity || ''}
                  inputProps={{}}
                  onChange={(ev) => setQuantity(ev.target.value)}
                  readOnly
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} lg={3} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 160, cursor: 'pointer' }}>
                <center>
                  <div htmlFor="picture1" id="picture1">
                    <label htmlFor="picture1">
                      <img src={url0} alt="picture1" height={140} style={{ borderRadius: 15, paddingTop: 5 }} />
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
            <Grid item xs={6} lg={3} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 160, cursor: 'pointer' }}>
                <center>
                  <div htmlFor="picture2" id="picture2">
                    <label htmlFor="picture2">
                      <img src={url1} alt="picture2" height={140} style={{ borderRadius: 15, paddingTop: 5 }} />
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
            <Grid item xs={6} lg={3} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 160, cursor: 'pointer' }}>
                <center>
                  <div htmlFor="picture3" id="picture3">
                    <label htmlFor="picture3">
                      <img src={url2} alt="picture3" height={140} style={{ borderRadius: 15, paddingTop: 5 }} />
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
            <Grid item xs={6} lg={3} style={{ marginTop: 20 }}>
              <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: 160, cursor: 'pointer' }}>
                <center>
                  <div htmlFor="picture4" id="picture4">
                    <label htmlFor="picture4">
                      <img src={url3} alt="picture4" height={140} style={{ borderRadius: 15, paddingTop: 5 }} />
                    </label>
                  </div>
                </center>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
