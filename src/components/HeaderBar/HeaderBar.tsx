import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import classes from './HeaderBar.module.css';

interface Props {
  children: string | React.ReactNode;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
}

const HeaderBar: React.FC<Props> = ({ children, leftItem, rightItem }) => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        {leftItem}
        <Typography
          variant="h5"
          margin="normal"
          component="div"
          marginLeft={2}
          className={classes.box}
        >
          {children}
        </Typography>
        {rightItem}
      </Toolbar>
    </AppBar>
  </Box>
);

export default HeaderBar;
