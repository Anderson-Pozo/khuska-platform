import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, ButtonGroup, Divider, Grid, IconButton, Typography } from '@mui/material';
import { IconBrandWhatsapp } from '@tabler/icons';
import { genConst } from 'store/constant';

export const ProductInfo = ({ product }) => {
  const whatsAppMessage = `Hola, aún tiene disponible el producto ${product.name}?`;
  const phone = product.businessPhone || product.user.userPhone;

  return (
    <Grid item lg={12} xs={12} sx={{ mt: 0 }}>
      <div style={{ padding: 10 }}>
        <Typography variant="h2" textAlign="left" sx={{ color: '#3a3b3c', pt: 2, fontSize: 16 }}>
          Detalles
        </Typography>
        <Typography variant="h5" textAlign="justify" sx={{ color: '#3a3b3c', pt: 2, pb: 2, fontSize: 14 }}>
          {product.description}
        </Typography>
        <Typography variant="h5" textAlign="left" sx={{ color: '#3a3b3c', pt: 2, pb: 2, fontSize: 14 }}>
          <strong>Categoría: </strong>
          {product.categoryDesc || product.category}
        </Typography>
        <Divider sx={{ borderColor: '#ededed' }} />
        <Typography variant="h2" textAlign="left" sx={{ color: '#3a3b3c', pt: 2, fontSize: 16 }}>
          Información del vendedor
        </Typography>
        {product.businessName ? (
          <ButtonGroup sx={{ mt: 1 }}>
            <Avatar src={product.businessLogo} color="inherit" style={{ width: 60, height: 60 }} />
            <span style={{ margin: 20, color: '#3a3b3c', fontSize: 14 }}>{product.businessName}</span>
          </ButtonGroup>
        ) : (
          <ButtonGroup sx={{ mt: 1 }}>
            <Avatar src={product.user.userLogo} color="inherit" style={{ width: 60, height: 60 }} />
            <span style={{ margin: 20, color: '#3a3b3c', fontSize: 14 }}>{product.user.userName}</span>
          </ButtonGroup>
        )}
        <br />
        {product.businessPhone ? (
          <ButtonGroup sx={{ mt: 1 }}>
            <IconButton
              onClick={() => {
                window.open(`https://wa.me/593${phone}?text=${whatsAppMessage}`, '_blank');
              }}
            >
              <IconBrandWhatsapp size={50} color={genConst.CONST_SUCCESS_COLOR} />
            </IconButton>
            <span style={{ margin: 15, color: '#3a3b3c', fontSize: 14 }}>{product.businessPhone}</span>
          </ButtonGroup>
        ) : (
          <ButtonGroup sx={{ mt: 1 }}>
            <IconButton
              onClick={() => {
                window.open(`https://wa.me/593${phone}?text=${whatsAppMessage}`, '_blank');
              }}
            >
              <IconBrandWhatsapp size={60} color={genConst.CONST_SUCCESS_COLOR} />
            </IconButton>
            <span style={{ marginTop: 26, marginLeft: 10, color: '#3a3b3c', fontSize: 14 }}>{product.user.userPhone}</span>
          </ButtonGroup>
        )}
        <Typography variant="h5" textAlign="left" sx={{ color: '#3a3b3c', pt: 2, pb: 2, fontSize: 14 }}>
          <strong>Se unió a Khuska Market en </strong>
          {product.businessCreateAt || product.user.userCreateAt}
        </Typography>
        <Divider sx={{ borderColor: '#ededed' }} />
      </div>
    </Grid>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object
};
