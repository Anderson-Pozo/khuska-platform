/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy, useState } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
// routing
import config from './config';
import themes from 'themes';
// project imports layouts
import Loadable from 'components/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import MainLayout from 'layout/MainLayout';
import HomeLayout from 'layout/HomeLayout';
import MarketLayout from 'layout/MarketLayout';
import DefaultLayout from 'layout/DefaultLayout';
import { genConst } from 'store/constant';
//Firebase
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { getProfileUser } from 'config/firebaseEvents';
import UsersNetwork from 'views/dashboard/Admin/Users/UsersNetwork';

// Market Portal
const Login = Loadable(lazy(() => import('views/home/Login')));
const Register = Loadable(lazy(() => import('views/home/Register')));
const Recovery = Loadable(lazy(() => import('views/home/Recovery')));
const Market = Loadable(lazy(() => import('views/home/Market')));
const MarketFilter = Loadable(lazy(() => import('views/home/MarketFilter')));
const CreateProduct = Loadable(lazy(() => import('views/home/CreateProduct')));
const Product = Loadable(lazy(() => import('views/home/Product')));
const MyItems = Loadable(lazy(() => import('views/home/MyItems')));
const ProductEditUsr = Loadable(lazy(() => import('views/home/ProductEdit')));
const Item = Loadable(lazy(() => import('views/home/Item')));
const ViewItem = Loadable(lazy(() => import('views/home/ViewItem')));
const Messages = Loadable(lazy(() => import('views/home/Messages')));
const Chat = Loadable(lazy(() => import('views/home/Chat')));
const Profile = Loadable(lazy(() => import('views/home/Profile')));
const NotificationsMarket = Loadable(lazy(() => import('views/home/Notifications')));
const BusinessMarket = Loadable(lazy(() => import('views/home/Business')));
const BusinessInfoSearch = Loadable(lazy(() => import('views/home/BusinessInfo')));
const Home = Loadable(lazy(() => import('views/home/Home')));
// Error
const NotFound = Loadable(lazy(() => import('views/pages/error/NotFound')));
// dashboard Admin
const DashboardAdmin = Loadable(lazy(() => import('views/dashboard/Admin')));
// dashboard Profile
const UserProfile = Loadable(lazy(() => import('views/dashboard/Admin/Profile/UserProfile')));
const UserContact = Loadable(lazy(() => import('views/dashboard/Admin/Profile/ProfileContact')));
const UserBill = Loadable(lazy(() => import('views/dashboard/Admin/Profile/ProfileBill')));
const UserPaymentMethods = Loadable(lazy(() => import('views/dashboard/Admin/Profile/ProfilePaymentMethods')));
const UserSecurity = Loadable(lazy(() => import('views/dashboard/Admin/Profile/UserSecurity')));
// dashboard Business
const Business = Loadable(lazy(() => import('views/dashboard/Admin/Business/Business')));
const BusinessCreate = Loadable(lazy(() => import('views/dashboard/Admin/Business/BusinessCreate')));
const BusinessInfo = Loadable(lazy(() => import('views/dashboard/Admin/Business/BusinessInfo')));
const BusinessEdit = Loadable(lazy(() => import('views/dashboard/Admin/Business/BusinessEdit')));
// dashboard Product
const Products = Loadable(lazy(() => import('views/dashboard/Admin/Products/Products')));
const ProductAdd = Loadable(lazy(() => import('views/dashboard/Admin/Products/ProductAdd')));
const ProductEdit = Loadable(lazy(() => import('views/dashboard/Admin/Products/ProductEdit')));
const ProductView = Loadable(lazy(() => import('views/dashboard/Admin/Products/ProductView')));
//Comprobantes
const Vouchers = Loadable(lazy(() => import('views/dashboard/Admin/Vouchers/Vouchers')));

