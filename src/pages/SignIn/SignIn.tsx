import { signInWithEmailAndPassword } from 'firebase/auth';

import AuthForm from '../../components/AuthForm';
import GalleryButton from '../../components/GalleryButton';
import HeaderBar from '../../components/HeaderBar';
import ThemeChangeButton from '../../components/ThemeChangeButton';

const linkData = {
  label: `Don't have account? Register`,
  navigatePath: '/register'
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
