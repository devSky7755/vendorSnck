import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Box, Button, DialogActions, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MuiPhoneNumber from 'material-ui-phone-number';


interface EditPhoneInterface {
    onClose: Function;
    open: boolean;
    phone?: string;
};

const PhoneEditDialog: React.FC<EditPhoneInterface> = (props) => {
    const { onClose, phone, open } = props;
    const [editing, setEditing] = useState(phone)

    const handleClose = () => {
        onClose(editing);
    };

    return (
        <Dialog onClose={() => {
            onClose(null);
        }} open={open} PaperProps={{ style: { width: 400 } }}>
            <DialogTitle className='border-bottom d-flex font-bold' sx={{ px: 2, py: 1 }}>
                <Typography component='span' variant='h6'>Edit Phone</Typography>
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onClose(null);
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ p: 2 }} className='border-bottom'>
                    <MuiPhoneNumber
                        label="Phone"
                        type={'Phone'}
                        size='small'
                        fullWidth
                        value={editing}
                        onChange={(value) => {
                            setEditing(value);
                        }}
                    >
                    </MuiPhoneNumber>
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

export default PhoneEditDialog;
