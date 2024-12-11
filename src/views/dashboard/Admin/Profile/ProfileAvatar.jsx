/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
// material-ui
import { styled } from '@mui/material/styles';
import { Box, Grid, Typography, Modal } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
// project imports
import MainCard from 'components/cards/MainCard';
import defaultUser from 'assets/images/profile/profile-picture-6.jpg';
//Notifications
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//Firebase
import { db, storage, authentication } from 'config/firebase';
import { collection, getDocs, updateDoc, doc, query, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { onAuthStateChanged, updateProfile } from 'firebase/auth';
import { collUsers } from 'store/collections';

const CardWrapper = styled(MainCard)(() => ({
  backgroundColor: '#FFF',
  color: '#fff',
  overflow: 'hidden',
  position: 'relative'
}));

const ProfileAvatar = () => {
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [ownReferal, setOwnReferal] = useState('');
  const [createAt, setCreateAt] = useState('');
  const [open, setOpen] = useState(false);

  const getData = () => {
    onAuthStateChanged(authentication, async (user) => {
      if (user) {
        setId(user.uid);
        const q = query(collection(db, collUsers), where('id', '==', user.uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          setName(doc.data().name);
          setLastName(doc.data().lastName);
          setEmail(doc.data().email);
          setAvatar(doc.data().avatar);
          setOwnReferal(doc.data().ownReferal);
          setCreateAt(doc.data().createAt);
        });
      }
    });
  };

  useEffect(() => {
    getData();
  }, []);

  const imageChange0 = (e) => {
    if (e.target.files.length) {
      let img = new Image();
      img.src = window.URL.createObjectURL(e.target.files[0]);
      let raw = e.target.files[0];
      const imageName = id + '.jpg';
      const imageRef = ref(storage, `avatar/${imageName}`);
      setOpen(true);
      uploadBytes(imageRef, raw).then((snap) => {
        getDownloadURL(snap.ref).then((avatar) => {
          const obj = {
            avatar: avatar
          };
          const docRef = updateDoc(doc(db, collUsers, id), obj)
            .then(() => {
              updateProfile(authentication.currentUser, {
                photoURL: avatar
              });
              toast.success('Avatar actualizado correctamente!', {
                autoClose: 2000,
                position: toast.POSITION.TOP_RIGHT
              });
              setTimeout(() => {
                getData();
                setOpen(false);
              }, 2000);
            })
            .catch((error) => {
              console.log(error);
            });
          console.log(docRef.id);
        });
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <CardWrapper border={false} content={false}>
        <Box sx={{ p: 5 }}>
          <Grid container direction="column">
            <Grid item>
              <Grid container justifyContent="center">
                <input type="file" id="upload-avatar" style={{ display: 'none' }} onChange={imageChange0} />
                <label htmlFor="upload-avatar" style={{ marginRight: 10 }}>
                  <center>
                    <img
                      src={avatar || defaultUser}
                      alt="profile-avatar"
                      style={{
                        width: 180,
                        height: 180,
                        objectFit: 'cover',
                        cursor: 'pointer',
                        borderRadius: '50%'
                      }}
                    />
                  </center>
                </label>
              </Grid>
            </Grid>
            <Grid item>
              <Grid container justifyContent="center">
                <Typography component="span" variant="h5" sx={{ fontWeight: 500, color: '#000', marginTop: 1 }}>
                  {name + ' ' + lastName}
                </Typography>
              </Grid>
              <Grid container justifyContent="center">
                <Typography component="span" variant="h5" sx={{ fontWeight: 400, color: '#000', marginTop: 1 }}>
                  {email}
                </Typography>
              </Grid>
              <Grid container justifyContent="center">
                <Typography component="span" variant="h5" sx={{ fontWeight: 'bold', color: '#000', marginTop: 1 }}>
                  {'Código de Referido:'}
                </Typography>
              </Grid>
              <Grid container justifyContent="center">
                <Typography component="span" variant="h5" sx={{ fontWeight: 400, color: '#000', marginTop: 1 }}>
                  {ownReferal}
                </Typography>
              </Grid>
              <Grid container justifyContent="center">
                <Typography component="span" variant="h5" sx={{ fontWeight: 'bold', color: '#000', marginTop: 1 }}>
                  Usuario desde:
                </Typography>
              </Grid>
              <Grid container justifyContent="center">
                <Typography component="span" variant="h5" sx={{ fontWeight: 400, color: '#000', marginTop: 1 }}>
                  {createAt}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </CardWrapper>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={style}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </>
  );
};

const style = {
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
};

export default ProfileAvatar;
