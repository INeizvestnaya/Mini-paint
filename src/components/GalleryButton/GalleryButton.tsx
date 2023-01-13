import Button from '@mui/material/Button';
import { useNavigate } from 'react-router';

const GalleryButton: React.FC = () => {
  const navigate = useNavigate();

  const redirect = () => {
    navigate('/gallery');
  };

  return (
    <Button color="inherit" onClick={redirect}>
      Gallery
    </Button>
  );
};

export default GalleryButton;
