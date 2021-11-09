import { React, useState, useEffect, useContext } from 'react';
import AppContext from '../../AppContext';
import axios from 'axios';
import envVars from '../../envVars';
import { useHistory } from 'react-router-dom';
import Qs from 'qs';

// Format nested params correctly for axios requests.
axios.interceptors.request.use((config) => {
  config.paramsSerializer = (params) => {
    // Qs is not included in the Axios package
    return Qs.stringify(params, {
      arrayFormat: 'brackets',
      encode: false,
    });
  };

  return config;
});

const Products = (query) => {
  //Define context
  console.log(query.query.target ? query.query.target.name.value : false);
  let filter = {};
  if (query.query.target) {
    const queryFields = query.query.target;
    filter = {
      name: queryFields.name.value || /m*/,
      category: queryFields.category.value || /m*/,
      price: {
        $lte: queryFields.maxPrice.value || 9999999,
        $gte: queryFields.minPrice.value || 0,
      },
      stock: {
        $lte: queryFields.maxStock.value || 9999999,
        $gte: queryFields.minStock.value || 0,
      },
      sort: queryFields.orderBy ? JSON.parse(queryFields.orderBy.value) : '',
    };
    console.log(filter.sort);
  }
  const userSettings = useContext(AppContext);
  //console.log(userSettings);
  //Declaring hooks and states
  const history = useHistory();
  const [products, setProducts] = useState({ products: [] });
  const [isAdding, setAdding] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [error, setError] = useState({ state: false });
  //Hook to fetch the data from the backend
  useEffect(() => {
    const fetchData = async () => {
      console.log('hola');
      const result = await axios({
        url: `${envVars.apiHost}/productos`,
        headers: { user: userSettings.userId },
        params: {
          ...filter,
        },
      });
      setProducts(result.data.data);
    };
    fetchData();
  }, [isAdding, isDeleting, error, query]);
  //Adding a product to the cart with Hook
  const addToCart = async (e, productId) => {
    //Not to send if is already sending
    if (isAdding) return;
    //Change state, this will also re-render the component
    setAdding(true);
    //Make the request to the backend
    try {
      console.log('user', userSettings.userId);
      const result = await axios({
        method: 'PUT',
        url: `${envVars.apiHost}/usuarios/${userSettings.userId}/carrito/${productId}`,

        headers: { user: userSettings.userId },
      });
    } catch (err) {
      setError({
        state: true,
        errMsg: 'The cart for this user does not exist',
      });
    }
    //Lazy effect so the "added" sign can be read.
    setTimeout(() => {
      setError({ state: false });
      setAdding(false);
    }, 2000);
  };
  //Delete product from the list
  const deleteProduct = async (e, productId) => {
    if (isDeleting) return;
    setDeleting(true);
    const deletedProduct = await axios({
      method: 'DELETE',
      url: `${envVars.apiHost}/productos/${productId}`,
      headers: { user: userSettings.userId },
    });
    setDeleting(false);
  };
  const editProduct = (e, productId) => {
    e.preventDefault();
    history.push(`/edit-product/${productId}`);
  };
  //If we are not adding a product to the cart, simply show the products
  if (!isAdding) {
    if (products.length > 0) {
      return products.map((product) => {
        return (
          <div
            className="card text-white bg-secondary mb-3"
            style={{
              maxWidth: '20rem',
              display: 'inline-block',
              margin: '2%',
            }}
            key={product._id}
          >
            <div className="card-header">{product.name}</div>
            <div className="card-body">
              <h4 className="card-title">
                <img
                  style={{
                    height: '100px',
                    width: '100px',
                  }}
                  src={product.thumbnail}
                  alt={product.name}
                ></img>
              </h4>
              <p className="card-text">Price :${product.price}</p>
            </div>
            {userSettings.userId && userSettings.userId !== '' ? (
              <button
                className="btn btn-lg btn-primary d-block w-100"
                type="button"
                onClick={(e) => addToCart(e, product._id)}
              >
                Add to Cart
                <img
                  src="cart.png"
                  alt="cart"
                  style={{ height: '35px', width: '35px' }}
                ></img>
              </button>
            ) : (
              ''
            )}
            {userSettings.userId === 'admin' ? (
              <div>
                <a href={'/edit-product/' + product._id}>
                  <button
                    type="button"
                    onClick={(e) => editProduct(e, product._id)}
                    className="btn btn-info"
                  >
                    Edit product
                  </button>
                </a>
                <button
                  type="button"
                  onClick={(e) => deleteProduct(e, product._id)}
                  className="btn btn-danger"
                >
                  Delete from list
                </button>
              </div>
            ) : (
              <br></br>
            )}
          </div>
        );
      });
    } else {
      return <h1></h1>;
    }
  } else {
    if (error.state)
      return (
        <div class="alert alert-dismissible alert-danger">
          <strong>{error.errMsg}</strong>
        </div>
      );
    //This will return a success sign of adding the product
    return (
      <div
        className="alert alert-dismissible alert-success"
        style={{ fontSize: '36px' }}
      >
        <strong>Added to the cart!</strong>.
      </div>
    );
  }
};

export default Products;
