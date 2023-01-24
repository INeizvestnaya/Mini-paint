import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';

import { auth } from './firebase-config';
import useLoadPictures from './hooks/useLoadPictures';
import LoadingPage from './pages/LoadingPage';
import { setUser as setUserAction } from './redux/AuthSlice';
import { selectTheme } from './redux/selectors';
import AppRoutes from './routes/AppRoutes';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const themeValue = useSelector(selectTheme);

  const theme = createTheme(themeValue);

  useLoadPictures();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    onAuthStateChanged(auth, (userInfo) => {
      setLoading(false);
      if (userInfo) {
        dispatch(setUserAction({ user: userInfo.email }));
      } else {
        dispatch(setUserAction({ user: null }));
      }
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-center" theme="colored" />
      {loading ? <LoadingPage /> : <AppRoutes />}
    </ThemeProvider>
  );
};

export default App;
