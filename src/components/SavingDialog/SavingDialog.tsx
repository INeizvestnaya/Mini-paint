import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';

interface Props {
  open: boolean;
  savePicture: () => void;
  cancelSaving: () => void;
  changePictureName: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SavingDialog: React.FC<Props> = ({
  open,
  savePicture,
  cancelSaving,
  changePictureName
}) => (
  <Dialog open={open} onClose={savePicture}>
    <DialogTitle>Enter picture name</DialogTitle>
    <DialogContent>
      <TextField
        autoFocus
        margin="dense"
        label="Name"
        fullWidth
        variant="standard"
        onChange={changePictureName}
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={savePicture}>Ok</Button>
      <Button onClick={cancelSaving}>Cancel</Button>
    </DialogActions>
  </Dialog>
);

export default SavingDialog;
