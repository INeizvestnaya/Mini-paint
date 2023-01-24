import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';

import { ThemeModes } from '../../constants';
import { selectThemeMode } from '../../redux/selectors';
import { toggleTheme } from '../../redux/ThemeSlice';

const DARK = 'Dark';
const LIGHT = 'Light';

const ThemeChangeButton: React.FC = () => {
  const dispatch = useDispatch();

  const themeMode = useSelector(selectThemeMode);

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  return (
    <Button color="inherit" onClick={changeTheme}>
      {themeMode === ThemeModes.light ? DARK : LIGHT}
    </Button>
  );
};

export default ThemeChangeButton;
