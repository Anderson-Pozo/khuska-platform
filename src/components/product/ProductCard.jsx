import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Card, CardMedia, CardContent, Typography, Rating, Box, Chip } from '@mui/material';
import { calculateProductRating } from 'config/firebaseEvents';
import { genConst } from 'store/constant';
import { CartButton } from 'components/shared/CartButton';

export const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  const [productRating, setProductRating] = useState({
    averageRating: 0,
    totalReviews: 0
  });

  useEffect(() => {
    const fetchProductRating = async () => {
      const ratingData = await calculateProductRating(item.id);
      setProductRating(ratingData);
    };

    fetchProductRating();
  }, [item.id]);

  const getBannerInfo = () => {
    const daysAgo = genConst.NEW_PRODUCT_DAYS;
    const createdAt = new Date(item.createAt);
    const now = new Date();
    const daysDiff = (now - createdAt) / (1000 * 60 * 60 * 24);

    if (daysDiff <= daysAgo) {
      return {
        label: 'Nuevo',
        color: 'success'
      };
    }

    // if (item.discount > 0) {
    //   return {
    //     label: `${item.discount}% OFF`,
    //     color: 'primary'
    //   };
    // }

    return null;
  };

  const bannerInfo = getBannerInfo();

  return (
    <div
      aria-hidden="true"
      onClick={() =>
        navigate({
          pathname: '/market/item/',
          search: `?id=${item.id}`
        })
      }
    >
      <Card
        sx={{
          height: 320,
          borderRadius: 3,
          backgroundColor: '#FFF',
          cursor: 'pointer',
          position: 'relative',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.03)'
          }
        }}
      >
        {/* Banner */}
        {bannerInfo && (
          <Chip
            label={bannerInfo.label}
            color={bannerInfo.color}
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              zIndex: 10,
              color: '#fff'
            }}
          />
        )}

        <CardMedia
          sx={{
            borderRadius: 3,
            padding: 0.5,
            resize: 'cover',
            height: 200
          }}
          component="img"
          image={item.picture1}
          alt="Portada img"
        />

        <CardContent
          sx={{
            backgroundColor: '#fff',
            paddingLeft: 1,
            paddingRight: 1
          }}
        >
          <Typography variant="h3" color={genConst.CONST_APPBAR} align="center">
            ${Number.parseFloat(item.price).toFixed(2)}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 1
            }}
          >
            <Rating name="product-rating" value={productRating.averageRating} precision={0.1} readOnly size="small" />
            <Typography variant="caption" color="text.secondary">
              ({productRating.totalReviews})
            </Typography>
          </Box>

          <Typography
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              color: '#000',
              fontSize: 13,
              textOverflow: 'ellipsis',
              maxWidth: '100%',
              textAlign: 'center',
              marginTop: 1
            }}
          >
            {item.name}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center'
              // marginTop: 1
            }}
          >
            {/* <CartButton item={item} /> */}
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};
