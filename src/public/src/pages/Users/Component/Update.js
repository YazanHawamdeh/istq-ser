import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal } from 'reactstrap';

import { updateUser, toggleLoader, showSuccessAlert, showErrorAlert } from '../../../store/actions';
import Inupt from '../../../components/Inputs/Text/index';
import Select from '../../../components/Inputs/Select/index';

import { validateUserUpdate } from '../../../utils';

const roles = [
  { label: 'Admin', value: 1 },
  { label: 'Data Center Engineer', value: 2 },
  { label: 'Accountant', value: 3 },
];

export default function Update({ show, close, data }) {
  const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false);
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setState({ ...state, ...data });
    setErrors({});
  }, [data]);

  useEffect(() => {
    if (submited) {
      let { error } = validateUserUpdate(state);
      setErrors({ ...errors, ...error });
    }
  }, [state]);

  const HandleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const Submit = async () => {
    setSubmited(true);
    let { error, valid } = validateUserUpdate(state);
    if (valid) {
      dispatch(toggleLoader());
      let { isSuccess, error } = await dispatch(updateUser(data._id, state));
      dispatch(toggleLoader());
      if (isSuccess) {
        dispatch(showSuccessAlert('User updated'));
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
    close();
  };

  return (
    <Modal isOpen={show} toggle={hide} size="md">
      <div className="modal-header">
        <h5 className="modal-title mt-0">Update User</h5>
        <button type="button" onClick={hide} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Inupt label="User Name" name="username" value={state.username} onChange={HandleChange} error={errors.username} />
        <Inupt label="Password" type="password" name="password" value={state.password} onChange={HandleChange} error={errors.password} />
        <Select label="Role" name="role" value={state.role} onChange={HandleChange} options={roles} error={errors.role} hideDefault={true} />
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
