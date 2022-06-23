import PropTypes from 'prop-types';
import MetaTags from 'react-meta-tags';
import React, { useState, useEffect } from 'react';

import { Row, Col, CardBody, Card, Alert, Container } from 'reactstrap';

import { useDispatch, useSelector } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';

import { loginUser, toggleLoader, showErrorAlert } from '../../store/actions';
import { validateUserLogin } from '../../utils';

import profile from '../../assets/images/profile-img.png';
// import profile from 'assets/images/profile-img.png';
import logo from 'assets/images/logo-light.svg';

import Input from '../../components/Inputs/Text/index';

const Login = (props) => {
  const dispatch = useDispatch();
  const [submited, setSubmited] = useState(false);
  const [state, setState] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (submited) {
      let { error } = validateUserLogin(state);
      setErrors({ ...errors, ...error });
    }
  }, [state]);

  const handleChange = (e) => setState({ ...state, [e.target.name]: e.target.value });

  const Submit = async () => {
    setSubmited(true);
    let { error, valid } = validateUserLogin(state);
    if (valid) {
      dispatch(toggleLoader());
      let { isSuccess, error } = await dispatch(loginUser(state));
      dispatch(toggleLoader());
      isSuccess ? (window.location.href = '/dashboard') : dispatch(showErrorAlert(error.EN));
    } else {
      setErrors({ ...errors, ...error });
    }
  };

  return (
    <React.Fragment>
      <MetaTags>
        <title>Login Admin Dashboard </title>
      </MetaTags>
      <div className="home-btn d-none d-sm-block">
        <Link to="/" className="text-dark">
          <i className="fas fa-home h2" />
        </Link>
      </div>
      <div className="account-pages my-5 pt-sm-5">
        <Container>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Row className="justify-content-center">
            <Col md={8} lg={6} xl={5}>
              <Card className="overflow-hidden">
                <div className="bg-primary bg-soft">
                  <Row>
                    <Col xs={7}>
                      <div className="text-primary p-4">
                        <h5 className="text-primary">Welcome Back !</h5>
                        <p>Sign in to continue.</p>
                      </div>
                    </Col>
                    <Col className="col-5 align-self-end">
                      <img src={profile} alt="" className="img-fluid" />
                    </Col>
                  </Row>
                </div>
                <CardBody className="pt-0">
                  <div>
                    <div className="avatar-md profile-user-wid mb-4">
                      <span className="avatar-title rounded-circle bg-light">
                        <img src={logo} alt="" className="rounded-circle" height="34" />
                      </span>
                    </div>
                  </div>
                  <div className="p-2">
                    <div className="mb-3">
                      <Input label="User name" name="username" value={state.username} onChange={handleChange} error={errors.username} />
                    </div>

                    <div className="mb-3">
                      <Input label="Password" type="password" name="password" value={state.password} onChange={handleChange} error={errors.password} />
                    </div>

                    <div className="mt-3 d-grid">
                      <button className="btn btn-primary btn-block" onClick={Submit}>
                        Log In
                      </button>
                    </div>
                  </div>
                </CardBody>
              </Card>
              <div className="mt-5 text-center">
                <p>
                  Crafted with <i className="mdi mdi-heart text-danger" /> by Monther Amer
                </p>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Login);

Login.propTypes = {
  history: PropTypes.object,
};
