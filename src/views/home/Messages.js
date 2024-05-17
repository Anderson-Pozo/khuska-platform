import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Avatar, Box, Grid, Modal, ListItemButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CircularProgress from '@mui/material/CircularProgress';
import { uiStyles } from './styles';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import { getMessageByUserId, getRecibeMessageByUserId } from 'config/firebaseEvents';
import MessageDark from 'components/message/MessageDark';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 0 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function Messages() {
  let navigate = useNavigate();
  const [openLoader, setOpenLoader] = useState(false);
  const [messages, setMessages] = useState([]);
  const [recibeMessages, setRecibeMessages] = useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const CustomButton = styled(ListItemButton)({
    minHeight: 60,
    width: '100%',
    justifyContent: 'initial',
    color: '#FFF',
    backgroundColor: '#242526',
    borderRadius: 8,
    marginTop: 1,
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
        getRecibeMessageByUserId(user.uid).then((data) => {
          setRecibeMessages(data);
        });
      }
    });
    setOpenLoader(false);
  }, []);

  return (
    <Box>
      <ToastContainer />
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Enviados" {...a11yProps(0)} />
          <Tab label="Recibidos" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
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
                          pathname: '/market/chat/',
                          search: `?id=${item.id}&name=${item.nameProduct}`
                        });
                      }}
                    >
                      <Grid container>
                        <Grid lg={1} sm={1} xs={1}>
                          <Avatar src={item.preview} color="inherit" style={{ width: 40, height: 40, marginTop: 8 }} />
                        </Grid>
                        <Grid lg={8} sm={8} xs={8}>
                          <p
                            style={{
                              color: '#E4E6EB',
                              marginLeft: 20,
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
                        <Grid lg={3} sm={3} xs={12}>
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
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        {recibeMessages.length > 0 ? (
          <Grid container spacing={1} style={{ marginTop: 5 }}>
            <Grid item lg={12} xs={12}>
              <Grid container spacing={0} style={{ paddingLeft: 0 }}>
                <Grid item lg={12} xs={12}>
                  {recibeMessages.map((item) => (
                    <CustomButton
                      key={item.id}
                      onClick={() => {
                        navigate({
                          pathname: '/market/chat/',
                          search: `?id=${item.id}&name=${item.nameProduct}`
                        });
                      }}
                    >
                      <Grid container>
                        <Grid lg={1} xs={2}>
                          <Avatar src={item.preview} color="inherit" style={{ width: 40, height: 40, marginTop: 8 }} />
                        </Grid>
                        <Grid lg={8} xs={10}>
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
                        <Grid lg={2} xs={12}>
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
      </CustomTabPanel>
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
