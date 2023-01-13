import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { auth } from '../../firebase-config';

interface Props {
  submitCallback: Function;
  formLabel: string;
  linkData: {
    label: string;
    navigatePath: string;
  };
}

const AuthForm: React.FC<Props> = ({
  submitCallback,
  formLabel,
  linkData: { label, navigatePath }
}) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const textFields = [
    {
      label: 'Email address',
      name: 'email',
      autoComplete: 'email',
      autoFocus: true,
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setEmail(event.target.value),
      value: email
    },
    {
      label: 'Password',
      name: 'password',
      type: 'password',
      onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
        setPassword(event.target.value),
      value: password
    }
  ];

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await submitCallback(auth, email, password);
      navigate('/gallery');
    } catch (error) {
      toast.error((error as Error).message);

      setEmail('');
      setPassword('');
    }
  };

  return (
    <Box
      component="form"
      onSubmit={submitHandler}
      sx={{ width: '50%', margin: '30px auto' }}
    >
      <Typography component="h1" variant="h5">
        {formLabel}
      </Typography>
      {textFields.map((field) => (
        <TextField
          margin="normal"
          required
          fullWidth
          {...field}
          key={field.name}
        />
      ))}
      <Grid container alignItems="center">
        <Grid item xs>
          <Button type="submit" variant="contained" sx={{ mt: 3, mb: 2 }}>
            {formLabel}
          </Button>
        </Grid>
        <Grid item>
          <Link to={navigatePath}>{label}</Link>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthForm;
