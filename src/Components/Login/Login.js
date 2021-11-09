import axios from 'axios';
import { useHistory } from 'react-router';
import envVars from '../../envVars';

const { React, useContext } = require('react');
const { default: AppContext } = require('../../AppContext');

const LoginForm = () => {
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(`${envVars.apiHost}/login`, {
        username: e.target.email.value,
        password: e.target.password.value,
      });
      const user = response.data;
      userSettings.setUserId(user.id);
      history.push('/');
    } catch (err) {
      console.log('errrr');
      console.log(err);
    }
  };
  const history = useHistory();
  const userSettings = useContext(AppContext);
  console.log(userSettings);
  return (
    <>
      <h1 className="m-4">Por favor introduzca sus credenciales</h1>
      <form
        className="m-4 d-flex justify-content-center"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className>
          <label>Usuario </label>
          <input type="text" name="email" placeholder="user@email.com" />
        </div>
        <div>
          <label>Contraseña</label>
          <input type="password" name="password" placeholder="contraseña" />
        </div>
        <button type="submit">Ingresar!</button>
      </form>
    </>
  );
};

export default LoginForm;
