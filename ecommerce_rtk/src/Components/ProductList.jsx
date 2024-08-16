import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addItemToCart,disableProduct } from './CartSlice';
import './ProductList.css'

const ProductList = () => {
  const dispatch = useDispatch()
  // const [disabledProducts,setDisabledProducts] = useState([])
  const disabledProducts = useSelector(state => state.cart.disabledProducts)
  const products = [
    { id: 1, name: 'Product A', price: 60 },
    { id: 2, name: 'Product B', price: 75 },
    { id: 3, name: 'Product C', price: 30 },
  ];
  const handleAddToCart = (product) => {
    dispatch(addItemToCart(product))
    // setDisabledProducts([...disabledProducts,product.id])
    dispatch(disableProduct(product.id))
  }
  return (
    <div className="product-list">
      <h2 className="product-list-title">Products</h2>
      <ul className="product-list-items">
        {products.map(p => (
          <li key={p.id} className='product-list-item'>
            <span>
              {p.name} - ${p.price}
            </span>
            <button 
              className={`add-to-cart-btn ${disabledProducts.includes(p.id) ? 'disabled' : ''}`}
              onClick={() => handleAddToCart(p)}
              disabled={disabledProducts.includes(p.id)} >
              Add to Cart
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
