/* eslint-disable func-names */
/* eslint-disable react/jsx-props-no-spreading */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';

import DefaultUserImage from '../assets/user.png';
import FormContainer from './FormContainer';
import Form from '../components/Form';
import { registerSuccess } from '../reducers/userSlice';
import { signup } from '../services/request';
import { clearHeaders } from '../services/common';
import Header from '../components/Header';

const SUPPORTED_FORMATS = ['image/jpg',
  'image/jpeg',
  'image/gif',
  'image/png'];

const FILE_SIZE = 200 * 1024;

const schema = yup.object().shape({
  firstName: yup.string().required('First Name is required').min(3, 'First Name must have at least 3 characters').max(50, 'First name must not exceed 50 characters')
    .matches(/^([^0-9]*)$/, 'First name must contain only alphabets'),

  lastName: yup.string().required('Last Name is required').min(3, 'Last Name must have at least 3 characters').max(50, 'Last Name must not exceed 50 characters')
    .matches(/^([^0-9]*)$/, 'Last Name must contain only alphabets'),

  email: yup.string().email('Invalid email').required('Email is required'),

  username: yup.string().required('Username is required').min(3, 'Username must have at least 3 characters').max(50, 'Username must not exceed 50 characters'),

  image: yup.mixed()
    .when('isTrainer', {
      is: (isTrainer) => !!isTrainer,
      then: yup.mixed().required('Avatar is required'),
      otherwise: yup.mixed()
        .test(
          'fileSize',
          'File too large',
          (value) => !value[0] || (value[0] && value[0]?.size <= FILE_SIZE),
        )
        .test(
          'fileFormat',
          'Unsupported Format',
          (value) => !value[0] || (value && SUPPORTED_FORMATS.includes(value[0]?.type)),
        ),
    }),

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

  const dataUrlToFile = async (dataUrl, fileName) => {
    const res = await fetch(dataUrl);
    const blob = await res.blob();
    return new File([blob], fileName, { type: 'image/png' });
  };

  const handleFormSubmit = async (data) => {
    const {
      firstName, lastName, email, password, username, image,
    } = data;

    const userData = new FormData();

    userData.append('first_name', firstName);
    userData.append('last_name', lastName);
    userData.append('email', email);
    userData.append('password', password);
    userData.append('username', username);

    const imgFile = await dataUrlToFile(DefaultUserImage, 'defaultImage');
    if (!image[0]) {
      userData.append('avatar', imgFile);
    } else {
      userData.append('avatar', image[0]);
    }
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
            <span>First name</span>
            <input
              {...register('firstName')}
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
            />
            <small className="text-danger">{errors?.firstName?.message}</small>
          </div>
          <div className="form-group">
            <span>Last name</span>
            <input {...register('lastName')} type="text" className="form-control" id="lastName" name="lastName" />
            <small className="text-danger">{errors?.lastName?.message}</small>
          </div>
          <div className="form-group">
            <span>Email address</span>
            <input {...register('email')} type="email" className="form-control" id="email" name="email" />
            <small className="text-danger">{errors?.email?.message}</small>
          </div>
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

          <div className="custom-file">
            <span>Select Avatar</span>
            <input {...register('image')} type="file" name="image" className="form-control-file" id="image" placeholder="Choose Avatar" />
            <small className="text-danger">{errors?.image?.message}</small>
          </div>
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default Register;
