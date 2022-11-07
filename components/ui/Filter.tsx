import React from 'react';
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
import { Box, Grid } from '@mui/material';
import FemaleIcon from '@mui/icons-material/Female';
import MinimizeIcon from '@mui/icons-material/Minimize';
import MaleIcon from '@mui/icons-material/Male';

const colors = ['Black', 'Blue', 'Brown', 'Gray', 'Green', 'Pink', 'Purple', 'Red', 'White', 'Yellow'];
const genders = ['Male', 'Female', 'Genderless'];

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}

export function Filter(props: SimpleDialogProps) {
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle fontWeight={800}>General filters</DialogTitle>
      <Grid container sx={{ pt: 0 }} spacing={ 4 }>
        <Grid item padding={ 1 }>
        {colors.map((color) => (
          <ListItem button onClick={() => handleListItemClick(color)} key={color}>
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
          <ListItem button onClick={() => handleListItemClick(gender)} key={gender}>
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

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [selectedValue, setSelectedValue] = React.useState(colors[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <div>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>
      <Filter
        selectedValue={selectedValue}
        open={open}
        onClose={handleClose}
      />
    </div>
  );
}
