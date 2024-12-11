/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Grid, Typography } from '@mui/material';
import { genConst } from 'store/constant';
import { IconCircleCheck } from '@tabler/icons';

const Success = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('order');
  const status = searchParams.get('status');
  let navigate = useNavigate();

  useEffect(() => {
    if (orderId === null) {
      navigate('/app/dashboard');
    }
  }, []);

  const handleReturn = () => {
    navigate('/app/dashboard');
  };

  return (
    <Box sx={{ mt: 25 }}>
      <Grid container spacing={2} alignItems="center" justifyContent="center">
        <Grid item xs={12}>
          <center>
            <IconCircleCheck size={100} color={genConst.CONST_CREATE_COLOR} />
            <Typography variant="h3" color="secondary">
              Tu suscripción a KHUSKA se ha realizado con éxito!
            </Typography>
            {status ? (
              <Typography variant="h4" color="secondary">
                {status == 'COMPLETED' ? 'OK' : 'OK'}
              </Typography>
            ) : (
              <></>
            )}
          </center>
        </Grid>
        <Grid item xs={12}>
          <center>
            <Button
              variant="contained"
              size="large"
              style={{ backgroundColor: genConst.CONST_CREATE_COLOR, color: '#FFF' }}
              onClick={handleReturn}
            >
              Bienvenido
            </Button>
          </center>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Success;
