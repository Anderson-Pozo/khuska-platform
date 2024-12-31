// material-ui
import { Link, Typography, Stack } from '@mui/material';

const Footer = () => (
  <Stack
    direction="row"
    justifyContent="space-between"
    style={{ background: '#000', bottom: 0, display: 'flex', padding: 20, paddingLeft: 30 }}
  >
    <Typography variant="subtitle1" underline="hover" style={{ color: 'white', fontSize: 12 }}>
      Khuska 2024
    </Typography>
    <Typography
      variant="subtitle1"
      component={Link}
      href="https://alcorp.tech"
      target="_blank"
      underline="hover"
      style={{ marginLeft: 20, color: 'white', paddingRight: 30, fontSize: 12, textAlign: 'right' }}
    >
      Powered by &copy; alcorp.tech
    </Typography>
  </Stack>
);

export default Footer;
