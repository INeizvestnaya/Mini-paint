import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeModes } from '../../constants';
import { RootState } from '../../redux';
import { toggleTheme } from '../../redux/ThemeSlice';

const ThemeChangeButton: React.FC = () => {
  const dispatch = useDispatch();

  const themeMode = useSelector((state: RootState) => state.theme.palette.mode);

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button color="inherit" onClick={changeTheme}>
      {themeMode === ThemeModes.light ? 'Dark' : 'Light'}
    </Button>
  );
};

export default ThemeChangeButton;
