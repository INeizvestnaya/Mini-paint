import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { GALLERY } from '../constants/routes';
import { selectUser } from '../redux/selectors';

interface Props {
  children: React.ReactNode;
}

const RestrictedRoute: React.FC<Props> = ({ children }) => {
  const user = useSelector(selectUser);

  if (user) {
    return <Navigate to={GALLERY} />;
  }

  return <div>{children}</div>;
};

export default RestrictedRoute;
