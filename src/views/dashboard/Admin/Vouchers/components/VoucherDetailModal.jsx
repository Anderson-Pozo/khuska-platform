import { useState } from 'react';
import { Alert, Box, Button, ButtonGroup, CircularProgress, Grid, IconButton, Modal, Snackbar, TextField, Typography } from '@mui/material';
import { IconCheck, IconCircleX, IconDownload, IconX } from '@tabler/icons';
import { saveAs } from 'file-saver';
import { genConst, SUBSCRIPTION_TYPES, VOUCHER_STATUS } from 'store/constant';
import { uiStyles } from '../Voucher.styles';
import { titles } from '../Vouchers.texts';
import { getRangeSubscriptionDates, subscribeUser } from 'services/userSubscriptionService';
import { getUserById, updateDocument } from 'config/firebaseEvents';
import { collVoucher } from 'store/collections';
import { calculatePricing } from 'utils/calculateTotals';
import { toast } from 'react-toastify';

export const VoucherDetailModal = ({ voucher, openView, handleCloseView, fetchVouchers }) => {
  // console.log({ voucher });
  const { id, userId, userName, userEmail, total, type, createAt, picture, title, observation } = voucher;

  const [openActivation, setOpenActivation] = useState(false);
  const [openReject, setOpenReject] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [rejectObservation, setRejectObservation] = useState('');

  const handleDownload = () => {
    saveAs(picture, createAt + 'voucher.jpg');
  };

  const handeCloseAllModals = () => {
    handleCloseView();
    setOpenActivation(false);
    setOpenReject(false);
    setRejectObservation('');
    setError(null);
  };

  const handleActivation = async () => {
    setLoading(true);
    setError(null);
    try {
      const user = await getUserById(userId);
      const { startDate, endDate, endDateFormat } = await getRangeSubscriptionDates({ userId, typeSubscription: type });

      const subscriptionType = type === SUBSCRIPTION_TYPES.MONTHLY.id ? SUBSCRIPTION_TYPES.MONTHLY : SUBSCRIPTION_TYPES.YEARLY;
      const { subtotal, ivaValue, total: totalValue } = calculatePricing(subscriptionType.value);
      // return;
      const subscriptionObject = {
        user: {
          userId: user[0].id,
          userName: user[0].fullName,
          userEmail: user[0].email
        },
        code: null,
        startDate,
        endDate,
        endDateFormat,
        type,
        totals: {
          subtotal,
          iva: ivaValue,
          total: totalValue
        },
        transaction: {
          clientTransactionId: null,
          transactionId: null,
          status: 3
        }
      };
      // console.log({ subscriptionObject });

      await subscribeUser(subscriptionObject);
      await updateDocument(collVoucher, id, {
        status: VOUCHER_STATUS.APROBADO
      });
      toast.success('Suscripción activada correctamente');
      handeCloseAllModals();
      fetchVouchers && fetchVouchers();
    } catch (err) {
      setError('Error al activar la suscripción');
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectObservation.trim()) {
      setError('La observación es requerida');
      return;
    }

    // return;

    setLoading(true);
    setError(null);

    try {
      await updateDocument(collVoucher, id, {
        status: VOUCHER_STATUS.RECHAZADO,
        observation: rejectObservation.trim()
      });
      toast.success('Acción completada correctamente');
      handeCloseAllModals();
      fetchVouchers && fetchVouchers();
    } catch (err) {
      setError('Error al rechazar el comprobante');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Modal open={openView} onClose={handleCloseView} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.modalStylesView}>
          <IconButton
            sx={{
              position: 'absolute',
              right: 8,
              top: 8
            }}
            onClick={handleCloseView}
          >
            <IconX />
          </IconButton>
          <Typography id="modal-modal-title" variant="h2" component="h2" align="center">
            {title}
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" align="center" style={{ marginTop: 20, fontSize: 16 }}>
            {'Comprobante: '} <strong>{id}</strong>
          </Typography>
          <Typography id="modal-modal-title" variant="p" component="p" align="center" style={{ marginTop: 20, fontSize: 16 }}>
            <p style={{ fontSize: 13 }}>ID Usuario: {userId}</p>
            <p style={{ fontSize: 13 }}>Usuario: {userName}</p>
            <p style={{ fontSize: 13 }}>Email: {userEmail}</p>
            <p style={{ fontSize: 13 }}>Total: ${Number.parseFloat(total).toFixed(2)}</p>
            <p style={{ fontSize: 13 }}>Tipo: {type == 1 ? genConst.CONST_MONTH_TXT : genConst.CONST_YEAR_TXT}</p>
            <p style={{ fontSize: 13 }}>Fecha: {createAt}</p>
            <p style={{ fontSize: 13 }}>Observación: {observation || ''}</p>
          </Typography>
          <Grid container spacing={1}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <center>
                <div style={{ border: 'dashed gray', borderRadius: 10, borderWidth: 0.2, height: '100%', cursor: 'pointer' }}>
                  <img src={picture} alt="Voucher Img" width={100} />
                </div>
              </center>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 2 }}>
              <center>
                <ButtonGroup>
                  <Button
                    variant="contained"
                    startIcon={<IconDownload />}
                    size="large"
                    style={{ backgroundColor: genConst.CONST_CREATE_COLOR }}
                    onClick={handleDownload}
                  >
                    {titles.buttonDownload}
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<IconCheck />}
                    size="large"
                    style={{ backgroundColor: genConst.CONST_SUCCESS_COLOR }}
                    onClick={() => setOpenActivation(true)}
                  >
                    {titles.buttonActive}
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<IconCircleX />}
                    size="large"
                    style={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                    onClick={() => setOpenReject(true)}
                  >
                    {titles.buttonReject}
                  </Button>
                </ButtonGroup>
              </center>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      {/* Modal de activacion  */}
      <Modal
        open={openActivation}
        onClose={() => setOpenActivation(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <center>
          <Box sx={uiStyles.modalStylesDelete}>
            <Typography id="modal-modal-title" variant="h2" component="h2">
              {titles.titleActivation}
            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p">
              {titles.titleActivationModal}
            </Typography>
            <Typography id="modal-modal-title" variant="p" component="p">
              <p style={{ fontSize: 13 }}>Usuario: {userName}</p>
              <p style={{ fontSize: 13 }}>Email: {userEmail}</p>
              <p style={{ fontSize: 13 }}>Total: ${Number.parseFloat(total).toFixed(2)}</p>
              <p style={{ fontSize: 13 }}>Tipo: {type == 1 ? genConst.CONST_MONTH_TXT : genConst.CONST_YEAR_TXT}</p>
            </Typography>
            <Grid container style={{ marginTop: 10 }}>
              <Grid item xs={12}>
                <Grid container spacing={1}>
                  <Grid item lg={12} md={12} sm={12} xs={12}>
                    <center>
                      <ButtonGroup>
                        <Button
                          variant="contained"
                          startIcon={loading ? <CircularProgress size={20} /> : <IconCheck />}
                          size="large"
                          style={{ backgroundColor: genConst.CONST_UPDATE_COLOR }}
                          onClick={handleActivation}
                          disabled={loading}
                        >
                          {loading ? 'Cargando...' : titles.buttonActive}
                        </Button>
                        <Button
                          variant="contained"
                          startIcon={<IconCircleX />}
                          size="large"
                          style={{ backgroundColor: genConst.CONST_CANCEL_COLOR }}
                          onClick={() => setOpenActivation(false)}
                        >
                          {titles.buttonCancel}
                        </Button>
                      </ButtonGroup>
                    </center>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </center>
      </Modal>
      {/* Modal de rechazo */}
      <Modal open={openReject} onClose={() => !loading && setOpenReject(false)} aria-labelledby="reject-modal">
        <center>
          <Box sx={uiStyles.modalStylesDelete}>
            <Typography variant="h2" component="h2">
              Rechazar Comprobante
            </Typography>

            <Typography variant="p" component="p" sx={{ mt: 2 }}>
              Por favor, ingrese el motivo del rechazo:
            </Typography>

            <TextField
              fullWidth
              multiline
              rows={4}
              value={rejectObservation}
              onChange={(e) => setRejectObservation(e.target.value)}
              placeholder="Ingrese la observación..."
              sx={{ mt: 2 }}
              error={error && !rejectObservation.trim()}
              helperText={error && !rejectObservation.trim() ? 'Campo requerido' : ''}
            />

            <Grid container sx={{ mt: 2 }}>
              <Grid item xs={12}>
                <center>
                  <ButtonGroup>
                    <Button
                      variant="contained"
                      startIcon={loading ? <CircularProgress size={20} /> : <IconCircleX />}
                      size="large"
                      sx={{ backgroundColor: genConst.CONST_DELETE_COLOR }}
                      onClick={handleReject}
                      disabled={loading}
                    >
                      {loading ? 'Cargando...' : titles.buttonReject}
                    </Button>
                    <Button
                      variant="contained"
                      startIcon={<IconX />}
                      size="large"
                      sx={{ backgroundColor: genConst.CONST_CANCEL_COLOR }}
                      onClick={() => setOpenReject(false)}
                      disabled={loading}
                    >
                      {titles.buttonCancel}
                    </Button>
                  </ButtonGroup>
                </center>
              </Grid>
            </Grid>
          </Box>
        </center>
      </Modal>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)}>
        <Alert severity="error" onClose={() => setError(null)}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};
