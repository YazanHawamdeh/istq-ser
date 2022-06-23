import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Input } from 'reactstrap';

import { createStock, toggleLoader, showSuccessAlert, showErrorAlert } from '../../../store/actions';
import TextInupt from '../../../components/Inputs/Text/index';
import TextArea from '../../../components/Inputs/TextArea';

import { validateStockCreate } from '../../../utils';

export default function Create({ show, close }) {
  const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false);
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (submited) {
      let { error } = validateStockCreate(state);
      setErrors({ ...errors, ...error });
    }
  }, [state]);

  const HandleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const handleFiles = (e) => setState({ ...state, image: e.target.files[0] });

  const Submit = async () => {
    setSubmited(true);
    let { error, valid } = validateStockCreate(state);
    if (valid) {
      dispatch(toggleLoader());
      let { isSuccess, data, error } = await dispatch(createStock(state));
      dispatch(toggleLoader());
      if (isSuccess) {
        dispatch(showSuccessAlert('New stock added'));
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
        <h5 className="modal-title mt-0">Create Stock</h5>
        <button type="button" onClick={hide} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <TextInupt label="Name" name="name" value={state.name} onChange={HandleChange} error={errors.name} />
        <TextInupt label="Amount" name="amount" value={state.amount} onChange={HandleChange} error={errors.amount} type="number" />
        <TextInupt label="Alert On" name="alertOn" value={state.alertOn} onChange={HandleChange} error={errors.alertOn} type="number" />
        <TextArea label="Description" name="description" value={state.description} onChange={HandleChange} error={errors.description} />
        <label className="col-md-12 col-form-label" style={{ marginBottom: '-7px' }}>
          Image
        </label>
        <div className={`col-md-12`}>
          <Input className={`form-control ${errors.image ? 'error-input' : ''}`} type="file" id="formFile" onChange={handleFiles} accept="image/*" />
          {errors.image ? <small style={{ color: '#f57878' }}> {errors.image} </small> : null}
        </div>
        {state.image ? (
          <div className="col-md-12">
            <img src={URL.createObjectURL(state.image)} style={{ width: '50%' }} />
          </div>
        ) : null}
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
