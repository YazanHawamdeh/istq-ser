import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row, Card, CardBody, Button, Label, Input } from 'reactstrap';

import TextInput from '../../components/Inputs/Text';

import { updateSettingLookup, showErrorAlert } from '../../store/actions';

export default function Settings() {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  const { SETTIGNS } = useSelector((state) => state.LOOKUPS_STORE);

  useEffect(() => {
    setState({ ...state, ...SETTIGNS });
  }, [SETTIGNS]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const updateAccEmail = () =>
    validateEmail(state.accEmail) ? dispatch(updateSettingLookup({ accEmail: state?.accEmail })) : dispatch(showErrorAlert('Email is not valid'));

  const updateDceEmail = () =>
    validateEmail(state.dceEmail) ? dispatch(updateSettingLookup({ dceEmail: state?.dceEmail })) : dispatch(showErrorAlert('Email is not valid'));

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="mb-2">
            <Card>
              <CardBody>
                <h3>Emails:</h3>
                <Row>
                  <Col>
                    <Label className="form-label">Accountant Email</Label>
                    <div className="input-group mb-3">
                      <Input className="form-control" name="accEmail" onChange={handleChange} value={state?.accEmail} />
                      <button className="btn btn-primary" type="button" onClick={updateAccEmail} disabled={state?.accEmail === SETTIGNS?.accEmail}>
                        Update
                      </button>
                    </div>
                  </Col>
                  <Col>
                    <Label className="form-label">DCE Email</Label>
                    <div className="input-group mb-3">
                      <Input className="form-control" name="dceEmail" onChange={handleChange} value={state?.dceEmail} />
                      <button className="btn btn-primary" type="button" onClick={updateDceEmail} disabled={state?.dceEmail === SETTIGNS?.dceEmail}>
                        Update
                      </button>
                    </div>
                  </Col>
                </Row>
              </CardBody>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
}
