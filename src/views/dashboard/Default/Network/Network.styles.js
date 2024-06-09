import { genConst } from 'store/constant';

export const uiStyles = {
  appbar: { borderRadius: 15, height: 60, backgroundColor: genConst.CONST_APPBAR },
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
  imagePic: { width: 50, height: 50, borderRadius: '50%' },
  stateActive: { marginTop: -10, color: '#5ABD7C' },
  stateNoActive: { marginTop: -10, color: '#EB635D' },
  name: { marginTop: 2, fontSize: 13, textTransform: 'uppercase' },
  email: { marginTop: -10, fontSize: 12, textTransform: 'lowercase' },
  btn: { width: 300, height: 130 }
};
