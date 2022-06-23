import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Row, Col } from 'reactstrap';

import { validateٌRequestCreate, formatDataToSend } from '../../../utils';
import { updateRequest, toggleLoader, showSuccessAlert, showErrorAlert } from '../../../store/actions';

import Input from '../../../components/Inputs/Text/index';
import Select from '../../../components/Inputs/Select/index';
import DateInput from '../../../components/Inputs/Date/index';
import DateTimeInput from '../../../components/Inputs/DateTime/index';
import TextArea from '../../../components/Inputs/TextArea/index';
import SelectMulti from '../../../components/Inputs/SelectMulti';

import { typesStringFirst } from '../../../utils/constants';

export default function Update({ show, close, data }) {
  const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false);
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
      let { error } = validateٌRequestCreate(state);
      setErrors({ ...errors, ...error });
    }
  }, [state]);

  const HandleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const handleMumtiple = (e, n) => setState({ ...state, [n]: e });

  const Submit = async () => {
    setSubmited(true);
    let { error, valid } = validateٌRequestCreate(state);
    if (valid) {
      let dataToSend = formatDataToSend(state);
      dispatch(toggleLoader());
      let { isSuccess, error } = await dispatch(updateRequest(state._id, dataToSend));
      dispatch(toggleLoader());
      if (isSuccess) {
        dispatch(showSuccessAlert('Order Updated'));
        setSubmited(false);
        setState({});
        setErrors({});
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
    <Modal isOpen={show} toggle={close} size="xl">
      <div className="modal-header">
        <h5 className="modal-title mt-0">Update Request</h5>
        <button type="button" onClick={hide} className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
        <Row>
          {/* <Col>
            <Select label="Type" name="type" value={state.type} onChange={HandleChange} options={typesStringFirst} error={errors.type} />
          </Col> */}
          <Col>
            <Input label="Customer Name" name="customerName" value={state.customerName} onChange={HandleChange} error={errors.customerName} />
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <DateInput label="Request date" name="orderDate" value={state.orderDate} onChange={HandleChange} error={errors.orderDate} />
          </Col>
          <Col>
            <DateTimeInput
              label="Estimation date"
              name="estimationDate"
              value={state.estimationDate}
              onChange={HandleChange}
              error={errors.estimationDate}
            />
          </Col>
        </Row> */}
        <Row>
          {/* <Col>
            <TextArea label="Required" name="required" value={state.required} onChange={HandleChange} />
          </Col> */}
          <Col>
            <TextArea label="Comment" name="comment" value={state.comment} onChange={HandleChange} error={errors.comment} />
          </Col>
        </Row>

        {/* {state.type == '2' || state.type == '3' || state.type == '4' ? ( */}
          <Row>
            <Col>
              <Input label="Server Tag" name="serverTag" value={state.serverTag} onChange={HandleChange} error={errors.serverTag} />
            </Col>
            <Col>
              <Select label="Rack" name="rack" value={state.rack} onChange={HandleChange} options={RACK} />
            </Col>
            <Col>
              <SelectMulti label="Units" selected={state.units} options={UNITS} onChange={(e) => handleMumtiple(e, 'units')} />
              {errors.units ? <small style={{ color: '#f57878' }}> {errors.units} </small> : null}
            </Col>
          </Row>
        {/* ) : null} */}

        {/* {state.type == '2' || state.type == '3' || state.type == '4' ? ( */}
          <Row>
            <Col>
              <Input
                label="Date Center Name"
                name="dataCenterName"
                value={state.dataCenterName}
                onChange={HandleChange}
                error={errors.dataCenterName}
              />
            </Col>
            <Col>
              <Input label="Server IP" name="serverIp" value={state.serverIp} onChange={HandleChange} error={errors.serverIp} />
            </Col>
          </Row>
        {/* ) : null} */}

        <Row>
          {/* <Col>
            <DateTimeInput label="Work Date" name="workDate" value={state.workDate} onChange={HandleChange} />
          </Col> */}
          <Col>
            <Input label="Ilo IP" name="iloIp" value={state.iloIp} onChange={HandleChange} error={errors.iloIp} />
          </Col>
          <Col>
            <Select label="Ilo Switch" name="iloSwitch" value={state.iloSwitch} onChange={HandleChange} options={ILO_SWITCH} />
          </Col>
        </Row>

        <Row>
          <Col>
            <SelectMulti
              label="Network Switch"
              options={NETWORK_SWITCH}
              onChange={(e) => handleMumtiple(e, 'netWrokSwitch')}
              selected={state.netWrokSwitch}
            />
            {errors.netWrokSwitch ? <small style={{ color: '#f57878' }}> {errors.netWrokSwitch} </small> : null}
          </Col>
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
