/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router';
import FormContainer from './FormContainer';
import Form from '../components/Form';
import { loginSuccess } from '../reducers/userSlice';
import { signIn } from '../services/request';
import Header from '../components/Header';

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleOnsubmit = async (userObj) => {
    const { email, password } = userObj;

    const userData = new FormData();

    userData.append('email', email);
    userData.append('password', password);
    try {
      const res = await signIn(userData);
      dispatch(loginSuccess(res));
      history.push('/dashboard');
    } catch (error) {
      error.response.data.errors.forEach((msg) => toast.error(msg));
    }
  };
  return (
    <div className="max-width">
      <Header hide />
      <FormContainer title="Login">
        <Form handleSubmit={handleSubmit(handleOnsubmit)}>
          <div className="form-group">
            <span>Email address</span>
            <input {...register('email')} type="email" className="form-control" id="email" name="email" />
            <small className="text-danger">{errors?.email?.message}</small>
          </div>
          <div className="form-group">
            <span>Password</span>
            <input {...register('password')} type="password" className="form-control" id="password" name="password" />
            <small className="text-danger">{errors?.password?.message}</small>
          </div>
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Login;
