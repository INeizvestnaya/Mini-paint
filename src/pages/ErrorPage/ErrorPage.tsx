import Typography from '@mui/material/Typography';

import GalleryButton from '../../components/GalleryButton';
import HeaderBar from '../../components/HeaderBar';

interface Props {
  children: string;
}

const ErrorPage: React.FC<Props> = ({ children }) => (
  <>
    <HeaderBar rightItem={<GalleryButton />}>Error</HeaderBar>
    <Typography variant="h4" align="center" margin={2}>
      {children}
    </Typography>
  </>
);

export default ErrorPage;
