import { React } from 'react';
import { useHistory } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import AppContext from '../../AppContext';

const Logout = () => {
  const history = useHistory();
  const userSettings = useContext(AppContext);
  userSettings.setUserId(false);
  history.push('/');
  return (
    <>
      <div></div>
    </>
  );
};

export default Logout;
