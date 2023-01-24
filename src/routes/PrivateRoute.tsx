import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';

import { SIGN_IN } from '../constants/routes';
import { selectUser } from '../redux/selectors';

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const user = useSelector(selectUser);

  if (!user) {
    return <Navigate to={SIGN_IN} />;
  }

  return <div>{children}</div>;
};

export default PrivateRoute;
