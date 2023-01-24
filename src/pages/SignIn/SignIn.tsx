import { signInWithEmailAndPassword } from 'firebase/auth';

import AuthForm from '../../components/AuthForm';
import GalleryButton from '../../components/GalleryButton';
import HeaderBar from '../../components/HeaderBar';
import ThemeChangeButton from '../../components/ThemeChangeButton';
import { REGISTER } from '../../constants/routes';

const linkData = {
  label: `Don't have account? Register`,
  navigatePath: REGISTER
};

const SignIn: React.FC = () => (
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
      submitCallback={signInWithEmailAndPassword}
      formLabel="Sign in"
      linkData={linkData}
    />
  </>
);

export default SignIn;
