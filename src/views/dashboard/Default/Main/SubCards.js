import { styled, useTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import MainCard from 'components/cards/MainCard';
import { IconTicket } from '@tabler/icons';

const CardWrapper = styled(MainCard)(({ theme }) => ({
  backgroundColor: theme.palette.secondary.dark,
  color: '#fff',
  overflow: 'hidden',
  position: 'relative',
  '&:after': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
    background: 'rgba(255,255,255,0.7)',
    borderRadius: '50%',
    top: -85,
    right: -95,
    [theme.breakpoints.down('sm')]: {
      top: -105,
      right: -140
    }
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    width: 210,
    height: 210,
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

const SubCards = () => {
  const theme = useTheme();
  let navigate = useNavigate();

  return (
    <CardWrapper border={false} content={false}>
      <Box sx={{ p: 2.25 }}>
        <Grid container direction="column">
          <Grid item>
            <Grid container justifyContent="space-between">
              <Grid item lg={2} md={2} sm={2} xs={2}>
                <Avatar
                  variant="rounded"
                  sx={{
                    ...theme.typography.commonAvatar,
                    ...theme.typography.largeAvatar,
                    backgroundColor: '#FFF',
                    mt: 1
                  }}
                >
                  <IconTicket />
                </Avatar>
              </Grid>
              <Grid item lg={10} md={10} sm={10} xs={10}>
                <Typography sx={{ fontSize: '1rem', fontWeight: 500, mr: 1, mt: 1.75, mb: 0.75, color: '#FFF' }}>
                  Renueva tu suscripción
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item sx={{ mt: 3 }}>
            <Grid container alignItems="center">
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <center>
                  <Button
                    variant="outlined"
                    style={{ color: '#FFF', borderColor: '#FFF', marginTop: 10, width: 200 }}
                    onClick={() => navigate('/app/subscription')}
                  >
                    Clic aquí
                  </Button>
                </center>
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
            ></Typography>
          </Grid>
        </Grid>
      </Box>
    </CardWrapper>
  );
};

export default SubCards;
