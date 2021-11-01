import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom';
import { loadHouse, loadHouseSuccess } from '../actions/houseAction';
import { createFavourite } from '../api/userApi';

const HousePage = ({
  House, loadHouse, loadHouseSuccess, auth, User,
}) => {
  const { id } = useParams();
  const loadHousePageDetails = () => {
    const token = auth.getAccessToken();
    loadHouse(id, token);
  };
  React.useEffect(() => {
    loadHouseSuccess({});
    loadHousePageDetails();
  }, [id]);
  if (!House) return <h2 className="section-title">No house to display</h2>;
  const { name, description } = House;
  return (
    <>
      <section className="heiht">
        <div className="main">
          <h1 className="my-3">{name}</h1>
          <div />
        </div>
        <div className="card text-center">
          <div className="card-header" />
          <div className="container">
            <div className="row div-cards">
              <img className="card-img-top" src={House.img_url} alt="house" />
              <div className="card-body">
                <p className="card-text p-4 h4">{description}</p>
                <button
                  type="button"
                  className="btn li-color btn-details btn-success m-3 p-2"
                  onClick={() => createFavourite(User.id, House.id, auth.getAccessToken())}
                >
                  Add to Favourites
                </button>
                <Link to="/" className="btn li-color btn-details btn-success m-3 p-2">
                  Back home
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

HousePage.defaultProps = {
  House: null,
  auth: null,
  User: null,
};
HousePage.propTypes = {
  House: PropTypes.object || null,
  auth: PropTypes.object || null,
  User: PropTypes.object || null,
  loadHouse: PropTypes.func.isRequired,
  loadHouseSuccess: PropTypes.func.isRequired,
};
const mapStateToProps = ({ House, User }) => ({ House, User });
const mapDispatchToProps = { loadHouse, loadHouseSuccess };
export default connect(mapStateToProps, mapDispatchToProps)(HousePage);
