import PropTypes from 'prop-types';

// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography } from '@mui/material';
// project imports
import MainCard from 'components/cards/MainCard';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#27B656',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 160,
    background: 'rgba(0,0,0,0.5)',
    borderRadius: '50%',
    top: -125,
    right: -15,
    opacity: 0.5,
    [theme.breakpoints.down('sm')]: {
      top: -155,
      right: -70
    }
  }
}));

const EarningGreenCard = ({ total, detail }) => {
  return (
    <CardWrapper border={false} content={false}>
      <Box sx={{ p: 2.25 }}>
        <Grid container direction="column">
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography sx={{ fontSize: '1.5rem', fontWeight: 500, mr: 1, mt: 1, mb: 0.75 }}>
                  $ {Number.parseFloat(total).toFixed(2)}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ mb: 1.25 }}>
            <Typography
              sx={{
                fontSize: '0.9rem',
                fontWeight: 500,
                color: '#FFF'
              }}
            >
              {detail}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </CardWrapper>
  );
};

EarningGreenCard.propTypes = {
  total: PropTypes.number,
  detail: PropTypes.string
};

export default EarningGreenCard;
