import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import Typography from '@mui/material/Typography';
import { Promo } from 'src/models/promo';
import { styled, Box, Button, DialogActions, Grid, IconButton, Switch, TextField, MenuItem, InputAdornment } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const DialogSubtitle = styled(Typography)(
    ({ theme }) => `
          color: #00000099;
  `
);

interface EditPromoInterface {
    onAction: Function;
    open: boolean;
    promo?: Promo;
};

const EditPromoDialog: React.FC<EditPromoInterface> = (props) => {
    const { onAction, promo, open } = props;
    const [editing, setEditingPromo] = useState(promo);
    const [showError, setShowError] = useState(false);

    const isNew = !promo.id

    const validateInput = () => {
        if (!editing.code || editing.code.trim().length === 0) return false;
        return true;
    }

    const handleSave = () => {
        if (validateInput()) {
            onAction('Save', editing);
        } else {
            setShowError(true);
        }
    }

    const promoTypes = ['Percentage', 'Value'];
    const promoUsages = ['One time use', 'Multiple use'];

    return (
        <Dialog onClose={() => {
            onAction('Close');
        }} open={open} PaperProps={{ style: { width: 640, maxWidth: 640 } }}>
            <DialogTitle className='border-bottom d-flex' sx={{ px: 2, py: 1 }}>
                <Typography component='span' variant='h6'>Edit Promo</Typography>
                <IconButton className='float-right' sx={{ p: 0 }} size='small' onClick={() => {
                    onAction('Close');
                }}>
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <Box>
                <Box sx={{ p: 1 }} style={{ background: '#0000000A' }}>
                    <Switch checked={editing.active || false} onChange={e => {
                        setEditingPromo({
                            ...editing,
                            active: e.target.checked
                        })
                    }} ></Switch> <Typography component='span' variant='subtitle1'>Active</Typography>
                </Box>
                <Box sx={{ px: 2, py: 2 }} className='border-bottom'>
                    <DialogSubtitle variant='subtitle1' sx={{ pb: 2 }}>Promo Details</DialogSubtitle>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <TextField
                                InputLabelProps={{ shrink: true }}
                                label="Promo Code"
                                size='small'
                                required
                                error={showError && (!editing.code || editing.code.trim().length === 0)}
                                fullWidth
                                value={editing.code || ''}
                                onChange={(e) => {
                                    setEditingPromo({
                                        ...editing,
                                        code: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                select
                                label="Promo Type"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={editing.type || ''}
                                onChange={(e) => {
                                    if (e.target.value === 'Percentage' || e.target.value === 'Value') {
                                        setEditingPromo({
                                            ...editing,
                                            type: e.target.value
                                        });
                                    }
                                }}
                            >
                                {promoTypes.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Promo Value"
                                size='small'
                                type='number'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                InputProps={{
                                    startAdornment: <InputAdornment position="start">{editing.type === 'Percentage' ? '%' : '$'}</InputAdornment>,
                                    inputProps: { min: 0, max: 100, step: 0.01 }
                                }}
                                value={editing.value}
                                onChange={(e) => {
                                    if (e.target.value !== null && e.target.value.length > 0) {
                                        setEditingPromo({
                                            ...editing,
                                            value: Number(e.target.value)
                                        });
                                    } else {
                                        setEditingPromo({
                                            ...editing,
                                            value: null
                                        });
                                    }
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                select
                                label="Promo Usage"
                                size='small'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={editing.usage || ''}
                                onChange={(e) => {
                                    if (e.target.value === 'One time use' || e.target.value === 'Multiple use') {
                                        setEditingPromo({
                                            ...editing,
                                            usage: e.target.value
                                        });
                                    }
                                }}
                            >
                                {promoUsages.map((type) => (
                                    <MenuItem key={type} value={type}>
                                        {type}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Commences"
                                size='small'
                                type='datetime-local'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={editing.commences || ''}
                                onChange={(e) => {
                                    setEditingPromo({
                                        ...editing,
                                        commences: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                label="Expire"
                                size='small'
                                type='datetime-local'
                                InputLabelProps={{ shrink: true }}
                                fullWidth
                                value={editing.expires || ''}
                                onChange={(e) => {
                                    setEditingPromo({
                                        ...editing,
                                        expires: e.target.value
                                    });
                                }}
                            >
                            </TextField>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <DialogActions sx={{ py: 2 }}>
                {
                    !isNew &&
                    <Button color='primary' size='small' variant='outlined' style={{ width: 200, height: 40 }} onClick={() => {
                        onAction('Delete', promo);
                    }}>
                        <InfoOutlinedIcon sx={{ mr: 2 }} fontSize='small'></InfoOutlinedIcon>
                        Delete
                    </Button>
                }
                <Button color='primary' variant='contained' style={{ width: 200, height: 40 }} onClick={handleSave}>
                    Save
                </Button>
            </DialogActions>
        </Dialog >
    );
}

export default EditPromoDialog;
