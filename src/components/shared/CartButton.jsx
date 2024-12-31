import IconButton from '@mui/material/IconButton';
import { ShoppingCart } from '@mui/icons-material';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addToCart } from 'store/shopping-cart/actions';
import { Tooltip } from '@mui/material';

export const CartButton = ({ item, iconStyle = {} }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    if (Number(product.quantity) === 0) {
      toast.warning('Producto sin unidades disponibles');
      return;
    }
    dispatch(addToCart(product));
  };

  return (
    <Tooltip title="Agregar al carrito" aria-hidden="true">
      <IconButton
        color="primary"
        onClick={(e) => {
          e.stopPropagation();
          handleAddToCart(item);
        }}
      >
        <ShoppingCart style={iconStyle} />
      </IconButton>
    </Tooltip>
  );
};
