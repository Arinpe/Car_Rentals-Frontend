import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { loadHouses } from '../actions/housesAction';
import setLoadingStatus from '../actions/loadingAction';
import LoadingBar from '../components/loading';

const HouseList = ({
  auth, Houses, loadHouses, setLoadingStatus, Loading,
}) => {
  const loadApplicationHouses = () => {
    const token = auth.getAccessToken();
    loadHouses(token);
  };
  React.useEffect(() => {
    if (Houses && Houses.length < 1) {
      setLoadingStatus(true);
      loadApplicationHouses();
      setLoadingStatus(false);
    }
  }, []);
  if (Loading) return <LoadingBar />;
  if (!Houses) {
    return (
      <h2 className="section-title">No houses were found, kindly try again!</h2>
    );
  }
  return (
    <>
      <section className="section bg-1">
        <div className="main">
          <h1 className="my-3">Our houses</h1>
          <div />
        </div>
        <div className="container">
          <div className="row div-cards">
            {Houses.map(house => (
              <div className="card-group col-md-4 cards p-2" key={house.id}>
                <div className="card">
                  <img
                    className="card-img-top"
                    src={house.img_url}
                    alt="house"
                  />
                  <div className="card-body">
                    <h5 className="card-title text-center">{house.name}</h5>
                  </div>
                  <div className="card-footer btn">
                    <button className="btn-success px-3" type="button">
                      <Link
                        to={`/house/${house.id}`}
                        className="btn li-color btn-details text-center px-4"
                      >
                        Details
                      </Link>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

HouseList.defaultProps = {
  auth: null,
  Houses: null,
};

HouseList.propTypes = {
  auth: PropTypes.object || null,
  Houses: PropTypes.arrayOf(PropTypes.object) || null,
  loadHouses: PropTypes.func.isRequired,
  Loading: PropTypes.bool.isRequired,
  setLoadingStatus: PropTypes.func.isRequired,
};

const mapStateToProps = ({ Houses, Loading }) => ({ Houses, Loading });
const mapDispatchToProps = dispatch => ({
  loadHouses: token => dispatch(loadHouses(token)),
  setLoadingStatus: status => dispatch(setLoadingStatus(status)),
});
export default connect(mapStateToProps, mapDispatchToProps)(HouseList);
