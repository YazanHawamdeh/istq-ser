import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownToggle, DropdownMenu, Row, Col } from 'reactstrap';
import SimpleBar from 'simplebar-react';

import { withTranslation } from 'react-i18next';

import { listStockNotifications } from '../../../store/actions';

const NotificationDropdown = (props) => {
  const dispatch = useDispatch();
  const [menu, setMenu] = useState(false);
  const { notifications } = useSelector((state) => state.STOCK_STORE);

  useEffect(() => {
    dispatch(listStockNotifications());
  }, []);

  return (
    <React.Fragment>
      <Dropdown isOpen={menu} toggle={() => setMenu(!menu)} className="dropdown d-inline-block" tag="li">
        <DropdownToggle className="btn header-item noti-icon" tag="button" id="page-header-notifications-dropdown">
          <i className="bx bx-bell bx-tada" />
          <span className="badge bg-danger rounded-pill">{notifications.length}</span>
        </DropdownToggle>

        <DropdownMenu className="dropdown-menu dropdown-menu-lg p-0 dropdown-menu-end">
          <div className="p-3">
            <Row className="align-items-center">
              <Col>
                <h6 className="m-0"> {props.t('Notifications')} </h6>
              </Col>
            </Row>
          </div>

          <SimpleBar style={{ height: '230px' }}>
            {notifications.map((item, index) => (
              <Link to="" className="text-reset notification-item" key={index}>
                <div className="media">
                  <div className="avatar-xs me-3">
                    <span className="avatar-title bg-primary rounded-circle font-size-16">
                      {/* <i className="bx bx-cart" /> */}
                      <img src={item.image} style={{ width: '32px' }} />
                    </span>
                  </div>
                  <div className="media-body">
                    <h6 className="mt-0 mb-1">{item.name}</h6>
                    <div className="font-size-12 text-muted">
                      <p className="mb-1">{item.description}</p>
                      <p className="mb-0">Current Amount : {item.amount}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </SimpleBar>
          {/* <div className="p-2 border-top d-grid">
            <Link className="btn btn-sm btn-link font-size-14 btn-block text-center" to="#">
              <i className="mdi mdi-arrow-right-circle me-1"></i> {props.t('View all')}{' '}
            </Link>
          </div> */}
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
};

export default withTranslation()(NotificationDropdown);

NotificationDropdown.propTypes = {
  t: PropTypes.any,
};
