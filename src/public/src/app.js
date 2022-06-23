import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { Switch, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';

import { userRoutes, authRoutes } from './routes/allRoutes';

import Authmiddleware from './routes/middleware/Authmiddleware';

import VerticalLayout from './components/Layout';
import NonAuthLayout from './components/NonAuthLayout';

import Loading from './components/Loader/index';
import Alert from './components/Alert/index';

import './assets/scss/theme.scss';

const App = (props) => {
  const Layout = VerticalLayout;
  const { loader, alert, alertMsg, success } = useSelector((state) => state.UTILS_STORE);

  return (
    <React.Fragment>
      <Router>
        <Switch>
          {authRoutes.map((route, idx) => (
            <Authmiddleware path={route.path} layout={NonAuthLayout} component={route.component} key={idx} isAuthProtected={false} exact />
          ))}

          {userRoutes.map((route, idx) => (
            <Authmiddleware
              path={route.path}
              layout={Layout}
              component={route.component}
              key={idx}
              onlyAdmin={route.onlyAdmin}
              isAuthProtected={true}
              exact
            />
          ))}
        </Switch>
      </Router>
      {loader ? <Loading /> : null}
      {alert ? <Alert success={success} alertMsg={alertMsg} /> : null}
    </React.Fragment>
  );
};

App.propTypes = {
  layout: PropTypes.any,
};

const mapStateToProps = (state) => {
  return {
    layout: state.Layout,
  };
};

export default connect(mapStateToProps, null)(App);
