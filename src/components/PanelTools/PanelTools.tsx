import BrushIcon from '@mui/icons-material/Brush';
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import Crop75Icon from '@mui/icons-material/Crop75';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
import PanoramaFishEyeIcon from '@mui/icons-material/PanoramaFishEye';
import PentagonOutlinedIcon from '@mui/icons-material/PentagonOutlined';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';

import { Tools } from '../../constants';
import classes from './PanelTools.module.css';

interface Props {
  selectTool: (tool: Tools) => void;
  selected: Tools | null;
}

const PanelTools: React.FC<Props> = ({ selected, selectTool }) => {
  const panelTools = [
    {
      Component: CleaningServicesIcon,
      type: Tools.ERASER
    },
    {
      Component: BrushIcon,
      type: Tools.PEN
    },
    {
      Component: HorizontalRuleIcon,
      type: Tools.LINE
    },
    {
      Component: ChangeHistoryIcon,
      type: Tools.TRIANGLE
    },
    {
      Component: Crop75Icon,
      type: Tools.RECT
    },
    {
      Component: PentagonOutlinedIcon,
      type: Tools.PENTAGON
    },
    {
      Component: PanoramaFishEyeIcon,
      type: Tools.CIRCLE
    },
    {
      Component: StarBorderIcon,
      type: Tools.STAR
    }
  ];

  return (
    <>
      {panelTools.map(({ Component, type }) => (
        <Button
          key={type}
          onClick={() => {
            selectTool(type);
          }}
          color={selected === type ? 'primary' : 'inherit'}
        >
          <Component className={classes.tool} />
        </Button>
      ))}
    </>
  );
};

export default PanelTools;
