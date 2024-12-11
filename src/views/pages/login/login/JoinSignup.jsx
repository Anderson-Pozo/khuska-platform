import { Link, useSearchParams } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography, useMediaQuery } from '@mui/material';
// project imports
import AuthWrapper1 from '../AuthWrapper';
import AuthCardWrapper from '../AuthCardWrapper';
import Logo from 'components/Logo-md';
import AuthFooter from 'components/cards/AuthFooter';
// assets
import bg01 from 'assets/images/05.webp';
import { useGetReferalCode } from 'hooks/useGetReferalCode';
import AuthJoinRegister from '../auth-forms/AuthJoinRegister';
import { useGetUserName } from 'hooks/useGetUserName';

const JoinSignup = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const code = useGetReferalCode(id);
  const name = useGetUserName(id);
  const theme = useTheme();
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <AuthWrapper1
      style={{
        backgroundImage: `url(${bg01})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        margin: 0,
        padding: 0
      }}
    >
      <Grid container direction="column">
        <Grid item xs={12}>
          <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 57px)' }}>
            <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
              <AuthCardWrapper>
                <Grid container spacing={2} alignItems="center" justifyContent="center">
                  <Grid item>
                    <Logo />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container direction={matchDownSM ? 'column-reverse' : 'row'} alignItems="center" justifyContent="center">
                      <Grid item>
                        <Stack alignItems="center" justifyContent="center" spacing={2}>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h4' : 'h3'}>
                            Regístrate
                          </Typography>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h6' : 'h5'}>
                            Invitación a unirse a Khuska por:
                          </Typography>
                          <Typography color={theme.palette.secondary.main} gutterBottom variant={matchDownSM ? 'h6' : 'h5'}>
                            {name} - {code}
                          </Typography>
                        </Stack>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <AuthJoinRegister code={code} />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider />
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item container direction="column" alignItems="center" xs={12}>
                      <Typography component={Link} to="/auth/signin" variant="subtitle1" sx={{ textDecoration: 'none' }}>
                        Ya tienes una cuenta?
                      </Typography>
                    </Grid>
                  </Grid>
                </Grid>
              </AuthCardWrapper>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
          <AuthFooter />
        </Grid>
      </Grid>
    </AuthWrapper1>
  );
};

export default JoinSignup;
