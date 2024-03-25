import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardMedia, CardContent, Box, OutlinedInput } from '@mui/material';
import { getProducts } from 'config/firebaseEvents';
import { searchingProducts } from 'utils/search';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <Box>
      <Box sx={{ flexGrow: 0, mt: 1 }}>
        <OutlinedInput
          id={'search'}
          type="text"
          name={'search'}
          onChange={(ev) => setSearch(ev.target.value)}
          placeholder={'Buscar en Khuska Market'}
          style={{ width: '100%' }}
        />
      </Box>
      <Typography variant="h4" noWrap component="div" style={{ color: '#FFF', paddingTop: 20, paddingBottom: 20 }}>
        Productos sugeridos hoy
      </Typography>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <Grid container spacing={0.5}>
            {products.filter(searchingProducts(search)).map((item) => {
              return (
                <Grid key={item.id} item xs={6} sm={6} md={3} lg={2}>
                  <Card sx={{ maxWidth: '100%', height: 270, borderRadius: 3, backgroundColor: '#242526', cursor: 'pointer' }}>
                    <CardMedia
                      sx={{ borderRadius: 3, padding: 0.5 }}
                      component="img"
                      height={194}
                      image={item.picture1}
                      alt="Portada img"
                    />
                    <CardContent sx={{ backgroundColor: '#242526', marginTop: -2, paddingLeft: 1, paddingRight: 1 }}>
                      <Typography variant="h4" color="#FFF">
                        ${item.price}
                      </Typography>
                      <p
                        style={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          color: '#FFF',
                          fontSize: 11,
                          textOverflow: 'ellipsis',
                          maxWidth: '100%'
                        }}
                      >
                        {item.name}
                      </p>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Home;
