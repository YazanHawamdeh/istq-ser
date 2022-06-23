import React from 'react';
import { Redirect } from 'react-router-dom';

import Login from '../pages/Authentication/Login';
import Logout from '../pages/Authentication/Logout';

import UsersPage from '../pages/Users/index';
import Dashboard from '../pages/Dashboard';
import StocksPage from '../pages/Stocks';
import StockApprovePage from '../pages/StockApprove';
import OrdersPage from '../pages/Orders/index';
import DoneOrdersPage from '../pages/Orders/DoneWithComments';
import StatusLogs from '../pages/Orders/Components/StatusLogs';

//lookups pages
import IloSwitch from '../pages/Settings/IloSwitch';
import NetworkSwitch from '../pages/Settings/NetworkSwitch';
import Chasis from '../pages/Settings/Chasis';
import Cpu from '../pages/Settings/Cpu';
import Disks from '../pages/Settings/Disks';
import NetworkInterface from '../pages/Settings/NetworkInterface';
import Rack from '../pages/Settings/Rack';
import Ram from '../pages/Settings/Ram';
import SettingsPage from '../pages/Settings/Settings';

const userRoutes = [
  { path: '/dashboard', component: Dashboard },

  { path: '/users', component: UsersPage, onlyAdmin: true },

  { path: '/orders', component: OrdersPage, onlyAdmin: false },
  { path: '/orders/done', component: DoneOrdersPage, onlyAdmin: false },
  { path: '/requests/status-logs/:id', component: StatusLogs, onlyAdmin: true },

  { path: '/stocks', component: StocksPage },
  { path: '/stocks-approve', component: StockApprovePage, onlyAdmin: true },

  //settings
  { path: '/lookups/iloswitch', component: IloSwitch, onlyAdmin: true },
  { path: '/lookups/networkswitch', component: NetworkSwitch, onlyAdmin: true },
  { path: '/lookups/Chasis', component: Chasis, onlyAdmin: true },
  { path: '/lookups/Cpu', component: Cpu, onlyAdmin: true },
  { path: '/lookups/Disks', component: Disks, onlyAdmin: true },
  { path: '/lookups/NetworkInterface', component: NetworkInterface, onlyAdmin: true },
  { path: '/lookups/Rack', component: Rack, onlyAdmin: true },
  { path: '/lookups/Ram', component: Ram, onlyAdmin: true },
  { path: '/settings', component: SettingsPage, onlyAdmin: true },

  { path: '/', exact: true, component: () => <Redirect to="/dashboard" />, onlyAdmin: false },
];

const authRoutes = [
  { path: '/logout', component: Logout },
  { path: '/login', component: Login },
];

export { userRoutes, authRoutes };
