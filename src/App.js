/* eslint-disable react-hooks/exhaustive-deps */
import { lazy } from 'react';
import { useSelector } from 'react-redux';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

// routing
import config from './config';
import themes from 'themes';

// project imports
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';
import Business from 'views/dashboard/Default/Business/Business';
import Network from 'views/dashboard/Default/Network/Network';
import Benefits from 'views/dashboard/Default/Benefits/Benefits';

const NotFound = Loadable(lazy(() => import('views/pages/error/NotFound')));
const AuthSignin = Loadable(lazy(() => import('views/pages/authentication/login/Signin')));
const AuthSignup = Loadable(lazy(() => import('views/pages/authentication/login/Signup')));
const AuthRecovery = Loadable(lazy(() => import('views/pages/authentication/login/PasswordRecover')));

// dashboard Main
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
// dashboard Profile
const UserProfile = Loadable(lazy(() => import('views/dashboard/Default/Profile/UserProfile')));
const UserContact = Loadable(lazy(() => import('views/dashboard/Default/Profile/ProfileContact')));
const UserBill = Loadable(lazy(() => import('views/dashboard/Default/Profile/ProfileBill')));
const UserPaymentMethods = Loadable(lazy(() => import('views/dashboard/Default/Profile/ProfilePaymentMethods')));
const UserSecurity = Loadable(lazy(() => import('views/dashboard/Default/Profile/UserSecurity')));
// dashboard Clients
const Clients = Loadable(lazy(() => import('views/dashboard/Default/Clients/Clients')));
// dashboard Users
const AdminUsers = Loadable(lazy(() => import('views/dashboard/Default/AdminUsers/AdminUsers')));
const Users = Loadable(lazy(() => import('views/dashboard/Default/Users/Users')));
// dashboard Settings
const Share = Loadable(lazy(() => import('views/dashboard/Default/Share/Share')));
const Settings = Loadable(lazy(() => import('views/dashboard/Default/Settings/Settings')));
const Notifications = Loadable(lazy(() => import('views/dashboard/Default/Notifications/Notifications')));
//Historic
const ClientsHist = Loadable(lazy(() => import('views/dashboard/Default/Historic/Clients')));
const UsersHist = Loadable(lazy(() => import('views/dashboard/Default/Historic/Users')));
const Logs = Loadable(lazy(() => import('views/dashboard/Default/Logs/Logs')));

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <ThemeProvider theme={themes(customization)}>
      <Router basename={config.basename}>
        <Routes>
          <Route element={<MinimalLayout />} path="/" exact>
            <Route element={<AuthSignin />} path="/" exact />
            <Route element={<AuthSignin />} path="auth/signin" exact />
            <Route element={<AuthSignup />} path="auth/signup" exact />
            <Route element={<AuthRecovery />} path="auth/password-recovery" exact />
            <Route element={<NotFound />} path="/404" exact />
            <Route path="*" element={<Navigate to="404" />} />
          </Route>
          <Route element={<MainLayout />} path="/app" exact>
            <Route element={<DashboardDefault />} path="dashboard" exact />
            <Route element={<Clients />} path="clients" exact />
            <Route element={<AdminUsers />} path="admin-users" exact />
            <Route element={<Users />} path="users" exact />
            <Route element={<Share />} path="share" exact />
            <Route element={<Business />} path="business" exact />
            <Route element={<Network />} path="network" exact />
            <Route element={<Benefits />} path="benefits" exact />
            <Route element={<Settings />} path="settings" exact />
            <Route element={<Notifications />} path="notifications" exact />
            <Route element={<UserProfile />} path="user-profile" exact />
            <Route element={<UserContact />} path="user-contact" exact />
            <Route element={<UserBill />} path="user-bill" exact />
            <Route element={<UserPaymentMethods />} path="user-payment-methods" exact />
            <Route element={<UserSecurity />} path="user-security" exact />
            <Route element={<ClientsHist />} path="historic-clients" exact />
            <Route element={<UsersHist />} path="historic-users" exact />
            <Route element={<Logs />} path="logs" exact />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
