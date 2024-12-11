/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Button, Modal } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './styles';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { createDocument, getChatByMessageId } from 'config/firebaseEvents';
import { IconSend } from '@tabler/icons';
import { serverTimestamp } from 'firebase/firestore';
import { generateId } from 'utils/idGenerator';
import { collChat } from 'store/collections';

const useStyles = makeStyles(() => ({
  root: {
    '& .MuiInputBase-root': {
      color: '#FFF'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#242526',
      borderRadius: 10,
      marginBottom: 15,
      color: '#FFF'
    },
    '& .MuiFilledInput-root:hover': {
      backgroundColor: '#242526',
      color: '#FFF',
      '@media (hover: none)': {
        backgroundColor: '#242526',
        color: '#FFF'
      }
    },
    '& .MuiFilledInput-root.Mui-focused': {
      backgroundColor: '#242526',
      color: '#FFF',
      border: '1px solid #242526'
    },
    '& .MuiInputLabel-outlined': {
      color: '#FFF'
    }
  }
}));

export default function Messages() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  let navigate = useNavigate();
  const [openLoader, setOpenLoader] = useState(false);
  const [chats, setChats] = useState([]);
  const [userId, setUserId] = useState('');
  const [message, setMessage] = useState('');
  const classes = useStyles();

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        setUserId(user.uid);
        getChatByMessageId(id).then((chat) => {
          setChats(chat);
        });
      } else {
        navigate('/market/main');
      }
    });
    setOpenLoader(false);
  }, [id]);

  const reloadData = () => {
    getChatByMessageId(id).then((chat) => {
      setChats(chat);
    });
  };

  const handleSendMessage = () => {
    if (!message) {
      toast.info('Debe ingresar un mensaje', { position: toast.POSITION.TOP_RIGHT });
    } else {
      setOpenLoader(true);
      const msnChat = generateId(10);
      const objChat = {
        id: msnChat,
        idMsn: id,
        message: message,
        userId: userId,
        createAt: serverTimestamp()
      };
      createDocument(collChat, msnChat, objChat);
      setTimeout(() => {
        setOpenLoader(false);
        toast.success('Mensaje enviado correctamente!', { position: toast.POSITION.TOP_RIGHT });
        setMessage('');
        reloadData();
      }, 200);
    }
  };

  return (
    <Box>
      <ToastContainer />
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12} xs={12}>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 1 }}>
            <Typography component={Link} to="/market/messages" variant="h6" sx={{ textDecoration: 'none', color: '#3a3b3c' }}>
              Regresar
            </Typography>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 1 }}>
            <div style={{ backgroundColor: '#53338a', borderRadius: 10, height: 60, padding: 2 }}>
              <center>
                <h3 style={{ color: '#FFF', fontSize: 14 }}>{name}</h3>
              </center>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ mt: 0.5 }}>
            <Grid container style={{ backgroundColor: '#3a3b3c', borderRadius: 10, height: 70, padding: 2 }}>
              <Grid lg={9} md={9} sm={9} xs={9} sx={{ marginTop: 0.5, marginLeft: 0.6 }}>
                <TextField
                  variant="filled"
                  type="text"
                  className={classes.root}
                  label="Mensaje"
                  fullWidth
                  onChange={(ev) => setMessage(ev.target.value)}
                  sx={{ input: { color: '#FFF' } }}
                />
              </Grid>
              <Grid lg={2} md={2} sm={2} xs={2} sx={{ marginTop: 0.6 }}>
                <Button variant="contained" style={{ height: 52, borderRadius: 10, marginLeft: 10 }} onClick={handleSendMessage}>
                  <IconSend size={20} color={'#FFF'} />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ flex: 1 }}>
            {chats.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.userId === userId ? 'flex-start' : 'flex-end' }}>
                <div
                  key={msg.id}
                  style={{
                    padding: 15,
                    backgroundColor: msg.userId === userId ? '#38376e' : '#242526',
                    borderRadius: 10,
                    width: '49%',
                    height: '100%',
                    margin: 2
                  }}
                >
                  <Typography component={'h5'} variant="h5" sx={{ textDecoration: 'none', color: '#FFF', fontSize: 13 }}>
                    {msg.message}
                  </Typography>
                </div>
              </div>
            ))}
          </Grid>
        </Grid>
      </Grid>
      <Modal open={openLoader} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.modalLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </Box>
  );
}
