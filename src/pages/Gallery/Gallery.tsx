import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { signOut } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

import HeaderBar from '../../components/HeaderBar';
import Pictures from '../../components/Pictures';
import ThemeChangeButton from '../../components/ThemeChangeButton';
import { auth } from '../../firebase-config';
import { RootState } from '../../redux';

const Gallery: React.FC = () => {
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const loading = useSelector((state: RootState) => state.pictures.loading);
  const pictures = useSelector((state: RootState) => state.pictures.pictures);
  const authors = useSelector((state: RootState) => state.pictures.authors);

  const [filter, setFilter] = useState('');
  const [filteredPictures, setFilteredPictures] = useState(pictures);

  useEffect(() => {
    setFilteredPictures(
      filter ? pictures.filter((pic) => pic.author === filter) : pictures
    );
  }, [filter, pictures]);

  const filterChange = (
    _: React.SyntheticEvent<Element, Event>,
    newInputValue: string
  ) => {
    setFilter(newInputValue);
  };

  const buttons = [
    {
      children: 'Paint',
      sx: { display: user ? 'initial' : 'none' },
      onClick: () => {
        navigate('/paint');
      }
    },
    {
      children: 'Logout',
      sx: { display: user ? 'initial' : 'none' },
      onClick: async () => {
        try {
          navigate('/sign-in');
          await signOut(auth);
        } catch (error) {
          toast.error((error as Error).message);
        }
      }
    },
    {
      children: 'Sign-in',
      sx: { display: !user ? 'initial' : 'none' },
      onClick: () => {
        navigate('/sign-in');
      }
    }
  ];

  return (
    <>
      <HeaderBar
        rightItem={
          <>
            <ThemeChangeButton />
            {buttons.map((button) => (
              <Button key={button.children} color="inherit" {...button} />
            ))}
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
      {loading && (
        <Typography margin={3} variant="h5">
          Loading pictures...
        </Typography>
      )}
      {!loading && !pictures.length && (
        <Typography margin={3} variant="h5">
          No pictures found. Paint the first!
        </Typography>
      )}
      {!loading && !!pictures.length && (
        <>
          <Box margin={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Autocomplete
              options={authors}
              sx={{ width: 300 }}
              inputValue={filter}
              onInputChange={filterChange}
              renderInput={(params) => <TextField {...params} label="Author" />}
            />
          </Box>
          <Pictures pictures={filteredPictures} filter={filter} />
        </>
      )}
    </>
  );
};

export default Gallery;
