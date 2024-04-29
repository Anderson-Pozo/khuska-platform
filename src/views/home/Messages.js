import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Avatar, Box, Divider, Grid, Modal, Typography, ListItemButton, ButtonGroup } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './styles';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { IconArrowLeft } from '@tabler/icons';
import { getMessageByUserId } from 'config/firebaseEvents';

export default function Messages() {
  const [openLoader, setOpenLoader] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState(null);

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

  return (
    <Box>
      <ToastContainer />
      <Grid container spacing={1} style={{ marginTop: 5 }}>
        <Grid item lg={12} xs={12}>
          <Grid container spacing={0} style={{ paddingLeft: 20 }}>
            <Grid item lg={4} xs={12} sx={uiStyles.layoutItem}>
              <div style={uiStyles.main}>
                <Typography component={Link} to="/market/main" variant="h3" sx={{ textDecoration: 'none', color: '#FFF' }}>
                  <IconArrowLeft style={{ paddingTop: 20 }} size={40} /> <span>Khuska Market</span>
                </Typography>
                <Divider sx={{ borderColor: '#3E4042', mt: 2, mb: 2 }} />
                {messages.map((item) => (
                  <CustomButton
                    key={item.id}
                    onClick={() => {
                      setMessage(item.message);
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
            <Grid item lg={8} xs={12} sx={uiStyles.layoutItem}>
              <div style={uiStyles.main}>
                <Typography component={'h5'} variant="h5" sx={{ textDecoration: 'none', color: '#FFF' }}>
                  {message}
                </Typography>
              </div>
            </Grid>
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
