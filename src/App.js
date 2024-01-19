/* eslint-disable react-hooks/exhaustive-deps */
import { lazy, useEffect, useState } from 'react';
import { authentication } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';
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
import { getProfileUser } from 'config/firebaseEvents';
import { genConst } from 'store/constant';
import HomeLayout from 'layout/HomeLayout';
import Search from 'views/home/Search';
import Business from 'views/dashboard/Default/Business/Business';
import Network from 'views/dashboard/Default/Network/Network';
import Benefits from 'views/dashboard/Default/Benefits/Benefits';

//Main Portal
const Home = Loadable(lazy(() => import('views/home/Home')));

const NotFound = Loadable(lazy(() => import('views/pages/error/NotFound')));
const AuthSignin = Loadable(lazy(() => import('views/pages/authentication/login/Signin')));
const AuthSignup = Loadable(lazy(() => import('views/pages/authentication/login/Signup')));
const AuthRecovery = Loadable(lazy(() => import('views/pages/authentication/login/PasswordRecover')));
const Inscription = Loadable(lazy(() => import('views/pages/authentication/inscription/Inscription')));
const Payment = Loadable(lazy(() => import('views/pages/authentication/inscription/Payment')));
const PaymentMethods = Loadable(lazy(() => import('views/pages/authentication/inscription/PaymentMethods')));

// dashboard Main
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
// dashboard Profile
const UserProfile = Loadable(lazy(() => import('views/dashboard/Default/Profile/UserProfile')));
const UserContact = Loadable(lazy(() => import('views/dashboard/Default/Profile/ProfileContact')));
const UserBill = Loadable(lazy(() => import('views/dashboard/Default/Profile/ProfileBill')));
const UserPaymentMethods = Loadable(lazy(() => import('views/dashboard/Default/Profile/ProfilePaymentMethods')));
const UserSecurity = Loadable(lazy(() => import('views/dashboard/Default/Profile/UserSecurity')));
// dashboard Events
const Events = Loadable(lazy(() => import('views/dashboard/Default/Events/Events')));
// dashboard Conference
//const Conference = Loadable(lazy(() => import('views/dashboard/Default/Conference/Conference')));
// dashboard Clients
const Clients = Loadable(lazy(() => import('views/dashboard/Default/Clients/Clients')));
// dashboard Courses
/*const Courses = Loadable(lazy(() => import('views/dashboard/Default/Courses/Courses')));
const Course = Loadable(lazy(() => import('views/dashboard/Default/Courses/Course')));
const AddCourse = Loadable(lazy(() => import('views/dashboard/Default/Courses/AddCourse')));
const EditCourse = Loadable(lazy(() => import('views/dashboard/Default/Courses/EditCourse')));
const AddUser = Loadable(lazy(() => import('views/dashboard/Default/Courses/AddUser')));
const AddUserCourse = Loadable(lazy(() => import('views/dashboard/Default/Courses/AddUserCourse')));*/
// dashboard Users
const Users = Loadable(lazy(() => import('views/dashboard/Default/Users/Users')));
// dashboard Settings
const Share = Loadable(lazy(() => import('views/dashboard/Default/Share/Share')));
const Settings = Loadable(lazy(() => import('views/dashboard/Default/Settings/Settings')));
const PaymentSettings = Loadable(lazy(() => import('views/dashboard/Default/Settings/PaymentSettings')));
const Notifications = Loadable(lazy(() => import('views/dashboard/Default/Notifications/Notifications')));
const UserNotifications = Loadable(lazy(() => import('views/dashboard/Student/Notifications/Notifications')));
//Historic
const ClientsHist = Loadable(lazy(() => import('views/dashboard/Default/Historic/Clients')));
const UsersHist = Loadable(lazy(() => import('views/dashboard/Default/Historic/Users')));
const Logs = Loadable(lazy(() => import('views/dashboard/Default/Logs/Logs')));

//STUDENTS Dashboard
const DashboardStudent = Loadable(lazy(() => import('views/dashboard/Student')));
const Calendar = Loadable(lazy(() => import('views/dashboard/Student/Calendar/Calendar')));
const CoursesStudents = Loadable(lazy(() => import('views/dashboard/Student/Courses/Courses')));
const CourseStudent = Loadable(lazy(() => import('views/dashboard/Student/Courses/Course')));
const Message = Loadable(lazy(() => import('views/dashboard/Student/Message/Message')));
const SettingsStudent = Loadable(lazy(() => import('views/dashboard/Student/Settings/Settings')));

const App = () => {
  const customization = useSelector((state) => state.customization);
  const [user, setUser] = useState();

  const getData = () => {
    onAuthStateChanged(authentication, (usr) => {
      if (usr) {
        getProfileUser(usr.uid)
          .then((result) => {
            setUser(result);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        setUser(null);
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ThemeProvider theme={themes(customization)}>
      <Router basename={config.basename}>
        <Routes>
          <Route element={<HomeLayout />} path="/" exact>
            <Route element={<Home />} path="/" exact />
            <Route element={<Search />} path="search" exact />
          </Route>
          <Route element={<MinimalLayout />} path="/auth" exact>
            <Route element={<AuthSignin />} path="signin" exact />
            <Route element={<AuthSignup />} path="signup" exact />
            <Route element={<AuthRecovery />} path="password-recovery" exact />
            <Route element={<Inscription />} path="inscription" exact />
            <Route element={<Payment />} path="payment" exact />
            <Route element={<PaymentMethods />} path="payment-methods" exact />
            <Route element={<NotFound />} path="404" exact />
            <Route path="*" element={<Navigate to="404" />} />
          </Route>
          {user === genConst.CONST_PRO_ADM ? (
            <Route element={<MainLayout />} path="/app" exact>
              <Route element={<DashboardDefault />} path="dashboard" exact />
              <Route element={<Events />} path="events" exact />
              <Route element={<Clients />} path="clients" exact />
              <Route element={<Users />} path="users" exact />
              <Route element={<Share />} path="share" exact />
              <Route element={<Business />} path="business" exact />
              <Route element={<Network />} path="network" exact />
              <Route element={<Benefits />} path="benefits" exact />
              <Route element={<Settings />} path="settings" exact />
              <Route element={<PaymentSettings />} path="payment-settings" exact />
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
          ) : (
            <Route element={<MainLayout />} path="/app" exact>
              <Route element={<DashboardStudent />} path="dashboard" exact />
              <Route element={<Calendar />} path="calendar" exact />
              <Route element={<CoursesStudents />} path="courses" exact />
              <Route element={<CourseStudent />} path="course" exact />
              <Route element={<Message />} path="message" exact />
              <Route element={<UserNotifications />} path="notifications" exact />
              <Route element={<UserProfile />} path="user-profile" exact />
              <Route element={<SettingsStudent />} path="settings" exact />
            </Route>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
