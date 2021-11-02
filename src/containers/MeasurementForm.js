/* eslint-disable react/jsx-props-no-spreading */
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useHistory, useParams } from 'react-router';
import FormContainer from './FormContainer';
import Form from '../components/Form';
import { addMeasurement } from '../services/request';

const schema = yup.object().shape({
  value: yup.string().required('Measurement is required'),
  date: yup.string().required('Date is required'),
});

const MeasurementForm = () => {
  const { id } = useParams();
  const history = useHistory();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    mode: 'onBlur',
  });

  const handleOnsubmit = async (measurementObj) => {
    const { value, date } = measurementObj;

    const measurementData = new FormData();

    measurementData.append('value', value);
    measurementData.append('date', date);
    await addMeasurement(measurementData, id);
    history.goBack();
  };
  return (
    <div className="measure__form">
      <FormContainer title="Current Measurement">
        <Form handleSubmit={handleSubmit(handleOnsubmit)}>
          <div className="form-group">
            <span>Value</span>
            <input {...register('value')} type="number" className="form-control" id="value" step="0.01" name="value" />
            <small className="text-danger">{errors?.value?.message}</small>
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

export default MeasurementForm;
