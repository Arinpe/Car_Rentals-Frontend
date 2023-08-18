/* eslint-disable func-names */
/* eslint-disable react/jsx-props-no-spreading */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import FormContainer from './FormContainer';
import Form from '../components/Form';
import { registerSuccess } from '../reducers/userSlice';
import { signup } from '../services/request';
import { clearHeaders } from '../services/common';
import Header from '../components/Header';

const schema = yup.object().shape({
  username: yup.string().required('Username is required').min(3, 'Username must have at least 3 characters').max(50, 'Username must not exceed 50 characters'),

  password: yup.string().required('Password is required').min(6, 'Password must have at least 6 characters').matches(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{6,}$/,
    'Password must have at least one uppercase, lowercase, and digit',
  ),

  confirmPassword: yup.string().required('Confirm password is required').test('passwords-match', 'Passwords do not match', function (value) { return this.parent.password === value; }),
});

const Register = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { handleSubmit, register, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  // const dataUrlToFile = async (dataUrl, fileName) => {
  //   const res = await fetch(dataUrl);
  //   const blob = await res.blob();
  //   return new File([blob], fileName, { type: 'image/png' });
  // };

  const handleFormSubmit = async (data) => {
    const { password, username } = data;

    const userData = new FormData();
    userData.append('password', password);
    userData.append('username', username);

    try {
      const res = await signup(userData);
      dispatch(registerSuccess(res));
      history.push('/dashboard');
      toast.success('Account created successfully');
    } catch (error) {
      clearHeaders();
      if (error.response.status === 422) {
        error.response.data.errors.full_messages.forEach((msg) => toast.error(msg));
      } else {
        toast.error('Server error. Please try again later');
      }
    }
  };

  return (
    <div className="max-width">
      <Header hide />
      <FormContainer title="Register">
        <Form handleSubmit={handleSubmit(handleFormSubmit)}>
          <div className="form-group">
            <span>Username</span>
            <input {...register('username')} type="text" className="form-control" id="username" name="username" />
            <small className="text-danger">{errors?.username?.message}</small>
          </div>
          <div className="form-group">
            <span>Password</span>
            <input {...register('password')} type="password" className="form-control" id="password" name="password" />
            <small className="text-danger">{errors?.password?.message}</small>
          </div>
          <div className="form-group">
            <span>Confirm Pasword</span>
            <input {...register('confirmPassword')} type="password" className="form-control" id="confirmPassword" name="confirmPassword" />
            <small className="text-danger">{errors?.confirmPassword?.message}</small>
          </div>
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Register;
