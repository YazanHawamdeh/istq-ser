import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row, Card, CardBody, Button } from 'reactstrap';

import Create from './Components/Create';
import Delete from './Components/Delete';
import Update from './Components/Update';

import { LookupsEnums } from '../../utils/constants';

export default function Chasis() {
  const [state, setState] = useState({});

  const [showDelete, setShowDelete] = useState(null);

  const { CHASIS } = useSelector((state) => state.LOOKUPS_STORE);

  const toggleEditModal = (e, i) => setState({ ...state, ...e, index: i });

  const toggleDeleteModal = (e) => setShowDelete(e?._id ? e : null);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="mb-2">
            {CHASIS &&
              CHASIS.map((item, i) => (
                <Col xl="3" sm="4" key={'_col_' + i}>
                  <Card>
                    <CardBody style={{ padding: '0px 20px' }}>
                      {i === state.index ? (
                        <Update item={state} hide={toggleEditModal} />
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          {item.label}
                          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <i
                              className="mdi mdi-pencil font-size-16 text-success me-1"
                              style={{ cursor: 'pointer' }}
                              onClick={() => toggleEditModal(item, i)}
                            />
                            <i
                              className="mdi mdi-trash-can font-size-16 text-danger me-1"
                              style={{ cursor: 'pointer' }}
                              onClick={() => toggleDeleteModal(item)}
                            />
                          </div>
                        </div>
                      )}
                    </CardBody>
                  </Card>
                </Col>
              ))}
            <Create type={LookupsEnums.CHASIS} />
          </Row>
        </Container>
        {showDelete ? <Delete item={showDelete} show={showDelete ? true : false} close={toggleDeleteModal} /> : null}
      </div>
    </React.Fragment>
  );
}
