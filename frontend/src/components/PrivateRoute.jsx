// src/components/PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';


// PrivateRoute component to protect routes that require authentication
const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      isAuthenticated ? <Component {...props} /> : <Navigate to="/login" />
    }
  />
);

export default PrivateRoute;