// dashboard Network
const Network = Loadable(lazy(() => import('views/dashboard/Admin/Network/Network')));
// dashboard Mail
const Mail = Loadable(lazy(() => import('views/dashboard/Admin/Mail/Mail')));
// dashboard Benefits
const Benefits = Loadable(lazy(() => import('views/dashboard/Admin/Benefits/Benefits')));
// dashboard Clients
const Clients = Loadable(lazy(() => import('views/dashboard/Admin/Clients/Clients')));
// dashboard Users
const AdminUsers = Loadable(lazy(() => import('views/dashboard/Admin/AdminUsers/AdminUsers')));
const Users = Loadable(lazy(() => import('views/dashboard/Admin/Users/Users')));
// dashboard Settings
const Share = Loadable(lazy(() => import('views/dashboard/Admin/Share/Share')));
const Settings = Loadable(lazy(() => import('views/dashboard/Admin/Settings/Settings')));
const Notifications = Loadable(lazy(() => import('views/dashboard/Admin/Notifications/Notifications')));
//Historic
const ClientsHist = Loadable(lazy(() => import('views/dashboard/Admin/Historic/Clients')));
const UsersHist = Loadable(lazy(() => import('views/dashboard/Admin/Historic/Users')));
const Logs = Loadable(lazy(() => import('views/dashboard/Admin/Logs/Logs')));
//DEFAULT SECTION ====================================================
// default Login
const AuthSignin = Loadable(lazy(() => import('views/pages/login/login/Signin')));
const AuthSignup = Loadable(lazy(() => import('views/pages/login/login/Signup')));
const AuthRecovery = Loadable(lazy(() => import('views/pages/login/login/PasswordRecover')));
const JoinSignup = Loadable(lazy(() => import('views/pages/login/login/JoinSignup')));
const AuthInscription = Loadable(lazy(() => import('views/pages/login/inscription/Inscription')));
const AuthPayment = Loadable(lazy(() => import('views/pages/login/inscription/Payment')));
const AuthPaymentMethods = Loadable(lazy(() => import('views/pages/login/inscription/PaymentMethods')));
// dashboard Default
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));
// dashboard Profile
const UserProfileDefault = Loadable(lazy(() => import('views/dashboard/Default/Profile/UserProfile')));
const UserContactDefault = Loadable(lazy(() => import('views/dashboard/Default/Profile/ProfileContact')));
const UserBillDefault = Loadable(lazy(() => import('views/dashboard/Default/Profile/ProfileBill')));
const UserPaymentMethodsDefault = Loadable(lazy(() => import('views/dashboard/Default/Profile/ProfilePaymentMethods')));
const UserSecurityDefault = Loadable(lazy(() => import('views/dashboard/Default/Profile/UserSecurity')));
// dashboard Settings
const ShareDefault = Loadable(lazy(() => import('views/dashboard/Default/Share/Share')));
const NetworkDefault = Loadable(lazy(() => import('views/dashboard/Default/Network/Network')));
const BenefitsDefault = Loadable(lazy(() => import('views/dashboard/Default/Benefits/Benefits')));
const BusinessDefault = Loadable(lazy(() => import('views/dashboard/Default/Business/Business')));
const BusinessCreateDefault = Loadable(lazy(() => import('views/dashboard/Default/Business/BusinessCreate')));
const BusinessInfoDefault = Loadable(lazy(() => import('views/dashboard/Default/Business/BusinessInfo')));
const BusinessEditDefault = Loadable(lazy(() => import('views/dashboard/Default/Business/BusinessEdit')));
const SubscriptionDefault = Loadable(lazy(() => import('views/dashboard/Default/Subscription/Subscription')));
const NotificationsDefault = Loadable(lazy(() => import('views/dashboard/Default/Notifications/Notifications')));
const ProductsDefault = Loadable(lazy(() => import('views/dashboard/Default/Products/Products')));
const ProductsAddDefault = Loadable(lazy(() => import('views/dashboard/Default/Products/ProductAdd')));
const ProductsEditDefault = Loadable(lazy(() => import('views/dashboard/Default/Products/ProductEdit')));
const ProductsViewDefault = Loadable(lazy(() => import('views/dashboard/Default/Products/ProductView')));
const ProductMessagesDefault = Loadable(lazy(() => import('views/dashboard/Default/Products/ProductMessage')));
const ProductMessagesChatDefault = Loadable(lazy(() => import('views/dashboard/Default/Products/ProductMessageChat')));

