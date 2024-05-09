import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Typography, Grid, Card, CardMedia, CardContent, Box, OutlinedInput, Modal } from '@mui/material';
import { getProductsByCategory } from 'config/firebaseEvents';
import { searchingProducts } from 'utils/search';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './styles';
import MessageDark from 'components/message/MessageDark';

const MarketFilter = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  let navigate = useNavigate();
  const [openLoader, setOpenLoader] = useState(false);

  useEffect(() => {
    getProductsByCategory(category).then((data) => {
      setProducts(data);
    });
    setOpenLoader(true);
    setTimeout(() => {
      setOpenLoader(false);
    }, 2000);
  }, [category]);

  return (
    <Box>
      {products.length > 0 ? (
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
      ) : (
        <></>
      )}
      {products.length > 0 ? (
        <Grid container spacing={0} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Grid container spacing={0.5}>
              {products.filter(searchingProducts(search)).map((item) => {
                return (
                  <Grid key={item.id} item xs={6} sm={6} md={3} lg={2}>
                    <div
                      aria-hidden="true"
                      onClick={() => {
                        navigate({
                          pathname: '/market/item/',
                          search: `?id=${item.id}`
                        });
                      }}
                    >
                      <Card sx={{ maxWidth: '100%', height: 265, borderRadius: 3, backgroundColor: '#242526', cursor: 'pointer' }}>
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
                    </div>
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <MessageDark message={'No hay productos para la categoría seleccionada'} submessage="Se el primero en agregar productos" />
            </Grid>
          </Grid>
        </Grid>
      )}

      <Modal open={openLoader} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.modalLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </Box>
  );
};

export default MarketFilter;
