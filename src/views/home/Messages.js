import React, { useEffect, useState } from 'react';
import { Avatar, Box, Grid, Modal, Typography, ListItemButton, ButtonGroup, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './styles';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { createDocument, getChatByMessageId, getMessageByUserId } from 'config/firebaseEvents';
import MessageDark from 'components/message/MessageDark';
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
        backgroundColor: '#242526'
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
  const [openLoader, setOpenLoader] = useState(false);
  const [messages, setMessages] = useState([]);
  const [chats, setChats] = useState([]);
  const [idMsn, setIdMsn] = useState('');
  const [message, setMessage] = useState('');
  const classes = useStyles();

  const CustomButton = styled(ListItemButton)({
    minHeight: 60,
    justifyContent: 'initial',
    color: '#FFF',
    backgroundColor: '#242526',
    borderRadius: 8,
    marginTop: 4,
    '&:hover': {
      backgroundColor: '#3a3b3c',
      color: '#FFF'
    }
  });

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        getMessageByUserId(user.uid).then((data) => {
          setMessages(data);
        });
      }
    });
    setOpenLoader(false);
  }, []);

  const handleSendMessage = () => {
    if (!message) {
      toast.info('Debe ingresar un mensaje', { position: toast.POSITION.TOP_RIGHT });
    } else {
      setOpenLoader(true);
      const msnChat = generateId(10);
      const objChat = {
        id: msnChat,
        idMsn: idMsn,
        message: message,
        createAt: serverTimestamp()
      };
      createDocument(collChat, msnChat, objChat);
      setTimeout(() => {
        setOpenLoader(false);
        toast.success('Mensaje enviado correctamente!', { position: toast.POSITION.TOP_RIGHT });
        let newChat = [...chats];
        getChatByMessageId(idMsn).then((chat) => {
          newChat = [...chats, chat];
          setChats(newChat);
        });
        setMessage('');
      }, 200);
    }
  };

  return (
    <Box>
      <ToastContainer />
      {messages.length > 0 ? (
        <Grid container spacing={1} style={{ marginTop: 5 }}>
          <Grid item lg={12} xs={12}>
            <Grid container spacing={0} style={{ paddingLeft: 0 }}>
              <Grid item lg={4} xs={12} sx={uiStyles.layoutItem}>
                <div style={uiStyles.main}>
                  {messages.map((item) => (
                    <CustomButton
                      key={item.id}
                      onClick={() => {
                        setIdMsn(item.id);
                        getChatByMessageId(item.id).then((chat) => {
                          setChats(chat);
                        });
                      }}
                    >
                      <ButtonGroup>
                        <Avatar src={item.preview} color="inherit" style={{ width: 50, height: 50 }} />
                        <p
                          style={{
                            color: '#E4E6EB',
                            marginLeft: 12,
                            fontSize: 15,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: 230
                          }}
                        >
                          {item.nameProduct}
                        </p>
                      </ButtonGroup>
                    </CustomButton>
                  ))}
                </div>
              </Grid>
              <Grid item lg={8} xs={12}>
                {chats.length > 0 ? (
                  <div style={{ padding: 15 }}>
                    <div style={uiStyles.layoutItem}>
                      <div style={uiStyles.main}>
                        {chats.map((msg) => (
                          <div
                            key={msg.id}
                            style={{
                              justifyItems: 'justify-end',
                              padding: 15,
                              margin: 5,
                              backgroundColor: '#38376e',
                              borderRadius: 10,
                              width: '48%',
                              height: '10%'
                            }}
                          >
                            <Typography component={'h5'} variant="h5" sx={{ textDecoration: 'none', color: '#FFF' }}>
                              {msg.message}
                            </Typography>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ bottom: 0, position: 'fixed', height: 80, width: '53%', padding: 10 }}>
                      <ButtonGroup>
                        <TextField
                          variant="filled"
                          type="text"
                          className={classes.root}
                          label="Mensaje"
                          onChange={(ev) => setMessage(ev.target.value)}
                          sx={{ input: { color: '#FFF', width: 600 } }}
                        />
                        <Button variant="contained" style={{ height: 52, marginLeft: 10, borderRadius: 10 }} onClick={handleSendMessage}>
                          <IconSend />
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                ) : (
                  <Grid container style={{ marginTop: 20, padding: 10 }}>
                    <Grid item xs={12}>
                      <Grid item lg={12} md={12} sm={12} xs={12}>
                        <div style={{ position: 'absolute', top: '50%', left: '65%' }}>
                          <span style={{ color: '#FFF', fontWeight: 'bold' }}>Selecciona algún chat</span>
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      ) : (
        <Grid container style={{ marginTop: 20 }}>
          <Grid item xs={12}>
            <Grid item lg={12} md={12} sm={12} xs={12}>
              <MessageDark message={'No hay mensajes aún!'} submessage="" />
            </Grid>
          </Grid>
        </Grid>
      )}
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
