import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// material-ui
import { useTheme } from '@mui/material/styles';
import {
  Button,
  CardActions,
  ClickAwayListener,
  Divider,
  Grid,
  IconButton,
  Paper,
  Popper,
  Tooltip,
  Typography,
  useMediaQuery
} from '@mui/material';
// project imports
import MainCard from 'components/cards/MainCard';
import Transitions from 'components/extended/Transitions';
import NotificationList from './NotificationList';
import { authentication } from 'config/firebase';
import { onAuthStateChanged } from 'firebase/auth';

// assets
import { IconBell } from '@tabler/icons';
import { getUserNotificationsUnread } from 'config/firebaseEvents';
import { genConst } from 'store/constant';

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
      <Tooltip title="Notificaciones">
        <IconButton
          onClick={handleToggle}
          style={{ marginRight: 10 }}
          ref={anchorRef}
          aria-controls={open ? 'menu-list-grow' : undefined}
          aria-haspopup="true"
        >
          <IconBell color={genConst.CONST_APPBAR} size={30} />
        </IconButton>
      </Tooltip>
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
                        navigate('/market/notifications');
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
