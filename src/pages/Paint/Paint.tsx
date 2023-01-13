import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { signOut } from 'firebase/auth';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import Canvas from '../../components/Canvas';
import GalleryButton from '../../components/GalleryButton';
import HeaderBar from '../../components/HeaderBar';
import ThemeChangeButton from '../../components/ThemeChangeButton';
import { auth } from '../../firebase-config';
import { RootState } from '../../redux';

const Paint: React.FC = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);

  const logout = async () => {
    try {
      navigate('/sign-in');
      await signOut(auth);
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  return (
    <>
      <HeaderBar
        rightItem={
          <>
            <ThemeChangeButton />
            <GalleryButton />
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          </>
        }
      >
        <>
          <Typography variant="h5" component="span">
            Paint
          </Typography>
          <Typography variant="h5" component="span" marginLeft={3}>
            {user}
          </Typography>
        </>
      </HeaderBar>
      <Canvas />
    </>
  );
};

export default Paint;
