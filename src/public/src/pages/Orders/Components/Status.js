import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Row, Col } from 'reactstrap';

import { toggleLoader, showSuccessAlert, showErrorAlert, updateRequestStatus } from '../../../store/actions';

import TextArea from '../../../components/Inputs/TextArea/index';
import Select from '../../../components/Inputs/Select/index';
import DateTimeInput from '../../../components/Inputs/DateTime/index';
import SelectMulti from '../../../components/Inputs/SelectMulti';

import { statusForSelect, statuses, orderStatus } from '../../../utils';

export default function Status({ data, show, close }) {
  const dispatch = useDispatch();
  const [state, setState] = useState({});
  const [error, setError] = useState('');

  const { ILO_SWITCH, NETWORK_SWITCH, RACK, UNITS, ILO_SWITCH_PORT, NETWORK_SWITCH_PORT } = useSelector((state) => state.LOOKUPS_STORE);

  useEffect(() => {
    setState({
      ...data,
      nextStatus: data?.status,
      workDate: data?.workDate,
      iloSwitch: data?.iloSwitch?._id,
      netWrokSwitch: data?.netWrokSwitch?.map((item) => ({ value: item._id, label: item.label, _id: item._id })),
      iloSwitchPort: data?.iloSwitchPort?.map((item) => ({ value: item, label: item })),
      networkSwitchPort: data?.networkSwitchPort?.map((item) => ({ value: item, label: item })),
    });
  }, [data]);

  const handleChange = (e) => (setState({ ...state, [e.target.name]: e.target.value }), setError(''));

  const handleMumtiple = (e, n) => setState({ ...state, [n]: e });

  const hide = () => {
    setState({});
    close();
  };

  const submit = async () => {
    let obj = {
      prevStatus: data.status,
      nextStatus: state.nextStatus,
      comment: state.comment,
      requestId: data._id,
    };

    if (state.nextStatus == orderStatus.SCHEDULED) {
      if (!state.workDate) {
        setError('Work Date is required');
        return;
      }
      obj.workDate = state.workDate;
      obj.iloSwitch = state.iloSwitch;
      obj.iloSwitchPort = state.iloSwitchPort?.map((item) => item.value);
      obj.netWrokSwitch = state.netWrokSwitch?.map((item) => item._id);
      obj.networkSwitchPort = state.networkSwitchPort?.map((item) => item.value);
    }
    dispatch(toggleLoader());
    let { isSuccess } = await dispatch(updateRequestStatus(obj));
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
        <Row>
          <label className="col-md-12 col-form-label" style={{ marginBottom: '-7px' }}>
            Curent Status: <strong>{statuses[data?.status]}</strong>
          </label>
        </Row>

        <Select label="New Status" name="nextStatus" value={state.nextStatus || data?.status} onChange={handleChange} options={statusForSelect} />

        {/* {state.nextStatus == orderStatus.SCHEDULED ? (
          <DateTimeInput label="Work Date" name="workDate" value={state.workDate} onChange={handleChange} error={error} />
        ) : null} */}

        {state.nextStatus == orderStatus.SCHEDULED ? (
          <Select label="Ilo Switch" name="iloSwitch" value={state.iloSwitch} onChange={handleChange} options={ILO_SWITCH} />
        ) : null}
        {state.nextStatus == orderStatus.SCHEDULED ? (
          <SelectMulti
            label="Network Switch"
            options={NETWORK_SWITCH}
            onChange={(e) => handleMumtiple(e, 'netWrokSwitch')}
            selected={state.netWrokSwitch}
          />
        ) : null}
        {state.nextStatus == orderStatus.SCHEDULED ? (
          <SelectMulti
            label="Ilo Switch Port"
            options={ILO_SWITCH_PORT}
            onChange={(e) => handleMumtiple(e, 'iloSwitchPort')}
            selected={state.iloSwitchPort}
          />
        ) : null}

        {state.nextStatus == orderStatus.SCHEDULED ? (
          <SelectMulti
            label="Network Switch Port"
            options={NETWORK_SWITCH_PORT}
            onChange={(e) => handleMumtiple(e, 'networkSwitchPort')}
            selected={state.networkSwitchPort}
          />
        ) : null}

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
