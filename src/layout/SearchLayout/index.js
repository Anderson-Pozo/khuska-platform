import { Outlet } from 'react-router-dom';
import Header from './Header';
import bg from 'assets/images/search/bg.jpg';

const SearchLayout = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${bg})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        margin: 0,
        padding: 0,
        height: '100vh'
      }}
    >
      <Header />
      <div style={{ marginTop: 75 }}>
        <Outlet />
      </div>
    </div>
  );
};

export default SearchLayout;
