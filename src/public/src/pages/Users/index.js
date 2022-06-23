import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Link } from 'react-router-dom';
import { Container, Card, CardBody, Row, Col, Button } from 'reactstrap';

import CreateModal from './Component/Create';
import DeleteModal from './Component/Delete';
import UpdateModal from './Component/Update';

import { getListOfUsers } from '../../store/actions';

const roles = {
  1: 'Admin',
  2: 'Data Center Engineer',
  3: 'Accountant',
};

export default function index() {
  const dispatch = useDispatch();
  const [state, setState] = useState({});

  const { list } = useSelector((state) => state.USERS_STORE);

  useEffect(() => {
    dispatch(getListOfUsers());
  }, []);

  const toggleCreateModal = () => setState({ ...state, showCreateModal: !state.showCreateModal });

  const toggleDeleteModal = (e) => setState({ ...state, showDeleteModal: typeof e === 'string' ? e : null });

  const toggleUpdateModal = (e) => setState({ ...state, showUpdateModal: typeof e === 'object' ? e : null });

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          <Row className="mb-2">
            <Col sm="4"></Col>
            <Col sm="8">
              <div className="text-sm-end">
                <Button type="button" color="primary" className="font-16 btn-block btn btn-primary" onClick={toggleCreateModal}>
                  <i className="mdi mdi-plus me-1" />
                  Add New User
                </Button>
              </div>
            </Col>
          </Row>
          <Row>
            {list &&
              list.map((user, i) => (
                <Col md="3" lg="3" xl="3" sm="6" key={i}>
                  <Card className="text-center">
                    <CardBody>
                      {!user.img ? (
                        <div className="avatar-md mx-auto mb-3">
                          <span className={'avatar-title rounded-circle bg-soft bg-primary text-primary font-size-16'}>
                            {user.username.charAt(0)}
                          </span>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <img className="rounded-circle avatar-sm" src={user.image} alt="" />
                        </div>
                      )}

                      <h5 className="font-size-15 mb-1">
                        <Link to="#" className="text-dark">
                          {user.username}
                        </Link>
                      </h5>
                      <p className="text-muted">{roles[user.role]}</p>

                      <i
                        className="mdi mdi-trash-can font-size-22 text-danger me-1"
                        onClick={() => toggleDeleteModal(user._id)}
                        style={{ cursor: 'pointer' }}
                      />

                      <i
                        className="mdi mdi-pencil font-size-22 text-success me-1"
                        onClick={() => toggleUpdateModal(user)}
                        style={{ cursor: 'pointer' }}
                      />
                    </CardBody>
                  </Card>
                </Col>
              ))}
          </Row>
        </Container>
        <CreateModal show={state.showCreateModal} close={toggleCreateModal} />
        <DeleteModal show={state.showDeleteModal ? true : false} close={toggleDeleteModal} id={state.showDeleteModal} />
        <UpdateModal show={state.showUpdateModal ? true : false} close={toggleUpdateModal} data={state.showUpdateModal} />
      </div>
    </React.Fragment>
  );
}
