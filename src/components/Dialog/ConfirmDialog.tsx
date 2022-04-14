import Dialog from '@mui/material/Dialog';
import { Box, Button, DialogContent, Typography } from '@mui/material';


interface ConfirmDialogInterface {
    onAction: Function;
    successLabel: string;
    cancelLabel: string;
    header: string;
    text: string;
    open: boolean;
    success: string;
    cancel: string;
};

const ConfirmDialog: React.FC<ConfirmDialogInterface> = (props) => {
    const { open, success, cancel, onAction, header, text, successLabel, cancelLabel } = props;

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
                        {header}
                    </Typography>
                </Box>
                <Box sx={{ pb: 4 }}>
                    <Typography textAlign='center' variant='body2'>
                        {text}
                    </Typography>
                </Box>
                <Box>
                    <Button sx={{ mb: 1 }} fullWidth variant='contained' color='primary' onClick={handleSuccess}>{successLabel}</Button>
                    <Button fullWidth color='primary' onClick={handleClose}>{cancelLabel}</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}

export default ConfirmDialog;
