import PropTypes from 'prop-types';

// material-ui
import { styled, useTheme } from '@mui/material/styles';
import { Avatar, Box, Grid, Typography } from '@mui/material';

// project imports
import MainCard from 'components/cards/MainCard';
import SkeletonEarningCard from 'components/cards/Skeleton/EarningCard';

// assets
import { genConst } from 'store/constant';
import { IconTicket } from '@tabler/icons';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: '#9f98c2',
  color: '#FFF',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: '#53338a',
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  }
}));

const SubCard = ({ isLoading, state }) => {
  const theme = useTheme();

  return (
    <>
      {isLoading ? (
        <SkeletonEarningCard />
      ) : (
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
                        mt: 1
                      }}
                    >
                      <IconTicket color="#FFF" />
                    </Avatar>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item>
                <Grid container alignItems="center">
                  <Grid item>
                    <Typography sx={{ fontSize: '1rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75, color: '#FFF' }}>
                      Estado de Subscripción
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: '#FFF'
                  }}
                >
                  {state === genConst.CONST_SUB_STATE_ACTIVE ? genConst.CONST_SUB_STATE_ACT_TEXT : genConst.CONST_SUB_STATE_INA_TEXT}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </CardWrapper>
      )}
    </>
  );
};

SubCard.propTypes = {
  isLoading: PropTypes.bool,
  state: PropTypes.number
};

export default SubCard;
