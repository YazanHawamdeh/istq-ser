import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';

// //Import Scrollbar
import SimpleBar from 'simplebar-react';

// MetisMenu
import MetisMenu from 'metismenujs';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

//i18n
import { withTranslation } from 'react-i18next';

const SidebarContent = (props) => {
  const ref = useRef();
  const [role, setRole] = useState(null);

  // Use ComponentDidMount and ComponentDidUpdate method symultaniously
  useEffect(() => {
    const pathName = props.location.pathname;

    const initMenu = () => {
      new MetisMenu('#side-menu');
      let matchingMenuItem = null;
      const ul = document.getElementById('side-menu');
      const items = ul.getElementsByTagName('a');
      for (let i = 0; i < items.length; ++i) {
        if (pathName === items[i].pathname) {
          matchingMenuItem = items[i];
          break;
        }
      }
      if (matchingMenuItem) {
        activateParentDropdown(matchingMenuItem);
      }
    };
    initMenu();
  }, [props.location.pathname]);

  useEffect(() => {
    ref.current.recalculate();
  });

  useEffect(() => {
    let authUser = localStorage.getItem('authUser');
    let role = JSON.parse(authUser).role;
    setRole(role);
  }, []);

  function scrollElement(item) {
    if (item) {
      const currentPosition = item.offsetTop;
      if (currentPosition > window.innerHeight) {
        ref.current.getScrollElement().scrollTop = currentPosition - 300;
      }
    }
  }

  function activateParentDropdown(item) {
    item.classList.add('active');
    const parent = item.parentElement;
    const parent2El = parent.childNodes[1];
    if (parent2El && parent2El.id !== 'side-menu') {
      parent2El.classList.add('mm-show');
    }

    if (parent) {
      parent.classList.add('mm-active');
      const parent2 = parent.parentElement;

      if (parent2) {
        parent2.classList.add('mm-show'); // ul tag

        const parent3 = parent2.parentElement; // li tag

        if (parent3) {
          parent3.classList.add('mm-active'); // li
          parent3.childNodes[0].classList.add('mm-active'); //a
          const parent4 = parent3.parentElement; // ul
          if (parent4) {
            parent4.classList.add('mm-show'); // ul
            const parent5 = parent4.parentElement;
            if (parent5) {
              parent5.classList.add('mm-show'); // li
              parent5.childNodes[0].classList.add('mm-active'); // a tag
            }
          }
        }
      }
      scrollElement(item);
      return false;
    }
    scrollElement(item);
    return false;
  }

  return (
    <React.Fragment>
      <SimpleBar style={{ maxHeight: '100%' }} ref={ref}>
        <div id="sidebar-menu">
          <ul className="metismenu list-unstyled" id="side-menu">
            <li className="menu-title">Menu </li>
            {role === 1 ? (
              <li>
                <Link to="/users">
                  <i className="bx bx-user"></i>
                  <span>Users</span>
                </Link>
              </li>
            ) : null}

            <li>
              <Link to="/orders">
                <i className="bx bx-server"></i>
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/orders/done">
                <i className="bx bx-server"></i>
                <span>Done Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/stocks">
                <i className="bx bx-store"></i>
                <span>Stocks</span>
              </Link>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-check"></i>
                <span>Approve</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                {role === 1 ? (
                  <li>
                    <Link to="/stocks-approve">Stock Amount</Link>
                  </li>
                ) : null}
              </ul>
            </li>

            <li>
              <Link to="/#" className="has-arrow">
                <i className="bx bx-cog"></i>
                <span>Settigns</span>
              </Link>
              <ul className="sub-menu" aria-expanded="false">
                <li>
                  <Link to="/settings">Settings</Link>
                </li>
                <li>
                  <Link to="/lookups/iloswitch">ILO Switch</Link>
                </li>
                <li>
                  <Link to="/lookups/networkswitch">Network Switch</Link>
                </li>
                <li>
                  <Link to="/lookups/Chasis">Chasis</Link>
                </li>
                <li>
                  <Link to="/lookups/Cpu">Cpu</Link>
                </li>
                <li>
                  <Link to="/lookups/Disks">Disks</Link>
                </li>
                <li>
                  <Link to="/lookups/NetworkInterface">NetworkInterface</Link>
                </li>
                <li>
                  <Link to="/lookups/Rack">Rack</Link>
                </li>
                <li>
                  <Link to="/lookups/Ram">Ram</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </SimpleBar>
    </React.Fragment>
  );
};

SidebarContent.propTypes = {
  location: PropTypes.object,
  t: PropTypes.any,
};

export default withRouter(withTranslation()(SidebarContent));
