import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const Authmiddleware = ({ component: Component, layout: Layout, isAuthProtected, onlyAdmin, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      if (onlyAdmin && JSON.parse(localStorage.getItem('authUser')).role !== 1) {
        return <Redirect to={{ pathname: '/', state: { from: props.location } }} />;
      }

      if (isAuthProtected && !localStorage.getItem('authUser')) {
        return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />;
      }

      return (
        <Layout>
          <Component {...props} />
        </Layout>
      );
    }}
  />
);

Authmiddleware.propTypes = {
  isAuthProtected: PropTypes.bool,
  onlyAdmin: PropTypes.bool,
  component: PropTypes.any,
  location: PropTypes.object,
  layout: PropTypes.any,
};

export default Authmiddleware;
