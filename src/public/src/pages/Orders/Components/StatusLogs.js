import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Card, CardBody } from 'reactstrap';

import { getRequestLogs } from '../../../store/actions';
import { statuses } from '../../../utils/constants';

import moment from 'moment';

export default function StatusLogs() {
  let { id } = useParams();

  const dispatch = useDispatch();

  const { logsList } = useSelector((state) => state.ORDERS_STORE);

  useEffect(() => {
    dispatch(getRequestLogs(id));
  }, []);

  return (
    <React.Fragment>
      <div className="page-content" style={{ overflowY: 'auto' }}>
        <Container fluid>
          <ul className="verti-timeline list-unstyled">
            {logsList &&
              logsList.map((log, key) => (
                <Card>
                  <CardBody>
                    <li key={key} className="event-list" style={{ paddingBottom: '10px' }}>
                      <div className="event-timeline-dot">
                        <i className="bx bx-right-arrow-circle bx-fade-right" />
                      </div>
                      <div className="media">
                        <div className="media-body">
                          <div>
                            <div className="me-3 mb-2">{moment(log.createdAt).format('LLLL')}</div>
                            <h6>{log.createdBy?.username}</h6>
                            {log.prevStatus ? (
                              <p className="text-muted  mb-0">
                                Move from <strong>{statuses[log.prevStatus]}</strong> to <strong>{statuses[log.nextStatus]}</strong>
                              </p>
                            ) : (
                              <p className="text-muted">Create Request</p>
                            )}
                            <p> {log.comment} </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </CardBody>
                </Card>
              ))}
          </ul>
        </Container>
      </div>
    </React.Fragment>
  );
}
