import CircleIcon from '@mui/icons-material/Circle';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Slider from '@mui/material/Slider';
import { useState } from 'react';

import canvasService from '../../utils/CanvasService';
import classes from './WidthChanger.module.css';

const WidthChanger: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [lineWidth, setLineWidth] = useState(3);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleWidthChange = (event: Event) => {
    const target = event.target as HTMLTextAreaElement;
    setLineWidth(+target.value);
    canvasService.changeLineWidth(+target.value);
  };

  return (
    <>
      <IconButton onClick={handleClick} color="inherit">
        <CircleIcon />
      </IconButton>
      <Menu anchorEl={anchorEl} open={!!anchorEl} onClose={handleClose}>
        <MenuItem className={classes.slider}>
          <Slider
            min={1}
            max={10}
            size="small"
            defaultValue={3}
            value={lineWidth}
            onChange={handleWidthChange}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export default WidthChanger;
