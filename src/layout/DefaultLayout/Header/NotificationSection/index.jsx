import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import { Box, Button, CardActions, Chip, ClickAwayListener, Divider, Grid, Paper, Popper, Typography, useMediaQuery } from '@mui/material';
// project imports
import MainCard from 'components/cards/MainCard';
import Transitions from 'components/extended/Transitions';
import NotificationList from './NotificationList';
import { authentication } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// assets
import { IconBell } from '@tabler/icons';
import { getUserNotificationsUnread } from 'config/firebaseEvents';

const NotificationSection = () => {
  const theme = useTheme();
  let navigate = useNavigate();
  const matchesXs = useMediaQuery(theme.breakpoints.down('md'));

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const [dataList, setDataList] = useState([]);

  const getData = () => {
    onAuthStateChanged(authentication, (user) => {
      getUserNotificationsUnread(user.uid).then((data) => {
        setDataList(data);
      });
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Box
        sx={{
          ml: 2,
          mr: 3,
          [theme.breakpoints.down('md')]: {
            mr: 2
          }
        }}
      >
        <Chip
          sx={{
            height: '48px',
            alignItems: 'center',
            borderRadius: '27px',
            transition: 'all .2s ease-in-out',
            borderColor: theme.palette.primary.light,
            backgroundColor: theme.palette.primary.light,
            '&[aria-controls="menu-list-grow"], &:hover': {
              borderColor: theme.palette.primary.main,
              background: `${theme.palette.primary.main}!important`,
              color: '#FFF',
              '& svg': {
                stroke: theme.palette.primary.light,
                color: '#FFF'
              }
            },
            '& .MuiChip-label': {
              lineHeight: 1,
              color: '#FFF'
            }
          }}
          icon={
            <center>
              <div style={{ marginLeft: 12 }}>
                <IconBell />
              </div>
            </center>
          }
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
          variant="outlined"
          onClick={handleToggle}
          color="primary"
        />
      </Box>
      <Popper
        placement={matchesXs ? 'bottom' : 'bottom-end'}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [matchesXs ? 5 : 0, 20]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions position={matchesXs ? 'top' : 'top-right'} in={open} {...TransitionProps}>
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard border={false} elevation={16} content={false} boxShadow shadow={theme.shadows[16]}>
                  <Grid container direction="column" spacing={2}>
                    <Grid item xs={12}>
                      {dataList.length > 0 ? (
                        dataList.map((n) => (
                          <NotificationList key={n.id} id={n.id} avatar={n.avatar} createAt={n.date} message={n.message} name={n.from} />
                        ))
                      ) : (
                        <div style={{ margin: 10 }}>
                          <Typography variant="subtitle1">No hay notificaciones</Typography>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                  <Divider />
                  <CardActions sx={{ p: 1.25, justifyContent: 'center' }}>
                    <Button
                      size="small"
                      disableElevation
                      onClick={() => {
                        navigate('/app/notifications');
                        setOpen(false);
                      }}
                    >
                      Ver Todas
                    </Button>
                  </CardActions>
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </>
  );
};

export default NotificationSection;
