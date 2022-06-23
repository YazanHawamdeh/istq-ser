import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Modal, Row, Col } from 'reactstrap';

import { toggleLoader, showSuccessAlert, showErrorAlert, updateRequestStatusAcc } from '../../../store/actions';

import TextArea from '../../../components/Inputs/TextArea/index';

export default function StatusAccountant({ data, show, close }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    setState({ ...state, workDate: data?.workDate });
  }, [data]);

  const handleChange = (e) => (setState({ ...state, [e.target.name]: e.target.value }), setError(''));

  const hide = () => {
    setState({});
    close();
  };

  const submit = async () => {
    let obj = {
      prevStatus: data.status,
      nextStatus: 10,
      comment: state.comment,
      requestId: data._id,
    };

    dispatch(toggleLoader());
    let { isSuccess } = await dispatch(updateRequestStatusAcc(obj));
    dispatch(toggleLoader());
    isSuccess ? (dispatch(showSuccessAlert('Status updated')), hide()) : dispatch(showErrorAlert('Something went wrong, Please try again'));
  };

  return (
    <Modal isOpen={show} toggle={close} size="md">
      <div className="modal-header">
        <h5 className="modal-title mt-0">Update Status</h5>
        <button type="button" onClick={hide} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <TextArea label="Comment" name="comment" value={state.comment} onChange={handleChange} />
      </div>
      <div className="modal-footer">
        <button type="button" onClick={hide} className="btn btn-secondary" data-dismiss="modal">
          Close
        </button>
        <button type="button" className="btn btn-primary" onClick={submit}>
          Save changes
        </button>
      </div>
    </Modal>
  );
}
