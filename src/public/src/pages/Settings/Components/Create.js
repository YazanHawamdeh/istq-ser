import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Card, CardBody, Button } from 'reactstrap';

import { createLookup, toggleLoader, showSuccessAlert } from '../../../store/actions';

export default function Create({ type }) {
  const [label, setLabel] = useState('');

  const dispatch = useDispatch();

  const handleChange = (e) => setLabel(e.target.value);

  const submit = async () => {
    dispatch(toggleLoader());
    await dispatch(createLookup({ type, label }));
    dispatch(toggleLoader());
    setLabel('');
  };

  return (
    <Col xl="3" sm="4">
      <Card>
        <CardBody style={{ padding: '7px 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input className="form-control" type="text" placeholder="Enter text" value={label} onChange={handleChange} />
            <Button color="primary" onClick={submit} disabled={label ? false : true}>
              <i className="bx bx-plus"></i>
            </Button>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
}
