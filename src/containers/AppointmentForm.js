/* eslint-disable react/jsx-props-no-spreading */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import FormContainer from './FormContainer';
import Form from '../components/Form';
import { createAppointment } from '../services/request';

const schema = yup.object().shape({
  city: yup.string().required('City is required'),
  date: yup.string().required('Date is required'),
});

const AppointmentForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleOnsubmit = async (measurementObj) => {
    const { city, date } = measurementObj;

    const measurementData = new FormData();

    measurementData.append('city', city);
    measurementData.append('date', date);
    measurementData.append('car_id', id);
    await createAppointment(measurementData);
    history.push('/dashboard');
  };
  return (
    <div className="measure__form">
      <FormContainer title="New Appointment">
        <Form handleSubmit={handleSubmit(handleOnsubmit)}>
          <div className="form-group">
            <span>City</span>
            <input {...register('city')} type="text" className="form-control" id="city" step="0.01" name="city" />
            <small className="text-danger">{errors?.city?.message}</small>
          </div>
          <div className="form-group">
            <span>Date</span>
            <input {...register('date')} type="datetime-local" className="form-control" id="date" name="date" />
            <small className="text-danger">{errors?.date?.message}</small>
          </div>
          <button type="submit" className="btn btn-primary mt-4">Submit</button>
        </Form>
      </FormContainer>
    </div>
  );
};

export default AppointmentForm;
