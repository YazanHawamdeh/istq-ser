import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Row, Col } from 'reactstrap';

import { dceUpdateStatusValidation } from '../../../utils';
import { updateRequestForDce, toggleLoader, showSuccessAlert, showErrorAlert } from '../../../store/actions';

import Input from '../../../components/Inputs/Text/index';
import Select from '../../../components/Inputs/Select/index';
import DateInput from '../../../components/Inputs/Date/index';
import DateTimeInput from '../../../components/Inputs/DateTime/index';
import TextArea from '../../../components/Inputs/TextArea/index';
import SelectMulti from '../../../components/Inputs/SelectMulti';

import { typesStringFirst } from '../../../utils/constants';

export default function DceStatus({ show, close, data }) {
  const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false);
  const [checked, setChecked] = useState(false);
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});

  const { ILO_SWITCH, NETWORK_SWITCH, RACK, UNITS, ILO_SWITCH_PORT, NETWORK_SWITCH_PORT } = useSelector((state) => state.LOOKUPS_STORE);

  useEffect(() => {
    setState({
      ...state,
      ...data,
      iloSwitch: data?.iloSwitch?._id,
      rack: data?.rack?._id,
      netWrokSwitch: data?.netWrokSwitch?.map((item) => ({ value: item._id, label: item.label, _id: item._id })),
      iloSwitchPort: data?.iloSwitchPort?.map((item) => ({ value: item, label: item })),
      networkSwitchPort: data?.networkSwitchPort?.map((item) => ({ value: item, label: item })),
      units: data?.units?.map((item) => ({ value: item, label: item })),
    });
    setErrors({});
  }, [data]);

  useEffect(() => {
    if (submited) {
      let { error } = dceUpdateStatusValidation(state);
      setErrors({ ...errors, ...error });
    }
  }, [state]);

  const HandleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const Submit = async () => {
    setSubmited(true);
    let { error, valid } = dceUpdateStatusValidation(state);
    if (valid) {
      dispatch(toggleLoader());
      dispatch(
        updateRequestForDce({
          ...state,
          units: state.units.map((item) => item.value),
          netWrokSwitch: state.netWrokSwitch.map((item) => item.value),
          iloSwitchPort: state.iloSwitchPort.map((item) => item.value),
          networkSwitchPort: state.networkSwitchPort.map((item) => item.value),
          id: data._id,
        })
      );
      dispatch(toggleLoader());
      showSuccessAlert('Order Moved to Done For Review status');
      hide();
    } else {
      setErrors(error);
    }
  };

  const handleMumtiple = (e, n) => setState({ ...state, [n]: e });

  const hide = () => (setSubmited(false), close());

  return (
    <Modal isOpen={show} toggle={close} size="lg">
      <div className="modal-header">
        <h5 className="modal-title mt-0">Update Status</h5>
        <button type="button" onClick={hide} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Row>
          <Col>
            <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" checked={true} disabled={true} />
              <label className="form-check-label" htmlFor="defaultCheck1">
                Move to <strong>Done For Review</strong> status
              </label>
            </div>
          </Col>
        </Row>
        <Row>
          {/* <Col>
            <DateTimeInput label="Work Date" name="workDate" value={state.workDate} onChange={HandleChange} error={errors.workDate} disabled={true} />
          </Col> */}
          <Col>
            <Input label="Server Tag" name="serverTag" value={state.serverTag} onChange={HandleChange} error={errors.serverTag} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input label="Ilo IP" name="iloIp" value={state.iloIp} onChange={HandleChange} error={errors.iloIp} />
          </Col>
          <Col>
            <Select
              label="Ilo Switch"
              name="iloSwitch"
              value={state.iloSwitch}
              onChange={HandleChange}
              options={ILO_SWITCH}
              error={errors.iloSwitch}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <Input label="Server IP" name="serverIp" value={state.serverIp} onChange={HandleChange} error={errors.serverIp} disabled={true} />
          </Col>
          <Col>
            <SelectMulti
              label="Network Switch"
              options={NETWORK_SWITCH}
              onChange={(e) => handleMumtiple(e, 'netWrokSwitch')}
              selected={state.netWrokSwitch}
            />

            {errors.netWrokSwitch ? <small style={{ color: '#f57878' }}> {errors.netWrokSwitch} </small> : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <Select label="Rack" name="rack" value={state.rack} onChange={HandleChange} options={RACK} error={errors.rack} />
          </Col>
          <Col>
            <SelectMulti label="Units" selected={state.units} options={UNITS} onChange={(e) => handleMumtiple(e, 'units')} />
            {errors.units ? <small style={{ color: '#f57878' }}> {errors.units} </small> : null}
          </Col>
        </Row>
        <Row>
          <Col>
            <SelectMulti
              label="Ilo Switch Port"
              options={ILO_SWITCH_PORT}
              onChange={(e) => handleMumtiple(e, 'iloSwitchPort')}
              selected={state.iloSwitchPort}
            />
            {errors.iloSwitchPort ? <small style={{ color: '#f57878' }}> {errors.iloSwitchPort} </small> : null}
          </Col>
          <Col>
            <SelectMulti
              label="Network Switch Port"
              options={NETWORK_SWITCH_PORT}
              onChange={(e) => handleMumtiple(e, 'networkSwitchPort')}
              selected={state.networkSwitchPort}
            />
            {errors.iloSwitchPort ? <small style={{ color: '#f57878' }}> {errors.iloSwitchPort} </small> : null}
          </Col>
        </Row>
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
