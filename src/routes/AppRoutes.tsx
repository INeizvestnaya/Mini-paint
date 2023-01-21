import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Outlet,
  Route,
  RouterProvider
} from 'react-router-dom';

import {
  GALLERY,
  MAIN_PATH,
  PAINT,
  REGISTER,
  SIGN_IN
} from '../constants/routes';
import ErrorPage from '../pages/ErrorPage';
import Gallery from '../pages/Gallery';
import Paint from '../pages/Paint';
import Register from '../pages/Register';
import SignIn from '../pages/SignIn';
import PrivateRoute from './PrivateRoute';
import RestrictedRoute from './RestrictedRoute';

const AppRoutes = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path={MAIN_PATH}
        element={<Outlet />}
        errorElement={<ErrorPage>No such page</ErrorPage>}
      >
        <Route index element={<Navigate to={SIGN_IN} replace />} />
        <Route
          path={SIGN_IN}
          element={
            <RestrictedRoute>
              <SignIn />
            </RestrictedRoute>
          }
        />
        <Route
          path={REGISTER}
          element={
            <RestrictedRoute>
              <Register />
            </RestrictedRoute>
          }
        />
        <Route
          path={PAINT}
          element={
            <PrivateRoute>
              <Paint />
            </PrivateRoute>
          }
        />
        <Route path={GALLERY} element={<Gallery />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default AppRoutes;
