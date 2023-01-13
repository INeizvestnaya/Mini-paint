import { createUserWithEmailAndPassword } from 'firebase/auth';

import AuthForm from '../../components/AuthForm';
import GalleryButton from '../../components/GalleryButton';
import HeaderBar from '../../components/HeaderBar';
import ThemeChangeButton from '../../components/ThemeChangeButton';

const linkData = {
  label: 'Already have an account? Sign in',
  navigatePath: '/sign-in'
};

const Register: React.FC = () => (
  <>
    <HeaderBar
      rightItem={
        <>
          <ThemeChangeButton />
          <GalleryButton />
        </>
      }
    >
      Mini paint app
    </HeaderBar>
    <AuthForm
      submitCallback={createUserWithEmailAndPassword}
      formLabel="Register"
      linkData={linkData}
    />
  </>
);

export default Register;
