import { useEffect, useState } from 'react';
import { Box, Card, CardActions, CardContent, CardMedia, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { deleteDocument, getFavoritesByUserId } from 'config/firebaseEvents';
import { IconTrash } from '@tabler/icons';
import { genConst } from 'store/constant';
import { Link } from 'react-router-dom';
import { collFav } from 'store/collections';
import { toast } from 'react-toastify';
import { CartButton } from 'components/shared/CartButton';

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        const favorites = await getFavoritesByUserId(user.uid);
        // console.log('User', { user });
        // console.log('Favorites', { favorites });
        setFavorites(favorites);
      } else {
        navigate('/market/main');
      }
    });
  }, []);

  const handleDelete = (id) => {
    deleteDocument(collFav, id);
    // setFavorite(false);
    setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.id !== id));
    toast.success('Eliminado de favoritos!', { position: toast.POSITION.TOP_RIGHT });
  };

  return (
    <Paper>
      <Box display="flex" alignItems="center" justifyContent="space-between" padding="16px" borderBottom="1px solid #ddd">
        <Typography variant="h4">Mis Favoritos</Typography>
      </Box>
      <Grid container spacing={2} padding="16px">
        {favorites.map((favorite) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={favorite.id}>
            <Card
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                border: '1px solid #ddd'
              }}
            >
              {/* Product Image */}
              <Box
                component={Link}
                to={`/market/item/?id=${favorite.productId}`}
                sx={{
                  textDecoration: 'none',
                  cursor: 'pointer'
                }}
              >
                <CardMedia component="img" image={favorite.preview} alt={favorite.nameProduct} sx={{ height: 140, objectFit: 'cover' }} />

                {/* Product Info */}
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}
                  >
                    {favorite.nameProduct}
                  </Typography>
                  {/* <Typography variant="body2" color="textSecondary">
                {product.price}
              </Typography> */}
                </CardContent>
              </Box>
              <CardActions sx={{ justifyContent: 'center', marginTop: -5 }}>
                {/* <CartButton item={favorite} /> */}
                <Tooltip title="Eliminar de favoritos">
                  <IconButton color="secondary" aria-label="Eliminar de favoritos" onClick={() => handleDelete(favorite.id)}>
                    <IconTrash color={genConst.CONST_APPBAR} />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

export default Favorites;
