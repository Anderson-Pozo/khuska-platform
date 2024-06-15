import { useNavigate } from 'react-router-dom';
import { IconButton, Tooltip } from '@mui/material';
import { IconPlus } from '@tabler/icons';
import { genConst } from 'store/constant';

const AddProductSection = () => {
  let navigate = useNavigate();

  const handleToggle = () => {
    navigate('/market/create');
  };

  return (
    <>
      <Tooltip title="Crear Publicación">
        <IconButton onClick={handleToggle} style={{ marginRight: 10 }}>
          <IconPlus color={genConst.CONST_APPBAR} size={30} />
        </IconButton>
      </Tooltip>
    </>
  );
};

export default AddProductSection;
