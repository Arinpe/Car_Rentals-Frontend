/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { connect } from 'react-redux';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { loadCar, loadCarSuccess } from '../redux/actions/carAction';
import { createAppointment } from '../api/userApi';

const SingleCar = ({
  Car, loadCar, loadCarSuccess, auth, User,
}) => {
  const { register, handleSubmit } = useForm();

  const onSubmit = data => (
    createAppointment(User.id, Car.id, data.date, data.city, auth.getAccessToken())
  );

  const { id } = useParams();
  const loadSingleCarDetails = () => {
    const token = auth.getAccessToken();
    loadCar(id, token);
  };

  React.useEffect(() => {
    loadCarSuccess({});
    loadSingleCarDetails();
  }, [id]);

  if (!Car) return <h2 className="section-title">no car to display</h2>;

  const {
    name,
    description,
  } = Car;
  return (
    <section className="car-section">
      <button
        type="button"
        data-toggle="modal"
        data-target="#testdrive"
        className="btn mt-4 section-title banner-btn"
      >
        book test drive
      </button>
      <div className="modal fade" id="testdrive" tabIndex="-1" aria-labelledby="appointment" aria-hidden="true">
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Booking Details</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control"
                    id="date"
                    name="date"
                    ref={register({ required: true })}
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your City"
                    list="cityList"
                    ref={register({ required: true })}
                    name="city"
                  />
                  <datalist id="cityList">
                    <option value="Hong Kong" />
                    <option value="Bangkok" />
                    <option value="London" />
                    <option value="Singapore" />
                    <option value="Macau" />
                    <option value="Paris" />
                    <option value="Dubai" />
                    <option value="New York City" />
                    <option value="Barcelona" />
                    <option value="Lagos" />
                  </datalist>
                </div>
                <input type="submit" value="Save Appointment" className="btn mt-4 section-title banner-btn" />
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>

      <div className="detail">
        <img src={Car.img_url} alt={name} />
        <div className="detail-info">
          <p>
            <span className="detail-data">name :</span>
            {' '}
            {name}
          </p>
          <p>
            <span className="detail-data">description  :</span>
            {' '}
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};

SingleCar.defaultProps = {
  auth: null,
  Car: null,
  User: null,
};

SingleCar.propTypes = {
  auth: PropTypes.object || null,
  Car: PropTypes.object || null,
  User: PropTypes.object || null,
  loadCar: PropTypes.func.isRequired,
  loadCarSuccess: PropTypes.func.isRequired,
};

const mapStateToProps = ({ Car, User }) => ({ Car, User });

const mapDispatchToProps = { loadCar, loadCarSuccess };

export default connect(mapStateToProps, mapDispatchToProps)(SingleCar);
