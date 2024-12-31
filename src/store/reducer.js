import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import { productCommentReducer } from './product-comment/reducer';
import { cartReducer } from './shopping-cart/reducer';

// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
  customization: customizationReducer,
  productComments: productCommentReducer,
  cart: cartReducer
});

export default reducer;
