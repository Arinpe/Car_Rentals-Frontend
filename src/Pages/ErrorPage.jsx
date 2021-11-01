import React from 'react';
import { Link } from 'react-router-dom';

const ErrorPage = () => (
  <main className="defaultHero d-flex align-items-center justify-content-center px-4 px-md-0">
    <section className="banner text-white">
      <h1>404</h1>
      <div />
      <p>Page Not Found</p>
      <Link to="/" className="banner-btn">
        Return Home
      </Link>
    </section>
  </main>
);

export default ErrorPage;
