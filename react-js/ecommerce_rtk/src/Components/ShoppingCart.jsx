import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart, removeItemFromCart, increaseItemQuantity, decreaseItemQuantity,enableProduct } from './CartSlice';
import './ShoppingCart.css';

const ShoppingCart = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector(state => state.cart.cartItems)
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

  const handleRemoveItem = itemId => {
    dispatch(removeItemFromCart(itemId))
    dispatch(enableProduct(itemId))
  }
  const handleIncreaseQuantity = itemId => {
    dispatch(increaseItemQuantity(itemId))
  }
  const handleDecreaseQuantity = (itemId, qty) => {
    if (qty < 2) {
      handleRemoveItem(itemId)
    } else {
      dispatch(decreaseItemQuantity(itemId))
    }
  }
  const handleClearCart = () => {
    dispatch(clearCart())
  }
  return (
    <>
      <div className="shopping-cart">
        <h2 className="shopping-cart-title">Shopping Cart</h2>
        <ul className="cart-items">
          {cartItems.map(item => (
            <li key={item.id} className='cart-item'>
              <span>
                {item.name} - ${item.price}
              </span>
              <div className='quantity-controls'>
                <button className='quantity-control-btn' onClick={() => handleDecreaseQuantity(item.id,item.quantity)}>-</button>
                <span> {item.quantity} </span>
                <button className='quantity-control-btn' onClick={() => handleIncreaseQuantity(item.id)}>+</button>
              </div>
              <button className='remove-item-btn' onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
        <div>{totalAmount ? `The total amount is $${totalAmount}` : '' }</div>
        <button className="clear-cart-btn" onClick={handleClearCart}>Clear Cart</button>
      </div>

    </>
  );
};

export default ShoppingCart;
