export const uiStyles = {
  box: { flexGrow: 1, display: { xs: 'flex', md: 'none' } },
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
  layout: {
    //height: '100%',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 0,
    paddingRight: 2
  },
  main: {
    height: '92vh',
    position: 'relative',
    overflowY: 'scroll'
  },
  sidebar: {
    color: 'white',
    padding: 0,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    overflowY: 'scroll'
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
  }
};