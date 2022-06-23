import React, { useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Collapse, Button } from 'reactstrap';

import Input from '../../../components/Inputs/Text';
import SelectInput from '../../../components/Inputs/Select';
import DateInput from '../../../components/Inputs/Date';

import { typesStringFirst, statusForSelect } from '../../../utils/constants';
import classnames from 'classnames';

export default function Filters({ submit }) {
  const [show, setShow] = useState(false);
  const [state, setState] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    let authUser = localStorage.getItem('authUser');
    let role = JSON.parse(authUser).role;
    if (role === 2 || role === 3) setDisabled(true);
  }, []);

  useEffect(() => {
    submit(state);
  }, [state]);

  const HandleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const clearState = () => setState({});

  return (
    <Row>
      <Col>
        <Card>
          <CardBody>
            <div className="accordion accordion-flush" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingFlushOne" style={{ display: 'flex' }}>
                  {Object.keys(state).length ? (
                    <Button type="button" color="danger" className="font-16 btn-block btn btn-danger" onClick={clearState}>
                      <i className="px px-window-close me-1" />
                      Clear
                    </Button>
                  ) : null}

                  <button
                    className={classnames('accordion-button', 'fw-medium', { collapsed: !show })}
                    type="button"
                    onClick={() => setShow(!show)}
                    style={{ cursor: 'pointer' }}
                  >
                    Search...
                  </button>
                </h2>

                <Collapse isOpen={show} className="accordion-collapse">
                  <div className="accordion-body">
                    <Row>
                      {/* <Col lg={3}>
                        <SelectInput label="Type" name="type" value={state.type} onChange={HandleChange} options={typesStringFirst} />
                      </Col> */}
                      <Col lg={3}>
                        <Input label="Server Tag" name="serverTag" value={state.serverTag} onChange={HandleChange} />
                      </Col>
                      <Col lg={3}>
                        <Input label="Server Ip" name="serverIp" value={state.serverIp} onChange={HandleChange} />
                      </Col>
                      <Col lg={3}>
                        <Input label="Data Center Name" name="dataCenterName" value={state.dataCenterName} onChange={HandleChange} />
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={3}>
                        <SelectInput
                          label="Status"
                          name="status"
                          value={state.status}
                          onChange={HandleChange}
                          options={statusForSelect}
                          disabled={disabled}
                        />
                      </Col>
                      {/* <Col lg={3}>
                        <Input label="Required" name="required" value={state.required} onChange={HandleChange} />
                      </Col> */}
                      <Col lg={3}>
                        <Input label="Comment" name="comment" value={state.comment} onChange={HandleChange} />
                      </Col>
                      <Col lg={3}>
                        <Input label="Customer Name" name="customerName" value={state.customerName} onChange={HandleChange} />
                      </Col>
                    </Row>
                    {/* <Row>
                      <Col lg={3}>
                        <DateInput label="From Request date" name="orderDateFrom" value={state.orderDateFrom} onChange={HandleChange} />
                      </Col>
                      <Col lg={3}>
                        <DateInput label="To Request date" name="orderDateTo" value={state.orderDateTo} onChange={HandleChange} />
                      </Col>
                      <Col lg={3}>
                        <DateInput label="From Estimation date" name="estimationDateFrom" value={state.estimationDateFrom} onChange={HandleChange} />
                      </Col>
                      <Col lg={3}>
                        <DateInput label="To Estimation date" name="estimationDateTo" value={state.estimationDateTo} onChange={HandleChange} />
                      </Col>
                    </Row> */}
                    {/* <Row>
                      <Col lg={3}>
                        <DateInput label="From Work date" name="workDateFrom" value={state.workDateFrom} onChange={HandleChange} />
                      </Col>
                      <Col lg={3}>
                        <DateInput label="To Work date" name="workDateTo" value={state.workDateTo} onChange={HandleChange} />
                      </Col>
                    </Row> */}
                  </div>
                </Collapse>
              </div>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
}
