
import * as React from 'react';
import Cookies from 'js-cookie';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function RoleSelect(props) {
    const [open, setOpen] = React.useState(false);
    const [role, setRole] = React.useState('');
    

    const handleChange = (event) => {
        setRole(String(event.target.value) || '');
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason !== 'backdropClick') {
            setOpen(false);
        }
    };

    const handleOK = async () => {
        const token = Cookies.get('jwt');

            if (!token) {
                console.error('No token found');
                return;
            }
    
        const response = await fetch(`http://localhost:8081/user/${props.params.row.id}/${role}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${token}`,
            },
        });

        if (response.ok) {
            console.log('Successfully update role');
        } else {
            console.error('Error update role');
        }

        setOpen(false);
        props.setUpdate(!props.update);
        props.params.row.role = role;
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>{props.params.row.role}</Button>
            <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
                <DialogTitle>Fill the form</DialogTitle>
                <DialogContent>
                    <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                        <FormControl sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel htmlFor="demo-dialog-native">Role</InputLabel>
                            <Select
                                native
                                value={role}
                                onChange={handleChange}
                                input={<OutlinedInput label="Role" id="demo-dialog-native" />}
                            >
                                <option aria-label="None" value="None" />
                                <option value={'student'}>Student</option>
                                <option value={'trainer'}>Traniner</option>
                                <option value={'admin'}>Admin</option>
                                <option value={'none'}>None</option>
                            </Select>
                        </FormControl>

                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleOK}>Ok</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}