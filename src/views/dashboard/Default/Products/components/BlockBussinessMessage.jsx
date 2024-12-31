import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { IconAlertCircle } from '@tabler/icons';
import { useNavigate } from 'react-router';

export const BlockBussinessMessage = () => {
  const navigate = useNavigate();
  return (
    <Grid container justifyContent="center" style={{ marginTop: 20 }}>
      <Grid item xs={12} sm={8} md={6}>
        <Paper elevation={3} style={{ padding: '20px', textAlign: 'center' }}>
          <Box display="flex" justifyContent="center" mb={2}>
            <IconAlertCircle size={50} color="red" />
          </Box>
          <Typography variant="h5" color="error" gutterBottom>
            Negocio desactivado
          </Typography>
          <Typography variant="body1" gutterBottom>
            Este negocio ha sido desactivado por el administrador. Como resultado, todos los productos asociados a este negocio ya no
            estarán visibles para los clientes.
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Contacta al administrador para obtener más información.
          </Typography>
          <Box mt={3}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(-1)} // Regresa a la página anterior
            >
              Regresar
            </Button>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};