const App = () => {
  const customization = useSelector((state) => state.customization);
  const [profile, setProfile] = useState(null);

  React.useEffect(() => {
    onAuthStateChanged(authentication, (user) => {
      if (user) {
        getProfileUser(user.uid).then((pro) => {
          setProfile(pro);
        });
      }
    });
  }, [profile]);

  return (
    <ThemeProvider theme={themes(customization)}>
      <Router basename={config.basename}>
        <Routes>
          <Route element={<HomeLayout />} path="/" exact>
            <Route element={<Home />} path="/" exact />
          </Route>
          <Route element={<MarketLayout />} path="/market" exact>
            <Route element={<Market />} path="main" exact />
            <Route element={<MarketFilter />} path="filter" exact />
            <Route element={<Profile />} path="profile" exact />
            <Route element={<CreateProduct />} path="create" exact />
            <Route element={<Product />} path="product" exact />
            <Route element={<ProductEditUsr />} path="item/edit" exact />
            <Route element={<MyItems />} path="my-items" exact />
            <Route element={<Item />} path="create/item" exact />
            <Route element={<ViewItem />} path="item" exact />
            <Route element={<Messages />} path="messages" exact />
            <Route element={<Chat />} path="chat" exact />
            <Route element={<NotificationsMarket />} path="notifications" exact />
            <Route element={<BusinessMarket />} path="business" exact />
            <Route element={<BusinessInfoSearch />} path="business-info" exact />
            <Route element={<Login />} path="login" exact />
            <Route element={<Register />} path="register" exact />
            <Route element={<Recovery />} path="recovery" exact />
          </Route>
          <Route element={<MinimalLayout />} path="/auth" exact>
            <Route element={<AuthSignin />} path="signin" exact />
            <Route element={<AuthSignup />} path="signup" exact />
            <Route element={<JoinSignup />} path="join" exact />
            <Route element={<AuthRecovery />} path="password-recovery" exact />
            <Route element={<AuthInscription />} path="inscription" exact />
            <Route element={<AuthPayment />} path="payment" exact />
            <Route element={<AuthPaymentMethods />} path="payment-methods" exact />
            <Route element={<NotFound />} path="404" exact />
            <Route path="*" element={<Navigate to="404" />} />
          </Route>
          {profile == genConst.CONST_PRO_ADM ? (
            <Route element={<MainLayout />} path="/main" exact>
              <Route element={<DashboardAdmin />} path="dashboard" exact />
              <Route element={<Clients />} path="clients" exact />
              <Route element={<AdminUsers />} path="admin-users" exact />
              <Route element={<Users />} path="users" exact />
              <Route element={<Share />} path="share" exact />
              <Route element={<Business />} path="business" exact />
              <Route element={<BusinessCreate />} path="add-business" exact />
              <Route element={<BusinessEdit />} path="edit-business" exact />
              <Route element={<BusinessInfo />} path="info-business" exact />
              <Route element={<Network />} path="network" exact />
              <Route element={<Vouchers />} path="vouchers" exact />
              <Route element={<Benefits />} path="benefits" exact />
              <Route element={<Products />} path="products" exact />
              <Route element={<ProductAdd />} path="add-product" exact />
              <Route element={<ProductEdit />} path="edit-product" exact />
              <Route element={<ProductView />} path="info-product" exact />
              <Route element={<Settings />} path="settings" exact />
              <Route element={<Mail />} path="mail" exact />
              <Route element={<Notifications />} path="notifications" exact />
              <Route element={<UsersNetwork />} path="network-users" exact />
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
            <Route element={<DefaultLayout />} path="/app" exact>
              <Route element={<DashboardDefault />} path="dashboard" exact />
              <Route element={<ShareDefault />} path="share" exact />
              <Route element={<BusinessDefault />} path="business" exact />
              <Route element={<BusinessCreateDefault />} path="add-business" exact />
              <Route element={<BusinessEditDefault />} path="edit-business" exact />
              <Route element={<BusinessInfoDefault />} path="info-business" exact />
              <Route element={<ProductsDefault />} path="products" exact />
              <Route element={<ProductsAddDefault />} path="add-product" exact />
              <Route element={<ProductsEditDefault />} path="edit-product" exact />
              <Route element={<ProductsViewDefault />} path="info-product" exact />
              <Route element={<ProductMessagesDefault />} path="messages-product" exact />
              <Route element={<ProductMessagesChatDefault />} path="chat-product" exact />
              <Route element={<NotificationsDefault />} path="notifications" exact />
              <Route element={<NetworkDefault />} path="network" exact />
              <Route element={<BenefitsDefault />} path="benefits" exact />
              <Route element={<SubscriptionDefault />} path="subscription" exact />
              <Route element={<UserProfileDefault />} path="user-profile" exact />
              <Route element={<UserContactDefault />} path="user-contact" exact />
              <Route element={<UserBillDefault />} path="user-bill" exact />
              <Route element={<UserPaymentMethodsDefault />} path="user-payment-methods" exact />
              <Route element={<UserSecurityDefault />} path="user-security" exact />
            </Route>
          )}
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
