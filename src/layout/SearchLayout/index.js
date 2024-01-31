// project imports
import Header from 'components/search/Header';
import hero from 'assets/images/search/bg1.jpg';
import { CssBaseline } from '@mui/material';
import Footer from 'components/search/Footer';

const SearchLayout = () => (
  <div>
    <CssBaseline />
    <div style={{ background: 'rgba(0,0,0,0.9)' }}>
      <div
        style={{
          backgroundImage: `url(${hero})`,
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
          margin: 0,
          padding: 0
        }}
      >
        <Header />
      </div>
    </div>
    <Footer />
  </div>
);

export default SearchLayout;
