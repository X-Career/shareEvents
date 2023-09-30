import React from 'react';
import { Link } from 'react-router-dom';

const SuccessPage = () => {
  return (
    <div>
      <h1>Registration Successful!</h1>
      <p>You have successfully registered your account.</p>
      <p>Please login <Link to="/login">here</Link>.</p>
    </div>
  );
};

export default SuccessPage;