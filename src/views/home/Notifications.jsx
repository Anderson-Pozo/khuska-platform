/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import NotificactionDark from 'components/message/NotificationDark';
import { getUserNotifications } from 'config/firebaseEvents';
import { onAuthStateChanged } from 'firebase/auth';
import { authentication } from 'config/firebase';
import MessageDark from 'components/message/MessageDark';

export default function Notifications() {
  let navigate = useNavigate();
  const [dataList, setDataList] = useState([]);
  useEffect(() => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        getUserNotifications(user.uid).then((data) => {
          setDataList(data);
        });
      } else {
        navigate('/market/main');
      }
    });
  }, []);

  return (
    <Grid container style={{ marginTop: 0 }}>
      <Grid item xs={12}>
        {dataList > 0 ? (
          dataList.map((n) => (
            <Grid key={n.id} item lg={12} md={12} sm={12} xs={12}>
              <NotificactionDark message={n.message} submessage={n.date} />
            </Grid>
          ))
        ) : (
          <Grid container style={{ marginTop: 20 }}>
            <Grid item xs={12}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <MessageDark message={'No tienes notificaciones aún!'} submessage="" />
              </Grid>
            </Grid>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
