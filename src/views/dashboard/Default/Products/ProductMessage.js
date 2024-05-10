import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Avatar, Box, Grid, Modal, ListItemButton, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './Products.styles';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { getMessageByProductId } from 'config/firebaseEvents';
import MessageDark from 'components/message/MessageDark';

export default function Messages() {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const idProduct = searchParams.get('id');
  const [openLoader, setOpenLoader] = useState(false);
  const [messages, setMessages] = useState([]);

  const CustomButton = styled(ListItemButton)({
    height: 70,
    justifyContent: 'initial',
    color: '#FFF',
    backgroundColor: '#242526',
    borderRadius: 10,
    marginTop: 1,
    '&:hover': {
      backgroundColor: '#3a3b3c',
      color: '#FFF'
    }
  });

  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        getMessageByProductId(idProduct).then((data) => {
          setMessages(data);
        });
      }
    });
    setOpenLoader(false);
  }, [idProduct]);

  return (
    <Box>
      <ToastContainer />
      {messages.length > 0 ? (
        <Grid container spacing={1} style={{ marginTop: 5 }}>
          <Grid item lg={12} xs={12}>
            <Grid container spacing={0} style={{ paddingLeft: 0 }}>
              <Grid item lg={12} xs={12}>
                {messages.map((item) => (
                  <CustomButton
                    key={item.id}
                    onClick={() => {
                      navigate({
                        pathname: '/app/chat-product/',
                        search: `?id=${item.id}&name=${item.nameProduct}`
                      });
                    }}
                  >
                    <Grid container>
                      <Grid lg={1} xs={1}>
                        <Avatar src={item.preview} color="inherit" style={{ width: 40, height: 40, marginTop: 8 }} />
                      </Grid>
                      <Grid lg={8} xs={8}>
                        <p
                          style={{
                            color: '#E4E6EB',
                            marginLeft: 12,
                            fontSize: 14,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            width: '100%'
                          }}
                        >
                          {item.nameProduct}
                        </p>
                      </Grid>
                      <Grid lg={3} xs={3}>
                        <p
                          style={{
                            color: '#E4E6EB',
                            marginLeft: 12,
                            fontSize: 13
                          }}
                        >
                          {item.fromName}
                        </p>
                      </Grid>
                    </Grid>
                    <ButtonGroup></ButtonGroup>
                  </CustomButton>
                ))}
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
