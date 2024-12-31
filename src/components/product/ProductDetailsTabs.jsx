import React from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs, Typography } from '@mui/material';
import { CustomTabPanel } from 'components/shared/CustomTabPanel';
import { ProductInfo } from './ProductInfo';
import { CommentForm } from './reviews/CommentForm';
import { CommentList } from './reviews/CommentList';

export const ProductDetailsTabs = ({ product, authUser, totalComments }) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Detalles" />
        <Tab label={`Comentarios (${totalComments})`} />
      </Tabs>
      <CustomTabPanel value={value} index={0}>
        <ProductInfo product={product} />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <Typography variant="h2" gutterBottom>
          Comentarios
        </Typography>
        <CommentForm productId={product.productId} authUser={authUser} />
        <CommentList productId={product.productId} />
      </CustomTabPanel>
    </>
  );
};

ProductDetailsTabs.propTypes = {
  product: PropTypes.object,
  authUser: PropTypes.object,
  totalComments: PropTypes.number
};
