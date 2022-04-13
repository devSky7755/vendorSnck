import Dialog from '@mui/material/Dialog';
import { Box, Button, DialogContent, Typography } from '@mui/material';


interface DeleteVenueAreaDialogInterface {
    onAction: Function;
    open: boolean;
    success: string;
    cancel: string;
};

const DeleteVenueAreaDialog: React.FC<DeleteVenueAreaDialogInterface> = (props) => {
    const { open, success, cancel, onAction } = props;

    const handleClose = () => {
        onAction(cancel);
    }

    const handleSuccess = () => {
        onAction(success);
    }

    return (
        <Dialog
            open={open}
            onClose={handleClose}
            PaperProps={{ style: { width: 340 } }}
        >
            <DialogContent sx={{ m: 3 }}>
                <Box sx={{ pb: 4 }}>
                    <Typography textAlign='center' variant='h6'>
                        Are you sure you want to
                        delete this distribution area?
                    </Typography>
                </Box>
                <Box sx={{ pb: 4 }}>
                    <Typography textAlign='center' variant='body2'>
                        It cannot be recovered
                    </Typography>
                </Box>
                <Box>
                    <Button sx={{ mb: 1 }} fullWidth variant='contained' color='primary' onClick={handleSuccess}>DELETE</Button>
                    <Button fullWidth color='primary' onClick={handleClose}>RETURN</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default DeleteVenueAreaDialog;
