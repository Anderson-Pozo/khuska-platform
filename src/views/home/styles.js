export const uiStyles = {
  box: { flexGrow: 1, display: { xs: 'flex', md: 'none' } },
  paper: { width: '100%', overflow: 'hidden', marginTop: 2 },
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
  },
  styleDelete: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    '@media (min-width: 718px)': {
      width: 400
    },
    bgcolor: 'background.paper',
    border: 'none',
    borderRadius: 6,
    boxShadow: 24,
    p: 4
  },
  layout: {
    //height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 0,
    paddingRight: 2,
    overflowY: 'scroll',
    '&::WebkitScrollbar': {
      width: 0,
      height: 0,
      backgroundColor: 'transparent'
    }
  },
  layoutItem: {
    //height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 2,
    paddingLeft: 0,
    paddingRight: 0,
    overflowY: 'scroll',
    '&::WebkitScrollbar': {
      width: 0,
      height: 0,
      backgroundColor: 'transparent'
    }
  },
  main: {
    height: '78vh',
    position: 'relative'
  },
  layoutItemChat: {
    display: 'flex',
    flexDirection: 'column',
    paddingTop: 2,
    paddingLeft: 0,
    paddingRight: 0,
    overflowY: 'scroll',
    '&::WebkitScrollbar': {
      width: 0,
      height: 0,
      backgroundColor: 'transparent'
    }
  },
  mainChat: {
    height: '88vh',
    position: 'relative'
  },
  sidebar: {
    color: 'white',
    padding: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0
  },
  inputNew: {
    backgroundColor: '#242526',
    marginTop: 1,
    marginBottom: 1,
    borderRadius: 10,
    '& > label': {
      top: 18,
      left: 0,
      color: '#000',
      '&[data-shrink="false"]': {
        top: 1
      }
    },
    '& > div > input': {
      padding: '24.5px 14px 11.5px !important'
    },
    '& legend': {
      display: 'none'
    },
    '& fieldset': {
      top: 0
    }
  },
  root: {
    '& .MuiInputBase-root': {
      color: '#FFF'
    },
    '& .MuiFilledInput-root': {
      backgroundColor: '#242526',
      borderRadius: 10,
      marginBottom: 15,
      color: '#FFF'
    },
    '& .MuiFilledInput-root:hover': {
      backgroundColor: '#242526',
      color: '#FFF',
      '@media (hover: none)': {
        backgroundColor: '#242526'
      }
    },
    '& .MuiFilledInput-root.Mui-focused': {
      backgroundColor: '#242526',
      color: '#FFF',
      border: '1px solid #242526'
    },
    '& .MuiInputLabel-outlined': {
      color: '#FFF'
    }
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    background: '#FFF'
  },
  modalDeleteTitle: { marginTop: 20, fontSize: 16 }
};
