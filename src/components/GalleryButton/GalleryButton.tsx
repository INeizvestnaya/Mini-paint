import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

import { GALLERY } from '../../constants/routes';

const GalleryButton: React.FC = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate(GALLERY);
  };

  return (
    <Button color="inherit" onClick={redirect}>
      Gallery
    </Button>
  );
};

export default GalleryButton;
