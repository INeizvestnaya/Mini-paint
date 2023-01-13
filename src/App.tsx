import 'react-toastify/dist/ReactToastify.css';

import { ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme } from '@mui/material/styles';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { auth } from './firebase-config';
import useLoadPictures from './hooks/useLoadPictures';
import ErrorPage from './pages/ErrorPage';
import Gallery from './pages/Gallery';
import Paint from './pages/Paint';
import Register from './pages/Register';
import SignIn from './pages/SignIn';
import { RootState } from './redux';
import { setUser as setUserAction } from './redux/AuthSlice';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const themeValue = useSelector((state: RootState) => state.theme);

  const theme = createTheme(themeValue);

  const [user, setUser] = useState(auth.currentUser?.email);

  useLoadPictures();

  useEffect(() => {
    onAuthStateChanged(auth, (userInfo) => {
      if (userInfo) {
        dispatch(setUserAction({ user: userInfo.email }));
        setUser(userInfo.email);
      } else {
        dispatch(setUserAction({ user: null }));
        setUser(undefined);
      }
    });
  }, []);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={<Outlet />}
        errorElement={<ErrorPage>No such page</ErrorPage>}
      >
        <Route index element={<Navigate to="/gallery" replace />} />
        {!user && <Route path="/sign-in" element={<SignIn />} />}
        {!user && <Route path="/register" element={<Register />} />}
        {user && <Route path="/paint" element={<Paint />} />}
        <Route path="/gallery" element={<Gallery />} />
      </Route>
    )
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer position="top-center" theme="colored" />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
};

export default App;
