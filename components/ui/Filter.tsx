import * as React from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { blue } from '@mui/material/colors';
import TuneIcon from '@mui/icons-material/Tune';
import { Box, Chip, Grid } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MinimizeIcon from '@mui/icons-material/Minimize';
import MaleIcon from '@mui/icons-material/Male';


const colors = ['black', 'blue', 'brown', 'gray', 'green', 'pink', 'purple', 'red', 'white', 'yellow'];
const genders = ['male', 'female', 'genderless'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

function SimpleDialog(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Set backup account</DialogTitle>
      <Grid container sx={{ pt: 0 }} spacing={ 4 }>
        <Grid item padding={ 1 }>
        {colors.map((color) => (
          <ListItem button onClick={() => handleListItemClick(color)} key={colors.indexOf(color)}>
            <ListItemAvatar>
                <Box bgcolor={ color } border='1px solid #ffffff' sx={{width:'40px', height:'40px', borderRadius:'100px' }}>
                    
                </Box>
            </ListItemAvatar>
            <ListItemText primary={color} />
          </ListItem>
        ))}
        </Grid>
        <Grid item>
        {genders.map((gender) => (
          <ListItem button onClick={() => handleListItemClick(gender)} key={genders.indexOf(gender)}>
            <ListItemAvatar>

                    <Avatar sx={{ bgcolor: blue[100], color: "black" }}>
                        {   
                            gender === 'Male'

                            ?
                                <MaleIcon />
                            : 
                                <FemaleIcon />
                        }
                        
                    </Avatar>

            </ListItemAvatar>
            <ListItemText primary={gender} />
          </ListItem>
        ))}
        </Grid>

      </Grid>
    </Dialog>
  );
}

export default function SimpleDialogDemo({ selectedValue, setSelectedValue }) {
  const [open, setOpen] = React.useState(false);


  const handleDelete = () => {
    setSelectedValue('')
};

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value)
  };

  return (
    <Box display='flex'  flexDirection='column' width='fit-content' justifyContent='flex-start' zIndex="tooltip">
      <Button onClick={() => setOpen( true ) } sx={{ width:"106px" }} size="large" variant="outlined" startIcon={<TuneIcon />} >
        Filter
      </Button>

        <br />

          {
            selectedValue === ''
            ?
            <></>
            :
            <Chip color="secondary" label={ selectedValue } onDelete={handleDelete} sx={{ marginBottom:'6px'}} />
          }

      <SimpleDialog
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
      
    </Box>
  );
}
