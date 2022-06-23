import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { hideAlert } from '../../store/actions';
import { Alert } from 'reactstrap';

export default function index({ success, alertMsg }) {
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => dispatch(hideAlert()), 2000);
  }, [alertMsg]);

  return (
    <div className="alert-container">
      <Alert color={`${success ? 'success' : 'danger'}`} role="alert">
        <h3>
          {success ? <i className="mdi mdi-check-all me-2"></i> : <i className="mdi mdi-block-helper me-2"></i>} {alertMsg}{' '}
        </h3>
      </Alert>
    </div>
  );
}
