/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import FormContainer from './FormContainer';
import Form from '../components/Form';
import { addMeasure } from '../services/request';
// import { login  } from '../reducers/userSlice';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  goal: yup.string().required('Goal is required'),
  unit: yup.string().required('Unit is required'),
});

const MeasureForm = () => {
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleOnsubmit = async (userObj) => {
    const { title, unit, goal } = userObj;

    const measureData = new FormData();

    measureData.append('title', title);
    measureData.append('goal', goal);
    measureData.append('unit', unit);
    await addMeasure(measureData);
    history.goBack();
  };
  return (
    <div className="measure__form">
      <FormContainer title="What do you want to measure?">
        <Form handleSubmit={handleSubmit(handleOnsubmit)}>
          <div className="form-group">
            <span>Title</span>
            <input {...register('title')} type="title" className="form-control" id="title" name="title" />
            <small className="text-danger">{errors?.title?.message}</small>
          </div>
          <div className="form-group">
            <span>Goal</span>
            <input {...register('goal')} type="number" className="form-control" id="goal" name="goal" step="0.01" />
            <small className="text-danger">{errors?.goal?.message}</small>
          </div>
          <div className="form-group">
            <span>Unit</span>
            <input {...register('unit')} type="text" className="form-control" id="unit" name="unit" />
            <small className="text-danger">{errors?.unit?.message}</small>
          </div>
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default MeasureForm;
