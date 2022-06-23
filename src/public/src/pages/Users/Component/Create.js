import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Row, Col } from 'reactstrap';

import { createUser, toggleLoader, showSuccessAlert, showErrorAlert } from '../../../store/actions';
import Inupt from '../../../components/Inputs/Text/index';
import Select from '../../../components/Inputs/Select/index';

import { validateUserCreate, rolesForSelect } from '../../../utils';

export default function Create({ show, close }) {
  const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false);
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (submited) {
      let { error } = validateUserCreate(state);
      setErrors({ ...errors, ...error });
    }
  }, [state]);

  const HandleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const Submit = async () => {
    setSubmited(true);
    let { error, valid } = validateUserCreate(state);
    if (valid) {
      dispatch(toggleLoader());
      let { isSuccess, data, error } = await dispatch(createUser(state));
      dispatch(toggleLoader());
      if (isSuccess) {
        dispatch(showSuccessAlert('New user has created'));
        hide();
      } else {
        dispatch(showErrorAlert(error.EN));
      }
    } else {
      setErrors({ ...errors, ...error });
    }
  };

  const hide = () => {
    setSubmited(false);
    setState({});
    close();
  };

  return (
    <Modal isOpen={show} toggle={close} size="md">
      <div className="modal-header">
        <h5 className="modal-title mt-0">Create New User</h5>
        <button type="button" onClick={hide} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Inupt label="User Name" name="username" value={state.username} onChange={HandleChange} error={errors.username} />
        <Inupt label="Password" name="password" value={state.password} onChange={HandleChange} error={errors.password} />
        <Select label="Role" name="role" value={state.role} onChange={HandleChange} options={rolesForSelect} error={errors.role} />
      </div>
      <div className="modal-footer">
        <button type="button" onClick={hide} className="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={Submit}>
          Save changes
        </button>
      </div>
    </Modal>
  );
}
