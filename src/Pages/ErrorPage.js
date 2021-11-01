import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => (

  <main className="bg-image">
    <section className="banner">
      <h1>404</h1>
      <div />
      <p>No page found</p>
      <Link to="/" className="li-color p-4 lin">
        Return Home
      </Link>
    </section>
  </main>

);
export default ErrorPage;
