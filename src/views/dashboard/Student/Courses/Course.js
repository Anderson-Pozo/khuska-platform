/* eslint-disable jsx-a11y/media-has-caption */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Accordion, AccordionDetails, AccordionSummary, Button, ButtonGroup, Divider, Grid, Modal, Typography } from '@mui/material';
import { IconBook2, IconBrandYoutube, IconClock, IconCurrencyDollar, IconFileText, IconTimeline } from '@tabler/icons';
import { genConst } from 'store/constant';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { collCourses, collModules } from 'store/collections';
import { db } from 'config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { Box } from '@mui/system';
import { titles } from './Courses.text';
import { uiStyles } from './Courses.styles';

const Course = () => {
  const [searchParams] = useSearchParams();
  const idd = searchParams.get('id');
  //const idd = searchParams.get('id');
  const [dataList, setDataList] = React.useState([]);
  const [expanded, setExpanded] = React.useState(false);
  const [openVideo, setOpenVideo] = React.useState(false);
  const [fileVideo, setFileVideo] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [description, setDescription] = React.useState(null);
  const [owner, setOwner] = React.useState(null);
  const [price, setPrice] = React.useState(null);
  const [number, setNumber] = React.useState(null);
  const [duration, setDuration] = React.useState(null);
  const [banner, setBanner] = React.useState(null);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleOpenVideo = () => {
    setOpenVideo(true);
  };

  const handleCloseVideo = () => {
    setOpenVideo(false);
  };

  const getModulesData = async () => {
    const list = [];
    const q1 = query(collection(db, collModules), where('idCourse', '==', idd));
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
      list.push(doc.data());
      list.sort((a, b) => a.order - b.order);
      //list.sort();
    });
    setDataList(list);
  };

  const getCourseData = async () => {
    const q1 = query(collection(db, collCourses), where('id', '==', idd));
    const querySnapshot1 = await getDocs(q1);
    querySnapshot1.forEach((doc) => {
      setName(doc.data().name);
      setOwner(doc.data().owner);
      setNumber(doc.data().number);
      setPrice(doc.data().price);
      setDuration(doc.data().duration);
      setDescription(doc.data().description);
      setFileVideo(doc.data().fileVideo);
      setBanner(doc.data().banner);
    });
  };

  useEffect(() => {
    getModulesData();
    getCourseData();
  }, []);

  return (
    <div>
      <Grid container spacing={0.8}>
        <Grid item xs={12} style={{ background: genConst.CONST_APPBAR_SEARCH, borderRadius: 15, padding: 10 }}>
          <Grid container spacing={0.8}>
            <Grid
              item
              lg={1}
              md={1}
              sm={3}
              xs={3}
              style={{ background: '#dd7959', borderRadius: 10, justifyContent: 'center', alignItems: 'center' }}
            >
              <IconBook2 style={{ width: 75, height: 75, color: '#FFF' }} />
            </Grid>
            <Grid item lg={11} md={11} sm={9} xs={9} style={{ paddingStart: 30 }}>
              <Typography sx={{ fontSize: '1.250rem', fontWeight: 500, mr: 1, mt: 1, color: '#373a7f', marginLeft: 2 }}>{name}</Typography>
              <strong style={{ marginLeft: 20 }}>{owner}</strong>
              <p style={{ marginLeft: 20 }}>{description}</p>
            </Grid>
            <Grid item lg={12} md={12} sm={12} xs={12} style={{ paddingStart: 30 }}>
              <Divider sx={{ mt: 2 }} />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: 4 }}>
              <IconClock />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: 4 }}>
              <IconCurrencyDollar />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: 4 }}>
              <IconCurrencyDollar />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: 4 }}>
              <IconTimeline />
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: -20 }}>
              <p>Duración</p>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: -20 }}>
              <p>Módulos</p>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: -20 }}>
              <p>Precio</p>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: -20 }}>
              <p>Estado</p>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: -30 }}>
              <p>{duration} horas</p>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: -30 }}>
              <p>{number}</p>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: -30 }}>
              <p>{price}</p>
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={3} style={{ marginTop: -30 }}>
              <p>Activo</p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={0.8} style={{ marginTop: 10 }}>
        <Grid item xs={12} style={{ background: genConst.CONST_APPBAR_SEARCH, borderRadius: 15, padding: 15 }}>
          <Grid container spacing={0.8}>
            <Grid item lg={5} md={5} sm={12} xs={12}>
              <center>
                <img
                  src={banner}
                  alt="banner-poster"
                  style={{
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    borderRadius: 15
                  }}
                />
              </center>
            </Grid>
            <Grid item lg={7} md={7} sm={12} xs={12}>
              {dataList.map((c, key) => (
                <Accordion
                  style={{ borderRadius: 10, backgroundColor: '#FFF', margin: 5, border: 'none' }}
                  expanded={expanded === 'panel'.concat(c.order)}
                  onChange={handleChange('panel'.concat(c.order))}
                  key={key}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls={'panel'.concat(c.order, 'bh-content')}
                    id={'panel'.concat(c.order, 'bh-header')}
                    style={{ border: 'none' }}
                  >
                    <Typography style={{ fontWeight: 'bold', fontSize: 16 }}>{c.title}</Typography>
                  </AccordionSummary>
                  <AccordionDetails style={{ marginTop: -30, border: 'none' }}>
                    <Grid container style={{ padding: 1 }}>
                      <Grid item xs={12} style={{ marginTop: 0 }}>
                        <h4>{c.subTitle}</h4>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography>{c.details}</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <p style={{ fontWeight: 'bold' }}>{titles.mediaLabel}</p>
                        <ButtonGroup>
                          {c.file ? (
                            <Button
                              variant="contained"
                              style={uiStyles.fileButton}
                              onClick={() => {
                                window.open(c.file, '_blank');
                              }}
                            >
                              <IconFileText size={40} />
                            </Button>
                          ) : (
                            <></>
                          )}
                          {c.fileVideo ? (
                            <Button
                              variant="contained"
                              style={uiStyles.videoButton}
                              onClick={() => {
                                handleOpenVideo();
                                setFileVideo(c.fileVideo);
                              }}
                            >
                              <IconBrandYoutube size={40} />
                            </Button>
                          ) : (
                            <></>
                          )}
                        </ButtonGroup>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Modal open={openVideo} onClose={handleCloseVideo} aria-labelledby="modal-modal-video" aria-describedby="modal-modal-video-link">
        <Box sx={uiStyles.modalVideo}>
          <video width="100%" height="100%" autoPlay controls controlsList="nodownload" style={{ borderRadius: 20 }}>
            <source src={fileVideo} type="video/mp4" />
          </video>
        </Box>
      </Modal>
    </div>
  );
};

export default Course;
