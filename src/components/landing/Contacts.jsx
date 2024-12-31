import React, { useState } from 'react';
import { uiStyles } from './styles';
import { useTheme } from '@mui/material/styles';
import { Box, ButtonGroup, Button, Grid, Modal, FormControl, InputLabel, OutlinedInput } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandWhatsapp,
  IconDeviceMobile,
  IconId,
  IconInfoSquare,
  IconMail
} from '@tabler/icons';
import * as Msg from 'store/message';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { generateId } from 'utils/idGenerator';
import { createDocument } from 'config/firebaseEvents';
import { collMail } from 'store/collections';
import { fullDate } from 'utils/validations';

export default function Contacts() {
  const theme = useTheme();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [openLoader, setOpenLoader] = useState(false);

  const handleSendMessage = () => {
    if (!name || !email || !phone || !subject || !message) {
      toast.info(Msg.requiered, { position: toast.POSITION.TOP_RIGHT });
    } else {
      setOpenLoader(true);
      const ide = generateId(10);
      const object = {
        id: ide,
        name: name,
        phone: phone,
        email: email,
        subject: subject,
        message: message,
        createAt: fullDate(),
        updateAt: null,
        deleteAt: null,
        state: 1
      };
      setTimeout(() => {
        createDocument(collMail, ide, object);
        setOpenLoader(false);
        toast.success('Mensaje enviado correctamente!', { position: toast.POSITION.TOP_RIGHT });
        clearData();
      }, 3000);
    }
  };

  const clearData = () => {
    setName('');
    setEmail('');
    setPhone('');
    setSubject('');
    setMessage('');
  };

  return (
    <div style={uiStyles.rootContact} id="contacts">
      <ToastContainer />
      <Grid container spacing={0}>
        <Grid xs={12} sm={12} md={6} lg={6} sx={{ marginTop: 10, p: 1 }} item={true}>
          <Box
            sx={{ p: 3 }}
            style={{
              borderRadius: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#fff',
              width: '100%',
              height: 350
            }}
          >
            <h2 style={{ color: '#FFF', marginBottom: 30 }}>CONTÁCTANOS</h2>
            <p style={{ textAlign: 'justify', textJustify: 'inter-word', fontSize: 16, lineHeight: 'normal' }}>
              Puedes enviar tus mensajes vía mail, WhatsApp y nuestro equipo te contestará a la brevedad posible, estaremos gustosos de
              asesorarte para que consigas lo que estás buscando.
            </p>
            <h3 style={{ color: '#FFF', marginTop: 30, fontSize: 16 }}>Síguenos en nuestras Redes Sociales:</h3>
            <center>
              <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
                <Button variant="outlined" style={{ width: 60, height: 60 }}>
                  <IconBrandFacebook size={35} color="#FFF" />
                </Button>
                <Button variant="outlined" style={{ width: 60, height: 60 }}>
                  <IconBrandInstagram size={35} color="#FFF" />
                </Button>
                <Button variant="outlined" style={{ width: 60, height: 60 }}>
                  <IconBrandWhatsapp size={35} color="#FFF" />
                </Button>
              </ButtonGroup>
            </center>
          </Box>
        </Grid>
        <Grid xs={12} sm={12} md={6} lg={6} sx={{ marginTop: 5, p: 1 }} item={true}>
          <Box
            sx={{ p: 5 }}
            style={{
              borderRadius: 10,
              backgroundColor: 'rgba(0,0,0,0.5)',
              color: '#fff',
              width: '100%'
            }}
          >
            <center>
              <h2 style={{ lineHeight: 'normal' }}>O escríbenos tus dudas en el siguiente formulario:</h2>
              <Grid container spacing={0}>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 0 }}>
                    <InputLabel htmlFor="outlined-adornment-name">Nombres Completos</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-name"
                      type="text"
                      name="name"
                      onChange={(ev) => setName(ev.target.value)}
                      endAdornment={<IconId />}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 0 }}>
                    <InputLabel htmlFor="outlined-adornment-email">Correo Electrónico</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-email"
                      type="email"
                      name="email"
                      onChange={(ev) => setEmail(ev.target.value)}
                      endAdornment={<IconMail />}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 0 }}>
                    <InputLabel htmlFor="outlined-adornment-phone">Teléfono</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-phone"
                      type="text"
                      name="phoone"
                      onChange={(ev) => setPhone(ev.target.value)}
                      endAdornment={<IconDeviceMobile />}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={6} md={6} sm={12} xs={12}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 0 }}>
                    <InputLabel htmlFor="outlined-adornment-subject">Asunto</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-subject"
                      type="text"
                      name="subject"
                      onChange={(ev) => setSubject(ev.target.value)}
                      endAdornment={<IconInfoSquare />}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <FormControl fullWidth sx={{ ...theme.typography.customInput, padding: 0, paddingRight: 0 }}>
                    <InputLabel htmlFor="outlined-adornment-message">Mensaje</InputLabel>
                    <OutlinedInput
                      id="outlined-adornment-message"
                      type="text"
                      name="message"
                      onChange={(ev) => setMessage(ev.target.value)}
                      multiline
                      rows={4}
                    />
                  </FormControl>
                </Grid>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={handleSendMessage}
                    style={{ height: 50, borderRadius: 12 }}
                  >
                    Enviar
                  </Button>
                </Grid>
              </Grid>
            </center>
          </Box>
        </Grid>
      </Grid>
      <Modal open={openLoader} aria-labelledby="modal-loader" aria-describedby="modal-loader">
        <center>
          <Box sx={uiStyles.styleLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </div>
  );
}
