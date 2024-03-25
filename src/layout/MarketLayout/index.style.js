export const uiStyles = {
  appbar: {
    height: 70,
    backgroundColor: '#242526',
    border: 0
  },
  btnLeftMenu: {
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#FFF',
    color: '#242526',
    padding: 15,
    border: 0,
    '&:hover': {
      backgroundColor: '#242526',
      color: '#FFF'
    }
  },
  modalLogin: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '@media (min-width: 718px)': {
      width: 700
    },
    '@media (max-width: 718px)': {
      width: 600
    },
    '@media (max-width: 619px)': {
      width: 500
    },
    '@media (max-width: 508px)': {
      width: 450
    },
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 6,
    boxShadow: 24,
    p: 4
  },
  modalLoader: {
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
  }
};
