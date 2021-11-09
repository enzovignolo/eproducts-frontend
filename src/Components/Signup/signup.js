import { React } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';
import { useContext } from 'react/cjs/react.development';
import AppContext from '../../AppContext';

const SignUpForm = () => {
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      console.log(e.target);
      const response = await axios.post(
        'https://localhost:5000/api/v1/signup',
        {
          username: e.target.username.value,
          password: e.target.password.value,
          name: e.target.name.value,
          lastName: e.target.lastName.value,
          email: e.target.username.value,
          alias: e.target.alias.value,
          age: e.target.age.value,

          passwordConfirmation: e.target.passwordConfirmation.value,
        }
      );
      const user = response.data.user;

      userSettings.setUserId(user._id);
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };
  const history = useHistory();
  const userSettings = useContext(AppContext);
  return (
    <>
      <h1>Rellene el formulario con sus datos</h1>
      <div class=" m-auto d-flex justify-content-center">
        <form onSubmit={(e) => handleSubmit(e)}>
          <div class="form-group  m-auto">
            <label for="username" class="form-label mt-4">
              Email address
            </label>
            <input
              type="email"
              class="form-control"
              name="username"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group  m-auto">
            <label class="form-label mt-4">Name</label>
            <input
              type="text"
              class="form-control"
              name="name"
              placeholder="First Name"
            />
          </div>
          <div class="form-group  m-auto">
            <label class="form-label mt-4">Last Name</label>
            <input
              type="text"
              class="form-control"
              name="lastName"
              placeholder="Last Name"
            />
          </div>
          <div class="form-group  m-auto">
            <label class="form-label mt-4">Password</label>
            <input
              type="password"
              class="form-control"
              name="password"
              placeholder="Password"
            />
          </div>
          <div class="form-group  m-auto">
            <label class="form-label mt-4">Repeat password</label>
            <input
              type="password"
              class="form-control"
              name="passwordConfirmation"
              placeholder="Password confirmation"
            />
          </div>
          <div class="form-group  m-auto">
            <label class="form-label mt-4">Age</label>
            <input
              type="number"
              step="1"
              min="0"
              class="form-control"
              name="age"
              placeholder="Age"
            />
          </div>
          <div class="form-group  m-auto">
            <label class="form-label mt-4">Alias</label>
            <input
              type="text"
              class="form-control"
              name="alias"
              placeholder="alias"
            />
          </div>
          <div class="form-group mt-3 mb-3 m-auto d-flex justify-content-center">
            <button type="submit" class="btn btn-outline-primary ">
              Sign up
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default SignUpForm;
