import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import { logoutUser } from '../../store/actions';

const Logout = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(logoutUser());
  }, []);

  useEffect(() => {
    async function signOut() {
      await dispatch(logoutUser());
      window.location.href = '/';
    }

    signOut();
  }, []);

  return <></>;
};

Logout.propTypes = {
  history: PropTypes.object,
};

export default withRouter(Logout);
