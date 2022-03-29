import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Box, Button, DialogActions, IconButton, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiPhoneNumber from 'material-ui-phone-number';


interface EditEmailInterface {
    onClose: Function;
    open: boolean;
    email?: string;
};

const EmailEditDialog: React.FC<EditEmailInterface> = (props) => {
    const { onClose, email, open } = props;
    const [editing, setEditing] = useState(email)

    const handleClose = () => {
        onClose(editing);
    };

    return (
        <Dialog onClose={() => {
            onClose(null);
        }} open={open} PaperProps={{ style: { width: 400 } }}>
            <DialogTitle className='border-bottom d-flex font-bold' sx={{ px: 2, py: 1 }}>
                <Typography component='span' variant='h6'>Edit Email</Typography>
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onClose(null);
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ p: 2 }} className='border-bottom'>
                    <TextField
                        label="Email"
                        type={'email'}
                        size='small'
                        fullWidth
                        value={editing}
                        onChange={(e) => {
                            setEditing(e.target.value);
                        }}
                    >
                    </TextField>
                </Box>
            </Box>
            <DialogActions sx={{ py: 2, px: 2 }}>
                <Button color='primary' variant='contained' fullWidth onClick={handleClose}>
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default EmailEditDialog;
