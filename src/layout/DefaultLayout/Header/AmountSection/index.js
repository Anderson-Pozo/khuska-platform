import React, { useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { Chip } from '@mui/material';
import { IconCurrencyDollar } from '@tabler/icons';

const ProfileSection = () => {
  const theme = useTheme();

  useEffect(() => {}, []);

  const handleToggle = () => {
    console.log('Saldo Actual');
  };

  return (
    <>
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
        label={<span style={{ color: '#000', fontSize: 18, fontWeight: 'bold' }}>0</span>}
        icon={<IconCurrencyDollar />}
        variant="outlined"
        onClick={handleToggle}
        color="primary"
      />
    </>
  );
};

export default ProfileSection;
