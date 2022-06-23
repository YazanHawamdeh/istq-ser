import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Row, Col, Input } from 'reactstrap';

import { updateStock, toggleLoader, showSuccessAlert, showErrorAlert } from '../../../store/actions';
import TextInupt from '../../../components/Inputs/Text/index';
import TextArea from '../../../components/Inputs/TextArea';

import { validateStockUpdate } from '../../../utils';

import stockImg from '../../../assets/stock.jpeg';

export default function Update({ show, close, data }) {
  const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false);
  const [state, setState] = useState({});
  const [updated, setUpdated] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setState({ ...state, ...data });
    setErrors({});
  }, [data]);

  useEffect(() => {
    if (submited) {
      let { error } = validateStockUpdate(updated);
      setErrors({ ...errors, ...error });
    }
  }, [state]);

  const HandleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
    setUpdated({ ...updated, [e.target.name]: e.target.value });
  };

  const handleFiles = (e) => setUpdated({ ...updated, image: e.target.files[0] });

  const Submit = async () => {
    setSubmited(true);
    let { error, valid } = validateStockUpdate(updated);
    if (valid) {
      dispatch(toggleLoader());
      let { isSuccess, error } = await dispatch(updateStock(state._id, updated));
      dispatch(toggleLoader());
      if (isSuccess) {
        dispatch(showSuccessAlert('Stock Updated'));
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
        <h5 className="modal-title mt-0">Update Stock</h5>
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
          <Input className="form-control" type="file" id="formFile" onChange={handleFiles} accept="image/*" />
        </div>
        {updated.image ? (
          <div className="col-md-12">
            <img src={URL.createObjectURL(updated.image)} style={{ width: '50%' }} />
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
