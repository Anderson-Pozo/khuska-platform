/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Grid, Typography, TextField, Button, Modal } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './Products.styles';
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
      color: '#000'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 15,
      color: '#000'
    },
    '& .MuiFilledInput-root:hover': {
      backgroundColor: '#FFF',
      color: '#000',
      '@media (hover: none)': {
        backgroundColor: '#FFF'
      }
    },
    '& .MuiFilledInput-root.Mui-focused': {
      backgroundColor: '#FFF',
      color: '#000'
    },
    '& .MuiInputLabel-outlined': {
      color: '#000'
    }
  }
}));

export default function Chat() {
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const name = searchParams.get('name');
  const [openLoader, setOpenLoader] = useState(false);
  const [chats, setChats] = useState([]);
  const [message, setMessage] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const classes = useStyles();

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        setUserId(user.uid);
        setUserName(user.displayName);
        getChatByMessageId(id).then((chat) => {
          setChats(chat);
        });
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
        userId: userId,
        userName: userName,
        message: message,
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
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <div style={{ backgroundColor: '#53338a', borderRadius: 10, height: 60, padding: 1 }}>
              <center>
                <h3 style={{ color: '#FFF' }}>{name}</h3>
              </center>
            </div>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12}>
            <Grid container>
              <Grid lg={11} md={11} sm={11} xs={11} sx={{ marginTop: 1 }}>
                <TextField
                  variant="filled"
                  type="text"
                  className={classes.root}
                  label="Mensaje"
                  fullWidth
                  onChange={(ev) => setMessage(ev.target.value)}
                  sx={{ input: { color: '#000' } }}
                />
              </Grid>
              <Grid lg={1} md={1} sm={1} xs={1} sx={{ marginTop: 1 }}>
                <Button fullWidth variant="contained" style={{ height: 52, borderRadius: 10, marginLeft: 1 }} onClick={handleSendMessage}>
                  <IconSend />
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={12} md={12} sm={12} xs={12} sx={{ flex: 1 }}>
            {chats.map((msg) => (
              <div key={msg.id} style={{ display: 'flex', justifyContent: msg.userId ? 'flex-end' : 'flex-start' }}>
                <div
                  style={{
                    padding: 15,
                    backgroundColor: msg.userId ? '#242526' : '#38376e',
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
