import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Avatar,
  Badge,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Popover,
  Tooltip,
  Typography
} from '@mui/material';
import { IconGardenCart, IconTrash } from '@tabler/icons';
import { genConst } from 'store/constant';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromCart } from 'store/shopping-cart/actions';

const CartSection = () => {
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleOpenCart = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseCart = () => {
    setAnchorEl(null);
  };

  const handleDeleteItem = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const calculateTotal = () => items.reduce((acc, item) => acc + Number(item.price) * item.cartQuantity, 0);

  const open = Boolean(anchorEl);

  return (
    <>
      <Tooltip title="Carrito de Compras">
        <IconButton onClick={handleOpenCart} style={{ marginRight: 10 }}>
          <Badge
            badgeContent={items.length}
            color="primary"
            overlap="circular"
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right'
            }}
          >
            <IconGardenCart size={30} color={genConst.CONST_APPBAR} />
          </Badge>
        </IconButton>
      </Tooltip>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseCart}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
      >
        <Paper
          sx={{
            width: 350,
            maxHeight: 400,
            overflow: 'auto',
            p: 2
          }}
        >
          <Typography variant="h6" sx={{ mb: 2 }}>
            Carrito de Compras
          </Typography>

          {items.length === 0 ? (
            <Typography align="center" variant="subtitle1">
              El carrito está vacío.
            </Typography>
          ) : (
            <>
              <List>
                {items.map((item) => (
                  <ListItem key={item.id} sx={{ px: 0 }}>
                    <ListItemAvatar>
                      <Avatar
                        src={item.picture1}
                        alt={item.name}
                        variant="square"
                        sx={{
                          width: 60,
                          height: 60,
                          mr: 2
                        }}
                      />
                    </ListItemAvatar>
                    <ListItemText primary={item.name} secondary={`$${Number(item.price).toFixed(2)} | Cantidad: ${item.cartQuantity}`} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" color="error" onClick={() => handleDeleteItem(item.id)}>
                        <IconTrash size={20} />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mt: 2
                }}
              >
                <Typography variant="h4">Total: ${calculateTotal().toFixed(2)}</Typography>
              </Box>

              {/* <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 2 }}
                onClick={() => {
                  navigate('/market/cart');
                  handleCloseCart();
                }}
              >
                Ver Carrito
              </Button> */}
            </>
          )}
        </Paper>
      </Popover>
    </>
  );
};

export default CartSection;
