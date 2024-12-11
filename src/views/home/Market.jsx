import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Typography, Grid, Card, CardMedia, CardContent, Box, OutlinedInput, Modal } from '@mui/material';
import { getProducts } from 'config/firebaseEvents';
import { searchingProducts } from 'utils/search';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './styles';
import { genConst } from 'store/constant';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  let navigate = useNavigate();
  const [openLoader, setOpenLoader] = useState(false);

  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
    setOpenLoader(true);
    setTimeout(() => {
      setOpenLoader(false);
    }, 1000);
  }, []);

  return (
    <>
      <Grid container spacing={1.5}>
        <Grid xs={12} sm={12} md={12} lg={12} sx={{ mt: 0, pl: 1 }}>
          <OutlinedInput
            id={'search'}
            type="text"
            name={'search'}
            onChange={(ev) => setSearch(ev.target.value)}
            placeholder={'Buscar en Khuska Market'}
            fullWidth
          />
        </Grid>
        <Grid xs={12} sm={12} md={12} lg={12} sx={{ mt: 0, pl: 1 }}>
          <Typography variant="h4" noWrap component="div" style={{ color: '#3a3b3c', paddingTop: 20, paddingBottom: 20 }}>
            Productos sugeridos hoy
          </Typography>
        </Grid>
      </Grid>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Grid container spacing={0.5}>
            {products.filter(searchingProducts(search)).map((item) => {
              return (
                <Grid key={item.id} item xs={6} sm={6} md={3} lg={3}>
                  <div
                    aria-hidden="true"
                    onClick={() => {
                      navigate({
                        pathname: '/market/item/',
                        search: `?id=${item.id}`
                      });
                    }}
                  >
                    <Card sx={{ height: 265, borderRadius: 3, backgroundColor: '#FFF', cursor: 'pointer' }}>
                      <CardMedia
                        sx={{ borderRadius: 3, padding: 0.5, resize: 'cover' }}
                        component="img"
                        height={170}
                        image={item.picture1}
                        alt="Portada img"
                      />
                      <CardContent sx={{ backgroundColor: '#fff', marginTop: -3, paddingLeft: 1, paddingRight: 1 }}>
                        <Typography variant="h3" color={genConst.CONST_APPBAR} align="center">
                          ${Number.parseFloat(item.price).toFixed(2)}
                        </Typography>
                        <p
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            color: '#000',
                            fontSize: 13,
                            textOverflow: 'ellipsis',
                            maxWidth: '100%'
                          }}
                        >
                          {item.name}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
              );
            })}
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
    </>
  );
};

export default Home;
