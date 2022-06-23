import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Card, CardBody, Button } from 'reactstrap';

import { listStockForApprove, approveStockAmount } from '../../store/actions';

import ApproveModal from './ApproveModal';

import moment from 'moment';

export default function StatusLogs() {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  const { stockForApprove } = useSelector((state) => state.STOCK_STORE);

  useEffect(() => {
    dispatch(listStockForApprove());
  }, []);

  const showModal = (e) => setState({ ...state, show: true, id: e.id, accept: e.accept });

  const closeModal = (e) => setState({ ...state, show: false, id: null, accept: null });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <ul className="verti-timeline list-unstyled">
            {stockForApprove &&
              stockForApprove.map((item, key) => (
                <Card>
                  <CardBody>
                    <li key={key} className="event-list" style={{ paddingBottom: '0px' }}>
                      <div className="event-timeline-dot">
                        <i className="bx bx-right-arrow-circle bx-fade-right" />
                      </div>
                      <div className="media">
                        <div className="media-body">
                          <div>
                            <div className="me-3 mb-2">{moment(item.createdAt).format('LLLL')}</div>
                            <h6>{item.createdBy?.username}</h6>
                            <p className="text-muted  mb-0">
                              has ask to {item.decrease ? <strong>Decrease</strong> : <strong>Increse</strong>} the <strong>{item.stock.name}</strong>{' '}
                              stock by <strong>{item.amount}</strong>{' '}
                            </p>
                          </div>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                          <Button color="primary" onClick={() => showModal({ id: item._id, accept: true })}>
                            Approve
                          </Button>
                          <Button color="primary" onClick={() => showModal({ id: item._id, accept: false })} style={{ marginTop: '4px' }}>
                            Decline
                          </Button>
                        </div>
                      </div>
                    </li>
                  </CardBody>
                </Card>
              ))}
          </ul>
        </Container>
        {state.show ? <ApproveModal id={state.id} accept={state.accept} show={state.show} close={closeModal} /> : null}
      </div>
    </React.Fragment>
  );
}
