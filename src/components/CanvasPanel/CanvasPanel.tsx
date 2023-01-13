import SaveIcon from '@mui/icons-material/Save';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { getStorage, ref, uploadBytes } from 'firebase/storage';
import { memo, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';

import { INITIAL_COLOR, Tools } from '../../constants';
import { RootState } from '../../redux';
import { Color } from '../../types';
import canvasService from '../../utils/CanvasService';
import { addAuthor, addPicture } from '../../utils/firestoreActions';
import PanelTools from '../PanelTools';
import SavingDialog from '../SavingDialog';
import WidthChanger from '../WidthChanger';

const storage = getStorage();

interface Props {
  selectTool: (tool: Tools) => void;
  selected: Tools | null;
}

const CanvasPanel: React.FC<Props> = ({ selectTool, selected }) => {
  const user = useSelector((state: RootState) => state.auth.user);

  const [color, setColor] = useState<Color>(INITIAL_COLOR);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pictureName, setPictureName] = useState('');

  const changePictureName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPictureName(event.target.value);
  };

  const savePicture = async () => {
    if (!pictureName) {
      toast.error('Enter a name!');
      return;
    }

    setDialogOpen(false);

    const pictureNameId = `${pictureName}-${uuid()}`;

    try {
      await new Promise((resolve) => {
        if (canvasService.canvas) {
          canvasService.canvas.toBlob(async (blob) => {
            if (blob) {
              const imageRef = ref(storage, `pictures/${pictureNameId}`);
              await uploadBytes(imageRef, blob);
              resolve(1);
            }
          });
        }
      });

      addPicture(pictureName, pictureNameId, user);

      addAuthor(user);

      toast.success('Picture saved!');
    } catch (error) {
      toast.error((error as Error).message);
    }
  };

  const saveClick = () => {
    setDialogOpen(true);
  };

  const cancelSaving = () => {
    setDialogOpen(false);
  };

  const colorInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value as Color;

    setColor(newColor);
    canvasService.changeColor(newColor);
  };

  return (
    <>
      <SavingDialog
        open={dialogOpen}
        savePicture={savePicture}
        cancelSaving={cancelSaving}
        changePictureName={changePictureName}
      />
      <Box
        marginRight={2}
        sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}
      >
        <IconButton onClick={saveClick} color="inherit">
          <SaveIcon fontSize="large" />
        </IconButton>
        <input type="color" value={color} onChange={colorInputChange} />
        <WidthChanger />
        <PanelTools selected={selected} selectTool={selectTool} />
      </Box>
    </>
  );
};

export default memo(CanvasPanel);
