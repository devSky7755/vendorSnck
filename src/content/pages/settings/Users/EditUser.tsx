import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { TeamUser } from 'src/models/team_user';
import { Box, Button, Checkbox, DialogActions, Grid, IconButton, MenuItem, Switch, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiPhoneNumber from 'material-ui-phone-number';


interface EditUserInterface {
    onClose: Function,
    open: boolean,
    user?: TeamUser,
};

const UserRoles = [
    {
        value: 'Admin',
        label: 'Admin',
    },
    {
        value: 'Runner',
        label: 'Runner',
    },
    {
        value: 'Packer',
        label: 'Packer',
    }
];

const EditUserDialog: React.FC<EditUserInterface> = (props) => {
    const { onClose, user, open } = props;
    const [editing, setEditingUser] = useState(user)

    const handleClose = () => {
        onClose(editing);
    };

    return (
        <Dialog onClose={() => {
            onClose(null);
        }} open={open} PaperProps={{ style: { maxWidth: 400 } }}>
            <DialogTitle className='border-bottom d-flex font-bold' sx={{ px: 2, py: 1 }}>
                Edit User
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onClose(null);
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ p: 1 }} style={{ background: '#0000000A' }}>
                    <Switch ></Switch> <b>Active</b>
                </Box>
                <Box sx={{ p: 2 }} className='border-bottom'>
                    <TextField
                        select
                        label="Role"
                        size='small'
                        fullWidth
                        value={editing.role}
                        helperText='Admin has access to all permissions. Can edit the menu, availability, create and delete users, cancel orders, and see all financial data.'
                        onChange={(e) => {
                            const role = e.target.value;
                            if (role === 'Admin' || role === 'Runner' || role === 'Packer') {
                                setEditingUser({
                                    ...editing,
                                    role: role
                                });
                            }
                        }}
                    >
                        {UserRoles.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
                <Box sx={{ px: 2, py: 1 }} className='border-bottom'>
                    <Typography variant='h5' sx={{ pb: 2 }}>User Details</Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Name"
                                size='small'
                                fullWidth
                                value={editing.name}
                                onChange={(e) => {
                                    setEditingUser({
                                        ...editing,
                                        name: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Surname"
                                size='small'
                                fullWidth
                                value={editing.surname}
                                onChange={(e) => {
                                    setEditingUser({
                                        ...editing,
                                        surname: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Email"
                                size='small'
                                type={'email'}
                                fullWidth
                                value={editing.email}
                                onChange={(e) => {
                                    setEditingUser({
                                        ...editing,
                                        email: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <MuiPhoneNumber
                                variant='outlined'
                                fullWidth
                                label='Phone'
                                size='small'
                                value={editing.phone}
                                style={{ fontSize: 18 }}
                                defaultCountry={'us'}
                                onChange={(value) => {
                                    setEditingUser({
                                        ...editing,
                                        phone: value
                                    });
                                }}
                            />
                        </Grid>
                    </Grid>
                </Box>
                <Box sx={{ px: 2, py: 1 }} className='border-bottom'>
                    <Typography variant='h5' sx={{ pb: 1 }}>Locations</Typography>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Checkbox size='small'></Checkbox>HotDog Stand
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox size='small'></Checkbox>Snackr Kiosk
                        </Grid>

                    </Grid>
                </Box>
            </Box>
            <DialogActions sx={{ py: 2 }}>
                <Button color='primary' variant='contained' fullWidth onClick={handleClose}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EditUserDialog;
