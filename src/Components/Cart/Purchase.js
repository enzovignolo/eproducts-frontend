import axios from 'axios';
import { React } from 'react';
import { useHistory } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import AppContext from '../../AppContext';
import envVars from '../../envVars';

const PurchaseButton = () => {
  const history = useHistory();
  const userSettings = useContext(AppContext);
  const handleClick = async (e) => {
    try {
      history.push('/');
      const productsToBuy = userSettings.cart;
      console.log(`${envVars.apiHost}/usuarios/${userSettings.userId}/comprar`);
      await axios.post(
        `${envVars.apiHost}/usuarios/${userSettings.userId}/comprar`,
        {
          data: productsToBuy,
        }
      );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      {userSettings.cart ? (
        <button
          onClick={(e) => {
            handleClick(e);
          }}
          className="btn btn-lg btn-primary"
        >
          Realizar pedido!
        </button>
      ) : (
        ''
      )}
    </>
  );
};

export default PurchaseButton;
