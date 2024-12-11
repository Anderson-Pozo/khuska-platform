import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';

// assets
import { IconCash } from '@tabler/icons';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#9f98c2',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: theme.palette.secondary[800],
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

const EarningCard = ({ total, detail }) => {
  const theme = useTheme();

  return (
    <CardWrapper border={false} content={false}>
      <Box sx={{ p: 2.25 }}>
        <Grid container direction="column">
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                    backgroundColor: '#FFF',
                    mt: 1
                  }}
                >
                  <IconCash />
                </Avatar>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid container alignItems="center">
              <Grid item>
                <Typography sx={{ fontSize: '1.6rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75 }}>
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

EarningCard.propTypes = {
  total: PropTypes.number,
  detail: PropTypes.string
};

export default EarningCard;
