import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { Chip, Tooltip } from '@mui/material';
import { IconCurrencyDollar } from '@tabler/icons';

const AmountSection = () => {
  const theme = useTheme();
  let navigate = useNavigate();

  useEffect(() => {}, []);

  const handleToggle = () => {
    navigate('/app/wallet');
  };

  return (
    <>
      <Tooltip title="Mi Billetera">
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
      </Tooltip>
    </>
  );
};

export default AmountSection;
