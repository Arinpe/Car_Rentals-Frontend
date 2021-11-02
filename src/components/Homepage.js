import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import BgImage from '../assets/hompageBg.jpeg';
import { getHeaders } from '../services/common';

const Homepage = () => {
  const headers = getHeaders();
  if (headers) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div>
      <div className="homepage">
        <nav className="d-flex px-5 justify-content-between align-items-center homepage__nav">
          <Link className="logo" to="/">DiaTrack</Link>
          <div className="d-flex">
            <Link className="me-4 btn btn-info" to="/register">Register</Link>
            <Link className="btn btn-info" to="/login">Login</Link>
          </div>
        </nav>
        <main className="px-5 d-flex justify-content-center align-items-center text-center homepage__main" style={{ backgroundImage: `url(${BgImage})` }}>
          <div className="homepage__welcome_text">
            <h1>We Never Stop! We never falter!</h1>
            <h3>Keep fit with pride</h3>
            <Link className="btn btn-primary btn-lg" to="/register">Register</Link>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Homepage;
