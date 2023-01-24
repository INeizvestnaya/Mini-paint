import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
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
import { PAINT, SIGN_IN } from '../../constants/routes';
import { auth } from '../../firebase-config';
import {
  selectAuthors,
  selectLoading,
  selectPictures,
  selectUser
} from '../../redux/selectors';
import classes from './Gallery.module.css';

const Gallery: React.FC = () => {
  const navigate = useNavigate();

  const user = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const pictures = useSelector(selectPictures);
  const authors = useSelector(selectAuthors);

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
        navigate(PAINT);
      }
    },
    {
      children: 'Logout',
      sx: { display: user ? 'initial' : 'none' },
      onClick: async () => {
        try {
          await signOut(auth);
          navigate(SIGN_IN);
        } catch (error) {
          toast.error((error as Error).message);
        }
      }
    },
    {
      children: 'Sign-in',
      sx: { display: !user ? 'initial' : 'none' },
      onClick: () => {
        navigate(SIGN_IN);
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
        <Box margin={5} className={classes.loader}>
          <CircularProgress />
        </Box>
      )}
      {!loading && !pictures.length && (
        <Typography margin={3} variant="h5">
          No pictures found. Paint the first!
        </Typography>
      )}
      {!loading && !!pictures.length && (
        <>
          <Box margin={3} className={classes.box}>
            <Autocomplete
              className={classes.autocomplete}
              options={authors}
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
