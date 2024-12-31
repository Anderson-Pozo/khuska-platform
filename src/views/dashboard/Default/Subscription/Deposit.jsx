/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Typography, Button, Modal, Box, ButtonGroup } from '@mui/material';
import { createDocument, getCtaList, getUserById, updateDocument } from 'config/firebaseEvents';
import { IconCircleX, IconFile, IconSend } from '@tabler/icons';
import { genConst, VOUCHER_STATUS } from 'store/constant';
import defaultImage from 'assets/images/addImgB.png';
import CircularProgress from '@mui/material/CircularProgress';
import { generateId } from 'utils/idGenerator';
import { fullDate } from 'utils/validations';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication, storage } from 'config/firebase';
import * as Msg from 'store/message';
import { collVoucher } from 'store/collections';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Deposit = (props) => {
  const { total, type } = props;
  let navigate = useNavigate();
  const [ctas, setCtas] = useState([]);
  const [open, setOpen] = useState(false);
  const [picture, setPicture] = useState({ preview: '', raw: '' });
  const [openLoader, setOpenLoader] = useState(false);
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
        setUserEmail(user.email);
        getUserById(user.uid).then((usr) => {
          setUserPhone(usr[0].phone);
        });
      }
    });
    getCtaList().then((data) => {
      setCtas(data);
    });
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSend = () => {
    if (!picture.preview) {
      toast.info(Msg.compreq, { position: toast.POSITION.TOP_RIGHT });
    } else {
      setOpenLoader(true);
      const idComp = generateId(10);
      const object = {
        id: idComp,
        userId: userId,
        userName: userName,
        userEmail: userEmail,
        total: total,
        type: type,
        status: VOUCHER_STATUS.PENDIENTE,
        observation: null,
        phone: userPhone ? userPhone : null,
        createAt: fullDate(),
        picture: null
      };
      createDocument(collVoucher, idComp, object);
      setTimeout(() => {
        //picture
        if (picture.raw !== null) {
          const imageName = idComp + 'voucher.jpg';
          const imageRef = ref(storage, `vouchers/${imageName}`);
          uploadBytes(imageRef, picture.raw).then((snap) => {
            getDownloadURL(snap.ref).then((url) => {
              const obj = {
                picture: url
              };
              updateDocument(collVoucher, idComp, obj);
            });
          });
        }
        setOpenLoader(false);
        toast.success(Msg.voucresucc, { position: toast.POSITION.TOP_RIGHT });
        navigate('/app/dashboard');
      }, 3000);
    }
  };

  const handleChange = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      img.onload = () => {
        setPicture({
          preview: img.src,
          raw: raw
        });
      };
    }
  };

  return (
    <Grid container spacing={2} sx={{ marginTop: 2 }}>
      <ToastContainer />
      {ctas.map((ct) => (
        <Grid lg={6} md={6} sm={12} xs={12} key={ct.id} sx={{ marginTop: 2, marginBottom: 2 }} item={true}>
          <Grid container spacing={2}>
            <Grid xs={12} item={true}>
              <center>
                <img src={ct.url} alt="Bank Brand" width={75} />
              </center>
            </Grid>
            <Grid lg={12} md={12} sm={12} xs={12} item={true}>
              <Typography variant={'h5'} style={{ textAlign: 'center', marginLeft: 20 }}>
                {ct.ctaBankName}
              </Typography>
            </Grid>
            <Grid lg={12} md={12} sm={12} xs={12} item={true}>
              <Typography variant={'h5'} style={{ textAlign: 'center', marginLeft: 20 }}>
                {ct.ctaNameAccount}
              </Typography>
            </Grid>
            <Grid lg={12} md={12} sm={12} xs={12} item={true}>
              <Typography variant={'h5'} style={{ textAlign: 'center', marginLeft: 20 }}>
                {ct.ctaNumberAccount}
              </Typography>
            </Grid>
            <Grid lg={12} md={12} sm={12} xs={12} item={true}>
              <Typography variant={'h5'} style={{ textAlign: 'center', marginLeft: 20 }}>
                {ct.ctaCi}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      ))}
      <Grid container xs={12} sx={{ marginTop: 2, flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }} item={true}>
        <Box>
          <span style={{ fontSize: 15, color: '#3a3b3c' }}>
            Total a depositar: <b>{total} $</b>
          </span>
        </Box>
        <Box sx={{ marginTop: 1 }}>
          <Button variant="outlined" startIcon={<IconFile />} onClick={() => setOpen(true)} sx={{ height: 50 }}>
            Adjuntar Comprobante
          </Button>
        </Box>
      </Grid>

      <Modal open={open} onClose={handleClose} aria-labelledby="parent-modal-title" aria-describedby="parent-modal-description">
        <Box sx={uiStyles.modal}>
          <Grid container style={{ marginTop: 10 }}>
            <Grid item xs={12}>
              <Grid container spacing={1}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <center>
                    <div
                      style={{
                        border: 'dashed gray',
                        borderRadius: 10,
                        borderWidth: 0.2,
                        width: 300,
                        height: 160,
                        cursor: 'pointer'
                      }}
                    >
                      <center>
                        <input type="file" id="picture" style={{ display: 'none' }} onChange={handleChange} accept="image/*" />
                        <div htmlFor="picture" id="picture">
                          <label htmlFor="picture">
                            <img
                              src={picture.preview || defaultImage}
                              alt="Comprobante"
                              width={picture.preview ? 170 : 80}
                              height={picture.preview ? 150 : 80}
                              style={{ borderRadius: 15, paddingTop: 5, cursor: 'pointer' }}
                            />
                            {picture.preview ? '' : <p style={{ fontSize: 15, color: '#3a3b3c', marginTop: 30 }}>Adjuntar comprobante</p>}
                          </label>
                        </div>
                      </center>
                    </div>
                  </center>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <center>
                    <ButtonGroup>
                      <Button
                        variant="contained"
                        startIcon={<IconSend />}
                        size="large"
                        style={{ backgroundColor: genConst.CONST_CREATE_COLOR }}
                        onClick={handleSend}
                      >
                        Enviar
                      </Button>
                      <Button
                        variant="contained"
                        startIcon={<IconCircleX />}
                        size="large"
                        style={{ backgroundColor: genConst.CONST_CANCEL_COLOR }}
                        onClick={handleClose}
                      >
                        Cancelar
                      </Button>
                    </ButtonGroup>
                  </center>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
      <Modal open={openLoader} aria-labelledby="modal-loader" aria-describedby="modal-loader">
        <center>
          <Box sx={uiStyles.modalLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </Grid>
  );
};

export default Deposit;

const uiStyles = {
  modal: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '@media (min-width: 718px)': {
      width: 400
    },
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 6,
    boxShadow: 24,
    p: 4
  },
  modalLoader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 80,
    height: 80,
    bgcolor: 'transparent',
    border: 'none',
    borderRadius: 6,
    boxShadow: 0,
    p: 4
  }
};
