import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { IconHeart } from '@tabler/icons';
import { genConst } from 'store/constant';

const FavoritesSection = () => {
  let navigate = useNavigate();

  const handleToggle = () => {
    navigate('/market/favorites');
  };

  return (
    <>
      <Tooltip title="Ver Favoritos">
        <IconButton onClick={handleToggle} style={{ marginRight: 10 }}>
          <IconHeart color={genConst.CONST_APPBAR} size={30} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default FavoritesSection;
