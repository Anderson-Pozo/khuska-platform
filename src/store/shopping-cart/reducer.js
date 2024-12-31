import { ADD_TO_CART, REMOVE_FROM_CART, UPDATE_QUANTITY, CLEAR_CART } from './actions';

const loadCartFromLocalStorage = () => {
  try {
    const serializedCart = localStorage.getItem('kushka_cart');
    return serializedCart ? JSON.parse(serializedCart) : [];
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
    return [];
  }
};

const saveCartToLocalStorage = (cart) => {
  try {
    const serializedCart = JSON.stringify(cart);
    localStorage.setItem('kushka_cart', serializedCart);
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const initialState = {
  items: loadCartFromLocalStorage()
};

export const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART: {
      const existingItem = state.items.find((item) => item.id === action.payload.id);

      if (existingItem && existingItem.cartQuantity >= existingItem.quantity) {
        return state;
      }

      let updatedItems;
      if (existingItem) {
        // Si el producto ya existe, incrementa la cantidad
        const productQuantity = existingItem.quantity;
        updatedItems = state.items.map((item) => (item.id === action.payload.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item));
      } else {
        // Si es un producto nuevo, lo añade
        updatedItems = [...state.items, { ...action.payload, cartQuantity: 1 }];
      }

      saveCartToLocalStorage(updatedItems);
      return { ...state, items: updatedItems };
    }

    case REMOVE_FROM_CART: {
      const updatedItems = state.items.filter((item) => item.id !== action.payload);
      saveCartToLocalStorage(updatedItems);
      return { ...state, items: updatedItems };
    }

    case UPDATE_QUANTITY: {
      const { productId, quantity } = action.payload;

      let updatedItems;
      if (quantity > 0) {
        updatedItems = state.items.map((item) => (item.id === productId ? { ...item, quantity } : item));
      } else {
        updatedItems = state.items.filter((item) => item.id !== productId);
      }

      saveCartToLocalStorage(updatedItems);
      return { ...state, items: updatedItems };
    }

    case CLEAR_CART: {
      localStorage.removeItem('kushka_cart');
      return { ...state, items: [] };
    }

    default:
      return state;
  }
};
