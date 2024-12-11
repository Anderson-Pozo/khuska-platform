/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
//Firebase
import { db } from 'config/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { collUsers } from 'store/collections';
import { gridSpacing } from 'store/constant';
import {
  AppBar,
  Box,
  Button,
  Container,
  CircularProgress,
  Grid,
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Toolbar
} from '@mui/material';
import UsersNetworkChild from './UsersNetworkChild';
import { titles } from './Users.texts';
import { uiStyles } from './Users.styles';
import { getUserChilds } from 'config/firebaseEvents';
import { IconArrowLeft, IconNetwork } from '@tabler/icons';

const UsersNetwork = () => {
  let navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const name = searchParams.get('name');
  //Lists
  const [childsList, setChildsList] = useState([]);
  const [childsListL2, setChildsListL2] = useState([]);
  const [childsListL3, setChildsListL3] = useState([]);
  const [childsListL4, setChildsListL4] = useState([]);
  //Visibility Levels
  const [showL2, setShowL2] = useState(false);
  const [showL3, setShowL3] = useState(false);
  const [showL4, setShowL4] = useState(false);
  //Variables
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
    getUserChilds(Number.parseInt(code)).then((data) => {
      setChildsList(data);
      setChildsListL2([]);
      setChildsListL3([]);
      setChildsListL4([]);
      setShowL2(false);
      setShowL3(false);
      setShowL4(false);
    });
    setTimeout(() => {
      setOpen(false);
    }, 1000);
  }, [code]);

  const childsLevel2 = async (code) => {
    const childs = [];
    const q = query(collection(db, collUsers), where('refer', '==', code));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        childs.push(doc.data());
      });
      setChildsListL2(childs);
      setChildsListL3([]);
      setChildsListL4([]);
      setShowL2(true);
      setShowL3(false);
      setShowL4(false);
    } else {
      setShowL2(false);
      setShowL3(false);
      setShowL4(false);
      setChildsListL3([]);
      setChildsListL4([]);
    }
  };
  const childsLevel3 = async (code) => {
    const childs = [];
    const q = query(collection(db, collUsers), where('refer', '==', code));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        childs.push(doc.data());
      });
      setChildsListL3(childs);
      setChildsListL4([]);
      setShowL3(true);
      setShowL4(false);
    } else {
      setShowL3(false);
      setShowL4(false);
    }
  };
  const childsLevel4 = async (code) => {
    setShowL4(true);
    const childs = [];
    const q = query(collection(db, collUsers), where('refer', '==', code));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.size > 0) {
      querySnapshot.forEach((doc) => {
        childs.push(doc.data());
      });
      setChildsListL4(childs);
      setShowL4(true);
    } else {
      setShowL4(false);
    }
  };

  return (
    <div>
      <>
        <AppBar position="static" style={uiStyles.appbar}>
          <Container maxWidth="xl" style={uiStyles.container}>
            <Toolbar disableGutters>
              <IconArrowLeft color="#FFF" style={{ marginLeft: 0, marginRight: 20 }} onClick={() => navigate('/main/users')} />
              <IconNetwork color="#FFF" style={{ marginLeft: 0, marginRight: 20 }} />
              <strong>{titles.title}: </strong>
              <span style={{ marginLeft: 10 }}>{name}</span>
            </Toolbar>
          </Container>
        </AppBar>
        <Box>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
              <Grid item lg={12} md={12} sm={12} xs={12}>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>
                          <Typography variant="h4">{titles.level1}</Typography>
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        {childsList.map((child, key) => (
                          <TableCell key={key}>
                            <Button variant="outlined" onClick={() => childsLevel2(child.ownReferal)} style={uiStyles.btn}>
                              <UsersNetworkChild
                                avatar={child.avatar}
                                name={child.name}
                                lastName={child.lastName}
                                email={child.email}
                                state={child.state}
                              />
                            </Button>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              {showL2 ? (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h4">{titles.level2}</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          {childsListL2.map((child, key) => (
                            <TableCell key={key}>
                              <Button variant="outlined" onClick={() => childsLevel3(child.ownReferal)} style={uiStyles.btn}>
                                <UsersNetworkChild
                                  avatar={child.avatar}
                                  name={child.name}
                                  lastName={child.lastName}
                                  email={child.email}
                                  state={child.state}
                                />
                              </Button>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <></>
              )}
              {showL3 ? (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h4">{titles.level3}</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          {childsListL3.map((child, key) => (
                            <TableCell key={key}>
                              <Button variant="outlined" onClick={() => childsLevel4(child.ownReferal)} style={uiStyles.btn}>
                                <UsersNetworkChild
                                  avatar={child.avatar}
                                  name={child.name}
                                  lastName={child.lastName}
                                  email={child.email}
                                  state={child.state}
                                />
                              </Button>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <></>
              )}
              {showL4 ? (
                <Grid item lg={12} md={12} sm={12} xs={12}>
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>
                            <Typography variant="h4">{titles.level4}</Typography>
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        <TableRow>
                          {childsListL4.map((child, key) => (
                            <TableCell key={key}>
                              <Button variant="outlined" style={uiStyles.btn}>
                                <UsersNetworkChild
                                  avatar={child.avatar}
                                  name={child.name}
                                  lastName={child.lastName}
                                  email={child.email}
                                  state={child.state}
                                />
                              </Button>
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              ) : (
                <></>
              )}
            </Grid>
          </Grid>
        </Box>
      </>
      <Modal open={open} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <center>
          <Box sx={uiStyles.modalLoader}>
            <CircularProgress color="info" size={100} />
          </Box>
        </center>
      </Modal>
    </div>
  );
};

export default UsersNetwork;
