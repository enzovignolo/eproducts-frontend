import { React, useEffect, useState, useContext } from 'react';
import AppContext from '../../AppContext';

import axios from 'axios';
import envVars from '../../envVars';
import { useHistory } from 'react-router';

const Cart = () => {
  //Get context, so we can now which user is currenyly in use
  const userSettings = useContext(AppContext);

  const userId = userSettings.userId;

  const [cartProducts, updateCart] = useState();
  const [reload, setReload] = useState(false);
  const history = useHistory();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(
          `${envVars.apiHost}/usuarios/${userId}/carrito`
        );
        console.log('resultado', result);
        updateCart(result.data.data.products);
      } catch (err) {
        updateCart({
          error: 'Cart not found, please create a cart for that user id!',
          errCode: 404,
        });
      }
    };
    setReload(false);
    fetchData();
  }, [reload, userId]);
  const handleDeleteProduct = async (productId) => {
    const result = await axios({
      url: `${envVars.apiHost}/usuarios/${userId}/carrito/${productId}`,
      method: 'DELETE',
    });
    setReload(true);
  };

  if (cartProducts) {
    if (cartProducts.length > 0) {
      userSettings.setCart(cartProducts);
      return cartProducts.map((product) => {
        return (
          <div
            className="alert alert-dismissible alert-secondary d-flex"
            key={product._id}
          >
            <div className="col-3">
              <img
                style={{ height: '75px', width: '75px' }}
                src={product.thumbnail}
                alt={product.name}
              ></img>
            </div>
            <div
              className="cartDescription col-4 "
              style={{ textAlign: 'justify' }}
            >
              <strong>
                <h2>{product.name}</h2>
              </strong>
              <h4>Price : $ {product.price}</h4>
              <small>Amount : {product.amount}</small>
            </div>
            <div className="col4">
              <button
                type="button"
                onClick={() => handleDeleteProduct(product._id)}
                className="btn btn-danger"
              >
                Delete from cart
              </button>
            </div>
          </div>
        );
      });
    }
    if (cartProducts.error) {
      return (
        <div class="alert alert-dismissible alert-danger">
          <strong>ERROR {cartProducts.errCode}</strong> {cartProducts.error}
        </div>
      );
    } else {
      userSettings.setCart(false);
      return (
        <div className="alert alert-dismissible alert-warning">
          <h4 className="alert-heading">Hi!</h4>
          <p className="mb-0">
            Curretly, your cart is empty. You can add products{' '}
            <a
              href="#"
              onClick={(e) => {
                history.push('/');
              }}
              className="alert-link"
            >
              from here.
            </a>
          </p>
        </div>
      );
    }
  } else {
    return <h1>Todavia no agrego productos a su carrito!</h1>;
  }
};

export default Cart;
