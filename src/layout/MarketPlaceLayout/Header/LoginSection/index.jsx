import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Box, Chip } from '@mui/material';
import { IconLock } from '@tabler/icons';

const LoginSection = () => {
  const theme = useTheme();
  let navigate = useNavigate();

  const handleToggle = () => {
    navigate('/market/login');
  };

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
                <IconLock />
              </div>
            </center>
          }
          variant="outlined"
          onClick={handleToggle}
          color="primary"
        />
      </Box>
    </>
  );
};

export default LoginSection;
