import { Outlet } from 'react-router-dom';
// project imports
import Social from '../Social';

const HomeLayout = () => (
  <>
    <Outlet />
    <Social />
  </>
);

export default HomeLayout;
