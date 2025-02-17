import PropTypes from 'prop-types';
import { Box } from '@mui/material';
import MainCard from 'components/cards/MainCard';

const AuthCard = ({ children, ...other }) => (
  <MainCard
    sx={{
      backgroundColor: '#242526',
      maxWidth: { xs: 400, lg: 475 },
      margin: { xs: 2.5, md: 3 },
      '& > *': {
        flexGrow: 1,
        flexBasis: '50%'
      }
    }}
    content={false}
    {...other}
  >
    <Box sx={{ p: { xs: 2, sm: 3, xl: 5 } }}>{children}</Box>
  </MainCard>
);

AuthCard.propTypes = {
  children: PropTypes.node
};

export default AuthCard;
